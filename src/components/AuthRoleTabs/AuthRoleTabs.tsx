"use client";

import React from "react";
import clsx from "clsx";

type RoleType = "CLIENT" | "VET";
type RoleTypeWithEmpty = RoleType | null;

interface RoleTabsProps {
  selectedRole: RoleTypeWithEmpty;
  setSelectedRole: (role: RoleTypeWithEmpty) => void;
  tabError: boolean;
  setTabError: (value: boolean) => void;
  setIsVetBackground?: (value: boolean) => void;
}

export default function AuthRoleTabs({
  selectedRole,
  setSelectedRole,
  tabError,
  setTabError,
  setIsVetBackground,
}: RoleTabsProps) {
  const roles: { key: RoleType; label: string }[] = [
    { key: "CLIENT", label: "Я - власник тварини" },
    { key: "VET", label: "Я - ветеринар" },
  ];

  const handleClick = (role: RoleType) => {
    setSelectedRole(role);
    setTabError(false);
    setIsVetBackground?.(role === "VET");
  };

  return (
    <div className="relative ">
      <div className={"flex justify-between gap-[4px] bg-background"}>
        {roles.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => handleClick(key)}
            className={clsx(
              "flex-1 p-[8px] text-[14px] font-[400] leading-[100%] tracking-[0%]  text-center rounded-[6px] transition-colors cursor-pointer",
              selectedRole === key
                ? "border-[1px] border-primary-700 text-primary-700 bg-background"
                : "border-[1px] border-transparent text-gray-900 bg-background hover:border-primary-700 hover:text-primary-700"
            )}>
            {label}
          </button>
        ))}
      </div>

      {tabError && (
        <div className="text-[12px] text-error-500 mt-[4px] text-center">
          Будь ласка, оберіть варіант
        </div>
      )}
    </div>
  );
}
