"use client";

import { Vet } from "@/utils/types/vet";
import VetCardHomePage from "./VetCardHomePage";
import { useVetsByCriteria } from "@/hooks/vets/useVets";
import { Pulse } from "@/components/Pulse";

export default function VeterinariansList() {
  const { data, isLoading } = useVetsByCriteria({ page: 0, size: 8 });

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
      {data?.content.map((veterinarian: Vet) => (
        <div key={veterinarian.id} className="w-[272px] lg:w-[344px]">
          <VetCardHomePage veterinarian={veterinarian} />
        </div>
      ))}
    </div>
  );
}
