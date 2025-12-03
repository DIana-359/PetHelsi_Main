"use client";

import { Vet } from "@/utils/types/vet";
import VetCardHomePage from "./VetCardHomePage";
import { useVetsByCriteria } from "@/hooks/vets/useVets";

interface IVeterinariansListProps {
  token?: true;
}

export default function VeterinariansList({ token }: IVeterinariansListProps) {
  const { data = [], isLoading } = useVetsByCriteria({ page: 0, size: 8 });

  if (isLoading) return <p>Завантаження ветеринарів...</p>;

  return (
    <div id="veterinariansList" className="flex gap-[13px] lg:gap-6">
      {data.map((veterinarian: Vet) => (
        <div key={veterinarian.id} className="w-[272px] lg:w-[344px]">
          <VetCardHomePage veterinarian={veterinarian} token={token} />
        </div>
      ))}
    </div>
  );
}
