import { useRouter } from "next/navigation";
import { IoEyeOutline } from "react-icons/io5";
import { IHistoryItem } from "@/app/types/historyTypes";
import Icon from "../Icon";
import DownloadPDFButton from "./DownloadPDFButton";

interface HistoryModalProps {
  historyItem: IHistoryItem;
  id: string;
}

export default function HistoryModal({ historyItem, id }: HistoryModalProps) {
  const router = useRouter();

  return (
    <ul className="w-[200px] flex flex-col px-[4px] py-[8px]">
      <li className="flex items-center gap-[8px] p-1 cursor-pointer group hover:bg-primary-100">
        <Icon
          sprite="/sprites/sprite-sistem.svg"
          id="icon-repeat"
          width="20px"
          height="20px"
          className="stroke-gray-900 fill-background group-hover:stroke-primary-700"
        />
        <span className="text-[14px] leading-[1] font-[400] text-gray-900 group-hover:text-primary-700">
          Записатися повторно
        </span>
      </li>
      <li
        className="p-1 cursor-pointer group hover:bg-primary-100 flex items-center gap-[8px]"
        onClick={() => router.push(`/owner/history/consultation-info/${id}`)}>
        <IoEyeOutline className="w-[20px] h-[20px] stroke-gray-900 text-gray-900 fill-background group-hover:stroke-primary-700" />
        <span className="text-[14px] leading-[1] font-[400] text-gray-900 group-hover:text-primary-700">
          Переглянути деталі
        </span>
      </li>
      <li
        onMouseDown={e => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
        }}
        className="flex items-center gap-[8px] p-1 cursor-pointer group hover:bg-primary-100">
        <DownloadPDFButton historyItem={historyItem} id={id} />
      </li>
      <li className="flex items-center gap-[8px] p-1 cursor-pointer group hover:bg-primary-100">
        <Icon
          sprite="/sprites/sprite-sistem.svg"
          id="icon-error"
          width="20px"
          height="20px"
          className="stroke-error-500 fill-background group-hover:stroke-error-900"
        />
        <span className="text-[14px] leading-[1] font-[400] text-error-500 group-hover:text-error-900">
          Скасувати прийом
        </span>
      </li>
    </ul>
  );
}
