"use client";
import { Form, Input, Button } from "@heroui/react";
import updateProfile from "@/app/api/ownerProfile/updateProfile";
import GoBack from "@/components/GoBack";
import Icon from "@/components/Icon";
import { isValidPhoneNumber } from "libphonenumber-js";
import { DayPicker } from "react-day-picker";
import { uk } from "react-day-picker/locale";
import { useEffect, useRef, useState } from "react";
import AvatarUser from "../ProfileOwner/AvatarUser";
import { useRouter } from "next/navigation";
import { useSistem } from "@/contextSistem/contextSistem";
import { useAuth } from "@/contextAuth/authContext";
import { Pulse } from "../Pulse";

export default function ProfileEditForm() {
  const router = useRouter();
  const { userData, setUserData } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(userData?.avatar || "");
  const [selected, setSelected] = useState<Date>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [phone, setPhone] = useState<string | null>(userData?.phone || "");
  // const [email] = useState<string | null>(userData?.email || "");
  const [lastName, setLastName] = useState<string | null>(
    userData?.lastName || ""
  );
  const [firstName, setFirstName] = useState<string | null>(
    userData?.firstName || ""
  );
  const [middleName, setMiddleName] = useState<string | null>(
    userData?.middleName || ""
  );
  const [birthday, setBirthday] = useState<string | null>(
    userData?.birthday || ""
  );
  const [city, setCity] = useState<string | null>(userData?.city || "");
  const [isValidPhone, setIsValidPhone] = useState<boolean>(true);
  const { setIsModalOpen, setModalContent } = useSistem();

  useEffect(() => {
    if (userData) {
      setLastName(userData.lastName || "");
      setFirstName(userData.firstName || "");
      setMiddleName(userData.middleName || "");
      setPhone(userData.phone || "");
      setBirthday(userData.birthday || "");
      setCity(userData.city || "");
      setImage(userData.avatar || "");
      if (userData.birthday) setSelected(new Date(userData.birthday));
    }
  }, [userData]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const localUrl = URL.createObjectURL(file);
    setImage(localUrl);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(value);
    setIsValidPhone(isValidPhoneNumber(value));
  };

  function handlecloseModal() {
    setModalContent(null);
    setIsModalOpen(false);
    router.push("/owner/profile");
  }

  async function handleUpdateForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const cleanPhone = phone ? phone.replace(/\s+/g, "") : "";

    const formData = {
      lastName,
      firstName,
      middleName,
      phone: cleanPhone,
      birthday: selected ? selected.toISOString().slice(0, 10) : birthday,
      city,
      // email,
      // image,
    };

    try {
      await updateProfile(formData);
      const res = await fetch("/api/proxy/get-profile", {
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Не вдалося отримати оновлений профіль");
      }

      const updatedProfile = await res.json();
      setUserData(updatedProfile);
      setModalContent(
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
        </>
      );
      setIsModalOpen(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(`Помилка: ${error.message}`);
      } else {
        setModalContent(
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
          </>
        );
      }
    }
  }
  if (!userData) return <Pulse />;
  function handleCancelUpdateProfile() {
    router.push("/owner/profile");
  }

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
            <img
              src={image}
              alt="photo user"
              className="w-[128px] h-[128px] mb-[8px] rounded-full object-cover"
            />
          ) : (
            <AvatarUser avatar={image} firstLetter={firstName} size={128} />
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

        <Form
          className="w-full max-w-[304px] flex flex-col gap-[16px] bg-background"
          onSubmit={handleUpdateForm}>
          <div className="w-full">
            <label
              htmlFor="lastName"
              className="block text-[12px] font-[500] leading-[1.4] text-gray-700 mb-[8px]">
              Прізвище*
            </label>

            <Input
              value={lastName ?? ""}
              onChange={e => setLastName(e.target.value)}
              isRequired
              name="lastName"
              placeholder="Введіть прізвище"
              type="text"
              classNames={{
                inputWrapper:
                  "bg-white border-[1px] border-primary-300 rounded-[12px] focus-within:border-primary-700 focus-within:ring-0 focus-within:ring-offset-0 focus-within:shadow-none",
                input:
                  "text-[16px] font-[400] leading-[1.4] text-gray-900 placeholder:text-[14px] placeholder:font-[400] placeholder:leading-[1.4] placeholder:text-gray-400 outline-none",
                errorMessage: "text-[12px] font-[400] text-red-500",
              }}
            />
          </div>

          <div className="w-full">
            <label
              htmlFor="firstName"
              className="block text-[12px] font-[500] leading-[1.4] text-gray-700 mb-[8px]">
              Ім’я*
            </label>

            <Input
              value={firstName ?? ""}
              onChange={e => setFirstName(e.target.value)}
              isRequired
              name="firstName"
              placeholder="Введіть ім’я"
              type="text"
              classNames={{
                inputWrapper:
                  "bg-white border-[1px] border-primary-300 rounded-[12px] focus-within:border-primary-700 focus-within:ring-0 focus-within:ring-offset-0 focus-within:shadow-none",
                input:
                  "text-[16px] font-[400] leading-[1.4] text-gray-900 placeholder:text-[14px] placeholder:font-[400] placeholder:leading-[1.4] placeholder:text-gray-400 outline-none",
                errorMessage: "text-[12px] font-[400] text-red-500",
              }}
            />
          </div>

          <div className="w-full">
            <label
              htmlFor="middleName"
              className="block text-[12px] font-[500] leading-[1.4] text-gray-700 mb-[8px]">
              По-батькові
            </label>
            <Input
              value={middleName ?? ""}
              onChange={e => setMiddleName(e.target.value)}
              name="middleName"
              placeholder="Введіть по батькові"
              type="text"
              classNames={{
                inputWrapper:
                  "bg-white border-[1px] border-primary-300 rounded-[12px] focus-within:border-primary-700 focus-within:ring-0 focus-within:ring-offset-0 focus-within:shadow-none",
                input:
                  "text-[16px] font-[400] leading-[1.4] text-gray-900 placeholder:text-[14px] placeholder:font-[400] placeholder:leading-[1.4] placeholder:text-gray-400 outline-none",
                errorMessage: "text-[12px] font-[400] text-red-500",
              }}
            />
          </div>

          <div className="w-full relative">
            <label
              htmlFor="birthday"
              className="block text-[12px] font-[500] leading-[1.4] text-gray-700 mb-[8px]">
              Дата народження
            </label>
            <input
              name="birthday"
              placeholder="ДД/ММ/РРРР"
              value={selected ? selected.toLocaleDateString() : birthday ?? ""}
              readOnly
              onChange={e => setBirthday(e.target.value)}
              onClick={() => setIsOpen(!isOpen)}
              className="w-full border-[1px] border-primary-300 rounded-[12px] px-2 py-[13px] focus:outline-none focus:border-primary-500 text-[16px] font-[500] leading-[1.4] text-gray-950"
            />
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="absolute right-2 bottom-[13px] cursor-pointer">
              <svg
                width="24"
                height="24"
                className="stroke-primary-700 fill-background hover:stroke-primary-900 transition-colors duration-300 pointer-events-none">
                <use href="/sprites/sprite-sistem.svg#icon-calendar" />
              </svg>
            </button>

            {isOpen && (
              <div className="z-99910 w-[318px] absolute top-[82px] bg-white border rounded p-[16px] border-none shadow-sm shadow-gray-300">
                <DayPicker
                  mode="single"
                  ISOWeek
                  locale={uk}
                  selected={selected}
                  onSelect={date => {
                    setSelected(date);
                    setIsOpen(false);
                  }}
                  captionLayout="dropdown"
                  classNames={{
                    root: "z-10 bg-background",
                    weekday: "p-[9px] hover:bg-blue-100 rounded-md",
                    day_button: "p-[9px] hover:bg-blue-100 rounded-md",
                    selected: "hover:hover:bg-blue-100",
                    today: "text-primary-700",
                    nav_button:
                      "text-gray-400 hover:text-gray-600 disabled:opacity-50",
                    chevron: "fill-gray-500",
                    caption_dropdowns: "flex gap-4 justify-center items-center",
                    dropdown:
                      "px-2 py-2 rounded-lg border border-primary-300 bg-white text-gray-900 text-base font-medium focus:border-primary-700 focus:outline-none transition",
                  }}
                  styles={{
                    caption_label: { display: "none" },
                  }}
                />
              </div>
            )}
          </div>

          <div className="w-full">
            <label
              htmlFor="phone"
              className="block text-[12px] font-[500] leading-[1.4] text-gray-700 mb-[8px]">
              Телефон*
            </label>
            <Input
              isRequired
              name="phone"
              placeholder="Введіть номер телефону"
              type="tel"
              value={phone ?? ""}
              onChange={handlePhoneChange}
              isInvalid={!isValidPhone}
              errorMessage={
                !isValidPhone ? "Введіть коректний номер телефону" : undefined
              }
              classNames={{
                inputWrapper:
                  "bg-white border-[1px] border-primary-300 rounded-[12px] focus-within:border-primary-700 focus-within:ring-0 focus-within:ring-offset-0 focus-within:shadow-none",
                input:
                  "text-[16px] font-[400] leading-[1.4] text-gray-900 placeholder:text-[14px] placeholder:font-[400] placeholder:leading-[1.4] placeholder:text-gray-400 outline-none",
                errorMessage: "text-[12px] font-[400] text-red-500",
              }}
              validate={isValid => {
                if (!isValid) {
                  return "Введіть номер телефону у форматі +380 (XX) XXX-XX-XX";
                }
              }}
            />
          </div>

          <div className="w-full">
            <label
              htmlFor="email"
              className="block text-[12px] font-[500] leading-[1.4] text-gray-700 mb-[8px]">
              E-mail*
            </label>
            <Input
              readOnly
              isRequired
              name="email"
              placeholder="Введіть E-mail"
              type="email"
              value={userData?.email ?? ""}
              classNames={{
                inputWrapper:
                  "bg-white border-[1px] border-primary-300 rounded-[12px] focus-within:ring-0 focus-within:ring-offset-0 focus-within:shadow-none",
                input:
                  "text-[16px] font-[400] leading-[1.4] text-gray-900 placeholder:text-[14px] placeholder:font-[400] placeholder:leading-[1.4] placeholder:text-gray-400 outline-none",
                errorMessage: "text-[12px] font-[400] text-red-500",
              }}
            />
          </div>

          <div className="w-full">
            <label
              htmlFor="city"
              className="block text-[12px] font-[500] leading-[1.4] text-gray-700 mb-[8px]">
              Місце проживання
            </label>
            <Input
              value={city ?? ""}
              onChange={e => setCity(e.target.value)}
              isRequired
              name="city"
              placeholder="Введіть назву населенного пункту"
              type="text"
              classNames={{
                inputWrapper:
                  "bg-white border-[1px] border-primary-300 rounded-[12px] focus-within:border-primary-700 focus-within:ring-0 focus-within:ring-offset-0 focus-within:shadow-none",
                input:
                  "text-[16px] font-[400] leading-[1.4] text-gray-900 placeholder:text-[14px] placeholder:font-[400] placeholder:leading-[1.4] placeholder:text-gray-400 outline-none",
                errorMessage: "text-[12px] font-[400] text-red-500",
              }}
            />
          </div>

          <div className="flex items-center gap-[16px] mt-[16px]">
            <Button
              type="submit"
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
        </Form>
      </fieldset>
    </div>
  );
}
