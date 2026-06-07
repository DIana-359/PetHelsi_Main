import type { Message, PaginatedMessagesResponse } from "@/types/chatsTypes";

export function mergeMessages(
  pages: PaginatedMessagesResponse[] | undefined,
  pendingMessages: Message[],
  chatId: string
): Message[] {
  const serverMsgs = pages ? [...pages].reverse().flatMap(p => p.content) : [];

  const seen = new Set<string>();
  const deduped = serverMsgs.filter(msg => {
    if (seen.has(msg.messageId)) return false;
    seen.add(msg.messageId);
    return true;
  });

  const chatPending = pendingMessages.filter(m => m.chatId === chatId);
  return [...deduped, ...chatPending];
}
