"use client";
import React, { useEffect, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Form, Input, Button } from "@heroui/react";
import { fetchSigninCookieProxy } from "@/app/api/auth-proxy";
import Icon from "@/components/Icon";
// import ForgotPassword from "@/components/ForgotPassword";
import GoBack from "@/components/GoBack";
import {handleGoogleLogin} from "../AuthFunction";

export default function SignInFormCooky() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
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
    const formData = Object.fromEntries(new FormData(e.currentTarget));
    const email = formData.email ? String(formData.email).trim() : "";
    const password = formData.password ? String(formData.password).trim() : "";

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

  // function handlertModal() {
  //   setModalContent(<ForgotPassword />);
  //   setIsModalOpen(true);
  // }

  return (
    <Form
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
          value={email}
          onChange={e => setEmail(e.target.value)}
          classNames={{
            input:
              " text-[14px] font-[400] leading-[1.4] text-gray-900 placeholder:text-[14px] placeholder:font-[400] placeholder:leading-[1.4] placeholder:text-gray-400 outline-none",
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
              return "Пароль має містити не менше 6 символів, одну велику літеру та одну цифру";
            }
          }}
        />
      </div>

      <div className=" w-full min-w-[256px] max-w-[437px] flex items-center justify-between ">
        <div className="flex items-center gap-[4px]">
          <input
            type="checkbox"
            className=" cursor-pointer"
            checked={isCheckedRemember}
            onChange={handleCheckedRemember}
          />
          <label className="text-[12px] font-[400] leading-[1.4] text-gray-900">
            Запам&apos;ятати мене
          </label>
        </div>

        {/* <button
          type="button"
          onClick={() => {
            handlertModal();
          }}
          className="text-[12px] font-[500] leading-[1.4] text-primary-700 underline hover:text-primary-800 cursor-pointer">
          Забули пароль?
        </button> */}
      </div>

      <div className="w-full">
        <Button color="primary" type="submit" className="w-full ">
          Увійти
        </Button>
      </div>

      <p className="mx-auto text-[14px] font-[400] leading-[1.4] text-gray-900">
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

      <p className="mx-auto text-[14px] font-[400] leading-[1.4] text-gray-900 text-center ">
        Немає акаунту?
        <Link
          href={"/signup"}
          className="ml-1 text-[14px] font-[400] leading-[1.4] text-primary-700 transition-colors duration-200 ease-in-out hover:text-primary-800 underline">
          {" "}
          <span>Зареєструйтесь</span>
        </Link>
      </p>
    </Form>
  );
}
