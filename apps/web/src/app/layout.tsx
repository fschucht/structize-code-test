import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@repo/ui/globals.css";
import { TRPCProvider } from "@/trpc/client";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Structize Code Test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TRPCProvider>
      <html lang="en">
        <body className={`${inter.variable} antialiased`}>{children}</body>
      </html>
    </TRPCProvider>
  );
}
