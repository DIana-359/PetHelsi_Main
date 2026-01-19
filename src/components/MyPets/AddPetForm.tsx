"use client";

import { Pet } from "@/types/pet";
import { optionsAnimals } from "@/Constants";
import { Input, Select, SelectItem } from "@heroui/react";
import { DayPicker } from "react-day-picker";
import { uk } from "react-day-picker/locale";
import { SterilizedLabel } from "@/components/MyPets/SterilizedLabel";
import { Dispatch, SetStateAction } from "react";

interface AddPetFormProps {
  newPet: Partial<Pet>;
  setNewPet: Dispatch<SetStateAction<Partial<Pet>>>;
  selected: Date | undefined;
  setSelected: Dispatch<SetStateAction<Date | undefined>>;
  isOpenCalendar: boolean;
  setIsOpenCalendar: Dispatch<SetStateAction<boolean>>;
  isBirthDateUnknown: boolean;
  setIsBirthDateUnknown: Dispatch<SetStateAction<boolean>>;
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
}: AddPetFormProps) {
  const formatDateLocal = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const formatDateForInput = (date: Date) => {
    const d = String(date.getDate()).padStart(2, "0");
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const y = date.getFullYear();
    return `${d} / ${m} / ${y}`;
  };

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
          onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
          classNames={{
            input:
              "text-left focus:outline-none text-gray-350 placeholder:text-gray-350",
            inputWrapper:
              "border-primary-300 mb-4 w-full hover:!border-primary focus:!border-primary data-[focus=true]:!border-primary focus-visible:!border-primary shadow-none",
          }}
        />
      </div>
      <div className="w-full md:w-[304px]">
        <label
          id="label-petType"
          htmlFor="petType"
          className="text-[12px] block mb-2 font-medium text-gray-700"
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
          onSelectionChange={(keys) =>
            setNewPet({
              ...newPet,
              petTypeName: Array.from(keys)[0]?.toString(),
            })
          }
          classNames={{
            trigger:
              "text-left mb-4 border-primary-300 hover:!border-primary focus:!border-primary shadow-none data-[open=true]:!border-primary",
            value: newPet.petTypeName ? "!text-gray-900" : "!text-gray-350",
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
      </div>
      <div className="w-full md:w-[304px]">
        <label
          id="label-petBreed"
          htmlFor="petBreed"
          className="text-[12px] block mb-2 font-medium text-gray-700"
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

        <div className="flex pl-1 gap-6">
          <label className="flex mb-4 text-gray-900 text-[14px] items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="petSex"
              value="Хлопчик"
              checked={newPet.genderTypeName === "Хлопчик"}
              onChange={() =>
                setNewPet({ ...newPet, genderTypeName: "Хлопчик" })
              }
            />
            <span>Самець</span>
          </label>

          {/* Самка */}
          <label className="flex mb-4 text-gray-900 text-[14px] items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="petSex"
              value="Дівчинка"
              checked={newPet.genderTypeName === "Дівчинка"}
              onChange={() =>
                setNewPet({
                  ...newPet,
                  genderTypeName: "Дівчинка",
                })
              }
            />
            <span>Самка</span>
          </label>
        </div>
      </div>

      <div className="w-full md:w-[304px]">
        <label
          id="label-petColoring"
          htmlFor="petColoring"
          className="text-[12px] block mb-2 font-medium text-gray-700"
        >
          Забарвлення
        </label>
        <textarea
          placeholder="Наприклад: білого кольору з чорними лапками"
          className={`w-full  border mb-4 border-primary-300 hover:!border-primary focus:!border-primary shadow-none rounded-lg p-3 text-left focus:outline-none ${
            newPet.color ? "text-gray-900" : "text-gray-350"
          } placeholder:text-gray-350`}
          rows={4}
          value={newPet.color || ""}
          onChange={(e) => setNewPet({ ...newPet, color: e.target.value })}
        />
      </div>
      <div className="w-full md:w-[304px]">
        <label
          id="label-petBirth"
          htmlFor="petBirth"
          className="text-[12px] block mb-2 font-medium text-gray-700"
        >
          Дата народження*
        </label>
        <div className="w-full relative">
          <Input
            name="petBirth"
            placeholder="ДД / ММ / РРРР"
            value={selected ? formatDateForInput(selected) : ""}
            variant="bordered"
            readOnly
            onClick={() => setIsOpenCalendar(!isOpenCalendar)}
            classNames={{
              input: `text-left text-[14px] focus:outline-none ${
                newPet.birthDate ? "text-gray-900" : "text-gray-350"
              } placeholder:text-gray-350`,
              inputWrapper:
                "border-primary-300 w-full rounded-[8px] mb-4 hover:!border-primary data-[focus=true]:!border-primary focus:border-primary shadow-none",
            }}
          />
          <div className=" flex items-start mb-6 gap-2">
            <input
              type="checkbox"
              id="birthDateUnknown"
              className=" accent-primary w-4  h-4  rounded  border border-primary-300"
              checked={isBirthDateUnknown}
              onChange={(e) => {
                const checked = e.target.checked;
                setIsBirthDateUnknown(checked);

                if (checked) {
                  setSelected(undefined);
                  setNewPet({
                    ...newPet,
                    birthDate: undefined,
                  });
                  setIsOpenCalendar(false);
                }
              }}
            />
            <label
              htmlFor="birthDateUnknown"
              className="text-[12px] text-gray-400 cursor-pointer"
            >
              Я не пам’ятаю точної дати народження
            </label>
          </div>

          <button
            type="button"
            onClick={() => setIsOpenCalendar(!isOpenCalendar)}
            className="absolute right-2 top-1/2 -translate-y-4/3 cursor-pointer"
          >
            <svg
              width="24"
              height="24"
              className="stroke-primary-700 fill-background hover:stroke-primary-900 transition-colors duration-300 pointer-events-none"
            >
              <use href="/sprites/sprite-sistem.svg#icon-calendar" />
            </svg>
          </button>
        </div>

        {isOpenCalendar && (
          <div className="z-99910 w-[318px] absolute top-[82px] bg-white border rounded p-[16px] border-none shadow-sm shadow-gray-300">
            <DayPicker
              mode="single"
              locale={uk}
              selected={selected}
              onSelect={(date) => {
                if (!date) return;

                const birthDate = formatDateLocal(date);

                setSelected(date);

                setNewPet({
                  ...newPet,
                  birthDate,
                });

                setIsOpenCalendar(false);
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
          onChange={(e) =>
            setNewPet({ ...newPet, weight: Number(e.target.value) })
          }
          classNames={{
            input: `text-left focus:outline-none ${
              newPet.weight ? "text-gray-900" : "text-gray-350"
            } placeholder:text-gray-350`,
            inputWrapper:
              "border-primary-300 w-full  hover:!border-primary data-[focus=true]:!border-primary focus:border-primary shadow-none",
          }}
        />
        <small className="text-gray-700 mb-4 text-[12px]">
          Дозволені лише цифри та кома (наприклад: 4,6)
        </small>

        {newPet.genderTypeName && (
          <div className="mt-4">
            <label className="text-[12px] block mb-2 font-medium text-gray-700">
              Стерилізація*
            </label>

            <div className="flex pl-1 gap-6">
              <label className="inline-flex mb-4 text-gray-900 text-[14px] items-center cursor-pointer gap-2">
                <input
                  type="radio"
                  name="sterilized"
                  value="yes"
                  checked={newPet.sterilized === true}
                  onChange={() =>
                    setNewPet({
                      ...newPet,
                      sterilized: true,
                    })
                  }
                />
                <span>
                  <SterilizedLabel
                    sterilized={true}
                    gender={newPet.genderTypeName}
                  />
                </span>
              </label>
              <label className="inline-flex items-center text-gray-900 text-[14px] mb-4  cursor-pointer gap-2">
                <input
                  type="radio"
                  checked={newPet.sterilized === false}
                  onChange={() =>
                    setNewPet({
                      ...newPet,
                      sterilized: false,
                    })
                  }
                />
                <span>
                  <SterilizedLabel
                    sterilized={true}
                    gender={newPet.genderTypeName}
                  />
                </span>
              </label>
            </div>
          </div>
        )}
      </div>

      <div className="w-full md:w-[304px]">
        <label
          id="label-petSex"
          htmlFor="petSex"
          className="text-[12px] block  font-medium text-gray-700"
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
