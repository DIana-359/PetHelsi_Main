import ModalWindow from "@/components/ModalWindow";
import "./globals.css";
import { Providers } from "@/providers/Providers";

export const metadata = {
  title: "Pet Helsi",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body id="root" className="font-lato">
        <Providers>
            <ModalWindow />
            {children}
        </Providers>
      </body>
    </html>
  );
}
