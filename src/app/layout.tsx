import { AuthProvider } from "../contextAuth/authContext";
import { SistemProvider } from "../contextSistem/contextSistem";
import ModalWindow from "@/components/ModalWindow";
import "./globals.css";

export const metadata = {
  title: "Pet Helsi",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <body id="root" className="font-lato">
        <SistemProvider>
          <AuthProvider>
            <ModalWindow />
            {children}
          </AuthProvider>
        </SistemProvider>
      </body>
    </html>
  );
}
