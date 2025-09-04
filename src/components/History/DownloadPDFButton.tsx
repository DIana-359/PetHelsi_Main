"use client";
import { useRef, useState } from "react";
import Icon from "../Icon";
import { IHistoryItem } from "@/app/types/historyTypes";
import { usePathname } from "next/navigation";
import PdfGenerator from "./PdfGenerator";

interface Props {
  historyItem?: IHistoryItem;
  id?: string | number;
}

const DownloadPDFButton = ({ historyItem }: Props) => {
  const pathname = usePathname();
  const [isOpenModalPDF, setIsOpenModalPDF] = useState<boolean>(false);
  const isOwnerHistory = pathname === "/owner/history";
  const [error, setError] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const replaceUnsupportedColors = (el: HTMLElement) => {
    const elements = el.querySelectorAll("*");
    elements.forEach(child => {
      const htmlChild = child as HTMLElement;
      const style = getComputedStyle(htmlChild);
      ["color", "backgroundColor", "borderColor"].forEach(prop => {
        const val = style.getPropertyValue(prop);
        if (val.includes("oklch")) {
          htmlChild.style.setProperty(prop, "#000000");
        }
      });
    });
  };

  const handleDownloadPdf = async () => {
    if (!contentRef.current) return;

    replaceUnsupportedColors(contentRef.current);

    try {
      const html2pdf = (await import("html2pdf.js")).default;

      await html2pdf()
        .set({
          margin: 0,
          filename: "consultation.pdf",
          image: { type: "jpeg", quality: 1 },
          html2canvas: {
            scale: 4,
            useCORS: true,
            dpi: 300,
            letterRendering: true,
          },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        })
        .from(contentRef.current)
        .save();
    } catch (err) {
      console.error("Error PDF:", err);
      setError("Не вдалося завантажити PDF");
    }
  };

  const isDownloadAllowed = historyItem?.statusType === "COMPLETED";

  if (error) return <div>Помилка: {error}</div>;

  return (
    <>
      <PdfGenerator
        contentRef={contentRef}
        historyItem={historyItem}
        isOpenModalPDF={isOpenModalPDF}
        setIsOpenModalPDF={setIsOpenModalPDF}
        handleDownloadPdf={handleDownloadPdf}
      />

      <button
        type="button"
        onClick={() => setIsOpenModalPDF(true)}
        disabled={!isDownloadAllowed}
        className={`flex items-center gap-[8px] ${
          isDownloadAllowed
            ? "group cursor-pointer"
            : "opacity-50 cursor-not-allowed"
        }`}>
        <Icon
          sprite="/sprites/sprite-sistem.svg"
          id="icon-import"
          width="20px"
          height="20px"
          className={`fill-background ${
            isDownloadAllowed
              ? isOwnerHistory
                ? "stroke-gray-900 group-hover:stroke-primary-700"
                : "stroke-primary-700 group-hover:stroke-primary-900"
              : "stroke-gray-400"
          } transition-colors duration-300`}
        />
        <span
          className={`text-[14px] ${
            isDownloadAllowed
              ? isOwnerHistory
                ? "text-gray-900 group-hover:text-primary-700"
                : "text-primary-700 group-hover:text-primary-900"
              : "text-gray-400"
          }`}>
          Завантажити в PDF
        </span>
      </button>
    </>
  );
};

export default DownloadPDFButton;
