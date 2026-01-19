import Link from "next/link";
import { IHistoryItem, StatusType } from "../../types/historyTypes";
import Image from "next/image";
import HistoryDetailsConsultation from "./HistoryDetailsConsultation";
import HistoryInfoMobile from "@/components/History/HistoryInfoMobile";
interface IHistoryCardProps {
  historyList: IHistoryItem[];
}

export default function HistoryCard({ historyList }: IHistoryCardProps) {
  const statusClasses: Record<StatusType, string> = {
    BOOKED:
      "bg-primary-500 text-background px-2 py-1 rounded w-[96px] justify-center",
    CANCELLED:
      "bg-gray-300 text-background px-2 py-1 rounded w-[96px] justify-center",
    COMPLETED:
      "bg-green-100 text-background px-2 py-1 rounded w-[96px] justify-center",
  };

  const statusLabels: Record<StatusType, string> = {
    BOOKED: "заплановано",
    CANCELLED: "відмінено",
    COMPLETED: "завершено",
  };

  return (
    <div className="mb-[24px]">
      <h3 className="text-[18px] leading-[1] font-[500] text-gray-900 pt-1 pb-4 border-b-[1px] border-b-primary-200 2xl:hidden">
        Історія прийомів
      </h3>

      {historyList.map((item: IHistoryItem) => {
        const truncatedReason =
          typeof item.complaint === "string" && item.complaint.length > 60
            ? item.complaint.slice(0, 60) + "..."
            : item.complaint || "";

        return (
          <Link
            key={item.appointmentSlotId}
            href={`history/consultation-info/${item.appointmentSlotId}`}>
            <ul
              className="relative pt-[68px] px-[12px] pb-[16px] 
             2xl:p-0 2xl:py-[24px] 2xl:px-[12px] 
             2xl:grid 2xl:grid-cols-[152px_104px_132px_96px_64px_88px_232px_24px] 
             2xl:gap-[6px] 
             border-b-[1px] border-primary-200 
             hover:bg-gray-100 transition-colors duration-300 
             rounded-[6px] cursor-pointer">
              <li className="flex items-center text-[14px] leading-[1.3] font-[400] text-gray-900">
                <div className="relative flex items-center gap-[16px] mb-[16px] 2xl:mb-0">
                  {item.patientAvatar &&
                  item.patientAvatar.startsWith("http") ? (
                    <Image
                      className="block rounded-full object-cover"
                      src={item.patientAvatar}
                      width={48}
                      height={48}
                      alt="pet"
                      priority
                    />
                  ) : (
                    <div className="w-[48px] h-[48px] p-[15px] bg-gray-300 flex items-center justify-center rounded-full text-[24px] leading-[1.5] font-[500] text-background">
                      {item.patientName?.slice(0, 1)}
                    </div>
                  )}
                  <div className="flex flex-col gap-1">
                    <span className="text-[14px] leading-[1] font-[400] text-gray-900">
                      {item.patientName}
                    </span>
                    <span className="2xl:hidden text-[14px] leading-[1] font-[400] text-gray-900">
                      {item.doctorShortName}
                    </span>
                  </div>
                </div>
              </li>

              <li className="flex items-center">
                <div
                  className={`absolute top-[24px] left-[12px] 2xl:static flex items-center py-[6px] text-[12px] leading-[1] font-[500] text-background ${
                    item.statusType ? statusClasses[item.statusType] : ""
                  }`}>
                  {item.statusType
                    ? statusLabels[item.statusType]
                    : "Не вказано"}
                </div>
              </li>
              <li className="hidden 2xl:flex items-center">
                <span className="text-[14px] leading-[1] font-[400] text-gray-900">
                  {item.doctorShortName}
                </span>
              </li>
              <li className="hidden text-[14px] font-[400] text-gray-900 2xl:flex items-center">
                {item.date}
              </li>
              <li className="hidden text-[14px] font-[400] text-gray-900 2xl:flex items-center">
                {item.time}
              </li>
              <li className="hidden text-[14px] font-[400] text-gray-900 2xl:flex items-center">
                {item.price} грн
              </li>
              <li className="2xl:hidden">
                <HistoryInfoMobile
                  date={item.date}
                  time={item.time}
                  price={item.price}
                />
              </li>
              <li className="flex items-center text-[14px] font-[400] text-gray-900">
                {truncatedReason}
              </li>
              <li className="flex items-center justify-center">
                <HistoryDetailsConsultation
                  id={`${item.appointmentSlotId}`}
                  historyItem={item}
                />
              </li>
            </ul>
          </Link>
        );
      })}
    </div>
  );
}
