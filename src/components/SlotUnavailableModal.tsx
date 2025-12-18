"use client";

import { Modal, ModalContent, ModalBody } from "@heroui/modal";
import Icon from "@/components/Icon";

type SlotUnavailableModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SlotUnavailableModal({
  isOpen,
  onClose,
}: SlotUnavailableModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      hideCloseButton={true}
      size="lg"
      placement="center"
      backdrop="blur"
      className="max-w-[343px] md:max-w-[560px] p-0 rounded-2xl"
    >
      <ModalContent className="relative p-0">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 end-4 w-[40px] h-[40px] flex items-center justify-center text-primary-700 hover:text-primary-800 cursor-pointer z-10"
        >
          <Icon
            sprite="/sprites/sprite-sistem.svg"
            id="icon-close"
            width="24px"
            height="24px"
            className="fill-primary-700 stroke-primary-700 hover:stroke-primary-800 hover:fill-primary-800"
          />
        </button>

        <ModalBody className="px-0 pt-13 pb-8 md:pt-20 md:pb-14 flex flex-col items-center text-center gap-0">
          <h2 className="max-w-[256px] md:max-w-full text-xl font-semibold leading-[1.25] md:text-2xl md:font-medium text-gray-900 mb-4 md:mb-2 md:leading-[1.2]">
            Запис на цей час уже недоступний
          </h2>

          <p className="text-base text-gray-600 mb-8 leading-[1.2] md:hidden">
            Оберіть інший вільний час, із
            <br />
            доступних у календарі
            <br />
            ветеринара
          </p>

          <p className="hidden md:block text-base text-gray-600 mb-8 leading-[1.2]">
            Оберіть інший вільний час, із доступних
            <br />
            у календарі ветеринара
          </p>

          <button
            type="button"
            onClick={onClose}
            className="w-full max-w-[304px] max-h-[48px] md:max-h-[51px] py-4 cursor-pointer bg-primary-700 text-white rounded-lg text-base hover:bg-primary-800 transition-colors"
          >
            Обрати інший час
          </button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
