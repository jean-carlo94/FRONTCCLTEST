import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CCL TEST",
  description: "CCL TEST Jean Carlo Urrego",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
        <body data-theme="night" className={inter.className}>
          <Providers>
            { children }
          </Providers>
        </body>
      </html>
  );
}
