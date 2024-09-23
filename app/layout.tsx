import type { Metadata } from "next";
import "./globals.css";
import { Patua_One } from "next/font/google";

const patuaOne = Patua_One({
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Easy PerioDet",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={patuaOne.className}>{children}</body>
    </html>
  );
}
