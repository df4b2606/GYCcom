import type { Metadata } from "next";
import { Geist, Geist_Mono, Dancing_Script } from "next/font/google";
import "./globals.css";
import AppShell from "../components/common/AppShell";
import { ThemeProvider } from "../components/common/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const scriptLogo = Dancing_Script({
  variable: "--font-logo-script",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GYC的个人博客",
  description: "分享技术与生活",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${scriptLogo.variable}`}
      suppressHydrationWarning
    >
      <body
        className="antialiased min-h-screen flex flex-col"
        suppressHydrationWarning={true}
      >
        <ThemeProvider>
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
