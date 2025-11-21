import OwnerNav from "@/components/Dashboard/OwnerNav";
import AuthGuard from "./AuthGuard";
// import MobDashboardModal from '@/components/MobDashboardModal/MobDashboardModal';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="min-h-screen h-[calc(100vh-87px)] overflow-hidden">
        <div className="flex flex-row h-full">
          <div className="hidden md:block">
            <OwnerNav />
          </div>
          <div className="flex-1 flex flex-col overflow-auto scrollbar-none py-[16px] md:pl-[32px] md:py-[32px] md:pr-0 2xl:pl-[40px] 2xl:py-[40px]">
            {children}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
