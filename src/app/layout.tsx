import ModalWindow from "@/components/ModalWindow";
import "./globals.css";
import { Providers } from "@/providers/Providers";

export const metadata = {
  title: "Pet Helsi",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <body id="root" className="font-lato">
        <Providers>
          <ModalWindow />
          {children}
        </Providers>
      </body>
    </html>
  );
}
