"use client";
import AvatarUser from "../ProfileOwner/AvatarUser";
import type { Chat, VetDialog } from "@/types/chatsTypes";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import clsx from "clsx";
import useMedia from "@/utils/useMedia";

interface ChatsSidebarProps {
  chatsList: Chat[];
  openChat?: string | null;
}

export default function ChatsSidebar({
  chatsList,
  openChat,
}: ChatsSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeChat = searchParams.get("chatId");
  const isDesktop = useMedia(1440);
  const isMobileAvatar = useMedia(1024);

  const updateQueryIdChats = (newQuery: string | number) => {
    const params = new URLSearchParams(searchParams);
    params.set("chatId", String(newQuery));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  if (openChat && isDesktop) {
    return null;
  }

  return (
    <ul className="bg-background w-full 2xl:w-[380px] 2xl:border-r-[1px] 2xl:border-gray-100 h-[100vh]">
      {chatsList.map(chat => (
        <li
          key={chat.chat_id}
          onClick={() => updateQueryIdChats(chat.chat_id)}
          className={clsx(
            "w-full py-[16px] px-[12px] cursor-pointer flex justify-between group transition-colors duration-300",
            activeChat === String(chat.chat_id)
              ? "bg-primary-700"
              : "bg-background hover:bg-primary-100"
          )}>
          <div className="flex flex-1 items-center">
            <div className="mr-[16px]">
              <AvatarUser
                // avatar={userData?.avatar}
                firstName={chat.vet_full_name}
                // email={userData?.email}
                size={isMobileAvatar ? 48 : 64}
              />
            </div>

            <div className="2xl:w-[235px] mr-[8px]">
              <p
                className={clsx(
                  "text-[16px] font-[500] leading-[1] mb-[4px]",
                  activeChat === String(chat.chat_id)
                    ? "text-background"
                    : "text-gray-900 group-hover:text-gray-700"
                )}>
                {chat.vet_full_name}
              </p>

              {(() => {
                const vetMessages = chat.dialogs
                  .filter(
                    (elem): elem is VetDialog => elem.sender_type === "VET"
                  )
                  .sort(
                    (a, b) =>
                      new Date(b.datetime).getTime() -
                      new Date(a.datetime).getTime()
                  );

                if (vetMessages.length === 0) return null;

                const lastMsg = vetMessages[0];
                return (
                  <div
                    className={clsx(
                      "text-[14px] font-[400] leading-[1.1]",
                      activeChat === String(chat.chat_id)
                        ? "text-background"
                        : "text-gray-700 group-hover:text-gray-700"
                    )}>
                    {lastMsg.message.length > 68
                      ? lastMsg.message.slice(0, 68) + "..."
                      : lastMsg.message}
                  </div>
                );
              })()}
            </div>
          </div>

          <div className="flex flex-col items-end w-[36px]">
            <p
              className={clsx(
                "text-[12px] font-[500] leading-[1] mb-[8px]",
                activeChat === String(chat.chat_id)
                  ? "text-background"
                  : "text-gray-700 group-hover:text-gray-700"
              )}>
              {chat.last_login_date.slice(5)}
            </p>
            <p className="rounded-full bg-primary-700 w-[24px] h-[24px] flex items-center justify-center text-[12px] font-[500] leading-[1] text-background">
              1
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
