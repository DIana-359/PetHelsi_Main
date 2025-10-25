import ChatsNotFound from "@/components/Chats/ChatsNotFound";
import ChatsSidebar from "@/components/Chats/ChatsSidebar";
import chatsListJson from "@/utils/chats.json";
import type { ChatsResponse } from "@/app/types/chatsTypes";
import ChatsHeader from "@/components/Chats/ChatsHeader";
import ChatsMessage from "@/components/Chats/ChatsMessage";
import MessageInput from "@/components/Chats/MessageInput";

export default async function Chats({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = searchParams ? await searchParams : undefined;
  const chatsList = chatsListJson as ChatsResponse;

  if (!chatsList?.chats || chatsList.chats.length === 0) {
    return <ChatsNotFound />;
  }

  const chatId = params?.chatId;
  const openChat = chatId
    ? chatsList.chats.find(chat => String(chat.chat_id) === String(chatId))
    : chatsList.chats[0];

  if (!openChat) {
    return <ChatsNotFound />;
  }

  return (
    <div
      className="w-full bg-background -my-[16px]
                md:-ml-[32px] md:-my-[32px] md:pr-0
                2xl:-ml-[40px] 2xl:-my-[40px] flex">
      <ChatsSidebar chatsList={chatsList.chats} />
      <div className="flex flex-col pr-0 h-[calc(100vh-143px)] relative w-full">
        <ChatsHeader openChat={openChat} />
        <ChatsMessage openChat={openChat} />
        <MessageInput openChat={openChat} />
      </div>
    </div>
  );
}
