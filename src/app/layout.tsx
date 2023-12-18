import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import HomeSearch from "./_components/HomeSearch";
import { Providers } from "@/providers";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trending Gif",
  description: "This is a trending gif application",
};

// This root layout will be applied for every routes in the application
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <main className="flex flex-col mx-auto max-w-[1088px] px-4 pb-8 space-y-8 min-h-screen">
            <div className="space-y-2">
              <Link className="block h-20 w-20" href="/">
                <Image alt="logo" src="/logo.svg" height={80} width={80} />
              </Link>
              <HomeSearch />
            </div>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
