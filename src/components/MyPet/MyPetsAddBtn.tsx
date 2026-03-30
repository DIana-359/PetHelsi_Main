"use client";

import Icon from "@/components/Icon";

interface MyPetsAddBtnProps {
  className?: string;
  onClick?: () => void;
}

export default function MyPetsAddBtn({
  onClick,
  className,
}: MyPetsAddBtnProps) {
  return (
    <div className="flex flex-col items-center mb-4">
      <button
        onClick={onClick}
        className={
          className ??
          "flex w-full items-center justify-center lg:w-[216px] text-[14px] text-primary  gap-2 border-2 border-primary  rounded-[6px] px-6 py-2 bg-white  hover:bg-primary-50 hover:text-primary transition-colors font-[400] lg:cursor-pointer"
        }
      >
        <Icon
          sprite="/sprites/sprite-sistem.svg"
          id="icon-plus"
          width="20px"
          height="20px"
          className="stroke-current fill-none"
        />
        Додати тварину
      </button>
    </div>
  );
}
