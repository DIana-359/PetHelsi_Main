import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";
import BookingCalendar from "@/components/BookingCalendar/BookingCalendar";
import Icon from "../Icon";

type Props = {
  vetId: string;
  isOpen: boolean;
  onClose: () => void;
};

export default function BookingCalendarMobileModal({ vetId, isOpen, onClose }: Props) {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      isDismissable={false}
      size="full"
      scrollBehavior="inside"
      hideCloseButton={true}
    >
      <ModalContent className="px-4 pt-3">
        <>
          <ModalHeader className="flex items-center justify-between p-0 mb-9 text-gray">
            <p>Більше вільних годин</p>
            <button
              type="button"
              onClick={onClose}
              aria-label="Закрити"
              className="w-[24px] h-[24px] flex items-center text-gray hover:text-primary-800 cursor-pointer"
            >
              <Icon
                sprite="/sprites/sprite-sistem.svg"
                id="icon-close-no-color"
                width="24px"
                height="24px"
                className="fill-gray stroke-gray hover:stroke-primary-800 hover:fill-primary-800 cursor-pointer"
              />
            </button>
          </ModalHeader>
          <ModalBody className="p-0">
            <BookingCalendar vetId={vetId} variant="mobile" />
          </ModalBody>
        </>
      </ModalContent>
    </Modal>
  );
}
