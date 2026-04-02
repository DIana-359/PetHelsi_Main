"use client";

import { GlobalMessage } from "./GlobalMessage";
import GoBackPets from "./GoBackPets";
import PetAvatarUploader from "./PetAvatarUploader";
import EditPetFormBtns from "./EditPetFormBtns";
import SavedChangesModal from "./SavedChangesModal";
import PetForm from "./PetForm";
import { useEditPetPage } from "@/hooks/pets/useEditPetPage";
import { Pulse } from "../Pulse";

interface EditPetFormProps {
  id: string;
}

export default function EditPetForm({ id }: EditPetFormProps) {
  const {
    initialPet,
    image,
    setImage,
    onSubmit,
    isUnsavedOpen,
    setIsUnsavedOpen,
    showAvatarSuccess,
    setShowAvatarSuccess,
    ...methods
  } = useEditPetPage(id);

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const submit = handleSubmit(onSubmit);

  if (!initialPet)
    return (
      <div className="flex items-center justify-center py-10">
        <Pulse />
      </div>
    );

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
        Редагування профілю тварини
      </h1>

      <section className="pt-0 pb-6">
        <div className="w-full flex flex-col gap-10 md:flex-row md:items-start md:justify-start">
          <div className="flex-shrink-0 flex justify-center md:justify-start">
            <fieldset className="flex flex-col gap-[24px] items-center md:items-start md:flex-row md:gap-[40px]">
              <div>
                <PetAvatarUploader
                  avatar={image?.preview ?? initialPet.avatar}
                  firstName={initialPet.name}
                  mode="edit"
                  onChange={(img) => {
                    setImage(img);
                    setShowAvatarSuccess(true);
                  }}
                />
              </div>
            </fieldset>
          </div>

          <div className="w-full grid grid-cols-1 md:max-w-[304px]">
            <PetForm methods={methods} />

            <EditPetFormBtns
              isSubmitting={isSubmitting}
              pet={initialPet}
              onOpenModal={() => setIsUnsavedOpen(true)}
            />
          </div>
        </div>
      </section>
      <SavedChangesModal
        isOpen={isUnsavedOpen}
        onSave={() => {
          setIsUnsavedOpen(false);
          submit();
        }}
        onClose={() => setIsUnsavedOpen(false)}
        isLoading={isSubmitting}
      />
    </>
  );
}
