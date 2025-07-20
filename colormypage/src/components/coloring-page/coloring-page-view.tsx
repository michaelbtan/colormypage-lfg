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
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
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

  const handlePrint = async () => {
    // Track download/print event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'download_click', {
        button_id: 'download-coloring-page',
        page_location: window.location.href
      });
    }

    setIsGeneratingPdf(true);

    try {
      // Show immediate feedback
      toast("Generating PDF...", {
        description: "Please wait while we create your coloring page PDF.",
        descriptionClassName: "!text-black font-medium",
      });

      // Dynamically import jsPDF
      const { jsPDF } = await import('jspdf');
      
      // Create a new PDF instance with specific print-friendly settings
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [216, 279] // Letter size in mm (8.5" x 11")
      });

      // Add timeout for faster feedback
      const timeout = setTimeout(() => {
        setIsGeneratingPdf(false);
        toast("PDF generation timed out", {
          description: "The image is taking too long to load. Please try again.",
          descriptionClassName: "!text-black font-medium",
        });
      }, 8000); // 8 second timeout

      // Create an image element to load the coloring page
      const img = document.createElement('img');
      img.crossOrigin = 'anonymous';
      
      img.onload = function() {
        clearTimeout(timeout);
        
        // Calculate dimensions using millimeters for better print compatibility
        const pageWidth = 216; // Letter width in mm (8.5")
        const pageHeight = 279; // Letter height in mm (11")
        const margin = 8; // 8mm margin (~0.3 inches) for maximum size
        const maxWidth = pageWidth - (margin * 2);
        const maxHeight = pageHeight - (margin * 2);
        
        // Calculate aspect ratios
        const imgAspectRatio = img.naturalWidth / img.naturalHeight;
        const pageAspectRatio = maxWidth / maxHeight;
        
        let finalWidth, finalHeight;
        
        if (imgAspectRatio > pageAspectRatio) {
          // Image is wider, fit to width
          finalWidth = maxWidth;
          finalHeight = maxWidth / imgAspectRatio;
        } else {
          // Image is taller, fit to height
          finalHeight = maxHeight;
          finalWidth = maxHeight * imgAspectRatio;
        }
        
        // Calculate centered position
        const x = (pageWidth - finalWidth) / 2;
        const y = (pageHeight - finalHeight) / 2;
        
        // Add the image to the PDF with print-optimized settings
        pdf.addImage(img, 'JPEG', x, y, finalWidth, finalHeight, undefined, 'FAST');
        
        // Set PDF metadata for better print handling
        pdf.setProperties({
          title: `${decodeURI(coloringPage.title)} - Coloring Page`,
          subject: 'Printable Coloring Page',
          author: 'ColorMyPage',
          creator: 'ColorMyPage'
        });
        
        // Use anchor element for iOS Safari compatibility
        const pdfBlob = pdf.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);
        
        // Create anchor element for download
        const downloadLink = document.createElement('a');
        downloadLink.href = pdfUrl;
        downloadLink.download = `${decodeURI(coloringPage.title).replace(/[^a-zA-Z0-9]/g, '_')}_coloring_page.pdf`;
        downloadLink.style.display = 'none';
        
        // Add to DOM, trigger click, then remove
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        
        // Show success message
        toast("PDF downloaded!", {
          description: "Your coloring page PDF has been downloaded.",
          descriptionClassName: "!text-black font-medium",
        });
        
        // Clean up the URL after a delay
        setTimeout(() => {
          URL.revokeObjectURL(pdfUrl);
        }, 1000);
        
        setIsGeneratingPdf(false);
      };
      
      img.onerror = function() {
        clearTimeout(timeout);
        setIsGeneratingPdf(false);
        toast("PDF generation failed", {
          description: "Unable to load the coloring page image. Please try again.",
          descriptionClassName: "!text-black font-medium",
        });
      };
      
      // Load the image (this starts the process)
      img.src = coloringPage.image_url;
      
    } catch (error) {
      console.error("Error generating PDF:", error);
      setIsGeneratingPdf(false);
      toast("PDF generation failed", {
        description: "Unable to generate PDF. Please try again later.",
        descriptionClassName: "!text-black font-medium",
      });
    }
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
                    disabled={isGeneratingPdf}
                    size="lg"
                    className="bg-[#9d84ff] cursor-pointer hover:bg-[#8a6dff] rounded-full flex-1 h-12 text-base disabled:opacity-50"
                  >
                    <Printer className="mr-2 h-5 w-5" />
                    {isGeneratingPdf ? "Generating..." : "Download PDF"}
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
                  disabled={isGeneratingPdf}
                  size="lg"
                  className="bg-[#9d84ff] cursor-pointer hover:bg-[#8a6dff] rounded-full h-14 text-lg px-8 disabled:opacity-50"
                >
                  <Printer className="mr-3 h-6 w-6" />
                  {isGeneratingPdf ? "Generating..." : "Download PDF"}
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
