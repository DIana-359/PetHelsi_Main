"use client";

import { optionsAnimals } from "@/Constants";
import { Input, Select, SelectItem } from "@heroui/react";
import PetBirthDateField from "@/components/MyPet/PetBirthDateField";
import { SterilizedLabel } from "@/components/MyPet/SterilizedLabel";
import { Controller, UseFormReturn, useWatch } from "react-hook-form";
import { PetFormValues } from "@/utils/schemas/pet.schemas";
import clsx from "clsx";

function parseAllergies(value: string): string[] {
  return value
    .split(",")
    .map((i) => i.trim())
    .filter(Boolean);
}

interface PetFormProps {
  methods: UseFormReturn<PetFormValues>;
}

export default function PetForm({ methods }: PetFormProps) {
  const {
    control,
    register,
    clearErrors,
    formState: { errors },
  } = methods;

  const weight = useWatch({ control, name: "weight" });
  const allergies = useWatch({ control, name: "allergies" }) || [];

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
          {...register("name")}
          id="petName"
          variant="bordered"
          placeholder="Введіть ім’я тварини"
          radius="sm"
          classNames={{
            input: "text-left  text-gray-900 placeholder:text-gray-350",
            inputWrapper: clsx(
              "border-primary-300 w-full hover:!border-primary focus:!border-primary",
              { "border-red-500": errors.name },
            ),
          }}
        />

        {errors.name && (
          <span className="text-red-500 text-[12px] mt-1">
            {errors.name.message}
          </span>
        )}
      </div>

      <div className="w-full md:w-[304px]">
        <label
          id="label-petType"
          className="text-[12px] block mb-2 mt-4 font-medium text-gray-700"
        >
          Вид*
        </label>

        <Controller
          name="petTypeName"
          control={control}
          render={({ field }) => (
            <Select
              variant="bordered"
              placeholder="Оберіть вид тварини"
              radius="sm"
              selectedKeys={field.value ? new Set([field.value]) : new Set()}
              onSelectionChange={(keys) => {
                field.onChange(Array.from(keys)[0]);
                clearErrors("petTypeName");
              }}
              classNames={{
                trigger: clsx(
                  "text-left w-full border hover:!border-primary focus:!border-primary shadow-none data-[open=true]:!border-primary",
                  {
                    "border-red-500": errors.petTypeName,
                    "border-primary-300": !errors.petTypeName,
                  },
                ),
                value: clsx(
                  field.value
                    ? "!text-gray-900 text-[14px]"
                    : "!text-gray-350 text-[14px]",
                ),
                selectorIcon: "text-[#1E88E5] w-6 h-6",
                popoverContent: "rounded-lg",
              }}
            >
              {optionsAnimals.map((animal) => (
                <SelectItem key={animal.key}>{animal.value}</SelectItem>
              ))}
            </Select>
          )}
        />

        {errors.petTypeName && (
          <span className="text-red-500 text-[12px] mt-1">
            {errors.petTypeName.message}
          </span>
        )}
      </div>

      <div className="w-full md:w-[304px]">
        <label className="text-[12px] block mb-2 mt-4 font-medium text-gray-700">
          Порода
        </label>

        <Input
          {...register("breed")}
          variant="bordered"
          placeholder="Вкажіть породу"
          radius="sm"
          classNames={{
            input:
              "text-left focus:outline-none text-gray-900 placeholder:text-gray-350",
            inputWrapper:
              "border-primary-300 mb-4 w-full hover:!border-primary data-[focus=true]:!border-primary focus:border-primary shadow-none",
          }}
        />
      </div>

      <div className="w-full md:w-[304px]">
        <label className="text-[12px] block mb-2 font-medium text-gray-700">
          Стать тварини*
        </label>

        <div
          className={clsx("flex pl-1 gap-6 p-2 rounded-[8px]", {
            "border border-red-500": errors.genderTypeName,
          })}
        >
          {(["Хлопчик", "Дівчинка"] as const).map((value) => (
            <label
              key={value}
              className="flex text-gray-900 text-[14px] items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                value={value}
                {...register("genderTypeName")}
              />
              <span>{value === "Хлопчик" ? "Самець" : "Самка"}</span>
            </label>
          ))}
        </div>

        {errors.genderTypeName && (
          <span className="text-red-500 text-[12px] mt-1">
            {errors.genderTypeName.message}
          </span>
        )}
      </div>

      <Controller
        name="birthDate"
        control={control}
        render={({ field }) => (
          <PetBirthDateField
            value={field.value}
            onChange={field.onChange}
            error={errors.birthDate?.message}
          />
        )}
      />

      <div className="w-full mb-4 md:w-[304px]">
        <label className="text-[12px] block mb-2 font-medium text-gray-700">
          Вага, кг*
        </label>

        <Input
          type="number"
          step="0.001"
          variant="bordered"
          radius="sm"
          placeholder="Вкажіть вагу"
          {...register("weight", { valueAsNumber: true })}
          classNames={{
            input: clsx(
              "text-left focus:outline-none placeholder:text-gray-350",
              {
                "text-gray-900": weight,
                "text-gray-350": !weight,
              },
            ),
            inputWrapper: clsx(
              "border w-full hover:!border-primary focus:!border-primary shadow-none",
              {
                "border-red-500": errors.weight,
                "border-primary-300": !errors.weight,
              },
            ),
          }}
        />

        {errors.weight && (
          <span className="text-red-500 text-[12px] mt-1">
            {errors.weight.message}
          </span>
        )}
      </div>

      <div className="w-full md:w-[304px]">
        <label className="text-[12px] block mb-2 font-medium text-gray-700">
          Стерилізований/-а*
        </label>

        <Controller
          name="sterilized"
          control={control}
          render={({ field }) => (
            <div
              className={clsx("flex pl-1 gap-6 p-2 rounded-lg", {
                "border border-red-500": errors.sterilized,
              })}
            >
              {[true, false].map((value) => (
                <label
                  key={String(value)}
                  className="inline-flex text-gray-900 text-[14px] cursor-pointer gap-2"
                >
                  <input
                    type="radio"
                    checked={field.value === value}
                    onChange={() => field.onChange(value)}
                  />
                  <SterilizedLabel sterilized={value} />
                </label>
              ))}
            </div>
          )}
        />

        {errors.sterilized && (
          <span className="text-red-500 text-[12px] mt-1">
            {errors.sterilized.message}
          </span>
        )}
      </div>

      <div className="w-full md:w-[304px]">
        <label className="text-[12px] block mb-2 font-medium text-gray-700">
          Алергічні реакції
        </label>
        <Controller
          name="allergies"
          control={control}
          render={({ field }) => (
            <>
              <textarea
                rows={4}
                maxLength={250}
                className={clsx(
                  "w-full border border-primary-300 hover:!border-primary focus:!border-primary shadow-none rounded-lg p-3 text-left focus:outline-none placeholder:text-gray-350",
                  {
                    "text-gray-900": allergies.length,
                    "text-gray-350": !allergies.length,
                  },
                )}
                value={field.value?.join(", ") || ""}
                onChange={(e) => field.onChange(parseAllergies(e.target.value))}
              />

              <div className="flex mb-6 justify-between">
                <small className="text-gray-400 text-[12px]">
                  Максимум 250 символів
                </small>
                <span className="text-gray-400 text-[12px]">
                  {allergies.join(", ").length}/250
                </span>
              </div>
            </>
          )}
        />
      </div>
    </>
  );
}
