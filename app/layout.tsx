import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { setCookie } from "cookies-next";
// import { ThemeProvider } from "/components/theme-provider";
const inter = Inter({ subsets: ["latin"] });
import Link from "next/link";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { MSWComponent } from "@/_components/MSWComponent";
import RQProvider from "@/providers/RQProvider";

// import { ModeToggle } from "/components/mode-toggle";
export const metadata: Metadata = {
  title: "Beom's Blog",
  description: "Generated by create next app",

  appleWebApp: {
    capable: true,
    title: `Beom's Blog`,
  },
};

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="false">
      <body className={inter.className}>
        <RQProvider>
          <MSWComponent />
          <ThemeProvider>{children}</ThemeProvider>
        </RQProvider>
      </body>
    </html>
  );
}

// export default dynamic(() => Promise.resolve(RootLayout), { ssr: false });
export default RootLayout;