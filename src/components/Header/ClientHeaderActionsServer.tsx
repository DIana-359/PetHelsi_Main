"use client";
import Icon from "../Icon";
import { NavLink } from "./NavLink";
import HeaderOwnerActions from "./HeaderOwnerActions";
import Navigation from "./Navigation";
import BurgerMenue from "./BurgerMenue";
import { useProfile } from "@/hooks/owners/useProfile";

export default function ClientHeaderActionsServer() {
  const { data } = useProfile();

  if (data) {
    return <HeaderOwnerActions />;
  }

  return (
    <div className="flex flex-row lg:gap-16 justify-between">
      <BurgerMenue />
      <Navigation />
      <div className="flex items-center gap-4">
        <div className="hidden md:flex flex-row gap-2 lg:gap-5 items-center text-md font-medium">
          <NavLink
            href="/signin"
            className="flex items-center gap-2 border rounded-md border-background pr-1 pl-5 py-2 hover:bg-primary-200 hover:border-primary-800 text-primary">
            Увійти
            <Icon
              sprite="/sprites/sprite-sistem.svg"
              id="icon-login"
              width="24px"
              height="24px"
              className="stroke-primary stroke-1"
            />
          </NavLink>

          <NavLink
            href="/signup"
            className="flex items-center gap-2 border rounded-md border-primary-800 px-5 py-2 hover:bg-primary-200 text-primary">
            Зареєструватися
          </NavLink>
        </div>
      </div>
    </div>
  );
}
