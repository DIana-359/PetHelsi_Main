"use client";

import { Select, SelectItem } from "@heroui/react";
import clsx from "clsx";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import { formLabelClass } from "./FormInput";

interface SelectOption {
  key: string;
  value: string;
}

interface FormSelectProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  options: SelectOption[];
  label?: string;
  placeholder?: string;
}

/** HeroUI single-select wired to react-hook-form via `control` + `name`. */
export function FormSelect<T extends FieldValues>({
  control,
  name,
  options,
  label,
  placeholder,
}: FormSelectProps<T>) {
  const { field, fieldState } = useController({ control, name });
  const value = field.value as string | undefined;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={name} className={formLabelClass}>
          {label}
        </label>
      )}
      <Select
        variant="bordered"
        radius="sm"
        placeholder={placeholder}
        selectedKeys={value ? new Set([value]) : new Set()}
        onSelectionChange={(keys) =>
          field.onChange(Array.from(keys)[0] ?? "")
        }
        onClose={field.onBlur}
        isInvalid={!!fieldState.error}
        errorMessage={fieldState.error?.message}
        classNames={{
          trigger: clsx(
            "border w-full hover:!border-primary focus:!border-primary shadow-none data-[open=true]:!border-primary",
            {
              "border-red-500": fieldState.error,
              "border-primary-300": !fieldState.error,
            },
          ),
          errorMessage: "text-[12px] font-[400] text-red-500",
        }}
      >
        {options.map((option) => (
          <SelectItem key={option.key}>{option.value}</SelectItem>
        ))}
      </Select>
    </div>
  );
}
