import { Chat } from "@/app/types/chatsTypes";
import clsx from "clsx";

interface ChatsProps {
  openChat: Chat;
}

export default function ChatsMessage({ openChat }: ChatsProps) {
  const { last_login_date, dialogs } = openChat;

  return (
    <div className="p-[16px] md:p-[24px] md:pr-0 mb-[8px]">
      <p className="text-center text-[12px] leading-[1] font-[500] text-gray-500 mb-[8px]">
        {last_login_date.slice(5)}
      </p>
      <ul className="flex flex-col">
        {dialogs.map(elem => (
          <li
            key={elem.id}
            className={clsx(
              "mb-[8px] min-w-[343px] max-w-[438px]",
              elem.sender_type === "VET" ? "self-start" : "self-end"
            )}>
            <p
              className={clsx(
                "p-[12px] rounded-[8px] font-normal text-[14px] leading-[110%] tracking-[0%] text-gray-900 mb-[8px]",
                elem.sender_type === "VET" ? "bg-gray-450" : "bg-primary-300"
              )}>
              {elem.message}
            </p>
            <p
              className={clsx(
                "text-[12px] leading-[1] font-[500] text-gray-700",
                elem.sender_type === "VET" ? "text-left" : "text-right"
              )}>
              {elem.datetime.slice(11, 16)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
