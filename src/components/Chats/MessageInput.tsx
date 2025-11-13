"use client";
import { Chat } from "@/app/types/chatsTypes";
import Icon from "../Icon";
import { useState, useRef, useEffect } from "react";

interface ChatsProps {
  openChat: Chat;
}

export default function MessageInput({ openChat }: ChatsProps) {
  const { chat_id } = openChat;

  const draftsRef = useRef<{
    [chatId: string]: { text: string; height: number };
  }>({});
  const [textMessage, setTextMessage] = useState(
    draftsRef.current[chat_id]?.text || ""
  );
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const savedDraft = draftsRef.current[chat_id];
    setTextMessage(savedDraft?.text || "");
    if (textareaRef.current) {
      textareaRef.current.style.height = savedDraft?.height
        ? `${savedDraft.height}px`
        : "auto";
    }
  }, [chat_id]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setTextMessage(value);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const newHeight = Math.min(textareaRef.current.scrollHeight, 146);
      textareaRef.current.style.height = `${newHeight}px`;

      draftsRef.current[chat_id] = { text: value, height: newHeight };
    }
  };

  const handleSend = () => {
    if (!textMessage.trim()) return;

    draftsRef.current[chat_id] = { text: "", height: 32 };
    setTextMessage("");
    if (textareaRef.current) textareaRef.current.style.height = "32px";
  };

  return (
    <div className="md:py-[12px] md:pl-[32px] pr-0 w-full border-t-[1px] border-gray-100 flex items-end bg-background align-bottom min-h-[56px] max-h-[146px]">
      <button className="mr-[16px]">
        <Icon
          sprite="/sprites/sprite-sistem.svg"
          id="icon-plus"
          width="32px"
          height="32px"
          className="stroke-gray-700 fill-background hover:stroke-primary-700 transition-colors duration-300 cursor-pointer"
        />
      </button>

      <textarea
        ref={textareaRef}
        placeholder="Написати повідомлення..."
        value={textMessage}
        onChange={handleChange}
        rows={1}
        className="py-[7.5px] mr-[24px] w-full border-none outline-0 placeholder:font-lato placeholder:font-normal 
             placeholder:text-[14px] placeholder:leading-[100%] 
             placeholder:tracking-[0] placeholder:text-gray-500 text-[14px] leading-[1] font-[400] text-gray-900 bg-background min-h-[32px] max-h-[122px] scrollbar-none resize-none"></textarea>

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
