import { Pagination } from "@heroui/react";

export default function HistoryPagination() {
  return (
    <div className="w-full flex items-center justify-between text-[14px] leading-[1.4] font-[400] text-gray-600">
      <p>Сторінка 1 з 5</p>
      <Pagination
        showControls
        initialPage={1}
        total={5}
        classNames={{
          //   wrapper: "w-[32px] h-[32px]",
          base: "px-1",
          item: "text-[12px] leading-[1] text-gray-600 font-[500] bg-background border-[1px] border-primary-300",
          cursor:
            "text-[12px] text-primary-700 bg-primary-100 border-[1px] border-primary-700 font-bold",
          prev: "bg-transparent text-primary-700",
          next: "bg-transparent text-primary-700",
        }}
      />
    </div>
  );
}
