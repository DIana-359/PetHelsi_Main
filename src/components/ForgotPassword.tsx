"use client";
import { useState } from "react";
import { Modal, ModalContent, ModalBody, Button } from "@heroui/react";
import Icon from "@/components/Icon";
import { useForgotPassword } from "@/hooks/useForgotPassword";
interface ForgotPasswordProps {
  isOpenModalChangePassword: boolean;
  setOpenModalChangePassword: (value: boolean) => void;
}

export default function ForgotPassword({
  isOpenModalChangePassword,
  setOpenModalChangePassword,
}: ForgotPasswordProps) {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const {
    mutate,
    isPending,
    isSuccess,
    error: mutationError,
    reset
  } = useForgotPassword();

  const serverErrorMessage =
    mutationError instanceof Error
      ? {
          INVALID_EMAIL: "Невірно введено E-mail",
          EMAIL_SERVICE_UNAVAILABLE:
            "Сервіс електронної пошти тимчасово недоступний",
        }[mutationError.message] ?? "Не вдалося надіслати лист"
      : "";

  const validateEmail = (value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleBlur = () => {
    if (!email) {
      setError("Email обов'язковий");
    } else if (!validateEmail(email)) {
      setError("Невірний формат E-mail");
    } else {
      setError("");
    }
  };

  const handleSubmit = () => {
    if (!email) {
      setError("Email обов'язковий");
      return;
    }

    if (!validateEmail(email)) {
      setError("Невірний формат E-mail");
      return;
    }

    setError("");

    mutate(email);
  };

  return (
    <Modal
      isOpen={isOpenModalChangePassword}
      onOpenChange={() => {
        setOpenModalChangePassword(!isOpenModalChangePassword);
        reset();
        setEmail("");
        setError("");
      }}

      className="p-[16px] xs:px-[32px] xs:pt-[32px] xs:pb-[56px] bg-background min-w-[200px]"
      classNames={{
        wrapper: "items-center",
        closeButton: "hidden",
      }}>
      <ModalContent>
        {" "}
        <button
          type="button"
          onClick={() => setOpenModalChangePassword(false)}
          className="w-[24px] h-[24px] flex items-center text-primary-700 hover:text-primary-800 cursor-pointer self-end">
          <Icon
            sprite="/sprites/sprite-sistem.svg"
            id="icon-close"
            width="24px"
            height="24px"
            className="fill-primary-700 stroke-primary-700 hover:stroke-primary-800 hover:fill-primary-800 cursor-pointer"
          />
        </button>
        {isSuccess ? (
          <p className="py-[10px] text-[16px] font-[400] leading-[1.4] text-gray-900 text-center">
            Лист із кодом підтвердження
            <br /> надіслано на ваш E-mail
          </p>
        ) : (
          <>
            <ModalBody className="flex items-center justify-center">
              <div className="flex flex-col items-center justify-center">
                <h1 className="text-[20px] md:text-[24px] font-[500] md:leading-[1.5] text-gray-900 mb-[8px] text-center">
                  Забули пароль?
                </h1>
                <p className="w-full max-w-[304px] text-[16px] font-[400] leading-[1.4] text-gray-900 mb-[24px] text-center">
                  Введіть E-mail для отримання коду підтвердження
                </p>
                <label className="text-[12px] font-[500] leading-[1.4] text-gray-900 flex flex-col gap-[8px] w-full max-w-[304px] relative mb-[32px]">
                  E-mail
                  <input
                    type="email"
                    value={email}
                    className={`p-[12px] rounded-[8px] border border-solid border-primary-300 text-[14px] font-[400] leading-[1.4] text-gray-900 cursor-pointer focus:outline-none focus:border-primary-300  ${
                      error ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Введіть E-mail"
                    onChange={e => setEmail(e.target.value)}
                    onBlur={handleBlur}
                  />
                  {(error || serverErrorMessage) && (
                    <p className="text-red-500 text-[12px] absolute left-0 bottom-[-18px]">
                      {error || serverErrorMessage}
                    </p>
                  )}
                </label>

                <Button
                  onPress={handleSubmit}
                  color="primary"
                  type="button"
                  isLoading={isPending}
                  isDisabled={isPending || isSuccess}
                  className="w-full max-w-[304px] h-[54px] cursor-pointer">
                  Отримати код
                </Button>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
