"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Heart, Share2, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { RecommendedPages } from "@/components/coloring-page/recommended-pages";
import { ShareModal } from "@/components/share-modal";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import PLACEHOLDER from "@/assets/placeholder.svg";

export interface ColoringPage {
  id: string;
  title: string;
  description?: string;
  image_url: string;
}

interface ColoringPageViewProps {
  coloringPage: ColoringPage;
  userId: string | null;
  recommendedPages?: ColoringPage[];
}

export function ColoringPageView({
  coloringPage,
  userId,
}: // recommendedPages,
ColoringPageViewProps) {
  const supabase = createClient();
  const [isFavorited, setIsFavorited] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const coloringImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkIfFavorited = async () => {
      if (userId) {
        const { data: favorited } = await supabase
          .from("favorited_coloring_pages")
          .select("coloring_page_id, user_id")
          .eq("coloring_page_id", coloringPage.id)
          .eq("user_id", userId)
          .single();
        setIsFavorited(!!favorited);
      }
    };
    checkIfFavorited();
  }, [userId, coloringPage.id, supabase]);

  const handleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!userId) {
      toast("Must be logged in to favorite", {
        description: "Please log in to favorite this coloring page.",
        descriptionClassName: "!text-black font-medium",
      });
      return;
    }

    if (isFavorited) {
      // If experience is already saved, remove it
      const { error } = await supabase
        .from("favorited_coloring_pages")
        .delete()
        .eq("coloring_page_id", coloringPage.id)
        .eq("user_id", userId);

      if (error) {
        console.log("error deleting saved experience", error);
      } else {
        setIsFavorited(!isFavorited);
      }
    } else {
      // If experience is not saved, save it
      const { error } = await supabase.from("favorited_coloring_pages").insert({
        coloring_page_id: coloringPage.id,
        user_id: userId,
      });

      if (error) {
        console.log("error favoriting experience", error);
      } else {
        setIsFavorited(!isFavorited);
      }
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsShareModalOpen(true);
  };

  const handlePrint = () => {
    // Open a new window with just the coloring page
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      toast("Print failed", {
        description:
          "Unable to open print window. Please check your popup blocker settings.",
          descriptionClassName: "!text-black font-medium",
      });
      return;
    }

    // Write the print-optimized HTML to the new window
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${coloringPage.title} - Print</title>
          <style>
            body {
              margin: 0;
              padding: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
            }
            .print-container {
              max-width: 100%;
              max-height: 100vh;
              page-break-inside: avoid;
            }
            .print-container img {
              width: 100%;
              height: auto;
              max-height: 100vh;
              object-fit: contain;
            }
            @media print {
              @page {
                size: auto;
                margin: 0mm;
              }
              body {
                margin: 0;
                padding: 0;
              }
            }
          </style>
        </head>
        <body>
          <div class="print-container">
            <img src="${coloringPage.image_url}" alt="${coloringPage.title}" />
          </div>
          <script>
            // Automatically print and then close the window when loaded
            window.onload = function() {
              setTimeout(function() {
                window.print();
                setTimeout(function() {
                  window.close();
                }, 500);
              }, 300);
            };
          </script>
        </body>
      </html>
    `);

    printWindow.document.close();
  };

  return (
    <div className="container max-w-7xl mx-auto mb-6 px-4">
      <div className="mb-6">
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left side - Image section */}
        <div className="lg:w-1/2">
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 sticky top-8">
            <div className="p-4 md:p-6">
              {/* Mobile: Title above buttons */}
              <div className="lg:hidden mb-4">
                <h1 className="text-2xl md:text-3xl font-bold mb-4">
                  {decodeURI(coloringPage.title)}
                </h1>
                
                {/* Mobile: Action buttons below title and above image */}
                <div className="flex flex-wrap gap-3 mb-4">
                  <Button
                    onClick={handlePrint}
                    size="lg"
                    className="bg-[#9d84ff] cursor-pointer hover:bg-[#8a6dff] rounded-full flex-1 h-12 text-base"
                  >
                    <Printer className="mr-2 h-5 w-5" />
                    Print
                  </Button>

                  <Button
                    onClick={handleFavorite}
                    variant="outline"
                    size="lg"
                    className={`rounded-full cursor-pointer h-12 text-base ${
                      isFavorited
                        ? "bg-[#9d84ff]/10 text-[#9d84ff] border-[#9d84ff]"
                        : ""
                    }`}
                  >
                    <Heart
                      className="mr-2 h-5 w-5"
                      fill={isFavorited ? "currentColor" : "none"}
                    />
                    {isFavorited ? "Favorited" : "Favorite"}
                  </Button>

                  <Button
                    onClick={handleShare}
                    variant="outline"
                    size="lg"
                    className="rounded-full cursor-pointer h-12 text-base"
                  >
                    <Share2 className="mr-2 h-5 w-5" />
                    Share
                  </Button>
                </div>
              </div>

              {/* Image container with print-friendly styling */}
              <div
                ref={coloringImageRef}
                className="relative bg-white rounded-lg border border-gray-200"
              >
                <div className="aspect-[8.5/11] relative">
                  <Image
                    src={coloringPage.image_url || PLACEHOLDER}
                    alt={decodeURI(coloringPage.title)}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Details section */}
        <div className="lg:w-1/2">
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            <div className="p-6 md:p-8">
              {/* Desktop: Title in details section */}
              <div className="hidden lg:block mb-6">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {decodeURI(coloringPage.title)}
                </h1>
              </div>

              {/* Tags section (commented out but keeping structure) */}
              <div className="flex flex-wrap gap-2 mb-6">
                {/* {coloringPage.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-medium text-gray-700"
                    >
                      {tag}
                    </span>
                  ))} */}
              </div>

              {/* Desktop: Action buttons in details section */}
              <div className="hidden lg:flex flex-wrap gap-4 mb-8">
                <Button
                  onClick={handlePrint}
                  size="lg"
                  className="bg-[#9d84ff] cursor-pointer hover:bg-[#8a6dff] rounded-full h-14 text-lg px-8"
                >
                  <Printer className="mr-3 h-6 w-6" />
                  Print Coloring Page
                </Button>

                <Button
                  onClick={handleFavorite}
                  variant="outline"
                  size="lg"
                  className={`rounded-full cursor-pointer h-14 text-lg px-8 ${
                    isFavorited
                      ? "bg-[#9d84ff]/10 text-[#9d84ff] border-[#9d84ff]"
                      : ""
                  }`}
                >
                  <Heart
                    className="mr-3 h-6 w-6"
                    fill={isFavorited ? "currentColor" : "none"}
                  />
                  {isFavorited ? "Favorited" : "Add to Favorites"}
                </Button>

                <Button
                  onClick={handleShare}
                  variant="outline"
                  size="lg"
                  className="rounded-full cursor-pointer h-14 text-lg px-8"
                >
                  <Share2 className="mr-3 h-6 w-6" />
                  Share
                </Button>
              </div>

              {/* Description */}
              {coloringPage.description && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold mb-3">
                    About this Coloring Page
                  </h2>
                  <p className="text-gray-600 leading-relaxed">{coloringPage.description}</p>
                </div>
              )}

              {/* Coloring tips */}
              <div className="bg-[#f2f0ff] rounded-lg p-6">
                <h2 className="text-lg font-bold mb-4">Coloring Tips</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>
                    Print on standard letter-sized paper (8.5&quot; x 11&quot;)
                  </li>
                  <li>Use colored pencils, crayons, or markers</li>
                  <li>
                    Start with lighter colors and gradually add darker shades
                  </li>
                  <li>Take your time and enjoy the process!</li>
                </ul>
              </div>

              {/* Additional info section */}
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">Free Printable Coloring Page</h3>
                <p className="text-sm text-gray-600">
                  This coloring page is completely free to download and print. 
                  Perfect for kids, adults, classrooms, and therapeutic activities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title={coloringPage.title}
        description={`Check out free downloadable ${coloringPage.title} coloring pages`}
        imageUrl={coloringPage.image_url}
        pageUrl={`/coloring-page/${coloringPage.title}`}
      />
    </div>
  );
}
