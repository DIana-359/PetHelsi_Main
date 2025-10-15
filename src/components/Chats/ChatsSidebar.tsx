"use client";
import AvatarUser from "../ProfileOwner/AvatarUser";
import type { Chat, VetDialog } from "@/app/types/chatsTypes";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface ChatsSidebarProps {
  chatsList: Chat[];
}

export default function ChatsSidebar({ chatsList }: ChatsSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateQueryIdChats = (newQuery: string | number) => {
    const params = new URLSearchParams(searchParams);
    params.set("chatId", String(newQuery));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <ul className="bg-background w-full md:w-[379px] border-r-[1px] border-gray-100 h-[100vh]">
      {chatsList.map(chat => (
        <li
          key={chat.chat_id}
          onClick={() => updateQueryIdChats(chat.chat_id)}
          className="w-full py-[16px] px-[12px] bg-background cursor-pointer hover:bg-primary-700 flex items-start group transition-colors duration-300">
          <div className="mr-[16px]">
            <AvatarUser
              // avatar={userData?.avatar}
              firstName={chat.vet_full_name}
              // email={userData?.email}
              size={64}
            />
          </div>

          <div className="w-[235px] mr-[8px]">
            <p className="text-[16px] font-[500] leading-[1] text-gray-900 mb-[4px] group-hover:text-background">
              {chat.vet_full_name}
            </p>

            {(() => {
              const vetMessages = chat.dialogs
                .filter((elem): elem is VetDialog => elem.sender_type === "VET")
                .sort(
                  (a, b) =>
                    new Date(b.datetime).getTime() -
                    new Date(a.datetime).getTime()
                );

              if (vetMessages.length === 0) return null;

              const lastMsg = vetMessages[0];
              return (
                <div className="text-[14px] font-[400] leading-[1.1] text-gray-700 group-hover:text-background">
                  {lastMsg.message.length > 68
                    ? lastMsg.message.slice(0, 68) + "..."
                    : lastMsg.message}
                </div>
              );
            })()}
          </div>

          <div className="flex flex-col items-end w-[36px]">
            <p className="text-[12px] font-[500] leading-[1] text-gray-700 mb-[8px] group-hover:text-background">
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
