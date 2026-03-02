"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { petSchema, PetFormValues } from "@/utils/schemas/pet.schemas";
import { Pet } from "@/types/pet";
import PetForm from "@/components/MyPet/PetForm";
import AddPetFormBtn from "./AddPetFormBtn";
import PetAvatarUploader from "./PetAvatarUploader";
import { GlobalMessage } from "@/components/MyPet/GlobalMessage";
import PetCreatedModal from "./PetCreatedModal";
import GoBackPets from "./GoBackPets";

export default function AddNewPetForm() {
  const methods = useForm<PetFormValues>({
    resolver: zodResolver(petSchema),
    defaultValues: {
      birthDate: "",
    },
  });
  const [newPet, setNewPet] = useState<Partial<Pet>>({});
  const [image, setImage] = useState<{ preview: string; file: File } | null>(
    null,
  );

  const [isCreatedModalOpen, setIsCreatedModalOpen] = useState(false);
  const [createdPet, setCreatedPet] = useState<Pet | null>(null);
  const [showAvatarSuccess, setShowAvatarSuccess] = useState(false);

  const petName = methods.watch("name");

  return (
    <>
      <GlobalMessage
        visible={showAvatarSuccess}
        onClose={() => setShowAvatarSuccess(false)}
        message="Фото тварини успішно завантажене"
      />
      <div className="pb-6">
        <GoBackPets />
      </div>
      <h1 className="md:text-[18px] font-[600] pb-6 text-gray-900">
        <div className="aa">Додання нової тварини</div>
      </h1>
      <section className="pt-0 pb-6">
        <div className="w-full flex flex-col gap-10 md:flex-row md:items-start md:justify-start">
          <div className="flex-shrink-0 flex justify-center md:justify-start">
            <fieldset className="flex flex-col gap-[24px] items-center md:items-start md:flex-row md:gap-[40px]">
              <div>
                <PetAvatarUploader
                  avatar={newPet.avatar}
                  firstName={petName}
                  onChange={(img) => {
                    setImage(img);
                    setShowAvatarSuccess(true);
                  }}
                />
              </div>
            </fieldset>
          </div>

          <div className="w-full grid grid-cols-1 md:max-w-[304px]">
            <PetForm
              methods={methods}
              onSubmit={(data) => {
                console.log("Validated data:", data);
                setNewPet(data);
              }}
            />
            <AddPetFormBtn
              methods={methods}
              image={image}
              setCreatedPet={setCreatedPet}
              setIsCreatedModalOpen={setIsCreatedModalOpen}
            />
          </div>
        </div>
      </section>

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
