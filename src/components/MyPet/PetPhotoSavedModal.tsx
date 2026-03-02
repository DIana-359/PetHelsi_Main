"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
} from "@heroui/react";

import ModalCloseButton from "../ModalCloseButton";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function PetPhotoSavedModal({ isOpen, onClose }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} placement="center" hideCloseButton>
      <ModalContent className="flex flex-col items-center px-8 py-8 md:py-14 rounded-[16px] md:max-w-[560px]">
        <div className="text-[#1e88e5]">
          <ModalCloseButton onClose={onClose} />
        </div>
        <ModalHeader className="p-0 flex justify-center text-[20px] md:text-[24px] text-gray-900 mb-8 font-femily">
          Фото тварини завантажено
        </ModalHeader>

        <ModalBody className="w-[360px] ">
          <Button
            color="primary"
            className="w-full text-[16px] rounded-[8px]"
            onClick={onClose}
          >
            Зрозуміло
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
