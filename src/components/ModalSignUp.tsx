"use client";

import { Modal, ModalContent, ModalBody } from "@heroui/modal";
import SignUpForm from "@/app/(auth)/signup/page";
import Icon from "./Icon";

type SignUpModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      placement="center"
      backdrop="blur"
      className="min-w-[311px] max-w-[437px] p-0">
      <ModalContent className="p-0 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 end-4 w-[40px] h-[40px] flex items-center text-primary-700 hover:text-primary-800 cursor-pointer z-10">
          <Icon
            sprite="/sprites/sprite-sistem.svg"
            id="icon-close"
            width="24px"
            height="24px"
            className="fill-primary-700 stroke-primary-700 hover:stroke-primary-800 hover:fill-primary-800 md:w-[40px] md:h-[40px]"
          />
        </button>

        <ModalBody className="p-0">
          <SignUpForm />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
