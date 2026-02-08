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
import { getButtonClasses } from "@/utils/buttonClasses/buttonClasses";
import { useRouter } from "next/navigation";
import ModalCloseButton from "../ModalCloseButton";

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
    router.push("/owner/pets?created=1");
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
        <div className="text-[#1e88e5]">
          <ModalCloseButton onClose={onClose} />
        </div>
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
