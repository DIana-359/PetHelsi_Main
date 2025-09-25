import Link from "next/link";
import Icon from "../Icon";

export default function ChatsNotFound() {
  return (
    <div className="flex items-center justify-center w-full h-[calc(100vh-151px)]">
      <div className="bg-background w-full md:w-[560px] flex flex-col items-center pt-[16px] pb-[24px] md:pt-[17px] md:pb-[56px] px-[16px] md:px-[59px]">
        <Icon
          sprite="/sprites/sprite-sistem.svg"
          id="icon-chats"
          width="95px"
          height="93px"
          className="stroke-primary-300 fill-background stroke-1 mb-[24px]"
        />
        <h3 className="text-[20px] md:text-[24px] font-[500] leading-[1] text-gray-900 mb-[8px] text-center">
          Повідомлень ще немає...
        </h3>
        <p className="text-[16px] font-[400] leading-[1.1] text-gray-900 mb-[32px] text-center max-w-[441px]">
          Тут буде відображатись уся інформація стосовно ваших
          онлайн-консультацій
        </p>
        <Link
          href="/owner/veterinarians"
          className="flex items-center gap-2 border rounded-md border-primary-700 py-[16px] px-[24px] hover:bg-primary-200 active:scale-95 text-primary text-[16px] font-[400] leading-[1]transition-transform duration-300 ease-in-out cursor-pointer">
          Знайти ветеринара
        </Link>
      </div>
    </div>
  );
}
