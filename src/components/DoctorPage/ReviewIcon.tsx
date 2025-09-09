import React from "react";
import Image from "next/image";

export default function ReviewIcon() {
  return (
    <div className="relative inline-block w-[86px] h-[63px]">
      <Image
        src="/Review.svg"
        alt="review bubble"
        aria-hidden="true"
        width={86}
        height={63}
      />

      <div className="absolute inset-0 flex flex-col items-center p-2 gap-2">
        <div className="flex gap-1 ">
          {Array.from({ length: 4 }).map((_, i) => (
            <Image
              key={i}
              src="/Stars.svg"
              alt="star"
              aria-hidden="true"
              width={13}
              height={12}
            />
          ))}
        </div>

        <div className="flex flex-col items-start gap-1">
          <div className="h-[2px] w-[60px] bg-[#C9E2F8] rounded" />
          <div className="h-[2px] w-[40px] bg-[#C9E2F8] rounded" />
        </div>
      </div>
    </div>
  );
}
