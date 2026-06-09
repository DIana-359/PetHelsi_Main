"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button, Image, Input } from "@heroui/react";
import GoBack from "@/components/GoBack";
import Icon from "@/components/Icon";
import AvatarUser from "../ProfileOwner/AvatarUser";
import { Pulse } from "../Pulse";
import { useModalStore } from "@/stores/useModalStore";
import { useUpdateProfile } from "@/hooks/owners/useUpdateProfile";
import { useProfile } from "@/hooks/owners/useProfile";
import {
  profileSchema,
  ProfileFormValues,
} from "@/utils/schemas/profile.schemas";
import {
  FormInput,
  formInputClassNames,
  formLabelClass,
} from "@/components/Form/FormInput";
import { FormDatePicker } from "@/components/Form/FormDatePicker";

export default function ProfileEditForm() {
  const router = useRouter();
  const { data } = useProfile();
  const { mutateAsync, isPending } = useUpdateProfile();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(data?.avatar || "");
  const openModal = useModalStore((s) => s.open);
  const closeModal = useModalStore((s) => s.close);

  const { control, handleSubmit, reset } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    mode: "onTouched",
    defaultValues: {
      lastName: "",
      firstName: "",
      middleName: "",
      phone: "",
      birthday: "",
      city: "",
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        lastName: data.lastName ?? "",
        firstName: data.firstName ?? "",
        middleName: data.middleName ?? "",
        phone: data.phone ?? "",
        birthday: data.birthday ?? "",
        city: data.city ?? "",
      });
      setImage(data.avatar ?? "");
    }
  }, [data, reset]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setImage(URL.createObjectURL(file));
  };

  function handlecloseModal() {
    closeModal();
    router.push("/owner/profile");
  }

  function handleCancelUpdateProfile() {
    router.push("/owner/profile");
  }

  const onSubmit = async (values: ProfileFormValues) => {
    const payload = {
      lastName: values.lastName,
      firstName: values.firstName,
      middleName: values.middleName || null,
      phone: values.phone.replace(/\s+/g, ""),
      birthday: values.birthday || null,
      city: values.city,
    };

    try {
      await mutateAsync(payload);

      openModal(
        <>
          <p className="text-[14px] md:text-[16px] font-[400] leading-[1.4] text-gray-900 mb-1">
            Ваші дані успішно змінені.
          </p>
          <Button
            color="primary"
            type="button"
            className="w-full md:w-[280px] text-[14px] md:text-[16px] font-[400] leading-[1.4] text-white"
            onPress={handlecloseModal}>
            Готово
          </Button>
        </>,
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(`Помилка: ${error.message}`);
      } else {
        openModal(
          <>
            <p className="text-[14px] md:text-[16px] font-[400] leading-[1.4] text-gray-900 mb-1">
              Не вдалося оновити дані. Спробуйте пізніше.
            </p>
            <Button
              color="primary"
              type="button"
              className="w-full md:w-[280px] text-[14px] md:text-[16px] font-[400] leading-[1.4] text-white"
              onPress={handlecloseModal}>
              Закрити
            </Button>
          </>,
        );
      }
    }
  };

  if (!data) return <Pulse />;

  return (
    <div className="mb-[24px]">
      <GoBack />

      <h2 className="text-[18px] font-[600] leading-[1] text-gray-900 mb-[24px] mt-[24px] text-center md:text-left">
        Редагування особистого профілю
      </h2>

      <fieldset className="flex flex-col gap-[24px] items-center md:items-start md:flex-row md:gap-[40px]">
        <div>
          <input
            type="file"
            accept="image/*"
            multiple
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
          />
          {image ? (
            <Image
              src={image}
              alt="photo user"
              width={128}
              height={128}
              className="mb-[8px] rounded-full object-cover"
            />
          ) : (
            <AvatarUser
              avatar={image}
              firstName={data?.firstName}
              email={data?.email}
              size={128}
            />
          )}
          <button
            className="p-[8px] flex items-center gap-[8px] group"
            onClick={() => fileInputRef.current?.click()}>
            <Icon
              sprite="/sprites/sprite-sistem.svg"
              id="icon-refresh_2_light"
              width="20px"
              height="20px"
              className="stroke-primary-700 fill-background group-hover:stroke-primary-700 transition-colors duration-300 cursor-pointer"
            />
            <span className="text-[14px] font-[400] leading-[1.4] text-primary-700 group-hover:text-primary-900 cursor-pointer">
              Змінити фото
            </span>
          </button>
        </div>

        <form
          className="w-full max-w-[304px] flex flex-col gap-[16px] bg-background"
          onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            control={control}
            name="lastName"
            label="Прізвище*"
            placeholder="Введіть прізвище"
            isRequired
          />

          <FormInput
            control={control}
            name="firstName"
            label="Ім’я*"
            placeholder="Введіть ім’я"
            isRequired
          />

          <FormInput
            control={control}
            name="middleName"
            label="По-батькові"
            placeholder="Введіть по батькові"
          />

          <FormDatePicker
            control={control}
            name="birthday"
            label="Дата народження"
          />

          <FormInput
            control={control}
            name="phone"
            label="Телефон*"
            placeholder="Введіть номер телефону"
            type="tel"
            isRequired
          />

          <div className="w-full">
            <label htmlFor="email" className={formLabelClass}>
              E-mail*
            </label>
            <Input
              readOnly
              name="email"
              placeholder="Введіть E-mail"
              type="email"
              value={data?.email ?? ""}
              classNames={formInputClassNames}
            />
          </div>

          <FormInput
            control={control}
            name="city"
            label="Місце проживання"
            placeholder="Введіть назву населенного пункту"
            isRequired
          />

          <div className="flex items-center gap-[16px] mt-[16px]">
            <Button
              type="submit"
              isDisabled={isPending}
              className="w-full text-background bg-primary-700">
              Зберегти зміни
            </Button>

            <Button
              type="button"
              onPress={handleCancelUpdateProfile}
              className="w-full text-primary-700 bg-background border-[1px] border-primary-700">
              Скасувати
            </Button>
          </div>
        </form>
      </fieldset>
    </div>
  );
}
