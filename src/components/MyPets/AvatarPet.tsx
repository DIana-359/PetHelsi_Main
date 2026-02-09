import Image from "next/image";

interface Props {
  avatar?: string;
  firstName?: string;
  size?: number;
  className?: string;
}

export default function AvatarPet({ avatar, firstName, size = 32 }: Props) {
  const initial = firstName ? firstName.trim().charAt(0).toUpperCase() : "";

  const src = avatar ?? null;

  return (
    <div
      className="relative rounded-full overflow-hidden flex-shrink-0"
      style={{ width: size, height: size }}
    >
      {src ? (
        <Image
          src={src}
          alt="Pet photo"
          fill
          className="object-cover"
          unoptimized
          priority
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-300 text-background">
          <span style={{ fontSize: size * 0.65 }}>{initial}</span>
        </div>
      )}
    </div>
  );
}
