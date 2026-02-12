import { Chat } from "@/types/chatsTypes";
import AvatarUser from "../ProfileOwner/AvatarUser";
interface ChatsProps {
  openChat: Chat;
}

export default function ChatsHeader({ openChat }: ChatsProps) {
  return (
    <div className="w-full py-[12px] md:px-[24px] bg-background border-b-[1px] border-b-gray-100 flex items-center gap-[12px]">
      <AvatarUser
        // avatar={openChat?.avatar}
        firstName={openChat.vet_full_name}
        // email={openChat?.email}
        size={48}
      />
      <p className="text-[16px] leading-[1] font-[500] text-gray-900">
        {openChat.vet_full_name}
      </p>
    </div>
  );
}
