import { PaginatedMessagesResponse } from "@/types/chatsTypes";
import { apiFetch } from "@/lib/apiFetch.client";

export async function getChatMessages(
  chatId: string,
  page: number
): Promise<PaginatedMessagesResponse> {
  const res = await apiFetch(`/api/chats/${chatId}/messages?page=${page}&size=50`);

  if (!res.ok) {
    throw new Error("Failed to load messages");
  }

  return res.json();
}