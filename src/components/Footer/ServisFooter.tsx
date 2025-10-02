import { NavLink } from "../Header/NavLink";

const FOOTER_SERVICE = [
  { name: "Переваги", href: "#" },
  { name: "Як записатися на консультацію?", href: "#" },
  { name: "База ветеринарів", href: "/veterinarians" },
  { name: "FAQ", href: "#" },
];

export const ServisFooter = () => {
  return (
    <div className="flex flex-col gap-4 items-start">
      <p className="text-[12px] uppercase">Сервіс</p>
      <ul className="flex flex-col gap-2">
        {FOOTER_SERVICE.map((item, i) => (
          <li key={i}>
            <NavLink
              href={item.href}
              className=" text-[12px] text-white hover:text-primary-400"
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
