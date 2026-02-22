import Header from "@/components/Header/Header";
import { HydrationBoundary } from "@tanstack/react-query";
import { fetchProfileAndDehydrate } from "@/services/auth/fetchProfileAndDehydrate";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { dehydratedState } = await fetchProfileAndDehydrate();;

  return (
      <div id="app-root">
        <HydrationBoundary state={dehydratedState}>
          <Header />
          <div className="w-full px-4 md:px-8 xl:px-16 max-w-[1440px] mx-auto pt-[68px] pb-0 md:pt-[87px] *:min-h-[calc(100vh-520px)]">
            {children}
          </div>
        </HydrationBoundary>
      </div>
  );
}
