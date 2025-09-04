"use client";
import React from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import { IoEyeOutline } from "react-icons/io5";
import { Tabs, Tab } from "@heroui/tabs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Button } from "@heroui/react";
import { fetchSignup } from "../../../contextAuth/operations";
import { useSistem } from "@/contextSistem/contextSistem";
import { fetchSigninCookieProxy } from "@/app/api/auth-proxy";
import GoBack from "@/components/GoBack";
import {handleGoogleLogin} from "../AuthFunction";
type RoleType = "CLIENT" | "VET";

export default function SignUpForm() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = React.useState<RoleType | "">("");
  const [tabError, setTabError] = React.useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [isPasswordVisible, setPasswordVisible] = useState<boolean>(false);
  const { setIsVetBackground } = useSistem();

  const togglePassword = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget));

    if (!selectedRole) {
      setTabError(true);
      return;
    }

    if (formData.password !== formData.repeatPassword) {
      setPasswordError(true);
      return;
    }

    setPasswordError(false);
    setTabError(false);

    const dataToSend = {
      email: formData.email.toString().trim(),
      password: formData.password.toString().trim(),
      repeatPassword: formData.repeatPassword.toString().trim(),
      roleType: selectedRole.trim(),
    };

    const dataToLogin = {
      email: formData.email.toString().trim(),
      password: formData.password.toString().trim(),
    };

    try {
      const resultAction = await fetchSignup(dataToSend);

      if (resultAction?.email) {
        await fetchSigninCookieProxy(dataToLogin);
        router.push("/owner/profile");
        router.refresh();
      } else {
        setTabError(true);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  }

  return (
    <Form
      className="!z-1 p-[16px] min-w-[311px] max-w-[437px] flex flex-col gap-[16px] bg-background rounded-[18px] 
      xs:pt-[40px] xs:pb-[32px] xs:px-[66px]"
      onSubmit={onSubmit}>
      <GoBack />

      <h2 className="text-[22px] xs:text-[28px] 2xl:text-[30px] font-[500] leading-[1.4] 2xl:leading-[1.5] text-gray-900 mx-auto mb-[24px] lg:mb-[32px]">
        Реєстрація в{" "}
        <span className="text-[22px] xs:text-[28px] 2xl:text-[30px] font-[500] leading-[1.4] 2xl:leading-[1.5] text-primary-700 ">
          PetHelsi
        </span>
      </h2>
      <div className="relative block mx-auto">
        <Tabs
          className="!bg-background !rounded-[18px]"
          classNames={{
            tabList: `!flex !items-center !justify-between border-[1px] ${
              tabError ? "border border-red-500 rounded-[8px] " : "border-0"
            }`,
          }}
          fullWidth
          aria-label="Tabs form"
          selectedKey={selectedRole}
          onSelectionChange={key => {
            const role = key as RoleType | "";
            setSelectedRole(role);
            setTabError(false);
            if (key === "VET") {
              setIsVetBackground(true);
            } else {
              setIsVetBackground(false);
            }
          }}>
          <Tab
            key="CLIENT"
            title={
              <span
                className={`text-[12px] xs:text-[14px] font-[400] leading-[1.4] transition-colors duration-200 ease-in-out hover:text-primary-800 bg-background ${
                  selectedRole === "CLIENT"
                    ? "text-primary-700 hover:text-primary-700"
                    : "text-gray-900 hover:text-gray-900"
                }`}>
                Я - власник тварини
              </span>
            }
            className={`!bg-background border-[1px]  xs:!px-[15px] ${
              selectedRole === "CLIENT"
                ? "border-primary-700"
                : "border-transparent"
            } !opacity-100 hover:!opacity-100`}
          />

          <Tab
            key="VET"
            title={
              <span
                className={`text-[12px] xs:text-[14px] font-[400] leading-[1.4] transition-colors duration-200 ease-in-out hover:text-primary-800 bg-background  ${
                  selectedRole === "VET"
                    ? "text-primary-700 hover:text-primary-700"
                    : "text-gray-900 hover:text-gray-900"
                }`}>
                Я - ветеринар
              </span>
            }
            className={`!bg-background border-[1px]  xs:!px-[15px] ${
              selectedRole === "VET"
                ? "border-primary-700"
                : "border-transparent"
            } !opacity-100 hover:!opacity-100`}
          />
        </Tabs>

        {tabError && (
          <div className="text-[12px] text-error-500 t-1 r-0 absolute">
            Будь ласка, оберіть варіант
          </div>
        )}
      </div>
      <div className="w-full">
        <label
          htmlFor="email"
          className="block text-[12px] font-[500] leading-[1.4] text-gray-700 mb-[8px]">
          E-mail*
        </label>
        <Input
          isRequired
          name="email"
          placeholder="Введіть E-mail"
          type="email"
          classNames={{
            input:
              "text-[14px] font-[400] leading-[1.4] text-gray-900 placeholder:text-[14px] placeholder:font-[400] placeholder:leading-[1.4] placeholder:text-gray-400 outline-none",
            errorMessage: "text-[12px] font-[400] text-red-500",
          }}
          validate={value => {
            const emailRegex =
              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

            if (!emailRegex.test(value)) {
              return "Будь ласка, введіть коректний E-mail";
            }
          }}
        />
      </div>
      <div className="w-full">
        <label
          htmlFor="password"
          className="block text-[12px] font-[500] leading-[1.4] text-gray-700 mb-[8px]">
          Пароль*
        </label>
        <Input
          isRequired
          name="password"
          placeholder="Введіть пароль"
          type={isPasswordVisible ? "text" : "password"}
          endContent={
            <button type="button" onClick={togglePassword} className="border-0">
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
            input:
              "text-[14px] font-[400] leading-[1.4] text-gray-900 placeholder:text-[14px] placeholder:font-[400] placeholder:leading-[1.4] placeholder:text-gray-400 outline-none",
            errorMessage: "text-[12px] font-[400] text-red-500",
          }}
          validate={value => {
            const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{7,255}$/;
            if (!passwordRegex.test(value)) {
              return "Пароль має містити не менше 7 символів, одну велику літеру та одну цифру";
            }
          }}
        />
      </div>
      <div className="w-full">
        <label
          htmlFor="repeatPassword"
          className="block text-[12px] font-[500] leading-[1.4] text-gray-700 mb-[8px]">
          Повторіть пароль*
        </label>
        <Input
          isRequired
          isInvalid={passwordError}
          errorMessage={passwordError ? "Паролі повинні співпадати" : undefined}
          name="repeatPassword"
          placeholder="Повторіть пароль"
          type={isPasswordVisible ? "text" : "password"}
          onChange={() => setPasswordError(false)}
          endContent={
            <button type="button" onClick={togglePassword} className="border-0">
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
            input:
              "text-[14px] font-[400] leading-[1.4] text-gray-900 placeholder:text-[14px] placeholder:font-[400] placeholder:leading-[1.4] placeholder:text-gray-400 outline-none",
            errorMessage: "text-[12px] font-[400] text-red-500",
          }}
        />
      </div>
      <div className="w-full">
        <Button color="primary" type="submit" className="w-full mb-[4px]">
          Зареєструватися
        </Button>

        <p className=" w-[248px] text-center mx-auto text-[12px] font-[500] leading-[1.4] text-gray-900 ">
          Реєструючись ви приймаєте умови
          <Link
            href={"/privacy-policy"}
            className="text-[12px] font-[500] leading-[1.4] text-primary-700 transition-colors duration-200 ease-in-out hover:text-primary-800 underline">
            {" "}
            <span>політики конфіденційності</span>
          </Link>
        </p>
      </div>
      <p className="mx-auto text-[14px] font-[400] leading-[1.4] text-gray-900 mb-1">
        або увійти за допомогою
      </p>
      <Button
        type="button"
        onPress={handleGoogleLogin}
        color="primary"
        variant="light"
        className="w-full mx-auto text-[16px] font-[400] leading-[1.4] text-primary-700 bg-background border-[1px] rounded-[8px] border-primary-700 ">
        <Icon
          sprite="/sprites/sprite-social-media.svg"
          id="icon-Component_Icons"
          width="20px"
          height="20px"
          className="w-[20px] h-[20px]"
        />{" "}
        Google
      </Button>
      <p className="mx-auto text-[14px] font-[400] leading-[1.4] text-gray-900 ">
        Вже зареєстровані?
        <Link
          href={"/signin"}
          className="ml-1 text-[14px] font-[400] leading-[1.4] text-primary-700 transition-colors duration-200 ease-in-out hover:text-primary-800 underline">
          {" "}
          <span>Увійти</span>
        </Link>
      </p>
    </Form>
  );
}
