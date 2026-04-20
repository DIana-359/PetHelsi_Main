"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { Message } from "@/types/chatsTypes";

interface UseChatScrollParams {
  messages: Message[];
  currentUserId: number;
  fetchNextPage: () => Promise<unknown>;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

const NEAR_BOTTOM_THRESHOLD_PX = 150;
const TOP_SCROLL_TRIGGER_PX = 5;

export function useChatScroll({
  messages,
  currentUserId,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: UseChatScrollParams) {
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<Message[]>(messages);
  const initialScrollDoneRef = useRef(false);
  const isNearBottomRef = useRef(true);
  const lastMessageIdRef = useRef<string | null>(null);
  const seenMessageIdRef = useRef<string | null>(null);

  const [showScrollButton, setShowScrollButton] = useState(false);
  const [newMessageCount, setNewMessageCount] = useState(0);

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
  }, [messages, currentUserId]);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    let isHandling = false;

    const handleScroll = async () => {
      const nearBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight <
        NEAR_BOTTOM_THRESHOLD_PX;
      isNearBottomRef.current = nearBottom;
      setShowScrollButton(prev => (prev === !nearBottom ? prev : !nearBottom));

      if (nearBottom) {
        setNewMessageCount(0);
        const msgs = messagesRef.current;
        const last = msgs[msgs.length - 1];
        seenMessageIdRef.current = last?.messageId ?? last?.clientMessageId ?? null;
      }

      if (
        container.scrollTop > TOP_SCROLL_TRIGGER_PX ||
        !hasNextPage ||
        isFetchingNextPage ||
        isHandling
      ) {
        return;
      }

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

  return {
    messagesContainerRef,
    showScrollButton,
    newMessageCount,
    handleScrollToBottom,
  };
}
