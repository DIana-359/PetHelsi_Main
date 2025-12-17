import Image from "next/image";
import lightningPng from "../../public/Logo_nose.svg";

export function Pulse() {
  return (
    <div className="flex items-center justify-center">
      <Image
        src={lightningPng}
        alt="Pulse"
        className="w-10 animate-pulse mb-4"
      />
    </div>
  );
}
