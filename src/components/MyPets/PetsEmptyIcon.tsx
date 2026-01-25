import React from "react";
import Image from "next/image";

export default function PetEmptyIcon() {
  return (
    <div className="flex item-center mb-6">
      <Image
        src="/MyPetsEmpty.svg"
        alt="empty pets"
        aria-hidden="true"
        width={88}
        height={88}
        className="md:w-[128px] md:h-[128px]"
      />
    </div>
  );
}
