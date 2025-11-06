"use client";
import { Chat } from "@/app/types/chatsTypes";
import Icon from "../Icon";
import { useState, useRef, useEffect } from "react";

interface ChatsProps {
  openChat: Chat;
}

export default function MessageInput({ openChat }: ChatsProps) {
  const { chat_id } = openChat;
  const draftsRef = useRef<{ [chatId: string]: string }>({});
  const [textMessage, setTextMessage] = useState(
    draftsRef.current[chat_id] || ""
  );

  useEffect(() => {
    setTextMessage(draftsRef.current[chat_id] || "");
  }, [chat_id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTextMessage(value);
    draftsRef.current[chat_id] = value;
  };

  const handleSend = () => {
    if (!textMessage.trim()) return;
    console.log("Отправка", chat_id, ":", textMessage);

    draftsRef.current[chat_id] = "";
    setTextMessage("");
  };

  return (
    <div className="mb-[-32px] py-[12px] pl-[32px] pr-0 w-full border-t-[1px] border-gray-100 flex items-center bg-background">
      <button className="mr-[16px]">
        <Icon
          sprite="/sprites/sprite-sistem.svg"
          id="icon-plus"
          width="32px"
          height="32px"
          className="stroke-gray-700 fill-background hover:stroke-primary-700 transition-colors duration-300 cursor-pointer"
        />
      </button>
      <input
        type="text"
        placeholder="Написати повідомлення..."
        value={textMessage}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          handleChange(e);
        }}
        className="mr-[24px] w-full border-none outline-0 placeholder:font-lato placeholder:font-normal 
             placeholder:text-[14px] placeholder:leading-[100%] 
             placeholder:tracking-[0] placeholder:text-gray-500 text-[14px] leading-[1] font-[400] text-gray-900 bg-background"></input>
      <button type="button" onClick={handleSend}>
        <Icon
          sprite="/sprites/sprite-sistem.svg"
          id="icon-send"
          width="32px"
          height="32px"
          className="stroke-gray-700 fill-background hover:stroke-primary-700 transition-colors duration-300 cursor-pointer"
        />
      </button>
    </div>
  );
}
