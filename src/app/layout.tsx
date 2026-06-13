import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Repertoire",
  description:
    "Find piano scores by mood, difficulty, and style using semantic search.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("dark h-full font-sans", inter.variable)}>
      <body className={`${inter.variable} h-full antialiased`}>{children}</body>
    </html>
  );
}
