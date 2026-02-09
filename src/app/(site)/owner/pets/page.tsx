"use client";

import MyPetsEmpty from "@/components/MyPets/MyPetsEmpty";
import PetProfile from "@/components/MyPets/MyPetProfile";
import { useGetPets } from "@/hooks/pets/useGetPets";
import { useRouter } from "next/navigation";

export default function OwnerPets() {
  const router = useRouter();

  const { data: pets = [], isLoading } = useGetPets();

  if (isLoading) return null;

  return (
    <div className="p-4">
      {pets.length === 0 ? (
        <MyPetsEmpty
          handleAddPet={async () => router.push("/owner/pets/add-new-pet")}
        />
      ) : (
        <PetProfile
          pets={pets}
          handleAddPet={async () => router.push("/owner/pets/add-new-pet")}
        />
      )}
    </div>
  );
}
