import { useEffect, useState } from "react";
import { useQueryClient, InfiniteData } from "@tanstack/react-query";
import { PaginatedMessagesResponse } from "@/types/chatsTypes";

export function useCachedChatMessages(chatId: string) {
  const queryClient = useQueryClient();

  const [data, setData] = useState<InfiniteData<PaginatedMessagesResponse> | undefined>(
    () => queryClient.getQueryData(["chatMessages", chatId])
  );

  useEffect(() => {
    const queryKey = ["chatMessages", chatId];
    const queryHash = JSON.stringify(queryKey);

    setData(queryClient.getQueryData(queryKey));

    const unsubscribe = queryClient.getQueryCache().subscribe(event => {
      if (event.query.queryHash === queryHash && event.type === "updated") {
        setData(queryClient.getQueryData<InfiniteData<PaginatedMessagesResponse>>(queryKey));
      }
    });

    return unsubscribe;
  }, [chatId, queryClient]);

  return data;
}