"use client";

import { Pet } from "@/types/pet";
import MyPetsAddBtn from "./MyPetsAddBtn";
import AvatarPet from "./AvatarPet";
import useMedia from "@/utils/media";
import UpdateProfilePetLink from "./UpdateProfilePetLink";
import { useState } from "react";
import { SterilizedLabel } from "./SterilizedLabel";

const formatBirthDateUA = (dateString?: string) => {
  if (!dateString) return "Не вказано";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Не вказано";

  const formatted = new Intl.DateTimeFormat("uk-UA", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
    .format(date)
    .replace(/\s?р\.?$/, "")
    .replace(".", "");

  return formatted.replace(/(\s\p{L})/u, (match) => match.toUpperCase());
};

interface PetProfileProps {
  pets: Pet[];
  handleAddPet: (pet: Partial<Pet>, imageFile?: File) => Promise<void>;
}

export default function PetProfile({ pets, handleAddPet }: PetProfileProps) {
  const isMobile = useMedia();
  const [activePetId, setActivePetId] = useState<number | null>(null);

  if (pets.length === 0) return <MyPetsAddBtn handleAddPet={handleAddPet} />;

  const sortedPets = [...pets].sort((a, b) => (a.id ?? 0) - (b.id ?? 0));

  const activePet =
    sortedPets.find((pet) => pet.id === activePetId) ||
    sortedPets[sortedPets.length - 1];

  const petData = [
    { label: "Ім’я", value: activePet.name || "Не вказано" },
    { label: "Вид", value: activePet.petTypeName || "Не вказано" },
    { label: "Порода", value: activePet.breed || "Не вказано" },
    { label: "Стать", value: activePet.genderTypeName || "Не вказано" },
    { label: "Забарвлення", value: activePet.color || "Не вказано" },
    { label: "Дата народження", value: formatBirthDateUA(activePet.birthDate) },
    {
      label: "Вага",
      value:
        activePet.weight !== undefined
          ? `${activePet.weight} кг`
          : "Не вказано",
    },

    {
      label: "Стерилізація",
      value: (
        <SterilizedLabel
          sterilized={activePet.sterilized}
          gender={activePet.genderTypeName}
        />
      ),
    },

    {
      label: "Алергічні реакції",
      value:
        activePet.allergies && activePet.allergies.length > 0
          ? activePet.allergies.join(", ")
          : "Не вказано",
    },
  ];

  return (
    <div className="py-[8px] md:py-0">
      <div className="flex items-center  md:flex-wrap">
        <MyPetsAddBtn
          handleAddPet={handleAddPet}
          className="text-[14px] w-[165px] flex items-center justify-center h-[38px] gap-2 rounded-[6px] bg-primary text-white border border-primary hover:bg-primary-50 hover:text-primary "
        />

        {pets.map((pet) => (
          <button
            key={pet.id}
            onClick={() => setActivePetId(pet.id!)}
            className={`
      font-semibold text-[14px] text-gray-900 pb-[10px] px-4
      ${
        activePetId === pet.id
          ? "border-b-2 border-primary "
          : "border-b-2 border-transparent "
      }
    `}
          >
            {pet.name}
          </button>
        ))}
      </div>
      <div className="flex flex-col">
        <div className="w-full  flex  justify-between gap-10">
          <h3 className="text-[18px] font-[600] mb-6  text-gray-900">
            Профіль тварини
          </h3>
          <div className="text-primary hidden md:block">
            <UpdateProfilePetLink />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-10">
          <div className="flex items-center justify-between md:items-start">
            <AvatarPet
              avatar={activePet.avatar}
              firstName={activePet.name}
              size={isMobile ? 88 : 128}
            />
            <div className="text-primary md:hidden ">
              <UpdateProfilePetLink />
            </div>
          </div>
          <ul className="flex flex-col flex-wrap md:flex-row justify-between  gap-y-[16px] pt-8 md:pt-1  border-t border-gray-100 md:border-t-0 ">
            {petData.map((item, i) => (
              <li key={i} className=" md:w-[252px] ">
                <p className="text-[12px] font-[500] leading-[1] text-gray-500 mb-[4px]">
                  {item.label}
                </p>
                <p className="text-[14px] mb-4 font-[400] leading-[1] text-gray-900">
                  {item.value}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
