import Link from "next/link";
//import { ClientHeaderActions } from "./ClientHeaderActions";
import Icon from "../Icon";
// import { cookies } from 'next/headers'
import ClientHeaderActionsServer from "./ClientHeaderActionsServer";
import MobDashboardModal from "../MobDashboardModal/MobDashboardModal";

export default async function Header() {
  // const cookieStore = await cookies();
  // const token = cookieStore.get('auth-token')?.value; 
  return (
    <div className="fixed z-50 top-0 w-full border-b border-primary-200 bg-background">
      <header className="mx-auto flex flex-row max-w-[1440px] items-center justify-between py-6 px-4 md:px-8 xl:px-16">
        <Link
          className="flex felx-row items-center gap-[4px] md:gap-[6px] transition-transform duration-300 hover:scale-102"
          // href={!token ? "/" : "/owner/profile"}
          href="/">
          <Icon
            sprite="/sprites/sprite-animals.svg"
            id="icon-head-logo"
            width="25px"
            height="28px"
            className="text-primary w-[25px] md:w-[32px]"
          />
          <div className="text-primary text-[24px] md:text-[30px]">
            PetHelsi
          </div>
        </Link>
        <ClientHeaderActionsServer />
      </header>
      <MobDashboardModal />
    </div>
  );
}
