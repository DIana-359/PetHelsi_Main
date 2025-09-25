import Link from "next/link";
//import { ClientHeaderActions } from "./ClientHeaderActions";
import Icon from "../Icon";
import ClientHeaderActionsServer from "./ClientHeaderActionsServer";
import MobDashboardModal from "../MobDashboardModal/MobDashboardModal";

export default async function Header() {
  return (
    <div className="fixed z-50 top-0 w-full border-b border-primary-200 bg-background">
      <header className="mx-auto flex flex-row max-w-[1440px] items-center justify-between p-[16px] md:py-[21px] md:px-[72px]">
        <Link
          className="flex felx-row items-center gap-[4px] md:gap-[6px] group transition-transform duration-300 ease-in-out"
          href="/">
          <Icon
            sprite="/sprites/sprite-animals.svg"
            id="icon-head-logo"
            width="25px"
            height="28px"
            className="text-primary w-[25px] md:w-[32px] group-hover:text-primary-900 group-hover:transition-transform group-hover:duration-300"
          />
          <div className="text-primary text-[24px] md:text-[30px] group-hover:text-primary-900 group-hover:transition-transform group-hover:duration-300">
            PetHelsi
          </div>
        </Link>
        <ClientHeaderActionsServer />
      </header>
      <MobDashboardModal />
    </div>
  );
}
