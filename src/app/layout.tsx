import type { Metadata } from "next";

import {Raleway} from "next/font/google";

import "./globals.css";
import Navbar from "@/components/Navbar";


const raleway = Raleway({
  weight: "400",
  style: 'normal',
  subsets: ['latin'],
  variable: "--font-raleway"
})

export const metadata: Metadata = {
  title: "LucasLens",
  description: "The way I see it with your help.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${raleway.variable}  antialiased`}
      >
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
