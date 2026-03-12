"use client";

import { useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { Message, PaginatedMessagesResponse } from "@/types/chatsTypes";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";

interface UseChatSocketParams {
  currentUserId?: number;
}

export function useChatSocket({ currentUserId }: UseChatSocketParams) {
  const clientRef = useRef<Client | null>(null);
  const queryClient = useQueryClient();

  const messageToChat = useRef<Map<string, string>>(new Map());
  const pendingQueue = useRef<Array<() => void>>([]);
  const reconnecting = useRef(false);

  async function getSocketToken() {
    const res = await fetch("/api/proxy/socket-token", {
      credentials: "include",
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.token;
  }

  const refreshToken = async () => {
    try {
      const res = await fetch("/api/proxy/auth-refresh", {
        method: "POST",
        credentials: "include",
      });

      return res.ok;
    } catch {
      return false;
    }
  };

  const connect = async (userId: number) => {
    const token = await getSocketToken();
    if (!token) return;

    if (clientRef.current) {
      clientRef.current.deactivate();
      clientRef.current = null;
    }

    const client = new Client({
      webSocketFactory: () =>
        new SockJS(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/ws?token=${token}`),
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      reconnectDelay: 0,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = () => {
      console.log("WebSocket connected");

      reconnecting.current = false;

      pendingQueue.current.forEach(fn => fn());
      pendingQueue.current = [];

      client.subscribe("/user/queue/messages", message => {
        const rawMsg = JSON.parse(message.body);

        const msg: Message = {
          ...rawMsg,
          messageId: String(rawMsg.messageId),
          chatId: String(rawMsg.chatId),
        };

        messageToChat.current.set(msg.messageId, msg.chatId);

        if (msg.clientMessageId) {
          messageToChat.current.set(msg.clientMessageId, msg.chatId);
        }

        if (msg.recipientId === userId && msg.status === "SENT") {
          client.publish({
            destination: "/app/chat.delivered",
            body: JSON.stringify({
              chatId: msg.chatId,
              messageId: msg.messageId,
            }),
          });
        }

        queryClient.setQueryData<InfiniteData<PaginatedMessagesResponse>>(
          ["chatMessages", msg.chatId],
          prev => {
            if (!prev) return prev;

            let foundPageIndex = -1;
            let foundMsgIndex = -1;

            for (let i = 0; i < prev.pages.length; i++) {
              const idx = prev.pages[i].content.findIndex(
                m =>
                  m.messageId === msg.messageId ||
                  (msg.clientMessageId &&
                    m.clientMessageId === msg.clientMessageId)
              );

              if (idx !== -1) {
                foundPageIndex = i;
                foundMsgIndex = idx;
                break;
              }
            }

            if (foundPageIndex !== -1) {
              return {
                ...prev,
                pages: prev.pages.map((page, i) => {
                  if (i !== foundPageIndex) return page;

                  const updatedContent = [...page.content];
                  updatedContent[foundMsgIndex] = msg;

                  return { ...page, content: updatedContent };
                }),
              };
            }

            const firstPage = prev.pages[0];

            return {
              ...prev,
              pages: [
                {
                  ...firstPage,
                  content: [...firstPage.content, msg],
                },
                ...prev.pages.slice(1),
              ],
            };
          }
        );
      });

      client.subscribe("/user/queue/status", message => {
        const rawUpdate = JSON.parse(message.body);

        const update = {
          ...rawUpdate,
          messageId: String(rawUpdate.messageId),
          chatId: rawUpdate.chatId ? String(rawUpdate.chatId) : undefined,
        };

        let targetChatId =
          update.chatId || messageToChat.current.get(update.messageId);

        if (!targetChatId) {
          const allQueries = queryClient.getQueryCache().findAll({
            queryKey: ["chatMessages"],
          });

          for (const query of allQueries) {
            const data =
              query.state.data as
                | InfiniteData<PaginatedMessagesResponse>
                | undefined;

            if (!data) continue;

            const found = data.pages.some(page =>
              page.content.some(m => m.messageId === update.messageId)
            );

            if (found) {
              targetChatId = query.queryKey[1] as string;
              break;
            }
          }
        }

        if (!targetChatId) return;

        queryClient.setQueryData<InfiniteData<PaginatedMessagesResponse>>(
          ["chatMessages", targetChatId],
          prev => {
            if (!prev) return prev;

            return {
              ...prev,
              pages: prev.pages.map(page => ({
                ...page,
                content: page.content.map(m =>
                  m.messageId === update.messageId
                    ? { ...m, status: update.status }
                    : m
                ),
              })),
            };
          }
        );
      });
    };

    client.onWebSocketClose = async () => {
      console.log("WebSocket closed");

      if (reconnecting.current) return;

      reconnecting.current = true;

      const refreshed = await refreshToken();

      if (refreshed && currentUserId) {
        console.log("Token refreshed, reconnecting socket...");
        connect(currentUserId);
      } else {
        window.location.href = "/signin";
      }
    };

    client.activate();
    clientRef.current = client;
  };

  useEffect(() => {
    if (!currentUserId) return;

    connect(currentUserId);

    return () => {
      clientRef.current?.deactivate();
      clientRef.current = null;
    };
  }, [currentUserId]);

  const sendMessage = (payload: {
    chatId: string;
    recipientId: number;
    content: string;
    clientMessageId: string;
  }) => {
    messageToChat.current.set(payload.clientMessageId, payload.chatId);

    if (clientRef.current?.connected) {
      clientRef.current.publish({
        destination: "/app/chat.send",
        body: JSON.stringify(payload),
      });
    } else {
      pendingQueue.current.push(() => {
        clientRef.current!.publish({
          destination: "/app/chat.send",
          body: JSON.stringify(payload),
        });
      });
    }
  };

  const markAsRead = (chatId: string, messageId: string) => {
    if (!clientRef.current?.connected) return;

    queryClient.setQueryData<InfiniteData<PaginatedMessagesResponse>>(
      ["chatMessages", chatId],
      prev => {
        if (!prev) return prev;

        return {
          ...prev,
          pages: prev.pages.map(page => ({
            ...page,
            content: page.content.map(m =>
              m.messageId === messageId
                ? { ...m, status: "READ" as const }
                : m
            ),
          })),
        };
      }
    );

    clientRef.current.publish({
      destination: "/app/chat.read",
      body: JSON.stringify({ chatId, messageId }),
    });
  };

  return { sendMessage, markAsRead };
}