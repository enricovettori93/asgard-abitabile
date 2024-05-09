import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "@/components/navbar";
import {Toaster} from "react-hot-toast";
import 'swiper/css';
import "./globals.css";
import Footer from "@/components/footer";
import UserContext from "@/context/user.context";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Asgard Abitabile",
  description: "That's what she said",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserContext>
            <NavBar/>
            <Toaster position="top-right"/>
            <main className="flex min-h-screen mb-[15em] flex-col items-center justify-between bg-white z-10 relative">
                {children}
            </main>
            <Footer/>
        </UserContext>
      </body>
    </html>
  );
}
