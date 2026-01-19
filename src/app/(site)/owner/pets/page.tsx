"use client";

import { useEffect, useState } from "react";
import MyPetsEmpty from "@/components/MyPets/MyPetsEmpty";
import PetProfile from "@/components/MyPets/MyPetProfile";
import { Pet } from "@/types/pet";
import { getPets } from "@/services/getPets";
import { useRouter } from "next/navigation";

export default function OwnerPets() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    fetchPets();
  }, []);

  async function fetchPets() {
    setLoading(true);
    try {
      const res = await getPets();
      setPets(Array.isArray(res) ? res : []);
    } catch (err) {
      console.error(err);
      setPets([]);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return null;

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
