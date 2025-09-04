"use client";
import { MouseEvent, useEffect, useRef, useState } from "react";
import Icon from "../Icon";
import HistoryModal from "./HistoryModal";
import { IHistoryItem } from "@/app/types/historyTypes";
interface HistoryDetailsConsultationProps {
  historyItem: IHistoryItem;
  id: string;
}

export default function HistoryDetailsConsultation({
  historyItem,
  id,
}: HistoryDetailsConsultationProps) {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | globalThis.MouseEvent) => {
      const target = event.target as Node;
      if (
        modalRef.current &&
        !modalRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setIsOpenModal(false);
      }
    };

    if (isOpenModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenModal]);

  return (
    <div className="z-10 absolute top-[24px] right-[0] 2xl:static">
      <div
        ref={buttonRef}
        onClick={e => {
          e.stopPropagation();
          e.preventDefault();
          setIsOpenModal(prev => !prev);
        }}
        className="relative">
        <Icon
          sprite="/sprites/sprite-sistem.svg"
          id="icon-more"
          width="24px"
          height="24px"
          className="stroke-gray-600 fill-background hover:stroke-primary-700 transition-colors duration-300 cursor-pointer"
        />
        {isOpenModal && (
          <div
            ref={modalRef}
            style={{
              boxShadow:
                "0px 4px 6px -2px #10182808, 0px 8px 14px -4px #1018280D",
            }}
            className="absolute top-[24px] right-[12px] bg-white border-none rounded-[8px] shadow">
            <HistoryModal historyItem={historyItem} id={id} />
          </div>
        )}
      </div>
    </div>
  );
}
