"use client";

import { Pet } from "@/types/pet";
import MyPetsAddBtn from "./MyPetsAddBtn";
import AvatarPet from "./AvatarPet";
import useMedia from "@/utils/media";
import UpdateProfilePetLink from "./UpdateProfilePetLink";
import { useState, useEffect } from "react";
import { SterilizedLabel } from "./SterilizedLabel";
import { GlobalMessage } from "./GlobalMessage";
import { useRouter, useSearchParams } from "next/navigation";

const formatBirthDateUA = (dateString?: string) => {
  if (!dateString) return "Не вказано";

  const [year, month, day] = dateString.split("-");

  if (month === "01" && day === "01") {
    return year;
  }

  if (day === "01") {
    const date = new Date(Number(year), Number(month) - 1);
    return new Intl.DateTimeFormat("uk-UA", {
      month: "long",
      year: "numeric",
    })
      .format(date)
      .replace(/^./, (c) => c.toUpperCase())
      .replace(/\s?р\.?$/, "");
  }
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
  const [showPetCreated, setShowPetCreated] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get("created") === "1") {
      setShowPetCreated(true);
      router.replace("/owner/pets");
    }
  }, [searchParams, router]);

  const handleAddNewPet = async (pet: Partial<Pet>, imageFile?: File) => {
    await handleAddPet(pet, imageFile);
  };

  if (pets.length === 0) return <MyPetsAddBtn handleAddPet={handleAddNewPet} />;

  const sortedPets = [...pets].sort((a, b) => (a.id ?? 0) - (b.id ?? 0));

  const activePet =
    sortedPets.find((pet) => pet.id === activePetId) ||
    sortedPets[sortedPets.length - 1];

  const petData = [
    { label: "Ім’я", value: activePet.name },
    { label: "Вид", value: activePet.petTypeName },
    ...(activePet.breed ? [{ label: "Порода", value: activePet.breed }] : []),
    {
      label: "Стать",
      value: activePet.genderTypeName === "Хлопчик" ? "Самець" : "Самка",
    },

    { label: "Дата народження", value: formatBirthDateUA(activePet.birthDate) },
    {
      label: "Вага",
      value: `${activePet.weight} кг`,
    },

    {
      label: "Стерилізований/-а",
      value: <SterilizedLabel sterilized={activePet.sterilized} />,
    },

    ...(activePet.allergies && activePet.allergies.length > 0
      ? [
          {
            label: "Алергічні реакції",
            value: activePet.allergies.join(", "),
          },
        ]
      : []),
  ];

  return (
    <div className="py-[8px] md:py-0">
      <GlobalMessage
        visible={showPetCreated}
        onClose={() => setShowPetCreated(false)}
        message="Профіль тварини успішно створено"
      />
      <div className="flex items-center gap-6 md:flex-wrap">
        <MyPetsAddBtn
          handleAddPet={handleAddNewPet}
          className="text-[14px] w-[165px] flex items-center justify-center h-[38px] gap-2 rounded-[6px] bg-primary text-white border border-primary hover:bg-primary-50 hover:text-primary "
        />

        {pets.map((pet) => (
          <button
            key={pet.id}
            onClick={() => setActivePetId(pet.id!)}
            className={`
      font-semibold text-[14px] text-gray-900 pb-[10px] px-3 -mx-3
      ${
        activePetId === pet.id
          ? "border-b-2 border-primary"
          : "border-b-2 border-transparent"
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
            {activePet.id !== undefined && (
              <UpdateProfilePetLink petId={activePet.id} />
            )}
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
              {activePet.id !== undefined && (
                <UpdateProfilePetLink petId={activePet.id} />
              )}
            </div>
          </div>
          <ul className="flex flex-col flex-wrap md:flex-row  gap-y-[16px] pt-8 md:pt-1  border-t border-gray-100 md:border-t-0 ">
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
