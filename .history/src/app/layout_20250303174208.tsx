import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Navigation } from "@/components/layout/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    <html lang="en" className="h-screen overflow-hidden">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full max-h-screen`}
      >
        <ThemeProvider defaultTheme="system" storageKey="mini-mui-table-theme">
          <main>
            <Navigation />
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
