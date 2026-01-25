"use client";

import { Pet } from "@/types/pet";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import Image from "next/image";

interface DeletePetBtnsProps {
  pet: Partial<Pet>;
  image: { preview: string; file: File } | null;
  onCancel: () => void;
  onDelete: () => void;
}

export default function DeletePetBtns({
  pet,
  image,
  onCancel,
  onDelete,
}: DeletePetBtnsProps) {
  const router = useRouter();

  const handleSave = async () => {
    const formData = new FormData();
    Object.entries(pet).forEach(([key, value]) => {
      if (value) formData.append(key, String(value));
    });

    if (image) {
      formData.append("avatar", image.file);
    }

    await fetch(`/api/pets/${pet.id}`, {
      method: "PUT",
      body: formData,
    });
  };

  const handleDelete = async () => {
    if (!pet.id) return;

    const res = await fetch(`/api/pets/${pet.id}`, { method: "DELETE" });

    if (!res.ok) {
      console.error("Failed to delete pet");
      return;
    }
    onDelete();
    router.push("/owner/pets");
  };

  return (
    <div className="w-full md:max-w-[304px] flex flex-col gap-2">
      <Button
        color="primary"
        type="submit"
        onClick={handleSave}
        className="w-full md:w-[304px] rounded-[8px]"
      >
        Зберегти зміни
      </Button>

      <Button
        variant="light"
        type="button"
        onPress={() => router.back()}
        onClick={onCancel}
        className="w-full md:w-[304px] rounded-md text-[16px] font-[400] leading-[1.4] text-primary-700 bg-background border-[1px] border-primary-700 mb-8"
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
          onClick={handleDelete}
          className="text-[14px] font-[400] text-[#f11c0e]"
        >
          Видалити профіль
        </button>
      </div>
    </div>
  );
}
