"use client";

import { GlobalMessage } from "@/components/MyPets/GlobalMessage";
import GoBackPets from "@/components/MyPets/GobackPets";
import AddPetForm from "@/components/MyPets/AddPetForm";
import PetAvatarUploader from "@/components/MyPets/PetAvatarUploader";
import EditPetFormBtns from "@/components/MyPets/EditPetFormBtn";
import SavedChangesModal from "@/components/MyPets/SavedChangesModal";
import { useEditPetPage } from "@/hooks/pets/useEditPetPage";

export default function EditPetPage() {
  const {
    pet,
    setPet,
    image,
    setImage,
    selected,
    setSelected,
    isOpenCalendar,
    setIsOpenCalendar,
    showAvatarSuccess,
    setShowAvatarSuccess,
    isBirthDateUnknown,
    setIsBirthDateUnknown,
    birthMonth,
    setBirthMonth,
    birthYear,
    setBirthYear,
    getError,
    clearError,
    isLoading,
    handleSave,
    isUnsavedOpen,
    setIsUnsavedOpen,
    attemptNavigation,
  } = useEditPetPage();

  if (isLoading) return null;

  return (
    <div className="w-full min-h-screen flex justify-center bg-background overflow-auto scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent">
      <div className="flex flex-col w-full rounded-[18px] outline-none">
        <GlobalMessage
          visible={showAvatarSuccess}
          onClose={() => setShowAvatarSuccess(false)}
          message="Фото тварини успішно завантажене"
        />
        <div className="flex justify-start px-4 sm:px-6 md:px-8 lg:px-10 pt-4 sm:pt-6 pb-2">
          <GoBackPets onClick={() => attemptNavigation("/owner/pets")} />
        </div>
        <h1 className="lg:text-18px sm:text-2xl font-medium px-4 sm:px-6 md:px-8 lg:px-12 pt-0 pb-6 sm:pb-10 text-gray-900">
          Редагування профілю тварини
        </h1>

        <section className="pt-0 pb-6 sm:pb-10 px-6 sm:px-10 md:px-15 gap-4 ">
          <div className="w-full flex flex-col items-center justify-center gap-6 md:flex-row md:items-start md:justify-start">
            <div className="flex-shrink-0 flex justify-center md:justify-start">
              <fieldset className="flex flex-col gap-[24px] items-center md:items-start md:flex-row md:gap-[40px]">
                <div>
                  <PetAvatarUploader
                    avatar={image?.preview ?? pet.avatar}
                    firstName={pet.name}
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
              <AddPetForm
                newPet={pet}
                setNewPet={setPet}
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
              <EditPetFormBtns pet={pet} onSave={handleSave} />
            </div>
          </div>
        </section>
      </div>
      <SavedChangesModal
        isOpen={isUnsavedOpen}
        onSave={handleSave}
        onClose={() => setIsUnsavedOpen(false)}
      />
    </div>
  );
}
