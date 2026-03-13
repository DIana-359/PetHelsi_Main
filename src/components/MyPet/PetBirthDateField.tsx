"use client";

import { Input, Select, SelectItem } from "@heroui/react";
import { DayPicker } from "react-day-picker";
import { uk } from "react-day-picker/locale";
import { useState, useMemo } from "react";
import {
  formatDateISO,
  formatDateDisplay,
} from "@/utils/formatDate.ts/formatDate";
import { MONTHS } from "@/contactMonths";

interface PetBirthDateFiledProps {
  value?: string;
  onChange: (value: string) => void;
  error?: string;
}

const years = Array.from({ length: 30 }, (_, i) => {
  const year = new Date().getFullYear() - i;
  return { key: year.toString(), label: year.toString() };
});

export default function PetBirthDateField({
  value,
  onChange,
  error,
}: PetBirthDateFiledProps) {
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const [isBirthDateUnknown, setIsBirthDateUnknown] = useState(false);
  const [birthMonth, setBirthMonth] = useState<string>();
  const [birthYear, setBirthYear] = useState<string>();

  const toggleCalendar = () => {
    setIsOpenCalendar((prev) => !prev);
  };

  const selected = useMemo(() => {
    if (!value) return undefined;

    const [yearStr, monthStr, dayStr] = value.split("-");
    const year = Number(yearStr);
    const month = Number(monthStr) - 1;
    const day = Number(dayStr);

    return new Date(year, month, day);
  }, [value]);

  const updateApproxDate = (month?: string, year?: string) => {
    if (!year) return;
    const val = month
      ? `${year}-${month.padStart(2, "0")}-01`
      : `${year}-01-01`;
    onChange(val);
  };

  const displayValue = useMemo(() => {
    if (isBirthDateUnknown) {
      if (birthYear) {
        const monthLabel = birthMonth
          ? MONTHS.find((m) => Number(m.key) === Number(birthMonth))?.label
          : undefined;
        return monthLabel ? `${monthLabel} / ${birthYear}` : birthYear;
      }
      return "";
    }
    if (value) {
      const date = new Date(value);
      return formatDateDisplay(date);
    }
    return "";
  }, [value, birthYear, birthMonth, isBirthDateUnknown]);

  return (
    <div className="w-full md:w-[304px]">
      <label className="text-[12px] block mb-2 mt-4 font-medium text-gray-700">
        Дата народження*
      </label>

      <div className="w-full relative">
        <Input
          placeholder="ДД / ММ / РРРР"
          value={displayValue}
          variant="bordered"
          readOnly
          onClick={toggleCalendar}
          classNames={{
            input: `text-left text-[14px] focus:outline-none ${
              displayValue ? "text-gray-900" : "text-gray-350"
            } placeholder:text-gray-350`,
            inputWrapper: `border-primary-300 hover:!border-primary focus:!border-primary w-full rounded-[8px]  ${
              error ? "border-red-500" : "border-primary-300"
            }`,
          }}
        />
        {error && !isBirthDateUnknown && (
          <span className="text-red-500 text-[12px] mt-1">{error}</span>
        )}

        {!isBirthDateUnknown && isOpenCalendar && (
          <div className="w-[318px] bg-white border rounded p-[16px] border-none shadow-sm shadow-gray-300">
            <DayPicker
              mode="single"
              locale={uk}
              selected={selected}
              onSelect={(date) => {
                if (!date) return;
                onChange(formatDateISO(date));
                setIsOpenCalendar(false);
              }}
              captionLayout="dropdown"
              disabled={{ after: new Date() }}
              classNames={{
                root: "bg-background",
                weekday: "p-[9px] hover:bg-blue-100 rounded-md",
                day_button: "p-[9px] hover:bg-blue-100 rounded-md",
                selected: "hover:hover:bg-blue-100",
                today: "text-primary-700",
                nav_button:
                  "text-gray-400 hover:text-gray-600 disabled:opacity-50",
                chevron: "fill-gray-500",
                caption_dropdowns: "flex gap-4 justify-center items-center",
                dropdown:
                  "px-2 py-2 rounded-[8px] border border-primary-300 bg-white text-gray-900 text-base font-medium focus:border-primary-700 focus:outline-none transition",
              }}
              styles={{ caption_label: { display: "none" } }}
            />
          </div>
        )}

        <div className="flex flex-col items-start mt-4 gap-4">
          <div className="flex gap-3">
            <input
              type="checkbox"
              className="accent-primary w-4 h-4 rounded border border-primary-300"
              checked={isBirthDateUnknown}
              onChange={(e) => {
                const checked = e.target.checked;
                setIsBirthDateUnknown(checked);
                if (checked) {
                  onChange("");
                  setIsOpenCalendar(false);
                }
              }}
            />
            <label className="text-[12px] text-gray-400 cursor-pointer mb-3">
              Я не пам’ятаю точної дати народження
            </label>
          </div>

          {isBirthDateUnknown && (
            <div className="flex w-full flex-col gap-3">
              <label className="text-[12px] font-[500] text-gray-700">
                Вказати приблизну дату. Рік обов’язковий.
              </label>

              <div className="flex w-full gap-2">
                <div className="flex-1">
                  <Select
                    placeholder="MM"
                    selectedKeys={birthMonth ? [birthMonth] : []}
                    onSelectionChange={(keys) => {
                      const month = [...keys][0]?.toString();
                      setBirthMonth(month);
                      updateApproxDate(month, birthYear);
                    }}
                    classNames={{
                      trigger:
                        "text-left w-full border rounded-[8px] border-primary-300 bg-white hover:!border-primary hover:!bg-white focus:!border-primary focus:bg-white",
                      value: birthMonth ? "!text-gray-900" : "!text-gray-350",
                      selectorIcon: "text-[#1E88E5] w-6 h-6",
                    }}
                  >
                    {MONTHS.map((m) => (
                      <SelectItem key={m.key}>{m.label}</SelectItem>
                    ))}
                  </Select>
                </div>

                <div className="flex-1">
                  <Select
                    placeholder="PPPP"
                    selectedKeys={birthYear ? [birthYear] : []}
                    onSelectionChange={(keys) => {
                      const year = [...keys][0]?.toString();
                      setBirthYear(year);
                      updateApproxDate(birthMonth, year);
                    }}
                    classNames={{
                      trigger: `text-left w-full rounded-lg border bg-white ${
                        error ? "border-red-500" : "border-primary-300"
                      } hover:!border-primary hover:!bg-white focus:!border-primary`,
                      value: birthYear ? "!text-gray-900" : "!text-gray-350",
                      selectorIcon: "text-[#1E88E5] w-6 h-6",
                    }}
                  >
                    {years.map((y) => (
                      <SelectItem key={y.key}>{y.label}</SelectItem>
                    ))}
                  </Select>

                  {error && (
                    <span className="text-red-500 text-[12px]">{error}</span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={toggleCalendar}
          className="absolute right-2 top-14 -translate-y-2/1 cursor-pointer"
        >
          <svg
            width="24"
            height="24"
            className="stroke-primary-700 fill-background hover:stroke-primary-900 transition-colors duration-300 pointer-events-none"
          >
            <use href="/sprites/sprite-sistem.svg#icon-calendar" />
          </svg>
        </button>
      </div>
    </div>
  );
}
