import type { GetVetsParams } from "@/types/vetTypes";

/**
 * Centralised React Query key factory.
 *
 * Every `useQuery` / `useInfiniteQuery` / `invalidateQueries` / `setQueryData`
 * call should source its key from here instead of hand-writing string arrays.
 * This removes "magic string" drift — e.g. a mutation invalidating `["pets"]`
 * while a query reads `["pet"]` — and gives one place to see the whole cache
 * surface.
 *
 * IMPORTANT: the arrays returned here are byte-for-byte identical to the keys
 * previously written inline. Some consumers depend on the exact shape:
 * `useCachedChatMessages` compares `JSON.stringify(key)` against the cache's
 * `queryHash`, and `useChatSocket` reads `query.queryKey[1]`. Do not reorder or
 * rename existing elements — only add new keys.
 *
 * Convention: `all` is the broad key (used for invalidation / partial match),
 * factory functions return the specific key for a single entity.
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

  /** Paginated messages of a single chat (infinite query). */
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
