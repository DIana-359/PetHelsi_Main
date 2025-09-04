export default function HistoryInfoMobile({ date, time, price }) {
  return (
    <div className="flex flex-row items-center gap-[44px] pb-[16px] border-b-[1px] border-primary-200 mb-[12px]">
      <div className="flex flex-col gap-[4px]">
        <span className="block 2xl:hidden text-[12px] font-[500] text-gray-600">
          Дата:
        </span>
        <span className="text-[14px] font-[400] text-gray-900">{date}</span>
      </div>

      <div className="flex flex-col gap-[4px]">
        <span className="block 2xl:hidden text-[12px] font-[500] text-gray-600">
          Час:
        </span>
        <span className="text-[14px] font-[400] text-gray-900">{time}</span>
      </div>

      <div className="flex flex-col gap-[4px]">
        <span className="block 2xl:hidden text-[12px] font-[500] text-gray-600">
          Вартість:
        </span>
        <span className="text-[14px] font-[400] text-gray-900">
          {price} грн
        </span>
      </div>
    </div>
  );
}
