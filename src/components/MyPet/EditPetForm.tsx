"use client";

import { GlobalMessage } from "./GlobalMessage";
import GoBackPets from "./GoBackPets";
import PetAvatarUploader from "./PetAvatarUploader";
import EditPetFormBtns from "./EditPetFormBtns";
import SavedChangesModal from "./SavedChangesModal";
import PetForm from "./PetForm";
import { useEditPetPage } from "@/hooks/pets/useEditPetPage";
import { Pulse } from "@/components/Pulse";

interface EditPetFormProps {
  id: string;
}

export default function EditPetForm({ id }: EditPetFormProps) {
  const { form, avatar, unsaved, initialPet, onSubmit, errorMessage, setErrorMessage } =
    useEditPetPage(id);

  const {
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = form;

  const submit = handleSubmit(onSubmit);

  const hasChanges = isDirty || avatar.image !== null;

  if (!initialPet)
    return (
      <div className="flex items-center justify-center py-10">
        <Pulse />
      </div>
    );

  return (
    <>
      <GlobalMessage
        visible={avatar.showAvatarSuccess}
        onClose={() => avatar.setShowAvatarSuccess(false)}
        message="Фото тварини успішно завантажене"
      />
      <GlobalMessage
        visible={!!errorMessage}
        onClose={() => setErrorMessage("")}
        message={errorMessage}
        variant="warning"
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
                  avatar={avatar.image?.preview ?? initialPet.avatar}
                  firstName={initialPet.name}
                  mode="edit"
                  onChange={(img) => avatar.setImage(img)}
                />
              </div>
            </fieldset>
          </div>

          <div className="w-full grid grid-cols-1 md:max-w-[304px]">
            <PetForm methods={form} />

            <EditPetFormBtns
              isSubmitting={isSubmitting}
              pet={initialPet}
              hasChanges={hasChanges}
              onOpenModal={() => unsaved.setIsUnsavedOpen(true)}
            />
          </div>
        </div>
      </section>
      <SavedChangesModal
        isOpen={unsaved.isUnsavedOpen}
        onSave={() => {
          unsaved.setIsUnsavedOpen(false);
          submit();
        }}
        onClose={() => unsaved.setIsUnsavedOpen(false)}
        isLoading={isSubmitting}
      />
    </>
  );
}
