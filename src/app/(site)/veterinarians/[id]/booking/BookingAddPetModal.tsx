"use client";

import { useState } from "react";
import { Pet } from "@/app/types/pet";
import { optionsAnimals } from "@/components/Hero/Constants";
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

interface BookingAddPetModalProps {
  handleAddPet: (pet: Pet) => void;
  onClose: () => void;
  isOpen: boolean;
}

export function BookingAddPetModal({ handleAddPet, onClose, isOpen }: BookingAddPetModalProps) {
  const [newPet, setNewPet] = useState<Partial<Pet>>({});

  const handleFormSubmit = () => {
    if (!newPet.name || !newPet.petTypeName || !newPet.breed) {
      alert("Заповніть обов'язкові поля тварини");
      return;
    }

    const pet: Pet = {
      name: newPet.name!,
      petTypeName: newPet.petTypeName!,
      breed: newPet.breed!,
      genderTypeName: newPet.genderTypeName,
      weight: newPet.weight,
      ages: newPet.ages,
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
      className="rounded-[18px] max-h-[95vh] lg:max-h-[80vh] overflow-y-auto"
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
          <Icon
              sprite="/sprites/sprite-sistem.svg"
              id="icon-close"
              width="24px"
              height="24px"
              className="fill-primary-700 stroke-primary-700 hover:stroke-primary-800 hover:fill-primary-800 cursor-pointer"
            />
          <div className="aa">Додавання нової тварини</div>
        </ModalHeader>

        <ModalBody className="pt-0 pb-6 sm:pb-10 px-6 sm:px-10 md:px-15 gap-4 overflow-y-auto scrollbar-thin scrollbar-thumb-[#C9E2F8] scrollbar-track-transparent scrollbar-thumb-rounded [&::-webkit-scrollbar]:w-[6px]">
          <div>
            <label id="label-petName" htmlFor="petName" className="text-xs block mb-2 font-medium text-gray-700">
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
                input: "text-left focus:outline-none text-gray-350 placeholder:text-gray-350",
                inputWrapper: "border-primary-300 hover:!border-primary focus:!border-primary data-[focus=true]:!border-primary focus-visible:!border-primary shadow-none",
              }}
            />
          </div>

          <div>
            <label id="label-petType" htmlFor="petType" className="text-xs block mb-2 font-medium text-gray-700">
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
                setNewPet({ ...newPet, petTypeName: Array.from(keys)[0]?.toString() })
              }
              classNames={{
                trigger: "text-left border-primary-300 hover:!border-primary focus:!border-primary shadow-none data-[open=true]:!border-primary",
                value: "!text-gray-350",
                popoverContent: "rounded-lg"
              }}
              listboxProps={{
                classNames: {
                  base: "max-h-44 overflow-y-auto scrollbar-thin scrollbar-thumb-[#C9E2F8] scrollbar-track-transparent scrollbar-thumb-rounded [&::-webkit-scrollbar]:w-[3px]",
                },
                itemClasses: {
                  base: "data-[selected=true]:!bg-primary-100 data-[selected=true]:!text-primary-700 hover:!bg-primary-200",
                }
              }}
            >
              {optionsAnimals.map((animal) => (
                <SelectItem key={animal.key}>{animal.value}</SelectItem>
              ))}
            </Select>
          </div>

          <div>
            <label id="label-petBreed" htmlFor="petBreed" className="text-xs block mb-2 font-medium text-gray-700">
              Порода*
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
                input: "text-left focus:outline-none text-gray-350 placeholder:text-gray-350",
                inputWrapper: "border-primary-300 hover:!border-primary data-[focus=true]:!border-primary focus:border-primary shadow-none",
              }}
            />
          </div>

          <div>
            <label id="label-petSex" htmlFor="petSex" className="text-xs block mb-2 font-medium text-gray-700">
              Стать тварини*
            </label>
            <Select
              id="petSex"
              name="petSex"
              aria-labelledby="label-petSex"
              variant="bordered"
              placeholder="Оберіть стать"
              selectedKeys={newPet.genderTypeName ? [newPet.genderTypeName] : []}
              radius="sm"
              onSelectionChange={(keys) =>
                setNewPet({ ...newPet, genderTypeName: Array.from(keys)[0]?.toString() })
              }
              classNames={{
                trigger: "data-[open=true]:!border-primary text-left border-primary-300 hover:!border-primary focus:!border-primary shadow-none",
                value: "!text-gray-350",
                popoverContent: "rounded-lg"
              }}
              listboxProps={{
                itemClasses: {
                  base: "data-[selected=true]:!bg-primary-100 data-[selected=true]:!text-primary-700 hover:!bg-primary-200",
                }
              }}
            >
              <SelectItem key="Хлопчик">Хлопчик</SelectItem>
              <SelectItem key="Дівчинка">Дівчинка</SelectItem>
            </Select>
          </div>

          <div>
            <label id="label-petWeight" htmlFor="petWeight" className="text-xs block mb-2 font-medium text-gray-700">
              Вага, кг
            </label>
            <Input
              id="petWeight"
              name="petWeight"
              aria-labelledby="label-petWeight"
              variant="bordered"
              type="number"
              placeholder="Вкажіть вагу"
              radius="sm"
              value={newPet.weight?.toString() || ""}
              onChange={(e) =>
                setNewPet({ ...newPet, weight: Number(e.target.value) })
              }
              classNames={{
                input: "text-left focus:outline-none text-gray-350 placeholder:text-gray-350",
                inputWrapper: "border-primary-300 hover:!border-primary data-[focus=true]:!border-primary focus:border-primary shadow-none",
              }}
            />
          </div>

          <div>
            <label id="label-petAge" htmlFor="petAge" className="text-xs block mb-2 font-medium text-gray-700">
              Вік, роки
            </label>
            <Input
              id="petAge"
              name="petAge"
              aria-labelledby="label-petAge"
              variant="bordered"
              type="number"
              placeholder="Вкажіть вік"
              radius="sm"
              value={newPet.ages?.toString() || ""}
              onChange={(e) =>
                setNewPet({ ...newPet, ages: Number(e.target.value) })
              }
              classNames={{
                input: "text-left focus:outline-none text-gray-350 placeholder:text-gray-350",
                inputWrapper: "border-primary-300 hover:!border-primary data-[focus=true]:!border-primary focus:border-primary shadow-none",
              }}
            />
          </div>
        </ModalBody>

        <ModalFooter className="flex flex-col gap-2 pt-0 px-6 sm:px-10 md:px-15 pb-6 sm:pb-8">
          <Button color="primary" onPress={handleFormSubmit} className="w-full rounded-md">
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
