import Image from "next/image";
import DownloadPDFButton from "../History/DownloadPDFButton";
import { IHistoryItem } from "@/types/historyTypes";

interface Props {
  historyItem: IHistoryItem;
  id: string;
}

export default function HistoryConsultationHeader({ historyItem }: Props) {
  const statusTranslations: Record<string, string> = {
    CANCELLED: "Відмінено",
    BOOKED: "Заплановано",
    COMPLETED: "Завершено",
  };

  const getTranslatedStatus = (status?: string): string => {
    return statusTranslations[status || ""] ?? "Не вказано";
  };

  const infoList = [
    { label: "Пацієнт", value: historyItem?.patientName ?? "Не вказано" },
    { label: "Ветеринар", value: historyItem?.doctorShortName ?? "Не вказано" },
    { label: "Дата", value: historyItem?.date ?? "Не вказано" },
    { label: "Час", value: historyItem?.time ?? "Не вказано" },
    { label: "Вартість", value: historyItem?.price ?? "Не вказано" },
    {
      label: "Статус",
      value: getTranslatedStatus(historyItem?.statusType) ?? "Не вказано",
      isStatus: true,
    },
  ];

  const getStatusDotColor = (status: string) => {
    const lowerStatus = status.toLowerCase();
    switch (lowerStatus) {
      case "відмінено":
        return "bg-error-350";
      case "заплановано":
        return "bg-primary-500";
      case "завершено":
        return "bg-green-100";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <div className="relative">
      <div className="flex w-full items-center justify-between gap-1 py-[8px] px-[6px] mb-[24px] 2xl:mb-[16px]">
        <h3 className="text-[18px] leading-[1] font-[600] text-gray-900">
          Загальна інформація прийому
        </h3>
        <div className="absolute top-[95px] right-0 sm:relative sm:top-0">
          <DownloadPDFButton historyItem={historyItem} />
        </div>
      </div>

      <div className="flex flex-col items-start lg:flex-row lg:items-center gap-[24px] 2xl:gap-[40px] pb-[24px] border-b-[1px] border-primary-200 mb-[24px]">
        {historyItem.patientAvatar &&
        historyItem.patientAvatar.startsWith("http") ? (
          <Image
            className="rounded-full object-cover"
            src={historyItem?.patientAvatar}
            width={104}
            height={104}
            alt="photo"
            priority
          />
        ) : (
          <div className="flex-shrink-0 w-[104px] h-[104px] box-border bg-gray-300 flex items-center justify-center rounded-full text-background">
            <p className="text-[24px] leading-[1] font-[500]">
              {historyItem.patientName?.slice(0, 1)}
            </p>
          </div>
        )}

        <ul className="flex flex-row gap-[24px] gap-y-[16px] 2xl:gap-y-[24px] flex-wrap">
          {infoList.map((info, index) => (
            <li key={index} className="w-[155px] sm:w-[216px]">
              <p className="font-[500] text-[12px] leading-[1] text-gray-500 mb-1">
                {info.label}
              </p>
              <p className="font-[400] text-[14px] leading-[1] text-gray-950 flex items-center">
                {info.isStatus && (
                  <span
                    className={`inline-block w-[14px] h-[14px] rounded-full mr-[8px] ${getStatusDotColor(
                      info.value
                    )}`}></span>
                )}
                {info.value}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
