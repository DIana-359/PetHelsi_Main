"use client";

import { Modal, ModalContent, ModalBody } from "@heroui/modal";
import SignUpForm from "@/app/(auth)/signup/page";

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
      className="p-2"
    >
      <ModalContent>
        {() => (
          <ModalBody className="py-6">
            <SignUpForm />
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
}
