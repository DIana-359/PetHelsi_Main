import { NavItem } from "./NavItem";
import { NAV_ITEMS_OWNER } from "@/app/Constants";
import ButtonLogout from "@/components/ButtonLogout";

export enum Category {
  history = "Історія прийомів",
  chats = "Чати",
  pets = "Мої тварини",
  veterinarians = "Ветеринари",
  profile = "Мій профіль",
  settings = "Налаштування",
}

export default function OwnerNav() {
  return (
    <div className="w-full md:pt-[40px] md:w-[200px] lg:w-[280px] flex flex-col justify-between gap-[8px] h-[calc(100vh-110px)] md:border-r-[1px] md:border-primary-200">
      <nav className="space-y-4">
        {NAV_ITEMS_OWNER.map(navItem => (
          <NavItem key={navItem.category} {...navItem} />
        ))}
      </nav>

      <ButtonLogout />
    </div>
  );
}
