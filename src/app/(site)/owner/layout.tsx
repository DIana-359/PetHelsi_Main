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
      <div className="min-h-[calc(100vh-276px)]">
        <div className="flex flex-row">
          <div className="hidden md:block">
            <OwnerNav />
          </div>
          <div
            className="w-full h-[calc(100vh-112px)] py-[16px] md:pl-[32px] md:py-[32px] md:pr-0 2xl:pl-[40px] 2xl:py-[40px] overflow-hidden"
            style={{ scrollbarWidth: "none" }}>
            {children}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
