"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Share2, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { ShareModal } from "@/components/share-modal"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

// Update the interface to include imageCount
interface CategoryCardProps {
  id: string | number
  title: string
  imageUrl: string
  imageCount?: number
  categoryFavorited?: boolean
  categoryLink?: string
  userId?: string | null
}

export function CategoryCard({
  id,
  title,
  imageUrl,
  imageCount,
  categoryFavorited = false,
  categoryLink,
  userId
}: CategoryCardProps) {
  const supabase = createClient()
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorited, setIsFavorited] = useState(categoryFavorited)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)

  const handleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!userId) {
      toast("Must be logged in to favorite", {
        description: "Please log in to favorite this category.",
      })
      return
    }

    if (isFavorited) {
      // If experience is already saved, remove it
      const { error } = await supabase
        .from("favorited_categories")
        .delete()
        .eq("category_id", id)
        .eq("user_id", userId)

      if (error) {
        console.log("error deleting saved experience", error)
      } else {
        setIsFavorited(!isFavorited)
      }
    } else {
      // If experience is not saved, save it
      const { error } = await supabase.from("favorited_categories").insert({
        category_id: id,
        user_id: userId,
      })

      if (error) {
        console.log("error favoriting experience", error)
      } else {
        setIsFavorited(!isFavorited)
      }
    }
  }

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsShareModalOpen(true)
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
                isFavorited
                  ? "bg-[#9d84ff] text-white hover:bg-[#8a6dff]"
                  : "bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white",
              )}
              aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
            >
              <Star className="h-4 w-4" fill={isFavorited ? "currentColor" : "none"} />
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

