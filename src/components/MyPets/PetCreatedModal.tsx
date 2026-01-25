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
import { useState } from "react";
import Icon from "../Icon";
import { getButtonClasses } from "@/utils/buttonClasses/buttonClasses";
import { useRouter } from "next/navigation";

type ActiveButton = "save" | "change";

interface PetCreatedModalProps {
  pet: Pet;
  isOpen: boolean;
  onClose: () => void;
}

export default function PetCreatedModal({
  pet,
  isOpen,
  onClose,
}: PetCreatedModalProps) {
  const isMobile = useMedia();
  const [isActive, setIsActive] = useState<ActiveButton>("save");

  const router = useRouter();

  const goToConsultation = () => {
    setIsActive("save");
    router.push("/veterinarians");
  };

  const goToMyPets = () => {
    setIsActive("change");
    router.push("/owner/pets");
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      placement="center"
      hideCloseButton
      className="rounded-[18px] w-full md:max-w-[560px] pt-13 md:pt-20 pb-8 md:pb-14"
    >
      <ModalContent className="flex flex-col w-full gap-6 outline-none">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 border-none bg-transparent cursor-pointer outline-none opacity-70 hover:opacity-100 transition"
        >
          <Icon
            sprite="/sprites/sprite-sistem.svg"
            id="icon-close"
            width="24px"
            height="24px"
            className="stroke-gray-600 md:w-[40px] md:h-[40px] hover:stroke-gray-800"
          />
        </button>
        <ModalHeader className="text-[20px] md:text-[24px] justify-center font-semibold gap-4 text-gray-900 text-center">
          Профіль {pet.name} створено
        </ModalHeader>

        <ModalBody className="flex w-full flex-col items-center gap-8">
          <AvatarPet
            avatar={pet.avatar}
            firstName={pet.name}
            size={isMobile ? 88 : 128}
          />

          <div className="w-full md:w-[304px] text-[16px] flex flex-col gap-2 md:gap-3 transition-colors">
            <Button
              className={getButtonClasses("primary", isActive === "save")}
              onPress={goToConsultation}
            >
              Запис на консультацію
            </Button>
            <Button
              className={getButtonClasses("primary", isActive === "change")}
              onPress={goToMyPets}
            >
              Мої тварини
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
