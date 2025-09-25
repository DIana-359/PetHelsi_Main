import Link from "next/link";
import Icon from "../Icon";
import { Button } from "@heroui/react";

export default function HistoryEmptyNotice() {
  return (
    <div className="w-full h-[calc(100vh-151px)] flex items-center justify-center">
      <div className="min-w-[216px] max-w-[441px] text-center">
        <Icon
          sprite="/sprites/sprite-sistem.svg"
          id="icon-Folder_del_light"
          width="128px"
          height="128px"
          className="block mx-auto mb-[24px] stroke-primary-300 fill-background custom-after"
        />
        <h3 className="text-[20px] md:text-[24px] font-[500] leading-[1.5] text-gray-900 mb-[8px]">
          В історії прийомів ще немає записів
        </h3>
        <p className="text-[16px] font-[400] leading-[1.4] text-gray-900 mb-[32px]">
          Тут буде відображатись уся інформація стосовно ваших онлайн
          консультацій
        </p>
        <Link href={"/owner/veterinarians"}>
          <Button className="bg-white text-primary border-[1px] border-primary-700 inline-flex justify-center text-[16px] py-3 px-13 lg:text-[18px] lg:w-[226px] lg:h-[48px] hover:text-background hover:bg-primary-700">
            До бази лікарів
          </Button>
        </Link>
      </div>
    </div>
  );
}
