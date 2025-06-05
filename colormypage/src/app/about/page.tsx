import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import about from "@/assets/about.png";
import { Download, Heart, Palette, PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";


export const metadata = {
  title: "About Us",
  description:
    "Learn about ColorMyPage, our mission, and the team behind your favorite coloring pages.",
  openGraph: {
    title: "About ColorMyPage",
    description: "Learn about ColorMyPage, our mission, and the team behind your favorite coloring pages.",
    type: "website",
    url: "https://colormypage.com/about",
    siteName: "ColorMyPage",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "About ColorMyPage - Free Printable Coloring Pages",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About ColorMyPage",
    description: "Learn about ColorMyPage, our mission, and the team behind your favorite coloring pages.",
    images: ["/logo.png"],
  },
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 flex items-center justify-center gap-2">
              About{" "}
              <Image
                src={logo}
                alt="Logo"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
              <span className="text-[#9d84ff]">Color</span>
              <span className="text-gray-800">My</span>
              <span className="text-gray-800">Page</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              We're on a mission to bring joy, creativity, and learning through
              the simple pleasure of coloring.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story & What We Do */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-64 md:h-80 rounded-xl overflow-hidden shadow-lg">
              <Image
                src={about}
                alt="ColorMyPage about us image of kids drawing on the sidewalk with chalk"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                ColorMyPage began with a simple idea: to create a place where
                everyone could access high-quality coloring pages for free. What
                started as a personal collection quickly grew into something
                bigger.
              </p>
              <p className="text-gray-600 mb-4">
                In 2023, we decided to share our collection with the world, and
                ColorMyPage was born. Our team of artists, educators, and
                developers work together to create and curate coloring pages
                that are not just fun, but also educational and inclusive.
              </p>
              <p className="text-gray-600">
                Today, we're proud to offer thousands of free coloring pages
                across dozens of categories, helping people of all ages express
                their creativity through coloring.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Special - Simplified */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">
            What Makes Us Special
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 rounded-xl shadow-md border border-gray-100 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="w-12 h-12 bg-[#9d84ff]/10 rounded-full flex items-center justify-center mb-4">
                <Palette className="h-6 w-6 text-[#9d84ff]" />
              </div>
              <h3 className="text-xl font-bold mb-3">High-Quality Designs</h3>
              <p className="text-gray-600">
                Every coloring page is carefully designed by our team of artists
                to ensure the perfect balance of detail and simplicity.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-xl shadow-md border border-gray-100 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="w-12 h-12 bg-[#5bbce4]/10 rounded-full flex items-center justify-center mb-4">
                <PenTool className="h-6 w-6 text-[#5bbce4]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Educational Value</h3>
              <p className="text-gray-600">
                Many of our coloring pages are designed with learning in mind,
                helping children develop fine motor skills, focus, and
                creativity.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-xl shadow-md border border-gray-100 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="w-12 h-12 bg-[#ffb380]/10 rounded-full flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-[#ffb380]" />
              </div>
              <h3 className="text-xl font-bold mb-3">For All Ages</h3>
              <p className="text-gray-600">
                From simple designs for toddlers to intricate patterns for
                adults, we have coloring pages suitable for every age and skill
                level.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action - Simplified */}
      <section className="py-16 bg-gradient-to-r from-[#9d84ff] to-[#5bbce4] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Start Coloring?
            </h2>
            <p className="text-xl mb-8">
              Explore our collection of free, high-quality coloring pages today.
            </p>
            <Button
              asChild
              size="lg"
              className="rounded-full bg-white text-[#9d84ff] hover:bg-gray-100"
            >
              <Link href="/categories" className="transition-transform duration-300 hover:scale-105">
                <Download className="mr-2 h-5 w-5" />
                Browse Coloring Pages
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
