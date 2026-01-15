import { IHistoryItem } from "@/types/historyTypes";
import InputUpdateComplaint from "./InputUpdateComplaint";
import Icon from "../Icon";
interface Props {
  historyItem: IHistoryItem;
  setHistoryItem?: (value: IHistoryItem) => void;
  isOpenUpdatehistory?: boolean;
  setOpenUpdatehistory?: ((value: boolean) => void) | undefined;
}

export default function HistoryMedicalReport({
  historyItem,
  setHistoryItem,
  isOpenUpdatehistory,
  setOpenUpdatehistory,
}: Props) {
  return (
    <>
      <div className="pb-[24px] border-b-[1px] border-primary-200 w-full">
        <div className="flex items-start justify-between gap-2 ">
          <h3 className="text-[18px] leading-[1] font-[600] text-gray-900 mb-[16px]">
            Скарги/причина звернення
          </h3>
          {historyItem?.statusType === "BOOKED" && !isOpenUpdatehistory && (
            <button
              type="button"
              className="group flex items-center gap-[8px] cursor-pointer"
              onClick={() => setOpenUpdatehistory?.(true)}>
              <Icon
                sprite="/sprites/sprite-sistem.svg"
                id="icon-pensil"
                width="20px"
                height="20px"
                className="stroke-primary-700 fill-background group-hover:stroke-primary-900 transition-colors duration-300 pointer-events-none transform-gpu"
              />
              <span className="text-[14px] leading-[1] font-[400] text-primary-700 group-hover:text-primary-900 duration-300 transition-colors">
                Редагувати
              </span>
            </button>
          )}
        </div>

        {isOpenUpdatehistory ? (
          <InputUpdateComplaint
            complaint={historyItem?.complaint}
            setHistoryItem={setHistoryItem}
            setOpenUpdatehistory={setOpenUpdatehistory}
          />
        ) : (
          <p className="text-[14px] leading-[1.3] font-[400] text-gray-900 max-w-[576px]">
            {historyItem?.complaint ? (
              historyItem?.complaint
            ) : (
              <span className="text-[14px] leading-[1.3] font-[400] text-gray-500">
                Інформація відсутня
              </span>
            )}
          </p>
        )}
      </div>

      <h3 className="text-[18px] leading-[1] font-[600] text-gray-900 mb-[16px] pt-[24px]">
        Висновки після консультації
      </h3>

      {historyItem.conclusion ? (
        <ul key={historyItem.conclusion.id}>
          {[
            {
              label: "Встановлені діагнози",
              value: historyItem.conclusion.diagnosis,
              color: "text-gray-950",
            },
            {
              label: "Виписані рецепти",
              value: historyItem.conclusion.prescription,
              color: "text-gray-950",
            },
            {
              label: "Лікування",
              value: historyItem.conclusion.treatment,
              color: "text-gray-950",
            },
            {
              label: "Повторний огляд",
              value: historyItem.conclusion.nextVisit,
              color: "text-gray-950",
            },
          ].map(({ label, value, color }, i) => (
            <li key={i} className="mb-[16px]">
              <p className="text-[12px] leading-[1] font-[500] text-gray-500 mb-[4px]">
                {label}
              </p>
              <p className={`text-[14px] leading-[1.3] font-[400] ${color}`}>
                {value}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-[14px] leading-[1] font-[400] text-gray-500">
          Інформація відсутня
        </p>
      )}
    </>
  );
}
