"use client";
import React from "react";
import { Modal, ModalContent, ModalBody, ModalHeader } from "@heroui/react";
import Icon from "../Icon";

type FileType = { url: string; type: "image" | "video" };

type HistoryModalForImageProps = {
  isOpenModalPhoto: boolean;
  setIsOpenModalPhoto: (val: boolean) => void;
  selectedImageUrl: string | null;
  setSelectedImageUrl: (val: string | null) => void;
  selectedFileType: "image" | "video" | null;
  uploadedFiles: FileType[];
};

export default function HistoryModalForImage({
  isOpenModalPhoto,
  setIsOpenModalPhoto,
  selectedImageUrl,
  setSelectedImageUrl,
  selectedFileType,
  uploadedFiles,
}: HistoryModalForImageProps) {
  const currentIndex = uploadedFiles.findIndex(f => f.url === selectedImageUrl);

  const goPrev = () => {
    if (currentIndex === -1) return;
    const prevIndex =
      currentIndex === 0 ? uploadedFiles.length - 1 : currentIndex - 1;
    setSelectedImageUrl(uploadedFiles[prevIndex].url);
  };

  const goNext = () => {
    if (currentIndex === -1) return;
    const nextIndex =
      currentIndex === uploadedFiles.length - 1 ? 0 : currentIndex + 1;
    setSelectedImageUrl(uploadedFiles[nextIndex].url);
  };

  return (
    <Modal
      key={selectedImageUrl}
      isOpen={isOpenModalPhoto}
      size="full"
      backdrop="blur"
      placement="center"
      hideCloseButton
      className="bg-black/80 relative">
      <ModalContent className="bg-transparent shadow-none">
        <ModalHeader className="flex justify-end bg-transparent">
          <button
            onClick={() => {
              setIsOpenModalPhoto(false);
              setSelectedImageUrl(null);
            }}
            className="flex justify-center items-center py-1 px-2 2xl:py-2 2xl:px-3 border-0 focus:outline-none bg-transparent hover:bg-gray-200/60 cursor-pointer rounded-[12px] transition-bg duration-300 group">
            <Icon
              sprite="/sprites/sprite-sistem.svg"
              id="icon-close-no-color"
              width="32px"
              height="32px"
              className="md:w-[40px] md:h-[40px] stroke-background fill-background group-hover:stroke-primary-700 transition-colors duration-300 pointer-events-none transform-gpu"
            />
          </button>
        </ModalHeader>

        <ModalBody className="relative w-screen h-screen p-0 bg-transparent flex justify-center items-center">
          <div className="relative flex items-center lg:gap-[16px] 2xl:gap-[24px]">
            <button
              onClick={goPrev}
              className="absolute left-[1px] flex justify-center items-center py-1 px-2 2xl:py-2 2xl:px-3 border-0 focus:outline-none bg-transparent hover:bg-gray-200/60 cursor-pointer rounded-[12px] transition-bg duration-300 group">
              <Icon
                sprite="/sprites/sprite-sistem.svg"
                id="arrow-left"
                width="32px"
                height="32px"
                className="md:w-[40px] md:h-[40px] stroke-background fill-background group-hover:stroke-primary-700 transition-colors duration-300 pointer-events-none transform-gpu"
              />
            </button>

            {selectedImageUrl &&
              (selectedFileType === "video" ? (
                <video
                  src={selectedImageUrl}
                  controls
                  className="max-w-[90vw] max-h-[80vh] object-contain"
                />
              ) : (
                <img
                  src={selectedImageUrl}
                  alt="modal media"
                  className="max-w-[90vw] max-h-[80vh] object-contain"
                />
              ))}

            <button
              onClick={goNext}
              className="absolute right-[1px]  flex justify-center items-center py-1 px-2 2xl:py-2 2xl:px-3 border-0 focus:outline-none bg-transparent hover:bg-gray-200/60 cursor-pointer rounded-[12px] transition-bg duration-300 group">
              <Icon
                sprite="/sprites/sprite-sistem.svg"
                id="arrow-rigth"
                width="32px"
                height="32px"
                className="stroke-background fill-background group-hover:stroke-primary-700 transition-colors duration-300 pointer-events-none transform-gpu"
              />
            </button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
