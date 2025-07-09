"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Heart, Share2, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { RecommendedPages } from "@/components/coloring-page/recommended-pages";
import { ShareModal } from "@/components/share-modal";
import { RecommendedColoringPages } from "@/components/coloring-page/recommended-coloring-pages";
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
    
    // Track favorite event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'favorite_click', {
        button_id: 'favorite-coloring-page',
        page_location: window.location.href
      });
    }

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
    
    // Track share event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'share_click', {
        button_id: 'share-coloring-page',
        page_location: window.location.href
      });
    }

    setIsShareModalOpen(true);
  };

  const handlePrint = () => {
    // Track download/print event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'download_click', {
        button_id: 'download-coloring-page',
        page_location: window.location.href
      });
    }

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
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            html, body {
              width: 100%;
              height: 100%;
              margin: 0;
              padding: 0;
              overflow: hidden;
            }
            
            .print-container {
              width: 100vw;
              height: 100vh;
              display: flex;
              justify-content: center;
              align-items: center;
              page-break-inside: avoid;
            }
            
            .print-container img {
              max-width: 100%;
              max-height: 100%;
              width: auto;
              height: auto;
              object-fit: contain;
              display: block;
            }
            
            @media print {
              @page {
                size: letter;
                margin: 0.5in;
              }
              
              html, body {
                width: 100%;
                height: 100%;
                margin: 0;
                padding: 0;
                overflow: visible;
              }
              
              .print-container {
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                page-break-inside: avoid;
                page-break-after: auto;
              }
              
              .print-container img {
                max-width: 100%;
                max-height: 100%;
                width: auto;
                height: auto;
                object-fit: contain;
                page-break-inside: avoid;
              }
            }
            
            @media screen {
              body {
                background-color: #f0f0f0;
              }
              
              .print-container {
                background-color: white;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
              }
            }
          </style>
        </head>
        <body>
          <div class="print-container">
            <img src="${coloringPage.image_url}" alt="${coloringPage.title}" onload="fitToPage()" />
          </div>
          <script>
            function fitToPage() {
              const img = document.querySelector('img');
              const container = document.querySelector('.print-container');
              
              if (img && container) {
                // Ensure image fits within print area
                const containerWidth = container.clientWidth;
                const containerHeight = container.clientHeight;
                const imgAspectRatio = img.naturalWidth / img.naturalHeight;
                const containerAspectRatio = containerWidth / containerHeight;
                
                if (imgAspectRatio > containerAspectRatio) {
                  // Image is wider, fit to width
                  img.style.width = '100%';
                  img.style.height = 'auto';
                } else {
                  // Image is taller, fit to height
                  img.style.height = '100%';
                  img.style.width = 'auto';
                }
              }
            }
            
            // Automatically print and then close the window when loaded
            window.onload = function() {
              setTimeout(function() {
                window.print();
                setTimeout(function() {
                  window.close();
                }, 1000);
              }, 500);
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
                    id="download-coloring-page"
                    onClick={handlePrint}
                    size="lg"
                    className="bg-[#9d84ff] cursor-pointer hover:bg-[#8a6dff] rounded-full flex-1 h-12 text-base"
                  >
                    <Printer className="mr-2 h-5 w-5" />
                    Print
                  </Button>

                  <Button
                    id="favorite-coloring-page"
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
                    id="share-coloring-page"
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
                  id="download-coloring-page"
                  onClick={handlePrint}
                  size="lg"
                  className="bg-[#9d84ff] cursor-pointer hover:bg-[#8a6dff] rounded-full h-14 text-lg px-8"
                >
                  <Printer className="mr-3 h-6 w-6" />
                  Print Coloring Page
                </Button>

                <Button
                  id="favorite-coloring-page"
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
                  id="share-coloring-page"
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

      {/* Recommended Coloring Pages Section */}
      <div className="mt-12">
        <RecommendedColoringPages 
          currentPageId={coloringPage.id}
          userId={userId}
        />
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
