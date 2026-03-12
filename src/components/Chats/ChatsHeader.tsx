import { Chat } from "@/types/chatsTypes";
import AvatarUser from "@/components/ProfileOwner/AvatarUser";
import { useProfile } from "@/hooks/owners/useProfile";
import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";

interface ChatsHeaderProps {
  openChat: Chat;
  currentUserId: number;
}

export default function ChatsHeader({ openChat, currentUserId }: ChatsHeaderProps) {
  const router = useRouter();
  const name = openChat.senderId === currentUserId ? openChat.recipientName : openChat.senderName;
  const { data } = useProfile();

  return (
    <div className="w-full py-[12px] md:px-[24px] bg-background border-b-[1px] border-b-gray-100 flex items-center gap-[12px]">
      <button
        className="2xl:hidden flex items-center gap-2 text-gray-700"
        onClick={() => router.push("/owner/chats")}
      >
        <Icon
          sprite="/sprites/sprite-sistem.svg"
          id="arrow-left"
          width="20px"
          height="20px"
          className="fill-background stroke-gray-500 group-hover:stroke-primary-700 cursor-pointer"
        />
        <span className="text-[16px] font-[500] truncate max-w-[200px]">{name}</span>
      </button>

      <div className="hidden 2xl:flex items-center gap-[12px]">
        <AvatarUser
          avatar={data?.avatar}
          firstName={name}
          size={48}
        />
        <p className="text-[16px] leading-[1] font-[500] text-gray-900">
          {name}
        </p>
      </div>
    </div>
  );
}