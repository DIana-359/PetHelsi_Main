import Image from "next/image";

export const ImgFooter = () => {
  return (
    <div className="relative hidden md:block">
      <Image
        src="/Images/fish.gif"
        width={140}
        height={140}
        priority
        alt="fish logo"
        className="w-[70px] h-[65px] md:w-[140px] md:h-[140px]"
        unoptimized
      />
      <Image
        src="/Images/vector.png"
        alt="fish"
        width={140}
        height={40}
        className="absolute bottom-2 md:bottom-3 w-[70px] h-[18px] md:w-[140px] md:h-[40px]"
        unoptimized
      />
    </div>
  );
};
