import { useEffect, useRef, useState, RefObject } from "react";
import { createPortal } from "react-dom";
import Linkify from "linkify-react";
import { clsx } from "clsx";
import { Message } from "@/types/chatsTypes";
import Icon from "@/components/Icon";
import { useLongPress } from "@/hooks/chats/useLongPress";

interface MessageItemProps {
  msg: Message;
  currentUserId: number;
  onMessageVisible: (chatId: string, messageId: string) => void;
  isPanelVisible: boolean;
  scrollContainerRef: RefObject<HTMLDivElement | null>;
  onRetry?: (clientMessageId: string) => void;
  onCopied?: () => void;
}

const MENU_WIDTH = 220;
const MENU_OFFSET = 8;
const VIEWPORT_PADDING = 8;

const linkifyOptions = {
  defaultProtocol: "https",
  target: "_blank",
  rel: "noopener noreferrer",
  className: "text-primary-700 underline break-all",
  attributes: {
    onClick: (e: React.MouseEvent) => e.stopPropagation(),
  },
};

export default function MessageItem({
  msg,
  currentUserId,
  onMessageVisible,
  isPanelVisible,
  scrollContainerRef,
  onRetry,
  onCopied,
}: MessageItemProps) {
  const isMine = msg.senderId === currentUserId;
  const ref = useRef<HTMLLIElement | null>(null);
  const bubbleRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPos, setMenuPos] = useState<{ top: number; left: number } | null>(null);

  const openMenu = () => {
    const bubble = bubbleRef.current;
    if (!bubble) return;
    const rect = bubble.getBoundingClientRect();
    const top = rect.bottom + MENU_OFFSET;
    const preferredLeft = isMine ? rect.right - MENU_WIDTH : rect.left;
    const maxLeft = window.innerWidth - MENU_WIDTH - VIEWPORT_PADDING;
    const left = Math.max(VIEWPORT_PADDING, Math.min(preferredLeft, maxLeft));
    setMenuPos({ top, left });
    setMenuOpen(true);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setMenuPos(null);
  };

  const longPress = useLongPress(openMenu);

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

  useEffect(() => {
    if (!menuOpen) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    const onScrollOrResize = () => closeMenu();

    const attachTimer = setTimeout(() => {
      document.addEventListener("mousedown", onDown);
      document.addEventListener("touchstart", onDown);
    }, 100);
    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScrollOrResize, true);
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      clearTimeout(attachTimer);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScrollOrResize, true);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [menuOpen]);

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

  const handleCopy = async () => {
    closeMenu();
    try {
      await navigator.clipboard.writeText(msg.content);
      onCopied?.();
    } catch {
      /* no-op */
    }
  };

  const openMenuOnContextMenu = (e: React.MouseEvent) => {
    if (isFailed) return;
    e.preventDefault();
    openMenu();
  };

  const bubbleClassName = clsx(
    "px-4 py-2 rounded-2xl text-gray-900 select-none",
    isFailed && "bg-red-100",
    !isFailed && isMine && "bg-primary-300",
    !isFailed && !isMine && "bg-primary-100",
  );

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
          ref={bubbleRef}
          onContextMenu={openMenuOnContextMenu}
          onTouchStart={isFailed ? undefined : longPress.onTouchStart}
          onTouchMove={isFailed ? undefined : longPress.onTouchMove}
          onTouchEnd={isFailed ? undefined : longPress.onTouchEnd}
          onTouchCancel={isFailed ? undefined : longPress.onTouchCancel}
          onClickCapture={longPress.onClickCapture}
          className={bubbleClassName}
        >
          <p className="whitespace-pre-wrap break-all">
            <Linkify options={linkifyOptions} as="span">
              {msg.content}
            </Linkify>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1 text-xs mt-1 opacity-70">
        <span>{msg.timestamp.slice(11, 16)}</span>
        {isMine && renderStatus(msg.status)}
      </div>

      {menuOpen && menuPos && !isFailed && typeof document !== "undefined" &&
        createPortal(
          <div
            ref={menuRef}
            role="menu"
            aria-label="Message actions"
            style={{ position: "fixed", top: menuPos.top, left: menuPos.left, width: MENU_WIDTH }}
            className="z-50 bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.12)] py-2"
          >
            <button
              type="button"
              role="menuitem"
              onClick={handleCopy}
              className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-left text-gray-900 text-sm"
            >
              <Icon
                sprite="/sprites/sprite-sistem.svg"
                id="icon-copy"
                width="20px"
                height="20px"
                className="text-gray-700"
              />
              Копіювати текст
            </button>
          </div>,
          document.body
        )}
    </li>
  );
}
