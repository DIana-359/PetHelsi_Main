import { useInfiniteQuery } from "@tanstack/react-query";
import { getChatMessages } from "@/services/chats/getChatMessages";
import { PaginatedMessagesResponse } from "@/types/chatsTypes";
import { queryKeys } from "@/lib/queryKeys";

export function useChatMessagesQuery(chatId?: string) {
  return useInfiniteQuery<PaginatedMessagesResponse, Error>({
    queryKey: queryKeys.chatMessages.byChat(chatId),
    queryFn: ({ pageParam }) =>
      getChatMessages(chatId!, pageParam as number),
    initialPageParam: 0,
    enabled: !!chatId,
    staleTime: Infinity,
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.page.number;
      const totalPages = lastPage.page.totalPages;

      if (currentPage + 1 >= totalPages) {
        return undefined;
      }

      return currentPage + 1;
    },
  });
}