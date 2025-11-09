import ChatsNotFound from "@/components/Chats/ChatsNotFound";
import ChatsSidebar from "@/components/Chats/ChatsSidebar";
import chatsListJson from "@/utils/chats.json";
import type { ChatsResponse } from "@/app/types/chatsTypes";
import ChatsHeader from "@/components/Chats/ChatsHeader";
import ChatsMessage from "@/components/Chats/ChatsMessage";
import MessageInput from "@/components/Chats/MessageInput";
import NoConversationSelected from "@/components/NoConversationSelected/NoConversationSelected";

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
    : null;

  if (!chatsList) {
    return <ChatsNotFound />;
  }

  return (
    <div className="flex-1 bg-background -my-[16px] md:-ml-[32px] md:-my-[32px] md:pr-0 2xl:-ml-[40px] 2xl:-my-[40px] flex overflow-hidden">
      <ChatsSidebar chatsList={chatsList.chats} />

      {!openChat ? (
        <NoConversationSelected />
      ) : (
        <div className="flex flex-col pr-0 relative flex-1">
          <ChatsHeader openChat={openChat} />
          <div className="flex-1 overflow-y-auto scrollbar-none">
            <ChatsMessage openChat={openChat} />
          </div>
          <MessageInput openChat={openChat} />
        </div>
      )}
    </div>
  );
}
