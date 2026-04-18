"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import ChatsHeader from "@/components/Chats/ChatsHeader";
import MessageInput from "@/components/Chats/MessageInput";
import ChatsMessages from "@/components/Chats/ChatsMessage";
import ScrollToBottomButton from "@/components/Chats/ScrollToBottomButton";
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
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [newMessageCount, setNewMessageCount] = useState(0);
  const inputRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const previousMessageCountRef = useRef(0);
  const initialScrollDoneRef = useRef(false);
  const isNearBottomRef = useRef(true);
  const lastMessageIdRef = useRef<string | null>(null);
  const seenMessageIdRef = useRef<string | null>(null);
  const messagesRef = useRef<Message[]>([]);

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

  messagesRef.current = messages;

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
    const lastMsg = messages[messages.length - 1];
    const initId = lastMsg?.messageId ?? lastMsg?.clientMessageId ?? null;
    lastMessageIdRef.current = initId;
    seenMessageIdRef.current = initId;
  }, [messages.length]);

  useLayoutEffect(() => {
    if (!initialScrollDoneRef.current) return;

    const lastMessage = messages[messages.length - 1];
    const lastId = lastMessage?.messageId ?? lastMessage?.clientMessageId ?? null;

    if (lastId && lastId !== lastMessageIdRef.current) {
      const isMyMessage = lastMessage.senderId === currentUserId;

      if (isMyMessage || isNearBottomRef.current) {
        seenMessageIdRef.current = lastId;
        scrollToBottom("smooth");
      }
    }

    if (!isNearBottomRef.current) {
      let count = 0;
      for (let i = messages.length - 1; i >= 0; i--) {
        const mid = messages[i].messageId ?? messages[i].clientMessageId;
        if (mid === seenMessageIdRef.current) break;
        if (messages[i].senderId !== currentUserId && messages[i].status !== "READ") count++;
      }
      setNewMessageCount(count);
    }

    lastMessageIdRef.current = lastId;
    previousMessageCountRef.current = messages.length;
  }, [messages, currentUserId]);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    let isHandling = false;

    const handleScroll = async () => {
      const nearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 150;
      isNearBottomRef.current = nearBottom;
      setShowScrollButton(prev => (prev === !nearBottom ? prev : !nearBottom));
      if (nearBottom) {
        setNewMessageCount(0);
        const msgs = messagesRef.current;
        const last = msgs[msgs.length - 1];
        seenMessageIdRef.current = last?.messageId ?? last?.clientMessageId ?? null;
      }

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

  const handleScrollToBottom = () => {
    scrollToBottom("smooth");
    setNewMessageCount(0);
    const last = messages[messages.length - 1];
    seenMessageIdRef.current = last?.messageId ?? last?.clientMessageId ?? null;
  };

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

      <ScrollToBottomButton
        visible={showScrollButton}
        count={newMessageCount}
        onClick={handleScrollToBottom}
      />

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