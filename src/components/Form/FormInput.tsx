"use client";

import { Input } from "@heroui/react";
import { Control, FieldValues, Path, useController } from "react-hook-form";

export const formLabelClass =
  "block text-[12px] font-[500] leading-[1.4] text-gray-700 mb-[8px]";

export const formInputClassNames = {
  inputWrapper:
    "bg-white border-[1px] border-primary-300 rounded-[12px] focus-within:border-primary-700 focus-within:ring-0 focus-within:ring-offset-0 focus-within:shadow-none",
  input:
    "text-[16px] font-[400] leading-[1.4] text-gray-900 placeholder:text-[14px] placeholder:font-[400] placeholder:leading-[1.4] placeholder:text-gray-400 outline-none",
  errorMessage: "text-[12px] font-[400] text-red-500",
};

interface FormInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  type?: string;
  isRequired?: boolean;
}

export function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  isRequired,
}: FormInputProps<T>) {
  const { field, fieldState } = useController({ control, name });

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={name} className={formLabelClass}>
          {label}
        </label>
      )}
      <Input
        id={name}
        name={field.name}
        ref={field.ref}
        value={(field.value as string) ?? ""}
        onChange={field.onChange}
        onBlur={field.onBlur}
        type={type}
        placeholder={placeholder}
        isRequired={isRequired}
        isInvalid={!!fieldState.error}
        errorMessage={fieldState.error?.message}
        classNames={formInputClassNames}
      />
    </div>
  );
}
