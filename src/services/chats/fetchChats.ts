import { Chat } from "@/types/chatsTypes";
import { apiFetch } from "@/lib/apiFetch.client";

export async function fetchChats(): Promise<Chat[]> {
  const res = await apiFetch("/api/chats");

  if (!res.ok) {
    throw new Error("Failed to load chats");
  }

  return res.json();
}