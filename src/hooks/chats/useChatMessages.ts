import { useInfiniteQuery } from "@tanstack/react-query";
import { getChatMessages } from "@/services/chats/getChatMessages";
import { PaginatedMessagesResponse } from "@/types/chatsTypes";

export function useChatMessagesQuery(chatId?: string) {
  return useInfiniteQuery<PaginatedMessagesResponse, Error>({
    queryKey: ["chatMessages", chatId],
    queryFn: ({ pageParam }) =>
      getChatMessages(chatId!, pageParam as number),
    initialPageParam: 0,
    enabled: !!chatId,
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