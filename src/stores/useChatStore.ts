import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Message } from "@/types/chatsTypes";

export type ConnectionStatus =
  | "idle"
  | "connecting"
  | "connected"
  | "reconnecting"
  | "failed";

export interface PendingPayload {
  chatId: string;
  recipientId: number;
  content: string;
  clientMessageId: string;
}

interface ChatStore {
  pendingMessages: Message[];
  pendingPayloads: Record<string, PendingPayload>;
  connectionStatus: ConnectionStatus;

  addPending: (message: Message, payload: PendingPayload) => void;
  markSent: (clientMessageId: string) => void;
  markFailed: (clientMessageId: string) => void;
  removePending: (clientMessageId: string) => void;
  getPayload: (clientMessageId: string) => PendingPayload | undefined;
  findPayloadByContent: (chatId: string, content: string) => PendingPayload | undefined;
  setConnectionStatus: (status: ConnectionStatus) => void;
  markUnsentAsFailed: () => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      pendingMessages: [],
      pendingPayloads: {},
      connectionStatus: "idle",

      addPending: (message, payload) =>
        set(state => ({
          pendingMessages: [...state.pendingMessages, message],
          pendingPayloads: {
            ...state.pendingPayloads,
            [payload.clientMessageId]: payload,
          },
        })),

      markSent: clientMessageId =>
        set(state => ({
          pendingMessages: state.pendingMessages.map(m =>
            m.clientMessageId === clientMessageId
              ? { ...m, status: "SENT" as const }
              : m
          ),
        })),

      markFailed: clientMessageId =>
        set(state => ({
          pendingMessages: state.pendingMessages.map(m =>
            m.clientMessageId === clientMessageId
              ? { ...m, status: "FAILED" as const }
              : m
          ),
        })),

      removePending: clientMessageId =>
        set(state => {
          const nextPayloads = { ...state.pendingPayloads };
          delete nextPayloads[clientMessageId];
          return {
            pendingMessages: state.pendingMessages.filter(
              m => m.clientMessageId !== clientMessageId
            ),
            pendingPayloads: nextPayloads,
          };
        }),

      getPayload: clientMessageId =>
        get().pendingPayloads[clientMessageId],

      findPayloadByContent: (chatId, content) => {
        const payloads = get().pendingPayloads;
        for (const payload of Object.values(payloads)) {
          if (payload.chatId === chatId && payload.content === content) {
            return payload;
          }
        }
        return undefined;
      },

      setConnectionStatus: status => set({ connectionStatus: status }),

      markUnsentAsFailed: () =>
        set(state => ({
          pendingMessages: state.pendingMessages.map(m =>
            m.status === "SENT" ? { ...m, status: "FAILED" as const } : m
          ),
        })),
    }),
    {
      name: "chat_pending_messages",
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({
        pendingMessages: state.pendingMessages,
        pendingPayloads: state.pendingPayloads,
      }),
    }
  )
);
