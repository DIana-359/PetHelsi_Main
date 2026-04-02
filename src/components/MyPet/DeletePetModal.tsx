"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
} from "@heroui/react";
import AvatarPet from "./AvatarPet";
import { Pet } from "@/types/pet";
import useMedia from "@/utils/media";
import ModalCloseButton from "../ModalCloseButton";
import { getButtonClasses } from "@/utils/buttonClasses/buttonClasses";

interface DeletePetModalProps {
  isOpen: boolean;
  onClose: () => void;
  pet: Partial<Pet>;
  isLoading?: boolean;
  onConfirm: () => void;
}

export default function DeletePetModal({
  isOpen,
  onClose,
  pet,
  isLoading,
  onConfirm,
}: DeletePetModalProps) {
  const isMobile = useMedia();

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      placement="center"
      hideCloseButton
    >
      <ModalContent className="rounded-[16px] pt-13 pb-8 md:pt-20 md:pb-14 max-w-[560px] ">
        <div className="text-[#1e88e5]">
          <ModalCloseButton onClose={onClose} />
        </div>
        <ModalHeader className="text-center pb-4 md:pb-0">
          <h2 className="w-full text-[20px] md:text-[24px] font-[600] text-[#333f5d]">
            Видалити профіль
            <span className="block md:inline"> {pet.name}?</span>
          </h2>
        </ModalHeader>

        <ModalBody className="flex flex-col items-center  text-center gap-4 md:gap-8">
          <p className="text-[#333f5d] text-[14px] md:text-[16px] text-center">
            Дані профілю, історія прийомів будуть видалені
            <br className="hidden md:block" />
            без можливості відновлення
          </p>
          <AvatarPet
            avatar={pet.avatar}
            firstName={pet.name}
            size={isMobile ? 88 : 128}
          />
        </ModalBody>

        <div className="flex mt-8 justify-center">
          <div className="flex w-full max-w-[304px] flex-col gap-2">
            <Button
              className={getButtonClasses("primary", false)}
              onClick={() => {
                onClose();
              }}
            >
              Скасувати
            </Button>

            <Button
              className={getButtonClasses("danger", false)}
              isLoading={isLoading}
              onClick={() => {
                onConfirm();
              }}
            >
              Видалити профіль
            </Button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
}
