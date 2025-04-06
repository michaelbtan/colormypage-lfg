"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Download, Heart, Share2, Printer, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RecommendedPages } from "@/components/coloring-page/recommended-pages"
import { AdPlaceholder } from "@/components/coloring-page/ad-placeholder"
import { ShareModal } from "@/components/share-modal"
import { useToast } from "@/hooks/use-toast"
import type { ColoringPage } from "@/lib/coloring-pages"

interface ColoringPageViewProps {
  coloringPage: ColoringPage
  recommendedPages: ColoringPage[]
}

export function ColoringPageView({ coloringPage, recommendedPages }: ColoringPageViewProps) {
  const [isFavorited, setIsFavorited] = useState(false)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const { toast } = useToast()

  const handleFavorite = () => {
    setIsFavorited(!isFavorited)
    toast({
      title: isFavorited ? "Removed from favorites" : "Added to favorites",
      description: isFavorited
        ? "This coloring page has been removed from your favorites."
        : "This coloring page has been added to your favorites.",
    })
  }

  const handleDownload = () => {
    // In a real app, this would trigger the actual download
    toast({
      title: "Download started",
      description: "Your coloring page is being downloaded.",
    })
  }

  const handleShare = () => {
    setIsShareModalOpen(true)
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="mb-6">
        <Link
          href={`/categories/${coloringPage.categoryId}`}
          className="inline-flex items-center text-sm text-gray-600 hover:text-[#9d84ff]"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to {coloringPage.categoryName}
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Coloring page details */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            <div className="p-6 md:p-8">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{coloringPage.title}</h1>

              <div className="flex flex-wrap gap-2 mb-6">
                {coloringPage.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-medium text-gray-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Image container with print-friendly styling */}
              <div className="relative bg-white rounded-lg border border-gray-200 mb-6 print:border-0 print:shadow-none">
                <div className="aspect-[8.5/11] relative">
                  <Image
                    src={coloringPage.imageUrl || "/placeholder.svg"}
                    alt={coloringPage.title}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3 print:hidden">
                <Button onClick={handleDownload} className="bg-[#9d84ff] hover:bg-[#8a6dff] rounded-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>

                <Button onClick={handlePrint} variant="outline" className="rounded-full">
                  <Printer className="mr-2 h-4 w-4" />
                  Print
                </Button>

                <Button
                  onClick={handleFavorite}
                  variant="outline"
                  className={`rounded-full ${isFavorited ? "bg-[#9d84ff]/10 text-[#9d84ff] border-[#9d84ff]" : ""}`}
                >
                  <Heart className="mr-2 h-4 w-4" fill={isFavorited ? "currentColor" : "none"} />
                  {isFavorited ? "Favorited" : "Add to Favorites"}
                </Button>

                <Button onClick={handleShare} variant="outline" className="rounded-full">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>

              {/* Description */}
              {coloringPage.description && (
                <div className="mt-8">
                  <h2 className="text-xl font-bold mb-3">About this Coloring Page</h2>
                  <p className="text-gray-600">{coloringPage.description}</p>
                </div>
              )}

              {/* Coloring tips */}
              <div className="mt-8 bg-[#f2f0ff] rounded-lg p-4">
                <h2 className="text-lg font-bold mb-2">Coloring Tips</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Print on standard letter-sized paper (8.5" x 11")</li>
                  <li>Use colored pencils, crayons, or markers</li>
                  <li>Start with lighter colors and gradually add darker shades</li>
                  <li>Take your time and enjoy the process!</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Right column - Recommended pages and ads */}
        <div className="space-y-6 print:hidden">
          {/* Ad placeholder */}
          <AdPlaceholder />

          {/* Recommended coloring pages */}
          <RecommendedPages pages={recommendedPages} />
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title={coloringPage.title}
        imageUrl={coloringPage.imageUrl}
        pageUrl={`/coloring-page/${coloringPage.id}`}
      />
    </div>
  )
}

