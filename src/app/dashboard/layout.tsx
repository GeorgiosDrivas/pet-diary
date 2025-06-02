import type { Metadata } from "next";
import "../globals.css";
import React from "react";
import Credits from "@/components/Credits";
import {geistSans, geistMono} from "../fonts/fonts.ts";

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
