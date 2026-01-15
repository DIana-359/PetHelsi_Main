"use client";

import { Vet } from "@/utils/types/vet";
import VetCardHomePage from "./VetCardHomePage";
import { useVetsByCriteria } from "@/hooks/vets/useVets";
import { Pulse } from "../Pulse";

interface IVeterinariansListProps {
  token?: true;
}

export default function VeterinariansList({ token }: IVeterinariansListProps) {
  const { data = [], isLoading } = useVetsByCriteria({ page: 0, size: 8 });

  if (isLoading)
    return (
      <div>
        <Pulse />
        <p className="w-full text-center text-[14px] font-[400] leading-[1] text-gray-900">
          Завантаження ветеринарів...
        </p>
      </div>
    );

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
