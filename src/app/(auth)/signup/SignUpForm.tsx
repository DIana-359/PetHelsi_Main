"use client";
import { useState } from "react";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Icon from "@/components/Icon";
import { IoEyeOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useUIStore } from "@/stores/useUIStore";
import { signUp } from "@/services/auth/signUp";
import GoBack from "@/components/GoBack";
import { handleGoogleLogin } from "@/app/(auth)/AuthFunction";
import AuthInput from "@/components/AuthInput/AuthInput";
import AuthRoleTabs from "@/components/AuthRoleTabs/AuthRoleTabs";
import clsx from "clsx";
import { useSignIn } from "@/hooks/auth/useSignIn";
import { signUpSchema, SignUpFormValues } from "@/utils/schemas/auth.schemas";
import { AuthRoleWithEmpty } from "@/types/roleTypes";

type SignUpFormProps = {
  hideRoleTabs?: boolean;
};

export default function SignUpForm({ hideRoleTabs = false }: SignUpFormProps) {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<AuthRoleWithEmpty>(
    hideRoleTabs ? "CLIENT" : null
  );
  const [tabError, setTabError] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const setIsVetBackground = useUIStore(s => s.setIsVetBackground);
  const { mutateAsync: login } = useSignIn();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: "", password: "", repeatPassword: "" },
  });

  const togglePassword = () => setPasswordVisible(v => !v);

  const renderPasswordToggle = () => (
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
  );

  const onSubmit = async (values: SignUpFormValues) => {
    if (!selectedRole) {
      setTabError(true);
      return;
    }

    const dataToSend = {
      email: values.email.trim(),
      password: values.password.trim(),
      repeatPassword: values.repeatPassword.trim(),
      roleType: selectedRole,
    };

    const dataToLogin = {
      email: values.email.trim(),
      password: values.password.trim(),
    };

    try {
      const resultAction = await signUp(dataToSend);
      if (resultAction?.email) {
        await login(dataToLogin);
        const home =
          resultAction.roleType === "VET" ? "/vet/profile" : "/owner/profile";
        router.push(home);
        router.refresh();
      } else {
        setTabError(true);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <form
      className="!z-1 p-[16px] min-w-[311px] w-full max-w-[437px] flex flex-col gap-[16px] bg-background rounded-[18px]
      xs:pt-[40px] xs:pb-[32px] xs:px-[66px]"
      onSubmit={handleSubmit(onSubmit)}>
      <GoBack />
      <h2 className="text-[22px] xs:text-[28px] 2xl:text-[30px] font-[500] leading-[1.4] 2xl:leading-[1.5] text-gray-900 mx-auto mb-[24px] lg:mb-[32px]">
        Реєстрація в{" "}
        <span className="text-[22px] xs:text-[28px] 2xl:text-[30px] font-[500] leading-[1.4] 2xl:leading-[1.5] text-primary-700 ">
          PetHelsi
        </span>
      </h2>

      {!hideRoleTabs && (
        <AuthRoleTabs
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
          tabError={tabError}
          setTabError={setTabError}
          setIsVetBackground={setIsVetBackground}
        />
      )}

      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <AuthInput
            id="email"
            label="E-mail*"
            placeholder="Введіть E-mail"
            type="email"
            value={field.value}
            onChange={field.onChange}
            error={errors.email?.message ?? null}
          />
        )}
      />
      <div>
        <div className="mb-[4px]">
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <AuthInput
                id="password"
                label="Пароль*"
                placeholder="Введіть пароль"
                type={isPasswordVisible ? "text" : "password"}
                value={field.value}
                onChange={field.onChange}
                rightIcon={renderPasswordToggle()}
              />
            )}
          />
        </div>
        <p
          className={clsx(
            "text-[12px] font-[400] leading-[1.1]",
            errors.password ? "text-error-500" : "text-gray-900"
          )}>
          Пароль має містити мінімум 7 символів: одну велику літеру і цифру
        </p>
      </div>

      <Controller
        control={control}
        name="repeatPassword"
        render={({ field }) => (
          <AuthInput
            id="repeatPassword"
            label="Повторіть пароль*"
            placeholder="Повторіть пароль"
            type={isPasswordVisible ? "text" : "password"}
            value={field.value}
            onChange={field.onChange}
            error={errors.repeatPassword?.message ?? null}
            rightIcon={renderPasswordToggle()}
          />
        )}
      />
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
          handleGoogleLogin(selectedRole);
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
