"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export type EmptyCalendarProps = {
  title?: string;
  description?: string;
  ctaLabel?: string;
  onFindVet?: () => void;
  className?: string;
};

export default function EmptyCalendar({
  title = "Запис зараз недоступний",
  description = "У цього ветеринара немає вільних слотів.\nПеревірте розклад пізніше або оберіть іншого.",
  ctaLabel = "Знайти ветеринара",
  onFindVet,
  className = "",
}: EmptyCalendarProps) {
  const router = useRouter();

  const handleClick = React.useCallback(() => {
    if (onFindVet) return onFindVet();
    router.push("/owner/veterinarians?page=0&size=10");
  }, [onFindVet, router]);
  return (
    <section
      className={[
        "grid h-[185px] mb-8",
        "rounded-2xl border border-gray-100 bg-white",
        "text-center lg:h-[371px] lg:w-[465px] lg:mt-[57px] lg:p-[10px] lg:mb-0",
        className,
      ].join(" ")}
      aria-label="Empty calendar"
    >
      <div className="flex mx-auto  flex-col justify-center items-center">
        <Image
          src="/Calendar-empty.svg"
          alt=""
          aria-hidden="true"
          className="hidden lg:block  lg:mb-8 "
          width={128}
          height={128}
        />
        <div>
          <h2 className="text-[18px] text-[#333f5d]  font-medium mb-2 lg:text-[24px]">
            {title}
          </h2>
          <p className="text-[14px] text-[#333f5d] font-normal mb-8 whitespace-pre-line lg:text-[16px]">
            {description}
          </p>
        </div>
        <button
          type="button"
          onClick={handleClick}
          className={[
            "inline-flex h-12 w-full items-center justify-center px-6 py-2 lg:w-[216px]",
            "rounded-lg border border-primary",
            "font-medium text-[16px] text-primary",
            "transition-colors duration-200",
            "hover:bg-primary/5 hover:border-primary-600 hover:text-primary-700",
          ].join(" ")}
        >
          {ctaLabel}
        </button>
      </div>
    </section>
  );
}
