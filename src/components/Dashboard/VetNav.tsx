import { NavItem } from "./NavItem";
import { NAV_ITEMS_VET } from "@/Constants";
import ButtonLogout from "./ButtonLogout";

export default function VetNav() {
  return (
    <div className="w-full md:pt-[40px] md:w-[200px] 2xl:w-[280px] flex flex-col justify-between gap-[8px] h-[calc(100vh-87px)] md:border-r-[1px] md:border-primary-200">
      <nav className="space-y-4">
        {NAV_ITEMS_VET.map(navItem => (
          <NavItem key={navItem.category} {...navItem} basePath="/vet/" />
        ))}
      </nav>

      <ButtonLogout />
    </div>
  );
}
