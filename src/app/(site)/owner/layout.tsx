import OwnerNav from "@/components/Dashboard/OwnerNav";
import { redirect } from "next/navigation";
import { HydrationBoundary } from "@tanstack/react-query";
import { fetchProfileAndDehydrate } from "@/services/auth/fetchProfileAndDehydrate";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { dehydratedState, profile } = await fetchProfileAndDehydrate();

  if (!profile) {
    redirect("/signin");
  }

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="min-h-screen h-[calc(100vh-87px)] overflow-hidden">
        <div className="flex flex-row h-full">
          <div className="hidden lg:block">
            <OwnerNav />
          </div>
          <div className="flex-1 flex flex-col overflow-auto scrollbar-none py-[16px] md:pl-[32px] md:py-[32px] md:pr-0 2xl:pl-[40px] 2xl:py-[40px]">
            {children}
          </div>
        </div>
      </div>
    </HydrationBoundary>
  );
}
