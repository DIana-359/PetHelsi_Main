"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import ChatsHeader from "@/components/Chats/ChatsHeader";
import MessageInput from "@/components/Chats/MessageInput";
import ChatsMessages from "@/components/Chats/ChatsMessage";
import ScrollToBottomButton from "@/components/Chats/ScrollToBottomButton";
import { useChatMessagesQuery } from "@/hooks/chats/useChatMessages";
import { useChatScroll } from "@/hooks/chats/useChatScroll";
import { Chat } from "@/types/chatsTypes";
import { clsx } from "clsx";
import { Pulse } from "@/components/Pulse";
import { mergeMessages } from "@/utils/chats/mergeMessages";
import { useChatStore } from "@/stores/useChatStore";

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
}

const MAX_MESSAGE_LENGTH = 255;

export default function ChatPanel({
  chat,
  isActive,
  currentUserId,
  sendMessage,
  markAsRead,
  retryMessage,
}: ChatPanelProps) {
  const pendingMessages = useChatStore(state => state.pendingMessages);
  const chatId = String(chat.chatId);
  const [sendError, setSendError] = useState<string | null>(null);
  const inputRef = useRef<HTMLDivElement>(null);

  const [wasActive, setWasActive] = useState(isActive);
  const [copiedToastVisible, setCopiedToastVisible] = useState(false);
  const copiedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isActive) setWasActive(true);
  }, [isActive]);

  useEffect(() => {
    return () => {
      if (copiedTimerRef.current) clearTimeout(copiedTimerRef.current);
    };
  }, []);

  const handleCopied = () => {
    setCopiedToastVisible(true);
    if (copiedTimerRef.current) clearTimeout(copiedTimerRef.current);
    copiedTimerRef.current = setTimeout(() => setCopiedToastVisible(false), 2000);
  };

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } = useChatMessagesQuery(
    wasActive ? chatId : undefined
  );

  const messages = useMemo(
    () => mergeMessages(data?.pages, pendingMessages, chatId),
    [data?.pages, pendingMessages, chatId]
  );

  const {
    messagesContainerRef,
    showScrollButton,
    newMessageCount,
    handleScrollToBottom,
  } = useChatScroll({
    messages,
    currentUserId,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

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
          onCopied={handleCopied}
        />
      </div>

      <ScrollToBottomButton
        visible={showScrollButton}
        count={newMessageCount}
        onClick={handleScrollToBottom}
      />

      <div className="relative">
        {copiedToastVisible && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-30 bg-gray-700 text-white text-sm px-5 py-2 rounded-full shadow-lg whitespace-nowrap pointer-events-none">
            Повідомлення скопійовано
          </div>
        )}
        <MessageInput
          ref={inputRef}
          openChat={chat}
          onSend={handleSendMessage}
          onTyping={() => setSendError(null)}
        />
      </div>
      {sendError && (
        <p className="text-red-500 text-sm mt-2 px-4">{sendError}</p>
      )}
    </div>
  );
}
