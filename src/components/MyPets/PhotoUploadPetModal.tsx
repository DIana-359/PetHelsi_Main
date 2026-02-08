"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
} from "@heroui/react";
import AvatarPet from "./AvatarPet";
import { useState } from "react";
import { getButtonClasses } from "@/utils/buttonClasses/buttonClasses";
import useMedia from "@/utils/media";
import ModalCloseButton from "../ModalCloseButton";

type ActiveButton = "save" | "change";

interface PhotoUploadPetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPick?: () => void;
  onSave?: () => void;
  onChangePhoto?: () => void;
  hasImage?: boolean;
  avatar?: string;
  firstName?: string;
  preview?: string;
  error?: string | null;
  mode?: "add" | "edit";
}

export default function PhotoUploadPetModal({
  isOpen,
  onClose,
  onPick,
  onSave,
  onChangePhoto,
  hasImage = false,
  avatar,
  firstName,
  preview,
  error,
  mode = "add",
}: PhotoUploadPetModalProps) {
  const displayAvatar = preview ?? avatar;
  const firstLetter = firstName?.charAt(0).toUpperCase();
  const [isActive, setIsActive] = useState<ActiveButton>("save");

  const isMobile = useMedia();

  return (
    <Modal isOpen={isOpen} onClose={onClose} placement="center" hideCloseButton>
      <ModalContent className=" flex flex-col  md:items-center px-0 py-8 md:px-8 md:py-14  rounded-[16px] max-w-full md:max-w-[560px]">
        <div className="text-[#1e88e5]">
          <ModalCloseButton onClose={onClose} />
        </div>
        <ModalHeader className="p-0 text-[24px] flex justify-center text-gray-900 mb-2 font-semibold">
          {mode === "edit" ? "Зміна фото тварини" : "Додавання фото тварини"}
        </ModalHeader>

        <ModalBody>
          <p className="md:p-0 text-[14px] md:text-[16px] text-gray-800 text-center mb-4 md:mb-8">
            Зображення не повинне перевищувати
            <span className="md:inline text-center"> 5 MB</span>
          </p>
          <div className="flex justify-center">
            {displayAvatar ? (
              <div className="rounded-full mb-4 md:mb-8">
                <AvatarPet
                  avatar={displayAvatar}
                  firstName={firstName}
                  size={isMobile ? 88 : 128}
                />
              </div>
            ) : (
              firstLetter && (
                <div
                  className=" 
                    w-22 h-22 
                    rounded-full bg-gray-300
                    flex items-center justify-center
                    text-background mb-8
                    text-[52px] "
                >
                  {firstLetter}
                </div>
              )
            )}
          </div>
          {error && (
            <p className="text-red-600 text-sm text-center mb-4">{error}</p>
          )}
          <div className="w-full md:w-auto flex flex-col gap-2 md:gap-3 transition-colors">
            {!hasImage ? (
              <Button
                color="primary"
                className="w-full md:w-auto rounded-[8px]"
                onClick={() => {
                  setIsActive("change");
                  onPick?.();
                }}
              >
                {mode === "edit" ? "Обрати інше фото" : "Обрати фото"}
              </Button>
            ) : (
              <Button
                className={getButtonClasses("primary", isActive === "change")}
                onClick={() => {
                  setIsActive("change");
                  onSave?.();
                }}
              >
                Зберегти
              </Button>
            )}

            {hasImage && (
              <Button
                className={`${getButtonClasses(
                  "primary",
                  isActive === "save",
                )}`}
                onClick={() => {
                  setIsActive("save");
                  onChangePhoto?.();
                }}
              >
                Обрати інше фото
              </Button>
            )}
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
