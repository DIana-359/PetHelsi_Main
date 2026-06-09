import { useQuery } from "@tanstack/react-query";
import { fetchChats } from "@/services/chats/fetchChats";
import { queryKeys } from "@/lib/queryKeys";

export function useChatsQuery() {
  return useQuery({
    queryKey: queryKeys.chats.all,
    queryFn: fetchChats,
    retry: false,
  });
}