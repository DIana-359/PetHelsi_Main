"use client";
import Icon from "../Icon";
import ModalCloseButton from "../ModalCloseButton";

interface GlobalMessageProps {
  visible: boolean;
  onClose: () => void;
  message?: string;
}

export function GlobalMessage({
  visible,
  onClose,
  message = "",
}: GlobalMessageProps) {
  if (!visible) return null;

  return (
    <div
      className="
      relative w-full min-h-[40px] flex items-center justify-center px-6 mb-4 md:mb-6 gap-[10px] bg-[#f1fbf1] border-b border-[#73d172] rounded-t-[6px]
      text-[14px] text-[#333f5d]"
    >
      <Icon
        sprite="/sprites/sprite-sistem.svg"
        id="icon-chec_-ring_filled"
        width="20"
        height="20"
        className="text-[#2b9429]"
      />
      <span>{message}</span>
      <div className="absolute text-[#333f5d] -right-4 -top-2 scale-[1] md:-top-1 z-10 md:right-4 md:scale-[0.65]">
        <ModalCloseButton onClose={onClose} />
      </div>
    </div>
  );
}
