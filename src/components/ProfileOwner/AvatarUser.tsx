import Image from "next/image";
import { FaCircleUser } from "react-icons/fa6";

interface Props {
  avatar?: string | null | undefined;
  email?: string | null | undefined;
  size?: number;
}

export default function AvatarUser({ avatar, email, size = 32 }: Props) {
  const emailLetter = email ? email.trim().charAt(0).toUpperCase() : "";
  const dimension = `${size}px`;

  if (avatar?.startsWith("http")) {
    return (
      <Image
        src={avatar}
        width={size}
        height={size}
        priority
        alt="User photo"
        className="rounded-full object-cover"
        unoptimized
      />
    );
  }

  if (emailLetter) {
    return (
      <div
        className="flex-shrink-0 flex items-center justify-center rounded-full bg-primary-800 text-white select-none cursor-pointer"
        style={{
          width: dimension,
          height: dimension,
          fontSize: `${size * 0.65}px`,
          fontWeight: "bold",
        }}
        aria-label="User initial"
        title={email ?? undefined}>
        {emailLetter}
      </div>
    );
  }
  return (
    <FaCircleUser
      className="fill-gray-300 rounded-full"
      style={{
        width: dimension,
        height: dimension,
      }}
    />
  );
}
