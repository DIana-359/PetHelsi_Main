"use client";

import { useRouter } from "next/navigation";
import { useGetPets } from "@/hooks/pets/useGetPets";
import MyPetsEmpty from "@/components/MyPet/MyPetsEmpty";
import PetProfile from "@/components/MyPet/PetProfile";
// import { Pulse } from "@/components/Pulse";

export default function OwnerPetsContent() {
  const router = useRouter();

  const { data: pets = [], isLoading } = useGetPets();

  if (isLoading) return null;

  //   if (isLoading) {
  //     <div className="flexflex items-center justify-center py-10">
  //       <Pulse />
  //     </div>;
  //   }

  return (
    <>
      {pets.length === 0 ? (
        <MyPetsEmpty
          handleAddPet={() => router.push("/owner/pets/add-new-pet")}
        />
      ) : (
        <PetProfile
          pets={pets}
          handleAddPet={() => router.push("/owner/pets/add-new-pet")}
        />
      )}
    </>
  );
}
