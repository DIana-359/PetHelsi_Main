import Header from "@/components/Header/Header";
import { AuthProvider } from "@/contextAuth/authContext";
import { checkToken } from "../api/checkToken";
import { getProfileSSR } from "../api/getProfile";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = await checkToken();
  const dataUser = token ? await getProfileSSR(token) : null;

  return (
    <AuthProvider user={dataUser}>
      <div id="app-root">
        <Header />
        <div className="w-full px-4 md:px-8 xl:px-16 max-w-[1440px] mx-auto pt-[68px] pb-0 md:pt-[87px] *:min-h-[calc(100vh-520px)]">
          {children}
        </div>
      </div>
    </AuthProvider>
  );
}
