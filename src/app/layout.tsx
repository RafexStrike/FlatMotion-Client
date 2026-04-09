import type { Metadata } from "next";
import { Inter, Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

import { AuthProvider } from "@/components/AuthProvider";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "AI Animation Generator",
  description: "Generate 2D animations with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${plusJakartaSans.variable}`} style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }} suppressHydrationWarning>
      <body className="w-screen flex flex-col bg-white dark:bg-[#030303] text-slate-950 dark:text-[#ededed] font-sans antialiased selection:bg-primary/30 transition-colors duration-300">
        <ThemeProvider>
          <AuthProvider>
            <Navbar />
            <main className="flex-1 w-full overflow-y-auto overflow-x-hidden">
              {children}
            </main>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
