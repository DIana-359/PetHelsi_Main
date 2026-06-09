import type { GetVetsParams } from "@/types/vetTypes";

/**
 * Central React Query key factory — single source of truth for query keys, so a
 * mutation and a query can't drift onto mismatched key shapes.
 *
 * Keys stay byte-identical to the previous inline arrays on purpose:
 * `useCachedChatMessages` compares `JSON.stringify(key)` to the cache queryHash
 * and `useChatSocket` reads `queryKey[1]`, so don't reorder existing elements —
 * only add new keys.
 */
export const queryKeys = {
  profile: ["profile"] as const,

  pets: {
    all: ["pets"] as const,
    detail: (petId: string) => ["pet", petId] as const,
  },

  chats: {
    all: ["chats"] as const,
  },

  chatMessages: {
    /** Broad key matching every chat's messages (used with `findAll`). */
    all: ["chatMessages"] as const,
    byChat: (chatId?: string) => ["chatMessages", chatId] as const,
  },

  vets: {
    byCriteria: (params: GetVetsParams) =>
      ["vetsByCriteria", params] as const,
    freeSlots: (vetId: string) => ["free-schedule-slots", vetId] as const,
    scheduleSlots: (vetId: string, date?: string) =>
      ["schedule-slots", vetId, date] as const,
  },
} as const;
