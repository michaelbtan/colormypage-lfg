import type React from "react";
import "@/app/globals.css";
import { Fredoka } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/sonner";
import CloudBackground from "@/components/layout/cloud-background";
import Script from "next/script";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  metadataBase: new URL("https://colormypage.com"),
  title: {
    title: "ColorMyPage • Free Printable Coloring Pages",
    template: "%s • ColorMyPage",
  },
  description:
    "Download high-quality, free coloring pages for kids, parents, and teachers.",
  openGraph: {
    title: "ColorMyPage • Free Printable Coloring Pages",
    description:
      "Download high-quality, free coloring pages for kids, parents, and teachers.",
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
    description:
      "Download high-quality, free coloring pages for kids, parents, and teachers.",
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
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-02YV9CXCGN"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
           function gtag(){dataLayer.push(arguments);}
           gtag('js', new Date());
           gtag('config', 'G-02YV9CXCGN');`}
        </Script>

        {/* Google Tag Manager */}
        <Script id="gtm-init" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
           new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
           j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
           'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
           })(window,document,'script','dataLayer','GTM-TWBS5W4R');`}
        </Script>
      </head>
      <body
        className={`${fredoka.className} min-h-screen flex flex-col overflow-x-hidden`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TWBS5W4R"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <CloudBackground />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
