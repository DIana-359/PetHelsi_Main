"use client";
import AvatarUser from "@/components/ProfileOwner/AvatarUser";
import type { Chat } from "@/types/chatsTypes";
import Icon from "@/components/Icon";
import { useSearchParams } from "next/navigation";
import clsx from "clsx";
import useMedia from "@/utils/useMedia";
import { useProfile } from "@/hooks/owners/useProfile";
import { useCachedChatMessages } from "@/hooks/chats/useCachedChatMessages";
import { getChatMessageDateLabel } from "@/utils/date/getChatMessageDateLabel";
import { mergeMessages } from "@/utils/chats/mergeMessages";
import { useChatStore } from "@/stores/useChatStore";

interface ChatsSidebarProps {
  chatsList: Chat[];
  openChat?: string | null;
  onSelectChat: (chatId: string) => void;
  currentUserId: number;
}

function ChatSidebarItem({
  chat,
  isActive,
  currentUserId,
  isMobileAvatar,
  avatar,
  email,
  onSelectChat,
}: {
  chat: Chat;
  isActive: boolean;
  currentUserId: number;
  isMobileAvatar: boolean;
  avatar?: string;
  email?: string;
  onSelectChat: (chatId: string) => void;
}) {
  const chatId = String(chat.chatId);
  const cached = useCachedChatMessages(chatId);
  const pendingMessages = useChatStore(state => state.pendingMessages);

  const messages = mergeMessages(cached?.pages, pendingMessages, chatId);
  const lastMessage = messages[messages.length - 1];

  const unreadCount = messages.filter(
    m => m.senderId !== currentUserId && m.status !== "READ"
  ).length;


  const displayName =
    chat.senderId === currentUserId ? chat.recipientName : chat.senderName;

  const lastMsgText = lastMessage?.content ?? "";
  const trimmedMsg =
    lastMsgText.length > 68 ? lastMsgText.slice(0, 68) + "..." : lastMsgText;

  const dateLabel = lastMessage?.timestamp
    ? getChatMessageDateLabel(lastMessage.timestamp)
    : "";

  return (
    <li
      onClick={() => onSelectChat(String(chat.chatId))}
      className={clsx(
        "w-full py-[16px] px-[12px] cursor-pointer flex justify-between group transition-colors duration-300",
        isActive ? "bg-primary-700" : "bg-background hover:bg-primary-100"
      )}
    >
      <div className="flex flex-1 items-center min-w-0">
        <div className="mr-[16px] shrink-0">
          <AvatarUser
            avatar={avatar}
            firstName={displayName}
            email={email}
            size={isMobileAvatar ? 48 : 64}
          />
        </div>

        <div className="min-w-0 flex-1 mr-[8px]">
          <p
            className={clsx(
              "text-[16px] font-[500] leading-[1] mb-[4px] truncate",
              isActive
                ? "text-background"
                : "text-gray-900 group-hover:text-gray-700"
            )}
          >
            {displayName}
          </p>

          {trimmedMsg && (
            <p
              className={clsx(
                "text-[14px] font-[400] leading-[1.1] truncate",
                isActive
                  ? "text-background/80"
                  : "text-gray-500 group-hover:text-gray-700"
              )}
            >
              {trimmedMsg}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col items-end shrink-0 w-[48px]">
        {dateLabel && (
          <p
            className={clsx(
              "text-[12px] font-[500] leading-[1] mb-[8px] whitespace-nowrap",
              isActive
                ? "text-background"
                : "text-gray-500 group-hover:text-gray-700"
            )}
          >
            {dateLabel}
          </p>
        )}

        {lastMessage?.status === "FAILED" && (
          <div className="w-full flex justify-center">
            <Icon
              sprite="/sprites/sprite-sistem.svg"
              id="icon-send-failed"
              width="16px"
              height="16px"
              className={isActive ? "text-background" : "text-red-500"}
            />
          </div>
        )}

        {!isActive && unreadCount > 0 && (
          <div className="w-full flex justify-center">
            <p className="rounded-full bg-primary-700 min-w-[24px] h-[24px] px-[4px] flex items-center justify-center text-[12px] font-[500] leading-[1] text-background">
              {unreadCount > 99 ? "99+" : unreadCount}
            </p>
          </div>
        )}
      </div>
    </li>
  );
}

export default function ChatsSidebar({
  chatsList,
  openChat,
  onSelectChat,
  currentUserId,
}: ChatsSidebarProps) {
  const searchParams = useSearchParams();
  const activeChat = searchParams.get("chatId");
  const isDesktop = useMedia(1440);
  const isMobileAvatar = useMedia(1024);
  const { data: profile } = useProfile();

  if (openChat && isDesktop) return null;

  return (
    <ul className="bg-background w-full 2xl:w-[380px] 2xl:border-r-[1px] 2xl:border-gray-100 h-[100vh] flex-shrink-0">
      {chatsList.map(chat => (
        <ChatSidebarItem
          key={chat.chatId}
          chat={chat}
          isActive={activeChat === String(chat.chatId)}
          currentUserId={currentUserId}
          isMobileAvatar={isMobileAvatar}
          avatar={profile?.avatar}
          email={profile?.email}
          onSelectChat={onSelectChat}
        />
      ))}
    </ul>
  );
}