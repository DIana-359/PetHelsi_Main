"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
} from "@heroui/react";
import ModalCloseButton from "../ModalCloseButton";
import { getButtonClasses } from "@/utils/buttonClasses/buttonClasses";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface SavedChangesModalProps {
  isOpen: boolean;
  onSave: () => void;
  // onDiscard: () => void;
  onClose: () => void;
  isLoading?: boolean;
}

export default function SavedChangesModal({
  isOpen,
  onSave,
  onClose,
  isLoading,
}: SavedChangesModalProps) {
  const [activeButton, setActiveButton] = useState<"save" | "cancel">("save");
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      setActiveButton("save");
    }
  }, [isOpen]);
  return (
    <Modal isOpen={isOpen} placement="center" hideCloseButton>
      <ModalContent className="rounded-[16px] pt-13 pb-8 md:pt-20 md:pb-14 max-w-[560px] ">
        <div className="text-[#1e88e5]">
          <ModalCloseButton onClose={onClose} />
        </div>
        <ModalHeader className="text-center pb-4 md:pb-0">
          <h2 className="w-full text-[20px] md:text-[24px] font-[600] text-[#333f5d]">
            Зберегти внесені зміни?
          </h2>
        </ModalHeader>
        <ModalBody className="flex flex-col items-center  text-center gap-4 md:gap-8">
          <p className="text-[#333f5d] text-[14px] md:text-[16px] text-center">
            Покидаючи сторінку, дані будуть
            <span className="block md:inline">втрачені</span>
          </p>
        </ModalBody>

        <div className="flex mt-8 justify-center">
          <div className="flex w-full max-w-[304px] flex-col gap-2">
            <Button
              type="button"
              onClick={() => {
                setActiveButton("save");
                onSave();
              }}
              isDisabled={isLoading}
              className={getButtonClasses("primary", activeButton === "save")}
            >
              Зберегти зміни
            </Button>
            <Button
              type="button"
              onClick={() => {
                setActiveButton("cancel");
                router.push("/owner/pets?unsave=1");
              }}
              className={getButtonClasses(
                "secondary",
                activeButton === "cancel",
              )}
            >
              Не зберігати
            </Button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
}
