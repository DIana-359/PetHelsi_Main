"use client";
import React, { useState } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import { IoEyeOutline } from "react-icons/io5";
import { Tabs, Tab } from "@heroui/tabs";
import { useRouter } from "next/navigation";
import { fetchSignup } from "../../../contextAuth/operations";
import { useSistem } from "@/contextSistem/contextSistem";
import { fetchSigninCookieProxy } from "@/app/api/auth-proxy";
import GoBack from "@/components/GoBack";
import { handleGoogleLogin } from "../AuthFunction";

type RoleType = "CLIENT" | "VET";

export default function SignUpForm() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<RoleType | "">("");
  const [tabError, setTabError] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const { setIsVetBackground } = useSistem();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{7,255}$/;

  const togglePassword = () => setPasswordVisible(!isPasswordVisible);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);

    if (!selectedRole) {
      setTabError(true);
      return;
    }
    if (!emailRegex.test(email) || !passwordRegex.test(password)) {
      return;
    }
    if (password !== repeatPassword) {
      return;
    }

    const dataToSend = {
      email: email.trim(),
      password: password.trim(),
      repeatPassword: repeatPassword.trim(),
      roleType: selectedRole.trim(),
    };

    const dataToLogin = {
      email: email.trim(),
      password: password.trim(),
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
    <form
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
            tabList: `!flex !items-center !justify-between bg-background border-[1px] ${
              tabError ? "border border-red-500 rounded-[8px]" : "border-0"
            }`,
          }}
          fullWidth
          aria-label="Tabs form"
          selectedKey={selectedRole}
          onSelectionChange={key => {
            const role = key as RoleType | "";
            setSelectedRole(role);
            setTabError(false);
            setIsVetBackground(role === "VET");
          }}>
          <Tab
            key="CLIENT"
            title={
              <span
                className={`text-[12px] xs:text-[14px] font-[400] leading-[1.4] ${
                  selectedRole === "CLIENT"
                    ? "text-primary-700"
                    : "text-gray-900"
                }`}>
                Я - власник тварини
              </span>
            }
            className={`!bg-background border-[1px] ${
              selectedRole === "CLIENT"
                ? "border-primary-700"
                : "border-transparent"
            } !opacity-100`}
          />

          <Tab
            key="VET"
            title={
              <span
                className={`text-[12px] xs:text-[14px] font-[400] leading-[1.4] ${
                  selectedRole === "VET" ? "text-primary-700" : "text-gray-900"
                }`}>
                Я - ветеринар
              </span>
            }
            className={`!bg-background border-[1px] ${
              selectedRole === "VET"
                ? "border-primary-700"
                : "border-transparent"
            } !opacity-100`}
          />
        </Tabs>

        {tabError && (
          <div className="text-[12px] text-error-500 t-1 r-0 absolute">
            Будь ласка, оберіть варіант
          </div>
        )}
      </div>

      <div className="w-full">
        <label className="block text-[12px] font-[500] leading-[1.4] text-gray-700 mb-[8px]">
          E-mail*
        </label>
        <input
          required
          type="email"
          placeholder="Введіть E-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className={`w-full px-3 py-2 bg-background border-[1px] rounded-[12px] text-[14px] font-[400] 
            leading-[1.4] text-gray-900 placeholder:text-gray-400 outline-none
            ${
              submitted && !emailRegex.test(email)
                ? "border-error-500"
                : "border-primary-300"
            }`}
        />
        {submitted && !emailRegex.test(email) && (
          <p className="text-[12px] font-[400] text-red-500 mt-2">
            Будь ласка, введіть коректний E-mail
          </p>
        )}
      </div>

      <div className="w-full">
        <label className="block text-[12px] font-[500] leading-[1.4] text-gray-700 mb-[8px]">
          Пароль*
        </label>
        <div className="relative">
          <input
            required
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Введіть пароль"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className={`w-full px-3 py-2 bg-background border-[1px] rounded-[12px] text-[14px] font-[400] 
              leading-[1.4] text-gray-900 placeholder:text-gray-400 outline-none
              ${
                submitted && !passwordRegex.test(password)
                  ? "border-error-500"
                  : "border-primary-300"
              }`}
          />
          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 border-0 bg-transparent">
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
        </div>
        {submitted && !passwordRegex.test(password) && (
          <p className="text-[12px] font-[400] text-red-500 mt-2">
            Пароль має містити не менше 7 символів, одну велику літеру та одну
            цифру
          </p>
        )}
      </div>

      <div className="w-full">
        <label className="block text-[12px] font-[500] leading-[1.4] text-gray-700 mb-[8px]">
          Повторіть пароль*
        </label>
        <div className="relative">
          <input
            required
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Повторіть пароль"
            value={repeatPassword}
            onChange={e => setRepeatPassword(e.target.value)}
            className={`w-full px-3 py-2 bg-background border-[1px] rounded-[12px] text-[14px] font-[400] 
              leading-[1.4] text-gray-900 placeholder:text-gray-400 outline-none
              ${
                submitted && password !== repeatPassword
                  ? "border-error-500"
                  : "border-primary-300"
              }`}
          />
          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 border-0 bg-transparent">
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
        </div>
        {submitted && password !== repeatPassword && (
          <p className="text-[12px] font-[400] text-red-500 mt-2">
            Паролі повинні співпадати
          </p>
        )}
      </div>

      <div className="w-full">
        <button
          type="submit"
          className="w-full py-2 mb-[4px] mt-[8px] bg-primary-700 text-white rounded-[12px] hover:bg-primary-800 transition-colors hover:cursor-pointer">
          Зареєструватися
        </button>

        <p className="w-[248px] text-center mx-auto text-[12px] font-[500] leading-[1.4] text-gray-900">
          Реєструючись ви приймаєте умови
          <Link
            href={"/privacy-policy"}
            className="text-[12px] font-[500] leading-[1.4] text-primary-700 hover:text-primary-800 underline ml-1">
            політики конфіденційності
          </Link>
        </p>
      </div>

      <p className="mx-auto text-[14px] font-[400] leading-[1.4] text-gray-900 mb-1">
        або увійти за допомогою
      </p>

      <button
        type="button"
        onClick={() => {
          if (!selectedRole) {
            setTabError(true);
            return;
          }
          document.cookie = `role=${selectedRole}; path=/; max-age=300`;
          handleGoogleLogin();
        }}
        className="w-full mx-auto py-2 text-[16px] font-[400] leading-[1.4] text-primary-700 bg-background border-[1px] rounded-[8px] border-primary-700 hover:cursor-pointer">
        <Icon
          sprite="/sprites/sprite-social-media.svg"
          id="icon-Component_Icons"
          width="20px"
          height="20px"
          className="inline-block mr-2"
        />
        Google
      </button>

      <p className="mx-auto text-[14px] font-[400] leading-[1.4] text-gray-900">
        Вже зареєстровані?
        <Link
          href={"/signin"}
          className="ml-1 text-[14px] font-[400] leading-[1.4] text-primary-700 hover:text-primary-800 underline">
          Увійти
        </Link>
      </p>
    </form>
  );
}
