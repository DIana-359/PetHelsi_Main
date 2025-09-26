"use client";
import React, { useEffect, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { fetchSigninCookieProxy } from "@/app/api/auth-proxy";
import Icon from "@/components/Icon";
// import ForgotPassword from "@/components/ForgotPassword";
import GoBack from "@/components/GoBack";
import { handleGoogleLogin } from "../AuthFunction";
import AuthInput from "@/components/AuthInput/AuthInput";
import { emailRegex } from "@/utils/validation/validationAuth";

export default function SignInFormCooky() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState<boolean>(false);
  const [isCheckedRemember, setIsCheckedRemember] = useState<boolean>(false);

  useEffect(() => {
    const savedEmail = Cookies.get("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setIsCheckedRemember(true);
    }
  }, []);

  const handleCheckedRemember = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = event.target.checked;
    setIsCheckedRemember(checked);

    if (!checked) {
      Cookies.remove("rememberedEmail");
    }
  };

  const togglePassword = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);

    if (
      !emailRegex.test(email) ||
      !/^(?=.*[A-Z])(?=.*\d).{7,255}$/.test(password)
    ) {
      return;
    }

    if (isCheckedRemember) {
      Cookies.set("rememberedEmail", email, { expires: 7 });
    } else {
      Cookies.remove("rememberedEmail");
    }

    try {
      await fetchSigninCookieProxy({ email, password });
      router.push("/owner/profile");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Login error:", error.message);
      } else {
        console.error("Unexpected login error:", error);
      }
      alert("Неправильний email або пароль");
    }
  }

  return (
    <form
      className="!z-1 p-[16px] min-w-[311px] max-w-[437px] flex flex-col gap-[16px] bg-background rounded-[18px] 
      xs:pt-[40px] xs:pb-[32px] xs:px-[66px]"
      onSubmit={onSubmit}>
      <GoBack />

      <h2 className="min-w-[296px] max-w-[437px] text-[22px] xs:text-[28px] 2xl:text-[30px] font-[500] leading-[1.4] 2xl:leading-[1.5] text-gray-900 text-center mx-auto mb-[24px] ">
        Вхід в{" "}
        <span className="text-[22px] xs:text-[28px] 2xl:text-[30px] font-[500] leading-[1.4] 2xl:leading-[1.5] text-primary-700 ">
          PetHelsi
        </span>
      </h2>

      <AuthInput
        id="email"
        label="E-mail*"
        type="email"
        value={email}
        placeholder="Введіть E-mail"
        onChange={e => setEmail(e.target.value)}
        error={
          submitted && (!email || !emailRegex.test(email))
            ? "Будь ласка, введіть коректний E-mail"
            : null
        }
      />

      <AuthInput
        id="password"
        label="Пароль*"
        type={isPasswordVisible ? "text" : "password"}
        value={password}
        placeholder="Введіть пароль"
        onChange={e => setPassword(e.target.value)}
        error={
          submitted &&
          (!password || !/^(?=.*[A-Z])(?=.*\d).{7,255}$/.test(password))
            ? "Пароль має містити не менше 7 символів, одну велику літеру та одну цифру"
            : null
        }
        rightIcon={
          <button
            type="button"
            onClick={togglePassword}
            className="border-0 bg-transparent flex items-center">
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
      />

      <div className=" w-full min-w-[256px] max-w-[437px] flex items-center justify-between">
        <div className="flex items-center gap-[4px]">
          <input
            type="checkbox"
            className="cursor-pointer"
            checked={isCheckedRemember}
            onChange={handleCheckedRemember}
          />
          <label className="text-[12px] font-[400] leading-[1.4] text-gray-900">
            Запам&apos;ятати мене
          </label>
        </div>
      </div>

      <div className="w-full">
        <button
          type="submit"
          className="w-full py-[10px] bg-primary-700 text-white rounded-[12px] hover:bg-primary-800 transition-colors hover:cursor-pointer">
          Увійти
        </button>
      </div>

      <p className="mx-auto text-[14px] font-[400] leading-[1.4] text-gray-900">
        або увійти за допомогою
      </p>

      <button
        type="button"
        onClick={handleGoogleLogin}
        className="w-full mx-auto py-[10px] text-[16px] font-[400] leading-[1.4] text-primary-700 bg-background border-[1px] rounded-[8px] border-primary-700 hover:bg-gray-50 transition-colors hover:cursor-pointer">
        <Icon
          sprite="/sprites/sprite-social-media.svg"
          id="icon-Component_Icons"
          width="20px"
          height="20px"
          className="inline-block mr-2"
        />
        Google
      </button>

      <p className="mx-auto text-[14px] font-[400] leading-[1.4] text-gray-900 text-center">
        Немає акаунту?
        <Link
          href={"/signup"}
          className="ml-1 text-[14px] font-[400] leading-[1.4] text-primary-700 transition-colors duration-200 ease-in-out hover:text-primary-800 underline">
          Зареєструйтесь
        </Link>
      </p>
    </form>
  );
}
