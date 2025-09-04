"use client";
import React, { useEffect, useState } from "react";
import { Form, Input, Button } from "@heroui/react";
// import ChangePasswordSucsess from "@/components/ModalContet/ChangePasswordSucsess";
import changePassword from "@/app/api/ownerProfile/change-password";
import Icon from "@/components/Icon";
import { IoEyeOutline } from "react-icons/io5";
import ForgotPassword from "@/components/ForgotPassword";

interface IDataPassword {
  oldPassword: string | "";
  newPassword: string | "";
  repeatNewPassword: string | "";
}

export default function ChangePassword() {
  const [formValues, setFormValues] = useState<IDataPassword>({
    oldPassword: "",
    newPassword: "",
    repeatNewPassword: "",
  });
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [isPasswordVisible, setPasswordVisible] = useState<boolean>(false);
  const [isOpenModalChangePassword, setOpenModalChangePassword] =
    useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const { oldPassword, newPassword, repeatNewPassword } = formValues;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;

    const isValid =
      oldPassword.trim() !== "" &&
      passwordRegex.test(newPassword) &&
      newPassword === repeatNewPassword;

    setIsFormValid(isValid);

    if (repeatNewPassword !== "" && newPassword !== repeatNewPassword) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  }, [formValues]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const oldPassword = formData.get("oldPassword")?.toString().trim();
    const newPassword = formData.get("newPassword")?.toString().trim();
    const repeatNewPassword = formData
      .get("repeatNewPassword")
      ?.toString()
      .trim();

    if (newPassword !== repeatNewPassword) {
      setPasswordError(true);
      return;
    }

    try {
      const response = await changePassword({
        oldPassword,
        newPassword,
        repeatNewPassword,
      });
      if (response.ok) {
        setFormValues({
          oldPassword: "",
          newPassword: "",
          repeatNewPassword: "",
        });
      }

      console.log("Success:", response);
    } catch (error) {
      console.error("Помилка зміни паролю:", error);
    }
  }

  const togglePassword = () => {
    setPasswordVisible(!isPasswordVisible);
  };
  return (
    <div className="border-b-[1px] border-gray-100 mb-[24px] pb-[24px]">
      <h2 className="text-[18px] md:text-[20px] font-[600] leading-[1] text-gray-900 mb-4 md:mb-5">
        Змінити пароль
      </h2>

      <Form
        className="!z-1 w-full max-w-[304px] flex flex-col gap-[16px] bg-background"
        onSubmit={onSubmit}>
        <div className="w-full">
          <label
            htmlFor="oldPassword"
            className="block text-[12px] font-[500] leading-[1.4] text-gray-700 mb-[8px]">
            Поточний пароль*
          </label>

          <Input
            isRequired
            name="oldPassword"
            value={formValues.oldPassword}
            onChange={e =>
              setFormValues(prev => ({ ...prev, oldPassword: e.target.value }))
            }
            placeholder="Введіть ваш пароль"
            type={isPasswordVisible ? "text" : "password"}
            endContent={
              <button
                type="button"
                onClick={togglePassword}
                className="border-0">
                {isPasswordVisible ? (
                  <IoEyeOutline className="w-[24px] h-[24px] stroke-gray-350 cursor-pointer" />
                ) : (
                  <Icon
                    sprite="/sprites/sprite-sistem.svg"
                    id="icon-view_hide"
                    width="24px"
                    height="24px"
                    className="stroke-gray-350 cursor-pointer"
                  />
                )}
              </button>
            }
            classNames={{
              inputWrapper:
                "bg-background border-[1px] border-primary-300 rounded-[12px]",
              input:
                "text-[14px] font-[400] leading-[1.4] text-gray-900 placeholder:text-[14px] placeholder:font-[400] placeholder:leading-[1.4] placeholder:text-gray-400 outline-none",
              errorMessage: "text-[12px] font-[400] text-red-500",
            }}
          />
        </div>

        <div className="w-full max-w-[304px]  flex justify-end">
          <button
            type="button"
            onClick={() => setOpenModalChangePassword(true)}
            className="text-[12px] font-[400] leading-[1.4] text-primary-700 hover:text-primary-900 transition-colors duration-300 mt-[-7px] underline cursor-pointer">
            Забули пароль?
          </button>
        </div>

        <div className="w-full">
          <label
            htmlFor="newPassword"
            className="block text-[12px] font-[500] leading-[1.4] text-gray-700 mb-[8px]">
            Новий пароль*
          </label>

          <Input
            isRequired
            name="newPassword"
            value={formValues.newPassword}
            onChange={e =>
              setFormValues(prev => ({ ...prev, newPassword: e.target.value }))
            }
            placeholder="Введіть новий пароль"
            type={isPasswordVisible ? "text" : "password"}
            endContent={
              <button
                type="button"
                onClick={togglePassword}
                className="border-0">
                {isPasswordVisible ? (
                  <IoEyeOutline className="w-[24px] h-[24px] stroke-gray-350 cursor-pointer" />
                ) : (
                  <Icon
                    sprite="/sprites/sprite-sistem.svg"
                    id="icon-view_hide"
                    width="24px"
                    height="24px"
                    className="stroke-gray-350 cursor-pointer"
                  />
                )}
              </button>
            }
            classNames={{
              inputWrapper:
                "bg-background border-[1px] border-primary-300 rounded-[12px]",
              input:
                "text-[14px] font-[400] leading-[1.4] text-gray-900 placeholder:text-[14px] placeholder:font-[400] placeholder:leading-[1.4] placeholder:text-gray-400 outline-none",
              errorMessage: "text-[12px] font-[400] text-red-500",
            }}
            validate={value => {
              const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
              if (!passwordRegex.test(value)) {
                return "Пароль має містити не менше 6 символів, одну велику літеру та одну цифру";
              }
            }}
          />
        </div>
        <div className="w-full">
          <label
            htmlFor="repeatNewPassword"
            className="block text-[12px] font-[500] leading-[1.4] text-gray-700 mb-[8px]">
            Підтвердіть новий пароль*
          </label>

          <Input
            isRequired
            isInvalid={passwordError}
            value={formValues.repeatNewPassword}
            onChange={e => {
              setFormValues(prev => ({
                ...prev,
                repeatNewPassword: e.target.value,
              }));
            }}
            errorMessage={
              passwordError
                ? "Введені паролі не співпадають. Спробуйте ще раз"
                : undefined
            }
            name="repeatNewPassword"
            placeholder="Повторіть новий пароль"
            type={isPasswordVisible ? "text" : "password"}
            endContent={
              <button
                type="button"
                onClick={togglePassword}
                className="border-0">
                {isPasswordVisible ? (
                  <IoEyeOutline className="w-[24px] h-[24px] stroke-gray-350 cursor-pointer" />
                ) : (
                  <Icon
                    sprite="/sprites/sprite-sistem.svg"
                    id="icon-view_hide"
                    width="24px"
                    height="24px"
                    className="stroke-gray-350 cursor-pointer"
                  />
                )}
              </button>
            }
            classNames={{
              inputWrapper:
                "bg-background border-[1px] border-primary-300 rounded-[12px]",
              input:
                "text-[14px] font-[400] leading-[1.4] text-gray-900 placeholder:text-[14px] placeholder:font-[400] placeholder:leading-[1.4] placeholder:text-gray-400 outline-none",
              errorMessage: "text-[12px] font-[400] text-red-500",
            }}
          />
        </div>

        <Button
          type="submit"
          disabled={!isFormValid}
          className={`w-full mt-[16px] ${
            isFormValid
              ? "bg-primary-600 text-white"
              : "bg-gray-200 text-background"
          }`}>
          Змінити пароль
        </Button>
      </Form>

      {isOpenModalChangePassword && (
        <ForgotPassword
          isOpenModalChangePassword={isOpenModalChangePassword}
          setOpenModalChangePassword={setOpenModalChangePassword}
        />
      )}
    </div>
  );
}
