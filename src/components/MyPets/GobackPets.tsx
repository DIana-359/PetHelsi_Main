"use client";
import React from "react";
import Icon from "../Icon";
import { useRouter } from "next/navigation";

const GoBackPets = () => {
  const router = useRouter();

  const backToPets = () => {
    router.push("/owner/pets");
  };

  return (
    <button onClick={backToPets} className="flex items-center gap-1 group">
      <Icon
        sprite="/sprites/sprite-sistem.svg"
        id="arrow-left"
        width="20px"
        height="20px"
        className="fill-background stroke-gray-500 group-hover:stroke-primary-700 cursor-pointer"
      />
      <span className="text-[12px] font-[400] leading-[1] text-gray-500 group-hover:text-primary-800 cursor-pointer group-hover:underline">
        Назад
      </span>
    </button>
  );
};

export default GoBackPets;
