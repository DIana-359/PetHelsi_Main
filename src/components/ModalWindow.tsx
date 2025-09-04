"use client";
import { useRouter } from "next/navigation";
import { Modal, ModalContent, ModalBody } from "@heroui/react";
import { useSistem } from "../contextSistem/contextSistem";
import Icon from "@/components/Icon";

export default function ModalWindow() {
  const router = useRouter();
  const { isModalOpen, setIsModalOpen, modalContent, setModalContent } =
    useSistem();

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };
  const goBack = () => {
    router.back();
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onOpenChange={() => setIsModalOpen(!isModalOpen)}
        className="p-[16px] xs:px-[32px] xs:pt-[32px] xs:pb-[56px] bg-background min-w-[200px]"
        classNames={{
          wrapper: "items-center",
          closeButton: "hidden",
        }}>
        <ModalContent>
          <>
            <div className="flex items-center justify-between gap-[4px] mb-[8px]">
              <button
                type="button"
                className="w-[24px] h-[24px] flex items-center text-primary-700 hover:text-primary-800 cursor-pointer"
                onClick={() => goBack()}>
                <Icon
                  sprite="/sprites/sprite-sistem.svg"
                  id="icon-arrow-Auth"
                  width="24px"
                  height="24px"
                  className="fill-primary-700 hover:stroke-primary-800 hover:fill-primary-800 cursor-pointer"
                />
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="w-[24px] h-[24px] flex items-center text-primary-700 hover:text-primary-800 cursor-pointer">
                <Icon
                  sprite="/sprites/sprite-sistem.svg"
                  id="icon-close"
                  width="24px"
                  height="24px"
                  className="fill-primary-700 stroke-primary-700 hover:stroke-primary-800 hover:fill-primary-800 cursor-pointer"
                />
              </button>
            </div>

            <ModalBody className="flex items-center justify-center">
              {modalContent}
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
