"use client";

import Icon from "./Icon";

interface ModalCloseButtonProps {
  onClose: () => void;
  className?: string;
}

export default function ModalCloseButton({
  onClose,
  className,
}: ModalCloseButtonProps) {
  return (
    <button
      onClick={onClose}
      className={`absolute right-4 top-4 border-none bg-transparent cursor-pointer outline-none opacity-70 hover:opacity-100 fill-current stroke-current transition ${className}`}
    >
      <Icon
        sprite="/sprites/sprite-sistem.svg"
        id="icon-close"
        width="24px"
        height="24px"
        className="md:w-[40px] md:h-[40px]"
      />
    </button>
  );
}
