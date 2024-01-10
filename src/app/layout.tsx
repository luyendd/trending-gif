import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import { Providers } from "@/providers";

import HomeSearch from "./_components/HomeSearch";

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
          <main className="mx-auto flex min-h-screen max-w-[1088px] flex-col space-y-8 px-4 pb-8">
            <div className="space-y-2">
              <Link className="block h-20 w-20" href="/">
                <Image alt="logo" height={80} src="/logo.svg" width={80} />
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
