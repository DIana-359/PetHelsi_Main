import Image from "next/image";

interface Props {
  avatar?: string | null;
  firstName?: string | null;
  email?: string | null;
  size?: number;
}

export default function AvatarUser({
  avatar,
  firstName,
  email,
  size = 32,
}: Props) {
  const style = {
    width: `${size}px`,
    height: `${size}px`,
    fontSize: `${size * 0.65}px`,
  };

  const initial = firstName
    ? firstName.trim().charAt(0).toUpperCase()
    : email
    ? email.trim().charAt(0).toUpperCase()
    : "";

  if (avatar && avatar.startsWith("http") && !avatar.endsWith("/null")) {
    return (
      <Image
        src={avatar}
        width={size}
        height={size}
        priority
        alt="User photo"
        className="rounded-full object-cover"
        style={style}
        unoptimized
      />
    );
  }

  return (
    <div
      className="flex-shrink-0 flex items-center justify-center rounded-full bg-gray-300 text-background text-[52px] select-none cursor-pointer "
      style={style}
      aria-label="User initial"
      title={initial || undefined}>
      {initial}
    </div>
  );
}
