"use client";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import ChatsSidebar from "@/components/Chats/ChatsSidebar";
import NoConversationSelected from "@/components/NoConversationSelected/NoConversationSelected";
import ChatsNotFound from "@/components/Chats/ChatsNotFound";
import ChatPanel from "@/components/Chats/ChatPanel";
import { useChatsQuery } from "@/hooks/chats/useChats";
import { useChatSocket } from "@/hooks/chats/useChatSocket";
import { useCurrentUserId } from "@/hooks/useCurrentUserId";
import { getChatMessages } from "@/services/chats/getChatMessages";

export default function ChatsUI() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const chatId = searchParams.get("chatId") ?? undefined;
  const currentUserId = useCurrentUserId();
  const queryClient = useQueryClient();

  const { data: chats } = useChatsQuery();

  const { sendMessage, markAsRead, retryMessage, pendingMessages } = useChatSocket({
    currentUserId: currentUserId ?? undefined,
  });

  useEffect(() => {
    if (!chats) return;
    chats.forEach(chat => {
      const key = ["chatMessages", String(chat.chatId)];
      const existing = queryClient.getQueryData(key);
      if (existing) return;
      queryClient.prefetchInfiniteQuery({
        queryKey: key,
        queryFn: ({ pageParam }) => getChatMessages(String(chat.chatId), pageParam as number),
        initialPageParam: 0,
      });
    });
  }, [chats, queryClient]);

  const handleChatSwitch = (newChatId: string) => {
    router.push(`?chatId=${newChatId}`);
  };

  if (!chats || chats.length === 0) return <ChatsNotFound />;

  return (
    <div className="flex-1 bg-background -my-[16px] md:-ml-[32px] md:-my-[32px] md:pr-0 2xl:-ml-[40px] 2xl:-my-[40px] flex overflow-hidden">
      <ChatsSidebar
        chatsList={chats}
        openChat={chatId}
        onSelectChat={handleChatSwitch}
        currentUserId={currentUserId!}
        pendingMessages={pendingMessages}
      />

      {!chatId ? (
        <NoConversationSelected />
      ) : (
        <div className="flex-1 relative min-h-0">
          {chats.map(chat => (
            <ChatPanel
              key={chat.chatId}
              chat={chat}
              isActive={String(chat.chatId) === chatId}
              currentUserId={currentUserId!}
              sendMessage={sendMessage}
              markAsRead={markAsRead}
              retryMessage={retryMessage}
              pendingMessages={pendingMessages}
            />
          ))}
        </div>
      )}
    </div>
  );
}