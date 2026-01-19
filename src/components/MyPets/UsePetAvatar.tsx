"use client";

import { useRef, useState } from "react";
import AvatarPet from "./AvatarPet";
import Icon from "../Icon";
import PhotoUploadPetModal from "./PhotoUploadPetModal";
import PetPhotoSavedModal from "./PetPhotoSavedModal";

interface UsePetAvatarProps {
  avatar?: string;
  firstName?: string;
  onChange?: (image: { preview: string; file: File } | null) => void;
  mode?: "add" | "edit";
}

export default function UsePetAvatar({
  avatar,
  firstName,
  onChange,
  mode = "add",
}: UsePetAvatarProps) {
  const [image, setImage] = useState<{ preview: string; file: File } | null>(
    null
  );
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [isPhotoSavedOpen, setIsPhotoSavedOpen] = useState(false);
  const [photoError, setPhotoError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setPhotoError("Зображення більше 5 MB");
      event.target.value = "";
      setIsPhotoModalOpen(true);
      return;
    }

    setPhotoError(null);
    const preview = URL.createObjectURL(file);
    const img = { preview, file };

    setImage(img);
    onChange?.(img);
    setIsPhotoModalOpen(true);
  };

  const handleSavePhoto = () => {
    setIsPhotoModalOpen(false);
    setIsPhotoSavedOpen(true);
  };

  const handleEditClick = () => {
    if (mode === "edit") {
      openFilePicker();
    } else {
      setIsPhotoModalOpen(true);
    }
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileUpload}
        className="hidden"
      />

      <div className="relative w-[128px] h-[128px] overflow-hidden rounded-full">
        <AvatarPet
          avatar={image?.preview ?? avatar}
          firstName={firstName}
          size={128}
        />
      </div>

      <button
        className="p-[8px] flex items-center group"
        onClick={handleEditClick}
      >
        <Icon
          sprite="/sprites/sprite-sistem.svg"
          id="icon-refresh_2_light"
          width="20px"
          height="20px"
          className="stroke-primary-700 fill-background"
        />
        <span className="text-[14px] text-primary-700">
          {mode === "edit" ? "Змінити фото" : "Додати фото"}
        </span>
      </button>

      <PhotoUploadPetModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        onPick={openFilePicker}
        onSave={handleSavePhoto}
        onChangePhoto={openFilePicker}
        hasImage={!!image}
        preview={image?.preview}
        avatar={avatar}
        firstName={firstName}
        error={photoError}
        mode={mode}
      />

      <PetPhotoSavedModal
        isOpen={isPhotoSavedOpen}
        onClose={() => setIsPhotoSavedOpen(false)}
      />
    </>
  );
}
