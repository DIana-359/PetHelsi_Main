"use client";

import { Pet } from "@/types/pet";
import { Input, Select, SelectItem } from "@heroui/react";
import { DayPicker } from "react-day-picker";
import { uk } from "react-day-picker/locale";
import { Dispatch, SetStateAction } from "react";

const months = [
  { key: "1", label: "Січень" },
  { key: "2", label: "Лютий" },
  { key: "3", label: "Березень" },
  { key: "4", label: "Квітень" },
  { key: "5", label: "Травень" },
  { key: "6", label: "Червень" },
  { key: "7", label: "Липень" },
  { key: "8", label: "Серпень" },
  { key: "9", label: "Вересень" },
  { key: "10", label: "Жовтень" },
  { key: "11", label: "Листопад" },
  { key: "12", label: "Грудень" },
];

const years = Array.from({ length: 30 }, (_, i) => {
  const year = new Date().getFullYear() - i;
  return { key: year.toString(), label: year.toString() };
});

interface PetBirthDateFiledProps {
  newPet: Partial<Pet>;
  setNewPet: Dispatch<SetStateAction<Partial<Pet>>>;
  selected: Date | undefined;
  setSelected: Dispatch<SetStateAction<Date | undefined>>;
  isOpenCalendar: boolean;
  setIsOpenCalendar: Dispatch<SetStateAction<boolean>>;
  isBirthDateUnknown: boolean;
  setIsBirthDateUnknown: Dispatch<SetStateAction<boolean>>;
  birthMonth: string | undefined;
  setBirthMonth: Dispatch<SetStateAction<string | undefined>>;
  birthYear: string | undefined;
  setBirthYear: Dispatch<SetStateAction<string | undefined>>;
  getError: (field: string) => string | undefined;
  clearError: (field: string) => void;
}

export default function PetBirthDateFiled({
  newPet,
  setNewPet,
  selected,
  setSelected,
  isOpenCalendar,
  setIsOpenCalendar,
  isBirthDateUnknown,
  setIsBirthDateUnknown,
  birthMonth,
  setBirthMonth,
  birthYear,
  setBirthYear,
  getError,
  clearError,
}: PetBirthDateFiledProps) {
  const formatDateLocal = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const formatDateForInput = (date: Date) => {
    const d = String(date.getDate()).padStart(2, "0");
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const y = date.getFullYear();
    return `${d} / ${m} / ${y}`;
  };

  return (
    <div className="w-full md:w-[304px]">
      <label
        id="label-petBirth"
        htmlFor="petBirth"
        className="text-[12px] block mb-2 mt-4 font-medium text-gray-700"
      >
        Дата народження*
      </label>
      <div className="w-full relative">
        <Input
          name="petBirth"
          placeholder="ДД / ММ / РРРР"
          value={selected ? formatDateForInput(selected) : ""}
          variant="bordered"
          readOnly
          onClick={() => setIsOpenCalendar(!isOpenCalendar)}
          classNames={{
            input: `text-left text-[14px] focus:outline-none ${
              newPet.birthDate ? "text-gray-900" : "text-gray-350"
            } placeholder:text-gray-350`,
            inputWrapper: `border-primary-300 w-full rounded-[8px]  mb-4 ${
              getError("birthDate")
                ? "border-red-500"
                : "border-primary-300 hover:!border-primary data-[focus=true]:!border-primary focus:border-primary"
            }`,
          }}
        />
        {!isBirthDateUnknown && isOpenCalendar && (
          <div className=" w-[318px] bg-white border rounded p-[16px] border-none shadow-sm shadow-gray-300">
            <DayPicker
              mode="single"
              locale={uk}
              selected={selected}
              onSelect={(date) => {
                if (!date) return;

                const birthDate = formatDateLocal(date);

                setSelected(date);

                setNewPet({
                  ...newPet,
                  birthDate,
                });
                clearError("birthDate");
                setIsOpenCalendar(false);
              }}
              captionLayout="dropdown"
              classNames={{
                root: " bg-background",
                weekday: "p-[9px] hover:bg-blue-100 rounded-md",
                day_button: "p-[9px] hover:bg-blue-100 rounded-md",
                selected: "hover:hover:bg-blue-100",
                today: "text-primary-700",
                nav_button:
                  "text-gray-400 hover:text-gray-600 disabled:opacity-50",
                chevron: "fill-gray-500",
                caption_dropdowns: "flex gap-4 justify-center items-center",
                dropdown:
                  "px-2 py-2 rounded-lg border border-primary-300 bg-white text-gray-900 text-base font-medium focus:border-primary-700 focus:outline-none transition",
              }}
              styles={{
                caption_label: { display: "none" },
              }}
            />
          </div>
        )}
        <div className=" flex flex-col items-start gap-4">
          <div className="flex gap-3">
            <input
              type="checkbox"
              id="birthDateUnknown"
              className=" accent-primary w-4  h-4  rounded  border border-primary-300"
              checked={isBirthDateUnknown}
              onChange={(e) => {
                const checked = e.target.checked;
                setIsBirthDateUnknown(checked);

                if (checked) {
                  setSelected(undefined);
                  setNewPet({
                    ...newPet,
                    birthDate: undefined,
                  });
                  setIsOpenCalendar(false);
                  setBirthMonth(undefined);
                  setBirthYear(undefined);
                }
              }}
            />
            <label
              htmlFor="birthDateUnknown"
              className="text-[12px] text-gray-400 cursor-pointer mb-3"
            >
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
                      const month = Array.from(keys)[0]?.toString();
                      setBirthMonth(month);
                    }}
                    classNames={{
                      trigger:
                        "text-left mb-4  border border-primary-300 bg-white hover:!border-primary hover:!bg-white focus:!border-primary shadow-none data-[open=true]:!border-primary",
                      value: birthMonth ? "!text-gray-900" : "!text-gray-350 ",
                      selectorIcon: "text-[#1E88E5] w-6 h-6",
                      popoverContent:
                        "rounded-lg top-full !absolute left-0 mt-1",
                    }}
                    listboxProps={{
                      classNames: {
                        base: "max-h-44 overflow-y-auto scrollbar-thin scrollbar-thumb-[#C9E2F8] scrollbar-track-transparent scrollbar-thumb-rounded [&::-webkit-scrollbar]:w-[3px]",
                      },
                      itemClasses: {
                        base: "data-[selected=true]:!bg-primary-100 data-[selected=true]:!text-primary-700 hover:!bg-primary-20",
                      },
                    }}
                  >
                    {months.map((m) => (
                      <SelectItem key={m.key}>{m.label}</SelectItem>
                    ))}
                  </Select>
                </div>

                <div className="flex-1">
                  <Select
                    placeholder="PPPP"
                    selectedKeys={birthYear ? [birthYear] : []}
                    onSelectionChange={(keys) => {
                      const year = Array.from(keys)[0]?.toString();
                      setBirthYear(year);
                      if (year) {
                        clearError("birthYear");
                        clearError("birthDate");
                      }
                    }}
                    classNames={{
                      trigger: `text-left w-full border bg-white hover:!bg-white shadow-none mb-1 ${
                        getError("birthYear")
                          ? "border-red-500"
                          : "border-primary-300 hover:!border-primary focus:!border-primary"
                      }`,
                      value: birthYear ? "!text-gray-900" : "!text-gray-350",
                      selectorIcon: "text-[#1E88E5] w-6 h-6",
                      popoverContent:
                        "rounded-lg top-full !absolute left-0 mt-1",
                    }}
                    listboxProps={{
                      classNames: {
                        base: "max-h-44 overflow-y-auto scrollbar-thin scrollbar-thumb-[#C9E2F8] scrollbar-track-transparent scrollbar-thumb-rounded [&::-webkit-scrollbar]:w-[3px]",
                      },
                      itemClasses: {
                        base: "data-[selected=true]:!bg-primary-100 data-[selected=true]:!text-primary-700 hover:!bg-primary-200",
                      },
                    }}
                  >
                    {years.map((y) => (
                      <SelectItem key={y.key}>{y.label}</SelectItem>
                    ))}
                  </Select>
                  {getError("birthYear") && (
                    <span className="text-red-500 text-[12px]">
                      {getError("birthYear")}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => setIsOpenCalendar(!isOpenCalendar)}
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
