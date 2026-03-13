import Image from "next/image";
import clsx from "clsx";

interface Props {
  avatar?: string;
  firstName?: string;
  size?: number;
  className?: string;
}

export default function AvatarPet({
  avatar,
  firstName,
  size = 32,
  className,
}: Props) {
  const initial = firstName ? firstName.trim().charAt(0).toUpperCase() : "";

  return (
    <div
      className={clsx(
        "relative rounded-full overflow-hidden flex-shrink-0",
        className,
      )}
      style={{ width: size, height: size }}
    >
      {avatar ? (
        <Image
          src={avatar}
          alt="Pet photo"
          fill
          className="object-cover"
          unoptimized
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-300 text-background">
          <span style={{ fontSize: size * 0.65 }}>{initial}</span>
        </div>
      )}
    </div>
  );
}
