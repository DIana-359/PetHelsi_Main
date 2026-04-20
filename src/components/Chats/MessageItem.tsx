import { useEffect, useRef, RefObject } from "react";
import { Message } from "@/types/chatsTypes";
import Icon from "@/components/Icon";

interface MessageItemProps {
  msg: Message;
  currentUserId: number;
  onMessageVisible: (chatId: string, messageId: string) => void;
  isPanelVisible: boolean;
  scrollContainerRef: RefObject<HTMLDivElement | null>;
  onRetry?: (clientMessageId: string) => void;
}

export default function MessageItem({
  msg,
  currentUserId,
  onMessageVisible,
  isPanelVisible,
  scrollContainerRef,
  onRetry,
}: MessageItemProps) {
  const isMine = msg.senderId === currentUserId;
  const ref = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    if (!isPanelVisible || isMine || msg.status === "READ") return;
    const container = scrollContainerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          onMessageVisible(msg.chatId, msg.messageId);
          observer.disconnect();
        });
      },
      { root: container, threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [isPanelVisible, isMine, msg.status, msg.chatId, msg.messageId, onMessageVisible, scrollContainerRef]);

  const renderStatus = (status: Message["status"]) => {
    switch (status) {
      case "SENT":
        return (
          <Icon
            sprite="/sprites/sprite-check-mark.svg"
            id="check-single"
            width="12px"
            height="9px"
            className="text-gray-900"
          />
        );
      case "DELIVERED":
        return (
          <Icon
            sprite="/sprites/sprite-double-check-mark.svg"
            id="check-double"
            width="16px"
            height="16px"
            className="text-gray-900"
          />
        );
      case "READ":
        return (
          <Icon
            sprite="/sprites/sprite-double-check-mark.svg"
            id="check-double"
            width="16px"
            height="16px"
            className="text-blue-500"
          />
        );
      case "FAILED":
        return (
          <Icon
            sprite="/sprites/sprite-sistem.svg"
            id="icon-send-failed"
            width="16px"
            height="16px"
            className="text-red-500"
          />
        );
      default:
        return null;
    }
  };

  const isFailed = msg.status === "FAILED";

  return (
    <li
      ref={ref}
      className={`flex flex-col max-w-[70%] ${
        isMine ? "self-end items-end" : "self-start items-start"
      }`}
    >
      <div className={`flex items-center gap-2 ${isMine ? "flex-row" : "flex-row-reverse"}`}>
        {isFailed && (
          <button
            type="button"
            onClick={() => msg.clientMessageId && onRetry?.(msg.clientMessageId)}
            className="shrink-0 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <Icon
              sprite="/sprites/sprite-sistem.svg"
              id="icon-retry"
              width="24px"
              height="24px"
              className="text-gray-500"
            />
          </button>
        )}
        <div
          className={`px-4 py-2 rounded-2xl text-gray-900 ${
            isFailed ? "bg-red-100" : isMine ? "bg-primary-300" : "bg-primary-100"
          }`}
        >
          <p className="whitespace-pre-wrap break-all">{msg.content}</p>
        </div>
      </div>

      <div className="flex items-center gap-1 text-xs mt-1 opacity-70">
        <span>{msg.timestamp.slice(11, 16)}</span>
        {isMine && renderStatus(msg.status)}
      </div>
    </li>
  );
}