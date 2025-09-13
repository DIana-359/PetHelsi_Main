import Image from "next/image";
import { FaCircleUser } from "react-icons/fa6";

interface Props {
  avatar?: string | null;
  firstLetter?: string | null;
  size?: number;
}

export default function AvatarUser({ avatar, firstLetter, size = 32 }: Props) {
  const letter = firstLetter ? firstLetter.trim().charAt(0).toUpperCase() : "";
  const style = {
    width: `${size}px`,
    height: `${size}px`,
    fontSize: `${size * 0.65}px`,
  };

  if (avatar?.startsWith("http")) {
    return (
      <Image
        src={avatar}
        width={size}
        height={size}
        priority
        alt="User photo"
        className="rounded-full object-cover"
        style={{ width: `${size}px`, height: `${size}px` }}
        unoptimized
      />
    );
  }

  if (letter) {
    return (
      <div
        className="flex-shrink-0 flex items-center justify-center rounded-full bg-primary-800 text-white select-none cursor-pointer hover:bg-primary-900 transition-colors duration-300"
        style={style}
        aria-label="User initial"
        title={firstLetter ?? undefined}>
        {letter}
      </div>
    );
  }

  return (
    <FaCircleUser
      className="fill-gray-300 rounded-full hover:fill-gray-400 cursor-pointer transition-colors duration-300"
      style={{ width: `${size}px`, height: `${size}px` }}
    />
  );
}
