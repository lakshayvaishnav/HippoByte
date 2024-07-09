import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "../lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={
          (cn(" h-full font-sans antialiased relative"), inter.className)
        }
      >
        <main className=" flex flex-col min-h-screen relative">
          <div className="flex-grow flex-1">{children}</div>
        </main>
      </body>
    </html>
  );
}
