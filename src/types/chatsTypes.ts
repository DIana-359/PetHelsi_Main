export type Chat = {
  chatId: string;
  senderId: number;
  recipientId: number;
  senderName: string;
  recipientName: string;
};

export type MessageStatus = "SENT" | "DELIVERED" | "READ";

export type Message = {
  chatId: string;
  messageId: string;
  senderId: number;
  recipientId: number;
  senderEmail: string;
  recipientEmail: string;
  content: string;
  timestamp: string;
  status: "SENT" | "DELIVERED" | "READ";
  clientMessageId?: string;
};

export type PaginatedMessagesResponse = {
  content: Message[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
};
