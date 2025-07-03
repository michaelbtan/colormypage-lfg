"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Palette } from "lucide-react";
import notfound from "@/assets/notfound.png";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found | Color My Page",
  description: "Oops! The page you're looking for seems to have colored outside the lines. Return to our coloring book collection and find your perfect coloring page.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Funny 404 illustration */}
        <div className="relative h-64 w-full mb-6">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-48 h-48">
              {/* Sad coloring page with scribbles outside the lines */}
              <div className="absolute inset-0 bg-white rounded-lg border-4 border-dashed border-[#9d84ff] rotate-3 transform-gpu"></div>
              <img
                src={notfound.src}
                alt="Missing coloring page"
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
          Oops! <span className="text-[#9d84ff]">404</span>
        </h1>

        <h2 className="text-2xl font-bold mb-6 text-gray-700">
          Looks Like Someone Colored Outside the Lines!
        </h2>

        <p className="text-gray-600 mb-8">
          We searched high and low, but this page seems to have escaped from our
          coloring book. Maybe it ran away with the missing socks and pens that
          disappear from your desk?
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            className="bg-[#9d84ff] hover:bg-[#8a6dff] rounded-full"
          >
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>

          <Button
            asChild
            className="bg-[#9d84ff] hover:bg-[#8a6dff] rounded-full"
          >
            <Link href="/categories">
              <Palette className="mr-2 h-4 w-4" />
              Browse Coloring Pages
            </Link>
          </Button>
        </div>

        <div className="mt-12 p-4 rounded-lg">
          <p className="text-gray-700 italic">
            &quot;Why did the coloring page cross the road? To get to the other{" "}
            <span className="line-through">side</span> site!&quot;
          </p>
        </div>
      </div>
    </div>
  );
}
