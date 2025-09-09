"use client";

import { Vet } from "@/utils/types/vet";
import VetCardHomePage from "./VetCardHomePage";
import { useEffect, useState } from "react";

export default function VeterinariansList() {
  const [data, setData] = useState<Vet[]>([]);

  useEffect(() => {
    const fetchVets = async () => {
      const res = await fetch(
        `https://om6auk3tiqy3ih6ad5ad2my63q0xmqcs.lambda-url.eu-north-1.on.aws/api/v1/vets?page=0&size=8`
      );
      const result = await res.json();
      setData(result.content);
    };

    fetchVets();
  }, []);

  return (
    <div
      id="veterinariansList"
      className="flex gap-[13px] lg:gap-6">
      {data.map((veterinarian: Vet) => (
        <div key={veterinarian.id} className="w-[272px] lg:w-[344px]">
          <VetCardHomePage veterinarian={veterinarian} />
        </div>
      ))}
    </div>
  );
}
