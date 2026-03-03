"use client";

import { useRouter } from "next/navigation";
import PetEmptyIcon from "@/components/MyPet/PetEmptyIcon";
import PetsEmptyTitle from "@/components/MyPet/PetsEmptyTitle";
import MyPetsAddBtn from "@/components/MyPet/MyPetsAddBtn";

export default function MyPetsEmpty() {
  const router = useRouter();

  return (
    <>
      <h2 className="text-[18px] font-bold text-[#333f5d] mt-[24px] block md:hidden">
        Мої тварини
      </h2>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <PetEmptyIcon />
        <div className="flex flex-col w-full max-w-[441px] mx-auto">
          <PetsEmptyTitle />
          <MyPetsAddBtn
            onClick={() => router.push("/owner/pets/add-new-pet")}
          />
        </div>
      </div>
    </>
  );
}
