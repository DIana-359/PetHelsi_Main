import { NavLink } from "../Header/NavLink";

const FOOTER_FORUSER = [
  { name: "Політика конфіденційності", href: "/processing-regulation" },
  { name: "Положення про обробку даних", href: "/veterinarians" },
  { name: "Оплата та повернення", href: "#" },
];

export const ForuserFooter = () => {
  return (
    <div className="flex flex-col gap-4 items-start text-[14px]">
      <p className=" uppercase">Користувачу</p>
      <ul className="flex flex-col gap-2">
        {FOOTER_FORUSER.map((item, i) => (
          <li key={i}>
            <NavLink
              href={item.href}
              className=" text-[14px] text-white hover:text-primary-400"
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
