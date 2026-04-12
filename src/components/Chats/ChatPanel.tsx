"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import ChatsHeader from "@/components/Chats/ChatsHeader";
import MessageInput from "@/components/Chats/MessageInput";
import ChatsMessages from "@/components/Chats/ChatsMessage";
import { useChatMessagesQuery } from "@/hooks/chats/useChatMessages";
import { Chat, Message } from "@/types/chatsTypes";
import { clsx } from "clsx";
import { Pulse } from "@/components/Pulse";

interface ChatPanelProps {
  chat: Chat;
  isActive: boolean;
  currentUserId: number;
  sendMessage: (payload: {
    chatId: string;
    recipientId: number;
    content: string;
    clientMessageId: string;
  }) => void;
  markAsRead: (chatId: string, messageId: string) => void;
  retryMessage: (clientMessageId: string) => void;
  pendingMessages: Message[];
}

const MAX_MESSAGE_LENGTH = 255;

export default function ChatPanel({
  chat,
  isActive,
  currentUserId,
  sendMessage,
  markAsRead,
  retryMessage,
  pendingMessages,
}: ChatPanelProps) {
  const chatId = String(chat.chatId);
  const [sendError, setSendError] = useState<string | null>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const previousMessageCountRef = useRef(0);
  const initialScrollDoneRef = useRef(false);

  const [wasActive, setWasActive] = useState(isActive);

  useEffect(() => {
    if (isActive) setWasActive(true);
  }, [isActive]);

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } = useChatMessagesQuery(
    wasActive ? chatId : undefined
  );

  const messages = useMemo(() => {
    const serverMsgs = data?.pages
      ? [...data.pages].reverse().flatMap(page => page.content)
      : [];
    const seen = new Set<string>();
    const deduped = serverMsgs.filter(msg => {
      if (seen.has(msg.messageId)) return false;
      seen.add(msg.messageId);
      return true;
    });
    const chatPending = pendingMessages.filter(m => m.chatId === chatId);
    return [...deduped, ...chatPending];
  }, [data?.pages, pendingMessages, chatId]);

  const isUserNearBottom = () => {
    const container = messagesContainerRef.current;
    if (!container) return false;
    return container.scrollHeight - container.scrollTop - container.clientHeight < 150;
  };

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    const container = messagesContainerRef.current;
    if (!container) return;
    container.scrollTo({ top: container.scrollHeight, behavior });
  };

  useLayoutEffect(() => {
    if (!messagesContainerRef.current) return;
    if (!messages.length) return;
    if (initialScrollDoneRef.current) return;

    scrollToBottom("auto");
    initialScrollDoneRef.current = true;
    previousMessageCountRef.current = messages.length;
  }, [messages.length]);

  useLayoutEffect(() => {
    if (!initialScrollDoneRef.current) return;
    if (messages.length <= previousMessageCountRef.current) {
      previousMessageCountRef.current = messages.length;
      return;
    }

    const lastMessage = messages[messages.length - 1];
    const isMyMessage = lastMessage?.senderId === currentUserId;

    if (isMyMessage || isUserNearBottom()) {
      scrollToBottom("smooth");
    }

    previousMessageCountRef.current = messages.length;
  }, [messages, currentUserId]);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    let isHandling = false;

    const handleScroll = async () => {
      if (container.scrollTop > 5 || !hasNextPage || isFetchingNextPage || isHandling) return;

      isHandling = true;

      const prevScrollHeight = container.scrollHeight;

      await fetchNextPage();

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          container.scrollTop = container.scrollHeight - prevScrollHeight;
          isHandling = false;
        });
      });
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const handleSendMessage = (content: string) => {
    setSendError(null);

    if (content.length > MAX_MESSAGE_LENGTH) {
      setSendError(`Message too long. Max ${MAX_MESSAGE_LENGTH} characters.`);
      return false;
    }

    const clientMessageId = `client-${Date.now()}`;

    sendMessage({
      chatId,
      recipientId: chat.senderId === currentUserId ? chat.recipientId : chat.senderId,
      content,
      clientMessageId,
    });

    return true;
  };

  return (
    <div
      className={clsx(
        "flex flex-col absolute inset-0",
        isActive ? "visible pointer-events-auto" : "invisible pointer-events-none"
      )}
    >
      <ChatsHeader openChat={chat} currentUserId={currentUserId} />

      <div
        className="flex-1 overflow-y-auto scrollbar-none"
        ref={messagesContainerRef}
      >
        {isFetchingNextPage && <Pulse />}
        <ChatsMessages
          messages={messages}
          loading={isLoading}
          currentUserId={currentUserId}
          onMessageVisible={markAsRead}
          isPanelVisible={isActive}
          scrollContainerRef={messagesContainerRef}
          onRetry={retryMessage}
        />
      </div>

      <MessageInput
        ref={inputRef}
        openChat={chat}
        onSend={handleSendMessage}
        onTyping={() => setSendError(null)}
      />
      {sendError && (
        <p className="text-red-500 text-sm mt-2 px-4">{sendError}</p>
      )}
    </div>
  );
}