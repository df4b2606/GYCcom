"use client";

import { ReactNode, useMemo } from "react";
import { usePathname } from "next/navigation";
import NavBar from "../navbar/NavBar";
import Footer from "../footer/Footer";
import { useTheme } from "./ThemeProvider";
import Image from "next/image";

type AppShellProps = {
  children: ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const { isDark } = useTheme();

  // Decide which chrome parts to hide per route/state
  const hideAllChrome = useMemo(() => pathname === "/about", [pathname]);
  // NavBar should always be visible, so remove hideNavOnly logic
  const hideNavOnly = false;

  if (hideAllChrome) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Global background - different for light and dark modes */}
      {isDark ? (
        <div className="fixed inset-0 -z-10">
          <Image
            src="/DSC07098.jpg"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/85" />
        </div>
      ) : (
        <div className="fixed inset-0 -z-10 bg-gray-100" />
      )}
      {!hideNavOnly && <NavBar />}
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
