"use client";
import { useSistem } from "../../contextSistem/contextSistem";
import OwnerNav from "@/components/Dashboard/OwnerNav";

export default function MobDashboardModal() {
  const { isOpenModalDashboard } = useSistem();

  return (
    <div
      className={`md:hidden fixed top-[96px] right-0 z-50 overflow-y-auto w-full bg-background shadow-lg px-3 py-[32px] xs:px-6 transform transition-transform duration-500 ease-in-out ${
        isOpenModalDashboard
          ? "translate-x-0"
          : "translate-x-full pointer-events-none"
      }`}>
      <OwnerNav />
    </div>
  );
}
