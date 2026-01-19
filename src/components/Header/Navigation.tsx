import { NAV_ITEMS } from "@/Constants";
import { NavLink } from "./NavLink";

export default function Navigation() {
  return (
    <nav className="hidden md:flex ">
      <ul className="flex flex-row gap-4 lg:gap-12 text-md font-medium text-gray mr-4">
        {NAV_ITEMS.map((item, i) => (
          <li key={i} className="flex justify-center items-center">
            <NavLink href={item.href} className="hover:text-primary">
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}