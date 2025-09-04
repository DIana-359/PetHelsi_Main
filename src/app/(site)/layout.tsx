import Header from "@/components/Header/Header";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div id="app-root">
      <Header />
      <div className="w-full px-4 md:px-8 xl:px-16 max-w-[1440px] mx-auto pt-[96px] pb-0 md:pt-[105px] *:min-h-[calc(100vh-520px)]">
        {children}
      </div>
    </div>
  );
}
