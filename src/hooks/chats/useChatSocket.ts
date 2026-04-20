"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { Message, PaginatedMessagesResponse } from "@/types/chatsTypes";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";

const PENDING_STORAGE_KEY = "chat_pending_messages";
const MAX_RECONNECT_ATTEMPTS = 5;
const SEND_TIMEOUT_MS = 5000;

function loadPendingMessages(): Message[] {
  try {
    const raw = localStorage.getItem(PENDING_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function savePendingMessages(messages: Message[]) {
  try {
    localStorage.setItem(PENDING_STORAGE_KEY, JSON.stringify(messages));
  } catch { /* ignore quota errors */ }
}

interface UseChatSocketParams {
  currentUserId?: number;
}

export function useChatSocket({ currentUserId }: UseChatSocketParams) {
  const clientRef = useRef<Client | null>(null);
  const queryClient = useQueryClient();

  const currentUserIdRef = useRef<number | undefined>(currentUserId);
  currentUserIdRef.current = currentUserId;

  const messageToChat = useRef<Map<string, string>>(new Map());
  const pendingQueue = useRef<Array<() => void>>([]);
  const reconnecting = useRef(false);
  const reconnectAttempts = useRef(0);
  const pendingTimers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());
  const pendingPayloads = useRef<Map<string, { chatId: string; recipientId: number; content: string; clientMessageId: string }>>(new Map());

  const [pendingMessages, setPendingMessagesRaw] = useState<Message[]>(() => {
    const loaded = loadPendingMessages().map(msg =>
      msg.status === "SENT" ? { ...msg, status: "FAILED" as const } : msg
    );
    for (const msg of loaded) {
      if (msg.clientMessageId) {
        pendingPayloads.current.set(msg.clientMessageId, {
          chatId: msg.chatId,
          recipientId: msg.recipientId,
          content: msg.content,
          clientMessageId: msg.clientMessageId,
        });
      }
    }
    savePendingMessages(loaded);
    return loaded;
  });

  const setPendingMessages = useCallback((updater: Message[] | ((prev: Message[]) => Message[])) => {
    setPendingMessagesRaw(prev => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      savePendingMessages(next);
      return next;
    });
  }, []);

  async function getSocketToken() {
    try {
      const res = await fetch("/api/proxy/socket-token", {
        credentials: "include",
      });

      if (!res.ok) return null;

      const data = await res.json();
      return data.token;
    } catch {
      return null;
    }
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
      await clientRef.current.deactivate();
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
      reconnectAttempts.current = 0;

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

        const matchId = msg.clientMessageId
          || (() => {
            if (msg.senderId !== userId) return undefined;
            const found = pendingPayloads.current.entries();
            for (const [cid, p] of found) {
              if (p.chatId === msg.chatId && p.content === msg.content) return cid;
            }
            return undefined;
          })();

        if (matchId) {
          const timer = pendingTimers.current.get(matchId);
          if (timer) {
            clearTimeout(timer);
            pendingTimers.current.delete(matchId);
          }
          pendingPayloads.current.delete(matchId);

          setPendingMessages(prev =>
            prev.filter(m => m.clientMessageId !== matchId)
          );
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
                    (m.clientMessageId === msg.clientMessageId ||
                     m.messageId === msg.clientMessageId))
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

      if (reconnectAttempts.current >= MAX_RECONNECT_ATTEMPTS) {
        console.error("Max WebSocket reconnect attempts reached");
        reconnecting.current = false;
        return;
      }

      const delay = Math.min(1000 * 2 ** reconnectAttempts.current, 30000);
      reconnectAttempts.current++;

      await new Promise(r => setTimeout(r, delay));

      const refreshed = await refreshToken();

      if (refreshed && currentUserIdRef.current) {
        console.log(`Reconnecting socket (attempt ${reconnectAttempts.current})...`);
        connect(currentUserIdRef.current);
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

    const timers = pendingTimers.current;
    const client = clientRef;

    return () => {
      timers.forEach(timer => clearTimeout(timer));
      timers.clear();
      client.current?.deactivate();
      client.current = null;
    };
  }, [currentUserId]);

  const sendMessage = useCallback((payload: {
    chatId: string;
    recipientId: number;
    content: string;
    clientMessageId: string;
  }) => {
    const userId = currentUserIdRef.current;
    if (!userId) return;

    messageToChat.current.set(payload.clientMessageId, payload.chatId);
    pendingPayloads.current.set(payload.clientMessageId, payload);

    const optimisticMsg: Message = {
      chatId: payload.chatId,
      messageId: payload.clientMessageId,
      senderId: userId,
      recipientId: payload.recipientId,
      senderEmail: "",
      recipientEmail: "",
      content: payload.content,
      timestamp: new Date().toISOString(),
      status: "SENT",
      clientMessageId: payload.clientMessageId,
    };

    setPendingMessages(prev => [...prev, optimisticMsg]);

    const timer = setTimeout(() => {
      pendingTimers.current.delete(payload.clientMessageId);
      setPendingMessages(prev =>
        prev.map(m =>
          m.clientMessageId === payload.clientMessageId
            ? { ...m, status: "FAILED" as const }
            : m
        )
      );
    }, SEND_TIMEOUT_MS);

    pendingTimers.current.set(payload.clientMessageId, timer);

    if (clientRef.current?.connected && navigator.onLine) {
      clientRef.current.publish({
        destination: "/app/chat.send",
        body: JSON.stringify(payload),
      });
    }
  }, [setPendingMessages]);

  const retryMessage = useCallback((clientMessageId: string) => {
    const payload = pendingPayloads.current.get(clientMessageId);
    if (!payload) return;

    setPendingMessages(prev =>
      prev.map(m =>
        m.clientMessageId === clientMessageId
          ? { ...m, status: "SENT" as const }
          : m
      )
    );

    const timer = setTimeout(() => {
      pendingTimers.current.delete(clientMessageId);
      setPendingMessages(prev =>
        prev.map(m =>
          m.clientMessageId === clientMessageId
            ? { ...m, status: "FAILED" as const }
            : m
        )
      );
    }, SEND_TIMEOUT_MS);

    pendingTimers.current.set(clientMessageId, timer);

    if (clientRef.current?.connected && navigator.onLine) {
      clientRef.current.publish({
        destination: "/app/chat.send",
        body: JSON.stringify(payload),
      });
    }
  }, [setPendingMessages]);

  const markAsRead = useCallback((chatId: string, messageId: string) => {
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

    if (clientRef.current?.connected) {
      clientRef.current.publish({
        destination: "/app/chat.read",
        body: JSON.stringify({ chatId, messageId }),
      });
    }
  }, [queryClient]);

  return { sendMessage, markAsRead, retryMessage, pendingMessages };
}
