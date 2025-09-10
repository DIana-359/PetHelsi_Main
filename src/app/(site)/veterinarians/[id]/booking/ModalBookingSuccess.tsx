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

export function ModalBookingSuccess({isOpen, onClose}: Props) {
  const router = useRouter();

  const handleSubmit = () => {
    router.push('/owner/history');
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
        <ModalHeader className="mt-10 text-xl sm:text-2xl font-medium justify-center px-4 sm:px-6 md:px-8 pt-0 pb-6 sm:pb-10 text-gray-900">
          <div className="flex flex-col items-center gap-4">
            <Icon
              sprite="/sprites/sprite-sistem.svg"
              id="icon-check"
              width="42px"
              height="42px"
              className="fill-primary-700 stroke-primary-700 hover:stroke-primary-800 hover:fill-primary-800 cursor-pointer"
            />
            <div className="text-2xl font-medium">Оплата пройшла успішно!</div>
            <div className="text-base font-medium text-center">
              Чекайте повідомлення на підтвердження у вашому кабінеті або за вказаною електронною адресою.
            </div>
          </div>
        </ModalHeader>

        <ModalBody className="pt-0 pb-6 sm:pb-10 px-6 sm:px-10 md:px-9 gap-4 overflow-y-auto scrollbar-thin scrollbar-thumb-[#C9E2F8] scrollbar-track-transparent scrollbar-thumb-rounded [&::-webkit-scrollbar]:w-[6px]">
          <div className="flex flex-col font-normal border-b border-primary-200 mb-4 pb-4 gap-2">
            <div className="flex">
              <p className="w-[50%] text-sm text-gray-500">Тварина:</p>
              <p className="w-[50%] text-base text-gray-900">Тіффані</p>
            </div>
            <div className="flex">
              <p className="w-[50%] text-sm text-gray-500">Дата:</p>
              <p className="w-[50%] text-base text-gray-900">Пт., 16 Лют 2024</p>
            </div>
            <div className="flex">
              <p className="w-[50%] text-sm text-gray-500">Час:</p>
              <p className="w-[50%] text-base text-gray-900">11:00 (GMT+02:00)</p>
            </div>
            <div className="flex">
              <p className="w-[50%] text-sm text-gray-500">Лікар:</p>
              <p className="w-[50%] text-base text-gray-900">Шелудяка О. В.</p>
            </div>
            <div className="flex">
              <p className="w-[50%] text-sm text-gray-500">Причина звернення:</p>
              <p className="w-[50%] text-base text-gray-900">Проблеми із травленням</p>
            </div>
          </div>
          <div className="w-full">
            <div className="flex text-base font-medium text-gray-900">
              <p className="w-[50%]">Вартість</p>
              <p className="w-[50%]">800 UAH</p>
            </div>
          </div>
        </ModalBody>

        <ModalFooter className="flex flex-col gap-2 pt-0 px-6 sm:px-10 md:px-15 pb-6 sm:pb-8">
          <Button color="primary" onPress={handleSubmit} className="w-full rounded-md">
            До історії прийомів
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
