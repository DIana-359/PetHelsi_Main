"use client";

import { useState } from "react";
import { Pet } from "@/types/pet";
import { optionsAnimals } from "@/Constants";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
} from "@heroui/react";
import Icon from "@/components/Icon";
import { DayPicker } from "react-day-picker";
import { uk } from "react-day-picker/locale";

interface BookingAddPetModalProps {
  handleAddPet: (pet: Pet) => void;
  onClose: () => void;
  isOpen: boolean;
}

export function BookingAddPetModal({
  handleAddPet,
  onClose,
  isOpen,
}: BookingAddPetModalProps) {
  const [newPet, setNewPet] = useState<Partial<Pet>>({});
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);

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

  const handleFormSubmit = () => {
    if (
      !newPet.name ||
      !newPet.petTypeName ||
      !newPet.breed ||
      !newPet.genderTypeName ||
      newPet.weight === undefined ||
      newPet.sterilized === undefined ||
      !newPet.birthDate
    ) {
      alert("Заповніть обов'язкові поля тварини");
      return;
    }

    const pet: Pet = {
      name: newPet.name,
      avatar: "",
      petTypeName: newPet.petTypeName,
      breed: newPet.breed || "",
      genderTypeName: newPet.genderTypeName,
      weight: Number(newPet.weight),
      birthDate: newPet.birthDate,
      sterilized: newPet.sterilized,
      color: "",
      allergies: [],
      checked: true,
    };

    handleAddPet(pet);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      placement="center"
      hideCloseButton={true}
      className="rounded-[18px] max-h-[95vh] md:max-h-[80vh] overflow-y-auto"
    >
      <ModalContent className="flex flex-col max-h-[95vh] lg:max-h-[80vh] overflow-y-auto outline-none">
        <div className="flex justify-end px-4 sm:px-6 md:px-8 lg:px-10 pt-4 sm:pt-6 pb-2">
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрити"
            className="w-[24px] h-[24px] flex items-center text-primary-700 hover:text-primary-800 cursor-pointer"
          >
            <Icon
              sprite="/sprites/sprite-sistem.svg"
              id="icon-close"
              width="24px"
              height="24px"
              className="fill-primary-700 stroke-primary-700 hover:stroke-primary-800 hover:fill-primary-800 cursor-pointer"
            />
          </button>
        </div>
        <ModalHeader className="text-xl sm:text-2xl font-medium justify-center px-4 sm:px-6 md:px-8 pt-0 pb-6 sm:pb-10 text-gray-900">
          <div className="">Додавання нової тварини</div>
        </ModalHeader>

        <ModalBody className="pt-0 pb-6 sm:pb-10 px-6 sm:px-10 md:px-15 gap-4 overflow-y-auto scrollbar-thin scrollbar-thumb-[#C9E2F8] scrollbar-track-transparent scrollbar-thumb-rounded [&::-webkit-scrollbar]:w-[6px]">
          <div>
            <label
              id="label-petName"
              htmlFor="petName"
              className="text-[14px] block mb-2 font-medium text-gray-700"
            >
              Ім’я тварини*
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
                input: `text-left focus:outline-none ${
                  newPet.name ? "text-gray-900" : "text-gray-350"
                } placeholder:text-gray-350`,
                inputWrapper:
                  "border-primary-300 w-full  hover:!border-primary data-[focus=true]:!border-primary focus:border-primary shadow-none",
              }}
            />
          </div>

          <div>
            <label
              id="label-petType"
              htmlFor="petType"
              className="text-[14px] block mb-2 font-medium text-gray-700"
            >
              Вид тварини*
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
                  "text-left border-primary-300 hover:!border-primary focus:!border-primary shadow-none data-[open=true]:!border-primary",
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

          <div>
            <label
              id="label-petBreed"
              htmlFor="petBreed"
              className="text-[14px] block mb-2 text-gray-700"
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
                input: `text-left focus:outline-none ${
                  newPet.breed ? "text-gray-900" : "text-gray-350"
                } placeholder:text-gray-350`,
                inputWrapper:
                  "border-primary-300 w-full  hover:!border-primary data-[focus=true]:!border-primary focus:border-primary shadow-none",
              }}
            />
          </div>

          <div>
            <label
              id="label-petSex"
              htmlFor="petSex"
              className="text-[14px] block mb-2 font-medium text-gray-700"
            >
              Стать тварини*
            </label>
            <Select
              id="petSex"
              name="petSex"
              aria-labelledby="label-petSex"
              variant="bordered"
              placeholder="Оберіть стать"
              selectedKeys={
                newPet.genderTypeName ? [newPet.genderTypeName] : []
              }
              radius="sm"
              onSelectionChange={(keys) =>
                setNewPet({
                  ...newPet,
                  genderTypeName: Array.from(keys)[0]?.toString(),
                })
              }
              classNames={{
                trigger:
                  "data-[open=true]:!border-primary text-left border-primary-300 hover:!border-primary focus:!border-primary shadow-none",
                value: newPet.genderTypeName
                  ? "!text-gray-900"
                  : "!text-gray-350",
                popoverContent: "rounded-lg",
              }}
              listboxProps={{
                itemClasses: {
                  base: "data-[selected=true]:!bg-primary-100 data-[selected=true]:!text-primary-700 hover:!bg-primary-200",
                },
              }}
            >
              <SelectItem key="Хлопчик">Самець</SelectItem>
              <SelectItem key="Дівчинка">Самка</SelectItem>
            </Select>
          </div>

          <div>
            <label
              id="label-petWeight"
              htmlFor="petWeight"
              className="text-[14px] block mb-2 font-medium text-gray-700"
            >
              Вага, кг
            </label>
            <Input
              id="petWeight"
              name="petWeight"
              aria-labelledby="label-petWeight"
              variant="bordered"
              type="number"
              min={0}
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
                  "border-primary-300 hover:!border-primary data-[focus=true]:!border-primary focus:border-primary shadow-none",
              }}
            />
          </div>

          <div>
            <label className="text-xs block mb-2 font-medium text-gray-700">
              Дата народження*
            </label>
            <div className="relative w-full">
              <Input
                placeholder="ДД / ММ / РРРР"
                value={selectedDate ? formatDateForInput(selectedDate) : ""}
                readOnly
                onClick={() => setIsOpenCalendar(!isOpenCalendar)}
                variant="bordered"
                radius="sm"
                classNames={{
                  input: `text-left text-[14px] focus:outline-none ${
                    newPet.birthDate ? "text-gray-900" : "text-gray-350"
                  } placeholder:text-gray-350`,
                  inputWrapper:
                    "border-primary-300 w-full rounded-[8px] mb-4 hover:!border-primary data-[focus=true]:!border-primary focus:border-primary shadow-none",
                }}
              />
              <button
                type="button"
                onClick={() => setIsOpenCalendar(!isOpenCalendar)}
                className="absolute right-2 top-1/3 -translate-y-1/2 cursor-pointer"
              >
                <svg
                  width="24"
                  height="24"
                  className="stroke-primary-700 fill-background hover:stroke-primary-900 transition-colors duration-300 pointer-events-none"
                >
                  <use href="/sprites/sprite-sistem.svg#icon-calendar" />
                </svg>
              </button>
              {isOpenCalendar && (
                <div className="absolute top-[48px] z-50 w-[318px] bg-white border rounded p-4 shadow-sm shadow-gray-300">
                  <DayPicker
                    mode="single"
                    locale={uk}
                    selected={selectedDate}
                    onSelect={(date) => {
                      if (!date) return;
                      setSelectedDate(date);
                      setNewPet({
                        ...newPet,
                        birthDate: formatDateLocal(date),
                      });
                      setIsOpenCalendar(false);
                    }}
                    captionLayout="dropdown"
                    classNames={{
                      root: "bg-background",
                      day_button: "p-2 hover:bg-blue-100 rounded-md",
                      selected: "bg-primary-100 text-primary-700",
                      today: "text-primary-700",
                      nav_button:
                        "text-gray-400 hover:text-gray-600 disabled:opacity-50",
                      caption_dropdowns:
                        "flex gap-4 justify-center items-center",
                      dropdown:
                        "px-2 py-2 rounded-lg border border-primary-300 bg-white text-gray-900 text-base  focus:border-primary-700 focus:outline-none transition",
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          <div>
            <label
              id="label-petSterilized"
              htmlFor="petSterilized"
              className="text-[14px] block mb-2 font-medium text-gray-700"
            >
              Стерилізація*
            </label>

            <Select
              id="petSterilized"
              aria-labelledby="label-petSterilized"
              variant="bordered"
              placeholder="Оберіть варіант"
              radius="sm"
              selectedKeys={
                newPet.sterilized !== undefined
                  ? [newPet.sterilized ? "yes" : "no"]
                  : []
              }
              onSelectionChange={(keys) =>
                setNewPet({
                  ...newPet,
                  sterilized: Array.from(keys)[0] === "yes",
                })
              }
              classNames={{
                trigger:
                  "border-primary-300 hover:!border-primary focus:!border-primary data-[open=true]:!border-primary shadow-none",
                value: "!font-[400] text-gray-350",
                popoverContent: "rounded-lg",
              }}
              listboxProps={{
                classNames: {
                  base: "max-h-44 overflow-y-auto scrollbar-thin scrollbar-thumb-[#C9E2F8] scrollbar-track-transparent scrollbar-thumb-rounded",
                },
                itemClasses: {
                  base: "data-[selected=true]:!bg-primary-100 data-[selected=true]:!text-primary-700 hover:!bg-primary-200",
                },
              }}
            >
              <SelectItem key="yes">Так</SelectItem>
              <SelectItem key="no">Ні</SelectItem>
            </Select>
          </div>
        </ModalBody>

        <ModalFooter className="flex flex-col gap-2 pt-0 px-6 sm:px-10 md:px-15 pb-6 sm:pb-8">
          <Button
            color="primary"
            type="button"
            onPress={handleFormSubmit}
            className="w-full rounded-md"
          >
            Додати тварину
          </Button>
          <Button
            variant="light"
            onPress={onClose}
            className="w-full rounded-md text-[16px] font-[400] leading-[1.4] text-primary-700 bg-background border-[1px] border-primary-700"
          >
            Скасувати
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
