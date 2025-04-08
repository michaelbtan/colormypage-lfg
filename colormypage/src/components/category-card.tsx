"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Share2, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { ShareModal } from "@/components/share-modal"

// Update the interface to include imageCount
interface CategoryCardProps {
  id: string | number
  title: string
  imageUrl: string
  imageCount?: number
  isFavorited?: boolean
  onFavorite?: (id: string | number) => void
  onShare?: (id: string | number) => void
  isHorizontal?: boolean
  categoryLink?: string // Add this prop
}

// Update the function parameters to include imageCount
export function CategoryCard({
  id,
  title,
  imageUrl,
  imageCount,
  isFavorited = false,
  onFavorite,
  onShare,
  isHorizontal = false,
  categoryLink,
}: CategoryCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [favorited, setFavorited] = useState(isFavorited)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setFavorited(!favorited)
    if (onFavorite) onFavorite(id)
  }

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsShareModalOpen(true)
    if (onShare) onShare(id)
  }

  // Update the title overlay to include the image count
  return (
    <>
      <Link href={categoryLink ? `${categoryLink}/${id}` : `/categories/${id}`}>
        <div
          className="group relative w-full overflow-hidden rounded-lg shadow-md bg-white border border-gray-100"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ aspectRatio: "1/1" }}
        >
          {/* Paper-like styling */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white opacity-10"></div>

          {/* Image */}
          <div className="relative w-full h-full">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Title overlay - appears on hover, slides up from bottom */}
          <div
            className={cn(
              "absolute inset-x-0 bottom-0 bg-black/30 backdrop-blur-sm p-4 transition-transform duration-300",
              isHovered ? "translate-y-0" : "translate-y-full",
            )}
          >
            <h3 className="text-white font-medium text-lg">{title}</h3>
            {imageCount !== undefined && <p className="text-white/80 text-sm mt-1">{imageCount} coloring pages</p>}
          </div>

          {/* Action buttons - in top right */}
          <div className="absolute top-3 right-3 flex gap-2">
            <button
              onClick={handleShare}
              className="rounded-full bg-white/80 backdrop-blur-sm p-2 hover:bg-white transition-colors shadow-sm cursor-pointer"
              aria-label="Share"
            >
              <Share2 className="h-4 w-4 text-gray-700" />
            </button>
            <button
              onClick={handleFavorite}
              className={cn(
                "rounded-full p-2 transition-colors shadow-sm cursor-pointer",
                favorited
                  ? "bg-[#9d84ff] text-white hover:bg-[#8a6dff]"
                  : "bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white",
              )}
              aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
            >
              <Star className="h-4 w-4" fill={favorited ? "currentColor" : "none"} />
            </button>
          </div>

          {/* Add a badge showing the number of pages (visible even when not hovering) */}
          {imageCount !== undefined && (
            <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full">
              {imageCount} pages
            </div>
          )}
        </div>
      </Link>

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title={title}
        imageUrl={imageUrl}
        pageUrl={`/categories/${id}`}
      />
    </>
  )
}

