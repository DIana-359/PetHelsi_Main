import AvatarUser from "../ProfileOwner/AvatarUser";
import type { Chat, VetDialog } from "@/app/types/chatsTypes";

interface ChatsSidebarProps {
  chatsList: Chat[];
}

export default function ChatsSidebar({ chatsList }: ChatsSidebarProps) {
  return (
    <ul className="bg-background w-full md:w-[379px] border-r-[1px] border-gray-100">
      {chatsList.map(chat => (
        <li
          key={chat.chat_id}
          className="w-full py-[16px] px-[12px] bg-background cursor-pointer hover:bg-gray-100 flex items-start">
          <div className="mr-[16px]">
            <AvatarUser
              // avatar={userData?.avatar}
              firstName={chat.vet_full_name}
              // email={userData?.email}
              size={64}
            />
          </div>

          <div className="w-[235px] mr-[8px]">
            <p className="text-[16px] font-[500] leading-[1] text-gray-900 mb-[4px]">
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
                <div className="text-[14px] font-[400] leading-[1.1] text-gray-700">
                  {lastMsg.message.length > 68
                    ? lastMsg.message.slice(0, 68) + "..."
                    : lastMsg.message}
                </div>
              );
            })()}
          </div>

          <div className="flex flex-col items-end w-[36px]">
            <p className="text-[12px] font-[500] leading-[1] text-gray-700 mb-[8px]">
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
