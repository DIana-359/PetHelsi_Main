import { SistemProvider } from "../contextSistem/contextSistem";
import ModalWindow from "@/components/ModalWindow";
import "./globals.css";

export const metadata = {
  title: "Pet Helsi",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <body id="root" className="font-lato">
        <SistemProvider>
          <ModalWindow />
          {children}
        </SistemProvider>
      </body>
    </html>
  );
}
