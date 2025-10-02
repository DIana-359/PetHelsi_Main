"use client";
import React from "react";
import clsx from "clsx";
interface AuthInputProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | null;
  rightIcon?: React.ReactNode;
}

export default function AuthInput({
  id,
  label,
  type = "text",
  value,
  placeholder,
  onChange,
  error,
  rightIcon,
}: AuthInputProps) {
  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="block text-[12px] font-[500] leading-[1.4] text-gray-700 mb-[8px]">
        {label}
      </label>
      <div className="relative">
        <input
          required
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={clsx(
            "w-full px-[12px] py-[10px] bg-background border-[1px] rounded-[12px]",
            "text-[14px] font-[400] leading-[1.4] text-gray-900",
            "placeholder:text-[14px] placeholder:font-[400] placeholder:leading-[1.4] placeholder:text-gray-400",
            "outline-none",
            error ? "border-error-500" : "border-primary-300"
          )}
        />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightIcon}
          </div>
        )}
      </div>
      {error && (
        <p className="text-[12px] font-[400] text-red-500 mt-2">{error}</p>
      )}
    </div>
  );
}
