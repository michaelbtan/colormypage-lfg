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

  const handleDownload = () => {
    // Create a temporary anchor element
    const link = document.createElement("a");
    link.href = coloringPage.image_url;
    link.download = `${coloringPage.title
      .replace(/\s+/g, "-")
      .toLowerCase()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast("Download started", {
      description: "Your coloring page image is being downloaded.",
    });
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
    <div className="container py-8 md:py-12 max-w-5xl mx-auto">
      <div className="mb-6">
        {/* <Link
          href={`/categories/${coloringPage.categoryId}`}
          className="inline-flex items-center text-sm text-gray-600 hover:text-[#9d84ff]"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to {coloringPage.categoryName}
        </Link> */}
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          <div className="p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              {coloringPage.title}
            </h1>

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

            {/* Image container with print-friendly styling */}
            <div
              ref={coloringImageRef}
              className="relative bg-white rounded-lg border border-gray-200 mb-6"
            >
              <div className="aspect-[8.5/11] relative">
                <Image
                  src={coloringPage.image_url || "/placeholder.svg"}
                  alt={coloringPage.title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={handlePrint}
                className="bg-[#9d84ff] cursor-pointer hover:bg-[#8a6dff] rounded-full"
              >
                <Printer className="mr-2 h-4 w-4" />
                Print Coloring Page
              </Button>

              <Button
                onClick={handleFavorite}
                variant="outline"
                className={`rounded-full cursor-pointer ${
                  isFavorited
                    ? "bg-[#9d84ff]/10 text-[#9d84ff] border-[#9d84ff]"
                    : ""
                }`}
              >
                <Heart
                  className="mr-2 h-4 w-4"
                  fill={isFavorited ? "currentColor" : "none"}
                />
                {isFavorited ? "Favorited" : "Add to Favorites"}
              </Button>

              <Button
                onClick={handleShare}
                variant="outline"
                className="rounded-full cursor-pointer"
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>

            {/* Description */}
            {coloringPage.description && (
              <div className="mt-8">
                <h2 className="text-xl font-bold mb-3">
                  About this Coloring Page
                </h2>
                <p className="text-gray-600">{coloringPage.description}</p>
              </div>
            )}

            {/* Coloring tips */}
            <div className="mt-8 bg-[#f2f0ff] rounded-lg p-4">
              <h2 className="text-lg font-bold mb-2">Coloring Tips</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
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
        pageUrl={`/coloring-page/${coloringPage.id}`}
      />
    </div>
  );
}
