import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Navigation } from "@/components/layout/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mini MUI Table",
  description: "A lightweight Material-UI inspired table component",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="mx-auto py-10 px-4 h-full flex flex-col max-w-7xl">
            <Navigation />
            <main className="flex-1 border rounded-lg p-4 bg-white dark:bg-gray-900">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
