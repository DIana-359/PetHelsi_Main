"use client";

import { useGetPets } from "@/hooks/pets/useGetPets";
import MyPetsEmpty from "@/components/MyPet/MyPetsEmpty";

import { Pulse } from "@/components/Pulse";

export default function OwnerPetsContent() {
  const { isLoading } = useGetPets();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        <Pulse />
      </div>
    );
  }

  return (
    <>
      <MyPetsEmpty />
    </>
  );
}
