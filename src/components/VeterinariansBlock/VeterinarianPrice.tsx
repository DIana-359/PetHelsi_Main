"use client";
import { usePathname } from "next/navigation";

interface VeterinarianPriceProps {
  price: number;
}

export default function VeterinarianPrice({ price }: VeterinarianPriceProps) {
  const pathname = usePathname();
  const showRate = pathname !== "/";

  if (!showRate) return null;

  return (
    <div className="font-[500] text-[18px] leading-[100%] tracking-[0] text-left align-middle text-gray-900 mb-[12px]">
      {price} UAH
    </div>
  );
}
