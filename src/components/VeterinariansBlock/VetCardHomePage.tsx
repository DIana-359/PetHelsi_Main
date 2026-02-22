"use client";

import { Card, CardBody } from "@heroui/react";
import vet from "../../../public/Images/588f8e49768020da958bb009d913c575.png";
import VeterinarianCard from "./VeterinarianCard";
import Image from "next/image";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { Vet } from "@/utils/types/vet";

interface Props {
  veterinarian: Vet;
}

export default function VetCardHomePage({ veterinarian }: Props) {
  const isMobile = useMediaQuery("(max-width: 1023px)");

  return (
    <Card className="w-[272px] lg:w-[344px] card shadow-none">
      <CardBody className="body p-0 relative w-max">
        <Image
          alt="Veterinarian hero Image"
          src={vet.src}
          width={344}
          height={528}
          className="img p-0 w-[272px] h-[468px] lg:w-[344px] lg:h-[528px] object-cover object-center rounded-xl"
        />
        <div className="absolute lg:max-h-[188px] lg:hover:max-h-[312px] transition-all duration-800 bottom-2 left-2 right-2  rounded-xl overflow-hidden">
          {isMobile ? (
            <VeterinarianCard
              veterinarian={veterinarian}
              hasAvatar={false}
              size={"small"}
            />
          ) : (
            <VeterinarianCard
              veterinarian={veterinarian}
              hasAvatar={false}
              size={"large"}
            />
          )}
        </div>
      </CardBody>
    </Card>
  );
}
