import Link from "next/link";
import Icon from "../Icon";

export const LogoFooter = () => {
  return (
    <Link
      className="flex felx-row items-start gap-[4px] md:gap-[6px] transition-transform duration-300 hover:scale-102"
      href={"/"}
    >
      <Icon
        sprite="/sprites/sprite-animals.svg"
        id="icon-head-logo"
        width="25px"
        height="28px"
        className="md:w-[32px] md:h-[32px] fill-white"
      />
      <div className="text-[24px] leading-none lg:text-[30px]">PetHelsi</div>
    </Link>
  );
};
