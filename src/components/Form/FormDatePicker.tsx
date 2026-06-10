"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { uk } from "react-day-picker/locale";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import { formLabelClass } from "./FormInput";

function toDate(value?: string): Date | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  return isNaN(date.getTime()) ? undefined : date;
}

/** Local `YYYY-MM-DD`, so the stored value matches the day the user picked. */
function toISODate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

interface FormDatePickerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
}

export function FormDatePicker<T extends FieldValues>({
  control,
  name,
  label,
  placeholder = "ДД/ММ/РРРР",
}: FormDatePickerProps<T>) {
  const { field } = useController({ control, name });
  const [isOpen, setIsOpen] = useState(false);
  const selected = toDate(field.value as string | undefined);

  return (
    <div className="w-full relative">
      {label && (
        <label htmlFor={name} className={formLabelClass}>
          {label}
        </label>
      )}
      <input
        id={name}
        name={field.name}
        placeholder={placeholder}
        value={selected ? selected.toLocaleDateString() : ""}
        readOnly
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full border-[1px] border-primary-300 rounded-[12px] px-2 py-[13px] focus:outline-none focus:border-primary-500 text-[16px] font-[500] leading-[1.4] text-gray-950"
      />
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="absolute right-2 bottom-[13px] cursor-pointer"
      >
        <svg
          width="24"
          height="24"
          className="stroke-primary-700 fill-background hover:stroke-primary-900 transition-colors duration-300 pointer-events-none"
        >
          <use href="/sprites/sprite-sistem.svg#icon-calendar" />
        </svg>
      </button>

      {isOpen && (
        <div className="z-99910 w-[318px] absolute top-[82px] bg-white border rounded p-[16px] border-none shadow-sm shadow-gray-300">
          <DayPicker
            mode="single"
            ISOWeek
            locale={uk}
            selected={selected}
            onSelect={(date) => {
              field.onChange(date ? toISODate(date) : "");
              setIsOpen(false);
            }}
            captionLayout="dropdown"
            classNames={{
              root: "z-10 bg-background",
              weekday: "p-[9px] hover:bg-blue-100 rounded-md",
              day_button: "p-[9px] hover:bg-blue-100 rounded-md",
              selected: "hover:hover:bg-blue-100",
              today: "text-primary-700",
              nav_button: "text-gray-400 hover:text-gray-600 disabled:opacity-50",
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
    </div>
  );
}
