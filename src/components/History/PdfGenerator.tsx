"use client";
import { IHistoryItem } from "@/types/historyTypes";
import HistoryMedicalReport from "./HistoryMedicalReport";
import { RefObject, useEffect, useState } from "react";
import Modal from "react-modal";
import { IoMdClose } from "react-icons/io";
import Icon from "../Icon";

interface Props {
  historyItem?: IHistoryItem;
  contentRef: RefObject<HTMLDivElement | null>;
  isOpenModalPDF: boolean;
  setIsOpenModalPDF: (value: boolean) => void;
  handleDownloadPdf: () => Promise<void>;
}
const now = new Date();
const months = [
  "Січ",
  "Лют",
  "Бер",
  "Кві",
  "Тра",
  "Чер",
  "Лип",
  "Сер",
  "Вер",
  "Жов",
  "Лис",
  "Гру",
];

const day = now.getDate();
const month = months[now.getMonth()];
const year = now.getFullYear();
const hours = now.getHours().toString().padStart(2, "0");
const minutes = now.getMinutes().toString().padStart(2, "0");
const formatted = `${day} ${month} ${year}, о ${hours}:${minutes}`;

if (typeof window !== "undefined") {
  Modal.setAppElement("#root");
}

export default function PdfGenerator({
  contentRef,
  historyItem,
  isOpenModalPDF,
  setIsOpenModalPDF,
  handleDownloadPdf,
}: Props) {
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  if (!historyItem) return <div />;

  const handleDownload = async () => {
    setIsGenerating(true);
    await handleDownloadPdf();
    setIsGenerating(false);
  };

  return (
    <Modal
      isOpen={isOpenModalPDF}
      onRequestClose={() => setIsOpenModalPDF(false)}
      style={{
        overlay: {
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 50,
        },
        content: {
          backgroundColor: "#FFFFFF",
          inset: "50% auto auto 50%",
          transform: "translate(-50%, -50%)",
          maxWidth: "90vw",
          maxHeight: "90vh",
          overflow: "auto",
          padding: 0,
          border: "none",
        },
      }}>
      <div
        ref={contentRef}
        className="w-[794px] h-[1123px] relative p-[115px_47px_73px_47px] overflow-auto scrollbar-none"
        style={{ backgroundColor: "#FFFFFF", scrollbarWidth: "none" }}>
        {!isGenerating && (
          <button
            onClick={() => setIsOpenModalPDF(false)}
            className="absolute top-2 right-1 w-8 h-8 flex items-center justify-center text-gray-900 font-bold z-50 cursor-pointer hover:text-[#1E88E5] transition-colors duration-300">
            <IoMdClose />
          </button>
        )}

        <div
          className="absolute top-0 left-[32px] flex items-center justify-center w-[95px] h-[90px] rounded-bl-[27px] rounded-br-[27px]"
          style={{ backgroundColor: "#1E88E5" }}>
          <img
            src="/Images/logo-pdf.png"
            alt="Logo"
            className="w-[64px] h-[38px]"
            crossOrigin="anonymous"
          />
        </div>

        <p className="absolute top-5 right-10 text-[8px] leading-[1.4] font-[400] text-gray-900">
          Надруковано {formatted}
        </p>

        <h3
          className="text-[14px] font-semibold mb-[16px]"
          style={{ color: "#333F5D" }}>
          Загальна інформація прийому
        </h3>

        <ul className="grid grid-cols-3 gap-0 mb-[24px]">
          <li
            className="py-[10px] px-[8px] border-r border-b"
            style={{ borderColor: "#80BCF0" }}>
            <p className="text-[12px] mb-1" style={{ color: "#8B93A5" }}>
              Ім’я
            </p>
            <p className="text-[14px]" style={{ color: "#333F5D" }}>
              {historyItem.patientName}
            </p>
          </li>
          <li
            className="py-[10px] px-[8px] border-r border-b"
            style={{ borderColor: "#80BCF0" }}>
            <p className="text-[12px] mb-1" style={{ color: "#8B93A5" }}>
              Вид
            </p>
            <p className="text-[14px]" style={{ color: "#333F5D" }}>
              {historyItem.petTypeName}
            </p>
          </li>
          <li
            className="py-[10px] px-[8px] border-b"
            style={{ borderColor: "#80BCF0" }}>
            <p className="text-[12px] mb-1" style={{ color: "#8B93A5" }}>
              Лікар
            </p>
            <p className="text-[14px]" style={{ color: "#333F5D" }}>
              {historyItem.doctorShortName}
            </p>
          </li>
          <li
            className="py-[10px] px-[8px] border-r"
            style={{ borderColor: "#80BCF0" }}>
            <p className="text-[12px] mb-1" style={{ color: "#8B93A5" }}>
              Дата
            </p>
            <p className="text-[14px]" style={{ color: "#333F5D" }}>
              {historyItem.date}
            </p>
          </li>
          <li
            className="py-[10px] px-[8px] border-r"
            style={{ borderColor: "#80BCF0" }}>
            <p className="text-[12px] mb-1" style={{ color: "#8B93A5" }}>
              Час
            </p>
            <p className="text-[14px]" style={{ color: "#333F5D" }}>
              {historyItem.time}
            </p>
          </li>
        </ul>

        <HistoryMedicalReport historyItem={historyItem} />

        {!isGenerating && (
          <button
            onClick={handleDownload}
            className="group absolute bottom-10 right-4 bg-transparent flex items-center gap-1 cursor-pointer z-50">
            <Icon
              sprite="/sprites/sprite-sistem.svg"
              id="icon-import"
              width="20px"
              height="20px"
              className="stroke-[#1376CC] fill-[#1376CC] group-hover:stroke-[#1E88E5] group-hover:fill-[#1E88E5] transition-colors duration-300"
            />
            <span className="underline text-[18px] text-[#1376CC] group-hover:text-[#1E88E5] transition-colors duration-300">
              Завантажити
            </span>
          </button>
        )}

        <div
          className="w-full absolute bottom-0 left-0 h-[27px]"
          style={{ backgroundColor: "#1E88E5" }}></div>
      </div>
    </Modal>
  );
}
