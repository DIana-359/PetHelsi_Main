"use client";

import { useState, useEffect } from "react";
import { Pet } from "@/types/pet";
import GoBackPets from "@/components/MyPets/GobackPets";
import PetCreatedModal from "@/components/MyPets/PetCreatedModal";
import AddPetForm from "@/components/MyPets/AddPetForm";
import AddPetFormBtn from "@/components/MyPets/AddPetFormBtn";
import UsePetAvatar from "@/components/MyPets/UsePetAvatar";

export default function AddNewPet() {
  const [newPet, setNewPet] = useState<Partial<Pet>>({});
  const [image, setImage] = useState<{ preview: string; file: File } | null>(
    null
  );
  const [selected, setSelected] = useState<Date>();
  const [isOpenCalendar, setIsOpenCalendar] = useState<boolean>(false);
  const [isBirthDateUnknown, setIsBirthDateUnknown] = useState(false);
  const [isCreatedModalOpen, setIsCreatedModalOpen] = useState(false);
  const [createdPet, setCreatedPet] = useState<Pet | null>(null);

  useEffect(() => {
    if (newPet.birthDate && !selected) {
      const parsedDate = new Date(newPet.birthDate);
      if (!isNaN(parsedDate.getTime())) {
        setSelected(parsedDate);
      }
    }
  }, [newPet.birthDate, selected]);

  return (
    <>
      <div className="w-full min-h-screen flex justify-center bg-background overflow-auto scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent">
        <div className="flex flex-col w-full rounded-[18px] outline-none">
          <div className="flex justify-start px-4 sm:px-6 md:px-8 lg:px-10 pt-4 sm:pt-6 pb-2">
            <GoBackPets />
          </div>
          <h1 className="lg:text-18px sm:text-2xl font-medium  px-4 sm:px-6 md:px-8 lg:px-12 pt-0 pb-6 sm:pb-10 text-gray-900">
            <div className="aa">Додання нової тварини</div>
          </h1>

          <section className="pt-0 pb-6 sm:pb-10 px-6 sm:px-10 md:px-15 gap-4 ">
            <div className="w-full flex flex-col items-center justify-center gap-6 md:flex-row md:items-start md:justify-start">
              <div className="flex-shrink-0  flex justify-center md:justify-start">
                <fieldset className="flex flex-col gap-[24px] items-center md:items-start md:flex-row md:gap-[40px]">
                  <div>
                    <UsePetAvatar
                      avatar={newPet.avatar}
                      firstName={newPet.name}
                      onChange={setImage}
                    />
                  </div>
                </fieldset>
              </div>
              <div className="w-full grid grid-cols-1  md:max-w-[304px]">
                <AddPetForm
                  newPet={newPet}
                  setNewPet={setNewPet}
                  selected={selected}
                  setSelected={setSelected}
                  isOpenCalendar={isOpenCalendar}
                  setIsOpenCalendar={setIsOpenCalendar}
                  isBirthDateUnknown={isBirthDateUnknown}
                  setIsBirthDateUnknown={setIsBirthDateUnknown}
                />
                <AddPetFormBtn
                  newPet={newPet}
                  image={image}
                  setCreatedPet={setCreatedPet}
                  setIsCreatedModalOpen={setIsCreatedModalOpen}
                />
              </div>
            </div>
          </section>
        </div>
      </div>

      {createdPet && (
        <PetCreatedModal
          pet={createdPet}
          isOpen={isCreatedModalOpen}
          onClose={() => setIsCreatedModalOpen(false)}
        />
      )}
    </>
  );
}
