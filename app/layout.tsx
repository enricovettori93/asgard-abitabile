import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {Toaster} from "react-hot-toast";
import 'swiper/css';
import 'swiper/css/navigation';
import "./globals.css";
import UserContext from "@/context/user.context";
import React from "react";
import Footer from "@/app/_components/footer";
import Header from "@/app/_components/header";
import UiContext from "@/context/ui.context";
import NavBar from "@/app/_components/navbar";
import Providers from "@/app/providers";

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
      <Providers>
          <Header>
              <NavBar />
          </Header>
          <Toaster position="top-right"/>
          <main className="flex min-h-screen mb-[15rem] mt-[8rem] px-2 md:px-10 flex-col items-center justify-between bg-white z-10 relative overflow-x-hidden pb-20">
              {children}
          </main>
          <Footer/>
      </Providers>
      </body>
    </html>
  );
}
