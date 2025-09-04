"use client";
import { IHistoryItem } from "@/app/types/historyTypes";
import { useEffect, useRef, useState } from "react";
import Icon from "../Icon";
import HistoryModalForImage from "./HistoryModalForImage";
interface HistoryUploadedFilesProps {
  historyItem?: IHistoryItem;
}

export default function HistoryUploadedFiles({
  historyItem,
}: HistoryUploadedFilesProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<
    { url: string; type: "image" | "video" }[]
  >([]);
  const [isOpenModalPhoto, setIsOpenModalPhoto] = useState<boolean>(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  console.log(historyItem);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const fileType = file.type.startsWith("image") ? "image" : "video";
    const localUrl = URL.createObjectURL(file);

    setUploadedFiles(prev => [...prev, { url: localUrl, type: fileType }]);
  };

  useEffect(() => {
    return () => {
      uploadedFiles.forEach(file => URL.revokeObjectURL(file.url));
    };
  }, []);

  return (
    <>
      <h3 className="text-[18px] leading-[1.4] font-[500] text-gray-900 mb-[16px]">
        Завантажені файли
      </h3>

      <ul className="flex gap-[16px] flex-wrap">
        <li>
          <button
            type="button"
            onClick={handleClick}
            className="relative p-[23px] md:p-[46px] w-[62px] h-[62px] md:w-[124px] md:h-[124px] border border-primary-700 rounded-[6px] group bg-background hover:border-primary-900 transition-transform duration-150 transform active:scale-95 focus:outline-none focus:ring-0 cursor-pointer">
            <Icon
              sprite="/sprites/sprite-sistem.svg"
              id="icon-plus"
              width="32px"
              height="32px"
              className="absolute inset-0 m-auto stroke-primary-700 fill-background group-hover:stroke-primary-900 transition-colors duration-300 pointer-events-none transform-gpu"
            />
          </button>
          <input
            type="file"
            accept="image/*,video/*"
            multiple
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
          />
        </li>

        {uploadedFiles.map((file, index) => (
          <li
            key={index}
            className="relative w-[124px] h-[124px] cursor-pointer"
            onClick={() => {
              setSelectedImageUrl(file.url);
              setIsOpenModalPhoto(true);
            }}>
            {file.type === "image" ? (
              <img
                src={file.url}
                alt={`image-${index}`}
                className="rounded-[6px] border border-gray-200 object-cover w-[124px] h-[124px]"
              />
            ) : (
              <video
                src={file.url}
                controls
                className="rounded-[6px] border border-gray-200 object-cover w-[124px] h-[124px]"
              />
            )}
          </li>
        ))}
      </ul>
      <HistoryModalForImage
        isOpenModalPhoto={isOpenModalPhoto}
        setIsOpenModalPhoto={setIsOpenModalPhoto}
        setSelectedImageUrl={setSelectedImageUrl}
        selectedImageUrl={selectedImageUrl}
        selectedFileType={
          selectedImageUrl
            ? uploadedFiles.find(f => f.url === selectedImageUrl)?.type ?? null
            : null
        }
        uploadedFiles={uploadedFiles}
      />
    </>
  );
}
