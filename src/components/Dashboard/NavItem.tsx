"use client";
import { Category, CategoryValue } from "@/types/ownerTypes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "../Icon";
import { useSistem } from "@/contextSistem/contextSistem";

export function NavItem(p: {
  category: keyof typeof Category;
  alt: keyof typeof Category;
  text: CategoryValue;
  icon: string;
}) {
  const pathname = usePathname();
  const isActive = pathname.includes("/owner/" + p.category);
  const { setIsOpenModalDashboard } = useSistem();

  return (
    <Link
      href={"/owner/" + p.category}
      onClick={() => setIsOpenModalDashboard(false)}
      className={`group flex items-center justify-between gap-1 px-1 py-2 hover:bg-slate-100 
      transform transition rounded-md duration-300 ease-in-out 
      ${
        isActive &&
        "bg-primary-100 md:border-r-[1px] rounded-r-none md:border-primary-700 md:mr-[-1px]"
      }`}>
      <div className="flex justify-center items-center gap-[8px]">
        <Icon
          sprite="/sprites/sprite-sistem.svg"
          id={p.icon}
          width="24px"
          height="24px"
          className="stroke-gray-900 fill-background group-hover:stroke-primary-700 cursor-pointer transition-colors"
        />
        <p className="text-[16px] font-[400] leading-[1.4] md:text-[18px] md:font-[500] text-gray-900 group-hover:text-primary-700 transition-colors">
          {p.text}
        </p>
      </div>

      <Icon
        sprite="/sprites/sprite-sistem.svg"
        id="arrow-rigth"
        width="24px"
        height="24px"
        className="stroke-gray-900 group-hover:stroke-primary-700 cursor-pointer transition-colors md:hidden"
      />
    </Link>
  );
}
