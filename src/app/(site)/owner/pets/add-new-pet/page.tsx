"use client";

import { useState, useEffect } from "react";
import { Pet } from "@/types/pet";
import GoBackPets from "@/components/MyPets/GobackPets";
import PetCreatedModal from "@/components/MyPets/PetCreatedModal";
import AddPetForm from "@/components/MyPets/AddPetForm";
import AddPetFormBtn from "@/components/MyPets/AddPetFormBtn";
import PetAvatarUploader from "@/components/MyPets/PetAvatarUploader";
import { usePetValidation } from "@/hooks/petFieldError/usePetValidation";
import { GlobalMessage } from "@/components/MyPets/GlobalMessage";

export default function AddNewPet() {
  const [newPet, setNewPet] = useState<Partial<Pet>>({});
  const [image, setImage] = useState<{ preview: string; file: File } | null>(
    null,
  );
  const [selected, setSelected] = useState<Date>();
  const [isOpenCalendar, setIsOpenCalendar] = useState<boolean>(false);
  const [isBirthDateUnknown, setIsBirthDateUnknown] = useState(false);
  const [birthMonth, setBirthMonth] = useState<string | undefined>();
  const [birthYear, setBirthYear] = useState<string | undefined>();
  const [isCreatedModalOpen, setIsCreatedModalOpen] = useState(false);
  const [createdPet, setCreatedPet] = useState<Pet | null>(null);
  const [showAvatarSuccess, setShowAvatarSuccess] = useState(false);

  const { validate, getError, clearError } = usePetValidation({
    newPet,
    isBirthDateUnknown,
    birthYear,
  });

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
      <div className="w-full  flex justify-center bg-background ">
        <div className="flex flex-col w-full max-w-[1048px] px-4 md:px-8">
          <GlobalMessage
            visible={showAvatarSuccess}
            onClose={() => setShowAvatarSuccess(false)}
            message="Фото тварини успішно завантажене"
          />
          <div className=" pb-6">
            <GoBackPets />
          </div>
          <h1 className="md:text-[18px] font-[600] pb-6  text-gray-900">
            <div className="aa">Додання нової тварини</div>
          </h1>

          <section className="pt-0 pb-6">
            <div className="w-full flex flex-col  gap-10 md:flex-row md:items-start md:justify-start">
              <div className="flex-shrink-0  flex justify-center md:justify-start">
                <fieldset className="flex flex-col gap-[24px] items-center md:items-start md:flex-row md:gap-[40px]">
                  <div>
                    <PetAvatarUploader
                      avatar={newPet.avatar}
                      firstName={newPet.name}
                      onChange={(img) => {
                        setImage(img);
                        setShowAvatarSuccess(true);
                      }}
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
                  birthMonth={birthMonth}
                  setBirthMonth={setBirthMonth}
                  birthYear={birthYear}
                  setBirthYear={setBirthYear}
                  getError={getError}
                  clearError={clearError}
                />
                <AddPetFormBtn
                  newPet={newPet}
                  image={image}
                  setCreatedPet={setCreatedPet}
                  setIsCreatedModalOpen={setIsCreatedModalOpen}
                  isBirthDateUnknown={isBirthDateUnknown}
                  birthMonth={birthMonth}
                  birthYear={birthYear}
                  validate={validate}
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
