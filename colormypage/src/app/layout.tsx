import type React from "react";
import "@/app/globals.css";
import { Fredoka } from "next/font/google"; // Updated font
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/sonner";
import CloudBackground from "@/components/layout/cloud-background";
import { title } from "process";

// Import Fredoka with desired options (e.g., weights, subsets)
const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // Adjust weights as needed
});

export const metadata = {
  metadataBase: new URL('https://colormypage.com'),
  title: {
    title: "ColorMyPage • Free Printable Coloring Pages",
    template: "%s • ColorMyPage",
  },
  description:
    "Download high-quality, free coloring pages for kids, parents, and teachers.",
  openGraph: {
    title: "ColorMyPage • Free Printable Coloring Pages",
    description: "Download high-quality, free coloring pages for kids, parents, and teachers.",
    type: "website",
    url: "https://colormypage.com",
    siteName: "ColorMyPage",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "ColorMyPage - Free Printable Coloring Pages",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ColorMyPage • Free Printable Coloring Pages",
    description: "Download high-quality, free coloring pages for kids, parents, and teachers.",
    images: ["/logo.png"],
  },
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
