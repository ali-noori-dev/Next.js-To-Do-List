import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import { getToastProvider } from "./toast/toast.provider";
import "./ui/globals.css";
import Header from "./ui/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.js To-Do List",
  description: "Generated by create next app",
};

const ToastProvider = getToastProvider();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider />
        <Header />
        {children}
      </body>
    </html>
  );
}
