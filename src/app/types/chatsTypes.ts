export interface VetDialog {
  id: number;
  sender_type: "VET";
  sender_name: string;
  message: string;
  datetime: string;
}

export interface ClientDialog {
  id: number;
  sender_type: "CLIENT";
  client_name: string;
  message: string;
  datetime: string;
}

export type Dialog = VetDialog | ClientDialog;

export interface Chat {
  chat_id: number;
  vet_full_name: string;
  last_login_date: string;
  admin_message: string;
  dialogs: Dialog[];
}

export interface ChatsResponse {
  chats: Chat[];
}
