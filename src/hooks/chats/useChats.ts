import { useQuery } from "@tanstack/react-query";
import { fetchChats } from "@/services/chats/fetchChats";

export function useChatsQuery() {
  return useQuery({
    queryKey: ["chats"],
    queryFn: fetchChats,
    retry: false,
  });
}