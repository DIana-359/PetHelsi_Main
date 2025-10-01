import ChatsNotFound from "@/components/ChatsNotFound/ChatsNotFound";
import ChatsSidebar from "@/components/ChatsSidebar/ChatsSidebar";
import chatsListJson from "@/utils/chats.json";
import type { ChatsResponse } from "@/app/types/chatsTypes";

export default async function Chats() {
  const chatsList = chatsListJson as ChatsResponse;

  if (!chatsList?.chats || chatsList.chats.length === 0) {
    return <ChatsNotFound />;
  }

  return (
    <div
      className="bg-background -my-[16px] 
                md:-ml-[32px] md:-my-[32px] md:pr-0
                2xl:-ml-[40px] 2xl:-my-[40px]">
      <ChatsSidebar chatsList={chatsList.chats} />
    </div>
  );
}
