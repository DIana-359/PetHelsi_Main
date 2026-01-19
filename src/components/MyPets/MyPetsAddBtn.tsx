"use client";

import { Pet } from "@/types/pet";
import { useRouter } from "next/navigation";
import Icon from "../Icon";

interface MyPetsAddBtnProps {
  handleAddPet: (pet: Partial<Pet>, imageFile?: File) => Promise<void>;
  className?: string;
  onClick?: () => void;
}

export default function MypetsAddBtn({ className }: MyPetsAddBtnProps) {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/owner/pets/add-new-pet");
  };

  return (
    <div className="mb-4">
      <button
        onClick={handleButtonClick}
        className={
          className ??
          "flex w-full items-center justify-center text-[14px] text-white  gap-2 border-2 border-primary  rounded-[6px] px-6 py-2 hover:bg-primary-50 hover:text-primary transition-colors font-[400]"
        }
      >
        <Icon
          sprite="/sprites/sprite-sistem.svg"
          id="icon-plus"
          width="20px"
          height="20px"
          className="stroke-current fill-none"
        />
        Додати тварину
      </button>
    </div>
  );
}
