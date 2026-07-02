"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/components/Icon";
import { useUIStore } from "@/stores/useUIStore";
import clsx from "clsx";

export function NavItem(p: {
  category: string;
  alt?: string;
  text: string;
  icon: string;
  basePath?: string;
}) {
  const pathname = usePathname();
  const basePath = p.basePath ?? "/owner/";
  const isActive = pathname.includes(basePath + p.category);
  const setIsOpenModalDashboard = useUIStore(s => s.setIsOpenModalDashboard);

  return (
    <Link
      href={basePath + p.category}
      onClick={() => setIsOpenModalDashboard(false)}
      className={clsx(
        "group flex items-center justify-between gap-1 px-1 py-2 transform transition rounded-md duration-300 ease-in-out",
        isActive &&
          "md:border-r-[1px] rounded-r-none md:border-primary-700 md:mr-[-1px]"
      )}>
      <div className="flex justify-center items-center gap-[8px]">
        <Icon
          sprite="/sprites/sprite-sistem.svg"
          id={p.icon}
          width="24px"
          height="24px"
          className={clsx(
            "[--color1:currentColor] fill-background group-hover:stroke-primary-700 group-hover:text-primary-700 cursor-pointer transition-colors",
            isActive
              ? "stroke-primary-700 text-primary-700"
              : "stroke-gray-900 text-gray-900"
          )}
        />
        <p
          className={clsx(
            "text-[16px] font-[400] leading-[1.4] md:text-[18px] md:font-[500] group-hover:text-primary-700 transition-colors",
            isActive ? "text-primary-700" : "text-gray-900"
          )}>
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
