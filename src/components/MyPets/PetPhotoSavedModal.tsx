"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
} from "@heroui/react";
import Icon from "../Icon";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function PetPhotoSavedModal({ isOpen, onClose }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} placement="center" hideCloseButton>
      <ModalContent className="flex flex-col items-center px-8 py-8 md:py-14 rounded-[16px] md:max-w-[560px]">
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
        <Icon
          sprite="/sprites/sprite-sistem.svg"
          id="icon-check"
          width="69px"
          height="69px"
          className="block mb-4 md:hidden"
        />
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
