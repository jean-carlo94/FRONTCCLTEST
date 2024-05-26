import type { Metadata } from "next";

import { LayoutHome } from "@/components";

export const metadata: Metadata = {
  title: "CCL TEST - Home",
  description: "CCL TEST - Home",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LayoutHome>
      { children } 
    </LayoutHome>
  );
}
