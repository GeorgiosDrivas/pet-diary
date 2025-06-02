import type { Metadata } from "next";
import "./globals.css";
import "./responsive.css";
import React from "react";
import {geistSans, geistMono} from "./fonts/fonts";

export const metadata: Metadata = {
  title: "Pet Diary",
  description: "Pet Diary landing page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
