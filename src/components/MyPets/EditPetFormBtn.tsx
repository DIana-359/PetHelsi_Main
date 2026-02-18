"use client";

import { Pet } from "@/types/pet";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import Image from "next/image";
import { useDeletePet } from "@/hooks/pets/useDeletePet";
import { useState } from "react";
import DeletePetModal from "./DeletePetModal";
import { getButtonClasses } from "@/utils/buttonClasses/buttonClasses";

interface EditPetFormBtnsProps {
  pet: Partial<Pet>;
  onSave: () => void;
}

export default function EditPetFormBtns({ pet, onSave }: EditPetFormBtnsProps) {
  const router = useRouter();

  const { mutate: deletePetMutate, isPending } = useDeletePet();

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [activeButton, setActiveButton] = useState<"save" | "cancel">("save");

  const handleDelete = async () => {
    if (!pet.id) return;

    deletePetMutate(pet.id.toString(), {
      onSuccess: () => {
        router.push(
          `/owner/pets?deleted=1&name=${encodeURIComponent(pet.name ?? "")}`,
        );
      },
      onError: () => {
        alert("Помилка видалення профілю тварини");
      },
    });
  };

  return (
    <div className="w-full md:max-w-[304px] flex flex-col gap-2">
      <Button
        type="button"
        onClick={onSave}
        className={getButtonClasses("primary", activeButton === "save")}
      >
        Зберегти зміни
      </Button>

      <Button
        type="button"
        onClick={() => {
          setActiveButton("cancel");
          router.push("/owner/pets?unsave=1");
        }}
        className={getButtonClasses("secondary", activeButton === "cancel")}
      >
        Скасувати
      </Button>
      <div className="flex items-center justify-center md:justify-start gap-3">
        <Image
          src="/delete.svg"
          alt="delete pet"
          aria-hidden="true"
          width={20}
          height={20}
        />
        <button
          type="button"
          onClick={() => setIsDeleteOpen(true)}
          disabled={isPending}
          className="text-[14px] font-[400] text-[#f11c0e] hover:text-[#f54b29] transition-colors duration-200"
        >
          Видалити профіль
        </button>
      </div>
      <DeletePetModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        pet={pet}
        isLoading={isPending}
        onConfirm={handleDelete}
      />
    </div>
  );
}
