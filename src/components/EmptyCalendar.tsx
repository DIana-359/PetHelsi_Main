"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import clsx from "clsx";

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
  className,
}: EmptyCalendarProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onFindVet) {
      onFindVet();
    } else {
      router.push("/veterinarians");
    }
  };

  return (
    <section
      aria-label="Empty calendar"
      className={clsx(
        "flex flex-col items-center justify-center text-center",
        "rounded-2xl border border-gray-100 bg-white",
        "px-4 py-4",
        "lg:min-h-[371px] lg:px-10 lg:py-8",
        className
      )}
    >
      <Image
        src="/Calendar-empty.svg"
        alt=""
        aria-hidden="true"
        width={128}
        height={128}
        className="hidden lg:block mb-8"
      />
      <h2
        className={clsx(
          "font-medium text-[#333F5D]",
          "text-[18px] mb-2",
          "lg:text-[24px] lg:mb-2"
        )}
      >
        {title}
      </h2>
      <p
        className={clsx(
          "text-[#333F5D] font-normal",
          "text-[14px] mb-6",
          "lg:text-[16px] lg:mb-8",
          "whitespace-pre-line"
        )}
      >
        {description}
      </p>
      <button
        type="button"
        onClick={handleClick}
        className={clsx(
          "inline-flex items-center justify-center cursor-pointer",
          "h-12 w-full",
          "md:w-[216px]",
          "rounded-lg border border-primary",
          "text-primary text-[16px] font-medium",
          "transition-colors",
          "hover:bg-primary/5 hover:border-primary-600 hover:text-primary-700"
        )}
      >
        {ctaLabel}
      </button>
      <div className="flex mx-auto  flex-col justify-center items-center">
        <Image
          src="/Calendar-empty.svg"
          alt="calendar-empty"
          aria-hidden="true"
          className="hidden md:block md:mb-2 lg:w-[128px] lg:h-[128px] lg:block  lg:mb-8 "
          width={80}
          height={80}
        />
        <div>
          <h2 className="text-[18px]  text-[#333f5d]  font-medium mb-2 lg:text-[24px]">
            {title}
          </h2>
          <p
            lang="uk"
            className="text-[14px] text-[#333f5d] font-normal mb-6 whitespace-pre-line  md:mb-4 lg:mb-8 lg:text-[16px]"
          >
            <span className="md:hidden">
              У цього ветеринара немає вільних слотів.
              <br />
              Перевірте розклад пізніше або оберіть
              <br />
              іншого.
            </span>
            <span className="hidden  md:inline whitespace-normal">
              {description}
            </span>
          </p>
        </div>
        <button
          type="button"
          onClick={handleClick}
          className={[
            "inline-flex h-12 w-full items-center justify-center px-6 py-2 md:w-[216px] lg:w-[216px]",
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
