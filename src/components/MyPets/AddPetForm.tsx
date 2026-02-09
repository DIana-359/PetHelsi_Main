"use client";

import { Pet } from "@/types/pet";
import { optionsAnimals } from "@/Constants";
import { Input, Select, SelectItem } from "@heroui/react";
import PetBirthDateField from "./PetBirthDateField";
import { Dispatch, SetStateAction } from "react";
import { SterilizedLabel } from "./SterilizedLabel";

export interface AddPetFormProps {
  newPet: Partial<Pet>;
  setNewPet: Dispatch<SetStateAction<Partial<Pet>>>;
  selected: Date | undefined;
  setSelected: Dispatch<SetStateAction<Date | undefined>>;
  isOpenCalendar: boolean;
  setIsOpenCalendar: Dispatch<SetStateAction<boolean>>;
  isBirthDateUnknown: boolean;
  setIsBirthDateUnknown: Dispatch<SetStateAction<boolean>>;
  birthMonth: string | undefined;
  setBirthMonth: Dispatch<SetStateAction<string | undefined>>;
  birthYear: string | undefined;
  setBirthYear: Dispatch<SetStateAction<string | undefined>>;
  getError: (field: string) => string;
  clearError: (field: string) => void;
}

export default function AddPetForm({
  newPet,
  setNewPet,
  selected,
  setSelected,
  isOpenCalendar,
  setIsOpenCalendar,
  isBirthDateUnknown,
  setIsBirthDateUnknown,
  birthMonth,
  setBirthMonth,
  birthYear,
  setBirthYear,
  getError,
  clearError,
}: AddPetFormProps) {
  return (
    <>
      <div className="w-full md:w-[304px]">
        <label
          id="label-petName"
          htmlFor="petName"
          className="text-[12px] block mb-2 font-medium text-gray-700"
        >
          Ім’я*
        </label>
        <Input
          id="petName"
          name="petName"
          aria-labelledby="label-petName"
          variant="bordered"
          placeholder="Введіть ім’я тварини"
          radius="sm"
          value={newPet.name || ""}
          onChange={(e) => {
            setNewPet({ ...newPet, name: e.target.value });
            clearError("name");
          }}
          classNames={{
            input:
              "text-left focus:outline-none text-gray-900 placeholder:text-gray-350",
            inputWrapper: `border-primary-300  w-full ${
              getError("name") ? "border-red-500" : "border-primary-300"
            } hover:!border-primary focus:!border-primary`,
          }}
        />
        {getError("name") && (
          <span className="text-red-500 text-[12px] mt-1">
            {getError("name")}
          </span>
        )}
      </div>
      <div className="w-full md:w-[304px]">
        <label
          id="label-petType"
          htmlFor="petType"
          className="text-[12px] block mb-2 mt-4 font-medium text-gray-700"
        >
          Вид*
        </label>
        <Select
          id="petType"
          name="petType"
          aria-labelledby="label-petType"
          variant="bordered"
          placeholder="Оберіть вид тварини"
          selectedKeys={newPet.petTypeName ? [newPet.petTypeName] : []}
          radius="sm"
          onSelectionChange={(keys) => {
            setNewPet({
              ...newPet,
              petTypeName: Array.from(keys)[0]?.toString(),
            });
            clearError("petTypeName");
          }}
          classNames={{
            trigger: `text-left w-full border ${
              getError("petTypeName") ? "border-red-500" : "border-primary-300"
            } hover:!border-primary focus:!border-primary shadow-none data-[open=true]:!border-primary`,
            value: newPet.petTypeName
              ? "!text-gray-900 text-[14px]"
              : "!text-gray-350 text-[14px]",
            selectorIcon: "text-[#1E88E5] w-6 h-6",
            popoverContent: "rounded-lg",
          }}
          listboxProps={{
            classNames: {
              base: "max-h-44 overflow-y-auto scrollbar-thin scrollbar-thumb-[#C9E2F8] scrollbar-track-transparent scrollbar-thumb-rounded [&::-webkit-scrollbar]:w-[3px]",
            },
            itemClasses: {
              base: "data-[selected=true]:!bg-primary-100 data-[selected=true]:!text-primary-700 hover:!bg-primary-200",
            },
          }}
        >
          {optionsAnimals.map((animal) => (
            <SelectItem key={animal.key}>{animal.value}</SelectItem>
          ))}
        </Select>
        {getError("petTypeName") && (
          <span className="text-red-500 text-[12px] mt-1">
            {getError("petTypeName")}
          </span>
        )}
      </div>
      <div className="w-full md:w-[304px]">
        <label
          id="label-petBreed"
          htmlFor="petBreed"
          className="text-[12px] block mb-2 mt-4 font-medium text-gray-700"
        >
          Порода
        </label>
        <Input
          id="petBreed"
          name="petBreed"
          aria-labelledby="label-petBreed"
          variant="bordered"
          placeholder="Вкажіть породу"
          radius="sm"
          value={newPet.breed || ""}
          onChange={(e) => setNewPet({ ...newPet, breed: e.target.value })}
          classNames={{
            input:
              "text-left focus:outline-none text-gray-350 placeholder:text-gray-350",
            inputWrapper:
              "border-primary-300 mb-4 w-full hover:!border-primary data-[focus=true]:!border-primary focus:border-primary shadow-none",
          }}
        />
      </div>

      <div className="w-full md:w-[304px]">
        <label
          id="label-petSex"
          htmlFor="petSex"
          className="text-[12px] block mb-2 font-medium text-gray-700"
        >
          Стать тварини*
        </label>

        <div
          className={`flex pl-1 gap-6 p-2 rounded-lg ${
            getError("genderTypeName") ? "border border-red-500" : ""
          }`}
        >
          <label className="flex text-gray-900 text-[14px] items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="petSex"
              value="Хлопчик"
              checked={newPet.genderTypeName === "Хлопчик"}
              onChange={() => {
                setNewPet({ ...newPet, genderTypeName: "Хлопчик" });
                clearError("genderTypeName");
              }}
            />
            <span>Самець</span>
          </label>

          <label className="flex  text-gray-900 text-[14px] items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="petSex"
              value="Дівчинка"
              checked={newPet.genderTypeName === "Дівчинка"}
              onChange={() => {
                setNewPet({
                  ...newPet,
                  genderTypeName: "Дівчинка",
                });
                clearError("genderTypeName");
              }}
            />
            <span>Самка</span>
          </label>
        </div>
        {getError("genderTypeName") && (
          <span className="text-red-500 text-[12px] mt-1">
            {getError("genderTypeName")}
          </span>
        )}
      </div>
      <PetBirthDateField
        newPet={newPet}
        setNewPet={setNewPet}
        selected={selected}
        setSelected={setSelected}
        isOpenCalendar={isOpenCalendar}
        setIsOpenCalendar={setIsOpenCalendar}
        isBirthDateUnknown={isBirthDateUnknown}
        setIsBirthDateUnknown={setIsBirthDateUnknown}
        birthMonth={birthMonth}
        setBirthMonth={setBirthMonth}
        birthYear={birthYear}
        setBirthYear={setBirthYear}
        getError={getError}
        clearError={clearError}
      />
      <div className="w-full mb-4 md:w-[304px]">
        <label
          id="label-petWeight"
          htmlFor="petWeight"
          className="text-[12px] block mb-2 font-medium text-gray-700"
        >
          Вага, кг*
        </label>
        <Input
          id="petWeight"
          name="petWeight"
          aria-labelledby="label-petWeight"
          variant="bordered"
          type="number"
          min={0.1}
          step="0.001"
          placeholder="Вкажіть вагу"
          radius="sm"
          value={newPet.weight?.toString() || ""}
          onChange={(e) => {
            setNewPet({ ...newPet, weight: Number(e.target.value) });
            clearError("weight");
          }}
          classNames={{
            input: `text-left focus:outline-none ${
              newPet.weight ? "text-gray-900" : "text-gray-350"
            } placeholder:text-gray-350`,
            inputWrapper: `border w-full ${
              getError("weight") ? "border-red-500" : "border-primary-300"
            } hover:!border-primary focus:!border-primary shadow-none`,
          }}
        />
        <div className="flex flex-col">
          {getError("weight") && (
            <span className="text-red-500 text-[12px] mt-1">
              {getError("weight")}
            </span>
          )}
          <small className="text-gray-700 mb-4 text-[12px]">
            Дозволені лише цифри та кома (наприклад: 4,6)
          </small>
        </div>

        <div>
          <label className="text-[12px] block mb-2 font-medium text-gray-700">
            Стерилізований/-а*
          </label>

          <div
            className={`flex pl-1 gap-6 p-2 rounded-lg ${
              getError("sterilized") ? "border border-red-500" : ""
            }`}
          >
            <label className="inline-flex text-gray-900 text-[14px]  cursor-pointer gap-2">
              <input
                type="radio"
                name="sterilized"
                value="yes"
                checked={newPet.sterilized === true}
                onChange={() => {
                  setNewPet({
                    ...newPet,
                    sterilized: true,
                  });
                  clearError("sterilized");
                }}
              />
              <span>
                <SterilizedLabel sterilized={true} />
              </span>
            </label>
            <label className="inline-flex  text-gray-900 text-[14px] cursor-pointer gap-2">
              <input
                type="radio"
                checked={newPet.sterilized === false}
                onChange={() => {
                  setNewPet({
                    ...newPet,
                    sterilized: false,
                  });
                  clearError("sterilized");
                }}
              />
              <SterilizedLabel sterilized={false} />
            </label>
          </div>
          {getError("sterilized") && (
            <span className="text-red-500 text-[12px] mt-1">
              {getError("sterilized")}
            </span>
          )}
        </div>
      </div>

      <div className="w-full md:w-[304px]">
        <label
          id="label-petSex"
          htmlFor="petSex"
          className="text-[12px] block mb-2 font-medium text-gray-700"
        >
          Алергічні реакції
        </label>
        <textarea
          placeholder="Наприклад: лікарські засоби або продукти"
          className={`w-full border border-primary-300 hover:!border-primary focus:!border-primary shadow-none rounded-lg p-3 text-left focus:outline-none ${
            newPet.allergies ? "text-gray-900" : "text-gray-350"
          } placeholder:text-gray-350"`}
          rows={4}
          maxLength={250}
          value={newPet.allergies || ""}
          onChange={(e) =>
            setNewPet({
              ...newPet,
              allergies: e.target.value
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean),
            })
          }
        />
        <div className="flex mb-6 justify-between">
          <small className="text-gray-400 text-[12px]">
            Максимум 250 символів
          </small>
          <span className="text-gray-400 text-[12px]">
            {(newPet.allergies?.join(", ") || "").length}/250
          </span>
        </div>
      </div>
    </>
  );
}
