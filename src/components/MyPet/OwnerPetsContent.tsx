"use client";

import { useRouter } from "next/navigation";
import { useGetPets } from "@/hooks/pets/useGetPets";
import MyPetsEmpty from "@/components/MyPet/MyPetsEmpty";
import PetProfile from "@/components/MyPet/PetProfile";
import { Pulse } from "@/components/Pulse";

export default function OwnerPetsContent() {
  const router = useRouter();

  const handleAddPet = () => {
    router.push("/owner/pets/add-new-pet");
  };

  const { data: pets, isLoading } = useGetPets();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        <Pulse />
      </div>
    );
  }

  return (
    <>
      {!pets || pets.length === 0 ? (
        <MyPetsEmpty handleAddPet={handleAddPet} />
      ) : (
        <PetProfile pets={pets} handleAddPet={handleAddPet} />
      )}
    </>
  );
}
