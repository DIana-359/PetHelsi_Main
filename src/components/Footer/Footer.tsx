import Image from "next/image";
import Link from "next/link";
import { NavLink } from "../Header/NavLink";
import { FormFooter } from "./FormFooter";
import Icon from "../Icon";

interface IProps {
  token: true | undefined;
}

const FOOTER_SERVICE = [
  { name: "Переваги", href: "#" },
  { name: "Як записатися на консультацію?", href: "#" },
  { name: "База ветеринарів", href: "/veterinarians" },
  { name: "FAQ", href: "#" },
];

const FOOTER_FORUSER = [
  { name: "Політика конфіденційності", href: "/processing-regulation" },
  { name: "Положення про обробку даних", href: "/veterinarians" },
  { name: "Оплата та повернення", href: "#" },
];

export default function Footer({ token }: IProps) {
  return (
    <div className="w-full max-w-[1440px] mx-auto">
      <div className="flex flex-col items-center relative w-full bg-primary-800 px-4 pt-10 md:px-10  rounded-tl-3xl rounded-tr-3xl ">
        <div className="w-full flex flex-col-reverse lg:flex-row gap-6 justify-between text-white pb-8 md:pb-12">
          <div className="flex flex-col">
            <Link
              className="flex felx-row items-center gap-[4px] md:gap-[6px] transition-transform duration-300 hover:scale-102"
              href={"/"}>
              <Icon
                sprite="/sprites/sprite-animals.svg"
                id="icon-head-logo"
                width="25px"
                height="28px"
                className=" w-[25px] md:w-[32px] fill-white"
              />
              <div className="text-[24px] lg:text-[30px]">PetHelsi</div>
            </Link>
            <p className="hidden lg:block text-[12px]">
              З турботою про ваших улюбленців
            </p>
          </div>
          <div className="flex flex-row justify-between lg:gap-[120px] shrink-1 lg:px-6">
            <div className="flex flex-col gap-4 items-start">
              <p className="text-[12px] uppercase">Сервіс</p>
              <ul className="flex flex-col gap-2">
                {FOOTER_SERVICE.map((item, i) => (
                  <li key={i}>
                    <NavLink
                      href={item.href}
                      className=" text-[12px] text-white hover:text-primary-400">
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4 items-start text-[12px]">
              <p className=" uppercase">Користувачу</p>
              <ul className="flex flex-col gap-2">
                {FOOTER_FORUSER.map((item, i) => (
                  <li key={i}>
                    <NavLink
                      href={item.href}
                      className=" text-[12px] text-white hover:text-primary-400">
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="w-[271px]">{!token && <FormFooter />}</div>

          <div className="absolute bottom-14 lg:bottom-6 right-6">
            <div className="relative">
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
                className="absolute bottom-2 lg:bottom-3 w-[70px] h-[18px] md:w-[140px] md:h-[40px]"
                unoptimized
              />
            </div>
          </div>
        </div>
        <div className="text-primary-300 text-center text-[8px] w-[175px] md:w-[300px] md:text-[12px] pb-4">
          © PetHelsi. Всі права захищені. 2025
        </div>
      </div>
    </div>
  );
}
