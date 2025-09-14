import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import Icon from "@/components/Icon";
import { useRouter } from "next/navigation";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function ModalBookingCancel({ isOpen, onClose }: Props) {
  const router = useRouter();

  const handleSubmit = () => {
    router.back();
    onClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      placement="center"
      hideCloseButton={true}
      className="rounded-[18px] max-h-[95vh] lg:max-h-[80vh] overflow-y-auto"
    >
      <ModalContent className="flex flex-col max-h-[95vh] lg:max-h-[80vh] overflow-y-auto outline-none">
        <div className="flex justify-end px-4 sm:px-6 md:px-8 lg:px-10 pt-4 sm:pt-6 pb-2">
          <button
            type="button"
            onClick={onClose}
            className="w-[24px] h-[24px] flex items-center text-primary-700 hover:text-primary-800 cursor-pointer"
          >
            <Icon
              sprite="/sprites/sprite-sistem.svg"
              id="icon-close"
              width="24px"
              height="24px"
              className="fill-primary-700 stroke-primary-700 hover:stroke-primary-800 hover:fill-primary-800 cursor-pointer"
            />
          </button>
        </div>
        <ModalHeader className="text-xl sm:text-2xl font-medium justify-center px-4 sm:px-6 md:px-8 pt-0 pb-6 sm:pb-10 text-gray-900">
          <div className="flex flex-col items-center gap-4">
            <div className="text-2xl font-medium">Скасувати бронювання?</div>
            <div className="text-base font-medium text-center">
              Після натискання кнопки "Скасувати" ви не зможете повернутися назад. Ви впевнені, що бажаєте скасувати запис?
            </div>
          </div>
        </ModalHeader>

        <ModalFooter className="flex flex-col gap-2 pt-0 px-6 sm:px-10 md:px-15 pb-6 sm:pb-8">
          <Button color="primary" onPress={onClose} className="w-full rounded-md">
            Продовжити
          </Button>
          <Button
            variant="light"
            onPress={handleSubmit}
            className="w-full rounded-md text-[16px] font-[400] leading-[1.4] text-primary-700 bg-background border-[1px] border-primary-700"
          >
            Скасувати
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
