import type React from "react";
import "@/app/globals.css";
import { Fredoka } from "next/font/google"; // Updated font
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/sonner";
import CloudBackground from "@/components/layout/cloud-background";

// Import Fredoka with desired options (e.g., weights, subsets)
const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // Adjust weights as needed
});

export const metadata = {
  title: "ColorMyPage - Free Printable Coloring Pages",
  description:
    "Download high-quality, free coloring pages for kids, parents, and teachers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden scroll-smooth">
      <body className={`${fredoka.className} min-h-screen flex flex-col overflow-x-hidden`}>
        <CloudBackground />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
