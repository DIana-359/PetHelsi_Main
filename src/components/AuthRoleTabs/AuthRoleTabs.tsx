"use client";

import React from "react";
import { Tabs, Tab } from "@heroui/tabs";

type RoleType = "CLIENT" | "VET";

interface RoleTabsProps {
  selectedRole: RoleType | "";
  setSelectedRole: (role: RoleType | "") => void;
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
  return (
    <div className="relative block mx-auto">
      <Tabs
        className="!bg-background !rounded-[18px]"
        classNames={{
          tabList: `!flex !items-center !justify-between bg-background border-[1px] ${
            tabError ? "border border-red-500 rounded-[8px]" : "border-0"
          }`,
        }}
        fullWidth
        aria-label="Tabs form"
        selectedKey={selectedRole}
        onSelectionChange={key => {
          const role = key as RoleType | "";
          setSelectedRole(role);
          setTabError(false);
          if (setIsVetBackground) setIsVetBackground(role === "VET");
        }}>
        <Tab
          key="CLIENT"
          title={
            <span
              className={`text-[12px] xs:text-[14px] font-[400] leading-[1.4] ${
                selectedRole === "CLIENT" ? "text-primary-700" : "text-gray-900"
              }`}>
              Я - власник тварини
            </span>
          }
          className={`!bg-background border-[1px] ${
            selectedRole === "CLIENT"
              ? "border-primary-700"
              : "border-transparent"
          } !opacity-100`}
        />

        <Tab
          key="VET"
          title={
            <span
              className={`text-[12px] xs:text-[14px] font-[400] leading-[1.4] ${
                selectedRole === "VET" ? "text-primary-700" : "text-gray-900"
              }`}>
              Я - ветеринар
            </span>
          }
          className={`!bg-background border-[1px] ${
            selectedRole === "VET" ? "border-primary-700" : "border-transparent"
          } !opacity-100`}
        />
      </Tabs>

      {tabError && (
        <div className="text-[12px] text-error-500 t-1 r-0 absolute">
          Будь ласка, оберіть варіант
        </div>
      )}
    </div>
  );
}
