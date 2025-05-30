import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import React from "react";
import Credits from "@/components/Credits";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Pet Diary",
  description: "Pet Diary dashboard page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div id="root" className="position-relative">
          {children}
        </div>
        <Credits />
      </body>
    </html>
  );
}
