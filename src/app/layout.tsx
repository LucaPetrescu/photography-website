import type { Metadata } from "next";
import { headers } from "next/headers";
import { pathname } from "next-extra/pathname";
import { Raleway } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const raleway = Raleway({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
  variable: "--font-raleway",
});

export const metadata: Metadata = {
  title: "LucasLens",
  description: "The way I see it with your help.",
};

let isWhiteBackground = false;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const base = `${headers().get("x-forwarded-proto")}://${headers().get(
    "host"
  )}`;
  const fullUrl = new URL(pathname(), base);

  if (fullUrl.pathname === "/contact" || fullUrl.pathname === "/about") {
    isWhiteBackground = true;
  }
  return (
    <html lang="en">
      <body className={`${raleway.variable}  antialiased`}>
        <Navbar isWhiteBackground={isWhiteBackground} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
