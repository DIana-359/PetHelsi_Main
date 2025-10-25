"use client";
import { Chat } from "@/app/types/chatsTypes";
import Icon from "../Icon";
import { useState } from "react";

interface ChatsProps {
  openChat: Chat;
}

export default function MessageInput({ openChat }: ChatsProps) {
  const { chat_id } = openChat;
  console.log(openChat, chat_id);
  const [textMessage, setTextMessage] = useState<string>("fgfg");

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
        onChange={() => {
          setTextMessage(textMessage);
        }}
        className="mr-[24px] w-full border-none outline-0 placeholder:font-lato placeholder:font-normal 
             placeholder:text-[14px] placeholder:leading-[100%] 
             placeholder:tracking-[0] placeholder:text-gray-500 text-[14px] leading-[1] font-[400] text-gray-900 bg-background"></input>
      <button>
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
