"use client";

import React, { useEffect, useState } from "react";
import { Pet } from "@/app/types/pet";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import Icon from "@/components/Icon";
import { Button } from "@heroui/react";
import { petTypeIcons } from "@/utils/types/petTypeIcons";
import clsx from "clsx";

type ModalDeletePetProps = {
  isOpen: boolean;
  pets: Pet[];
  initialSelectedId?: string | null;
  onClose: () => void;
  onConfirmDelete: (petId: string) => Promise<void> | void;
};

export default function ModalDeletePet({
  isOpen,
  pets,
  initialSelectedId,
  onClose,
  onConfirmDelete,
}: ModalDeletePetProps) {
  const [selectedId, setSelectedId] = useState<string | null>(
    initialSelectedId ?? null
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSelectedId(initialSelectedId ?? pets[0]?.id ?? null);
    }
  }, [isOpen, initialSelectedId, pets]);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    if (!selectedId) return;
    try {
      setLoading(true);
      await onConfirmDelete(selectedId);
      onClose();
    } catch (err) {
      console.error("DeletePetModal onConfirm error:", err);
    } finally {
      setLoading(false);
    }
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
          <div>Видалити тварину</div>
        </ModalHeader>

        <ModalBody className="pt-0 pb-6 sm:pb-10 px-6 sm:px-10 md:px-15 gap-4 overflow-y-auto scrollbar-thin scrollbar-thumb-[#C9E2F8] scrollbar-track-transparent scrollbar-thumb-rounded [&::-webkit-scrollbar]:w-[6px]">
          <p className="text-sm text-gray-600 mb-4">
            Оберіть тварину зі списку для видалення.
          </p>

          <div className="max-h-60 overflow-auto mb-4">
            {pets.length === 0 ? (
              <div className="text-sm text-gray-500">Немає доданих тварин.</div>
            ) : (
              <ul className="space-y-2">
                {pets.map((p) => {
                  const iconId = petTypeIcons[p.petTypeName] || "icon-other";
                  const isSelected = selectedId === p.id;
                  return (
                    <li key={p.id}>
                      <label
                        className={clsx(
                          "flex items-center gap-3 cursor-pointer p-2 rounded hover:bg-gray-50",
                          isSelected && "bg-primary-50"
                        )}
                      >
                        <input
                          type="radio"
                          name="deletePet"
                          value={p.id}
                          checked={isSelected}
                          onChange={() => setSelectedId(p.id ?? null)}
                          className="w-4 h-4"
                          disabled={loading}
                        />
                        <div className="w-8 h-8 flex items-center justify-center rounded-md">
                          <Icon
                            sprite="/sprites/sprite-animals.svg"
                            id={iconId}
                            width="24"
                            height="24"
                            className={clsx(
                              "stroke-1 stroke-primary",
                              isSelected && "fill-primary-800"
                            )}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{p.name}</div>
                          <div className="text-xs text-gray-500">
                            {p.petTypeName}
                          </div>
                        </div>
                      </label>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </ModalBody>

        <ModalFooter className="flex flex-col gap-2 pt-0 px-6 sm:px-10 md:px-15 pb-6 sm:pb-8">
          <Button
            color="danger"
            onPress={handleConfirm}
            className="w-full rounded-md "
            disabled={!selectedId || loading}
          >
            {loading ? "Видаляю..." : "Видалити тварину"}
          </Button>

          <Button
            variant="light"
            onPress={onClose}
            className="w-full rounded-md text-[16px] font-[400] leading-[1.4] text-primary-700 bg-background border-[1px] border-primary-700"
            disabled={loading}
          >
            Скасувати
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
