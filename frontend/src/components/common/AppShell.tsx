"use client";

import { ReactNode, useMemo } from "react";
import { usePathname } from "next/navigation";
import NavBar from "../navbar/NavBar";
import Footer from "../footer/Footer";

type AppShellProps = {
  children: ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();

  // Hide chrome for specific routes (About page specifically for now)
  const hideChrome = useMemo(() => {
    return pathname === "/about";
  }, [pathname]);

  if (hideChrome) {
    return <>{children}</>;
  }

  return (
    <>
      <NavBar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
