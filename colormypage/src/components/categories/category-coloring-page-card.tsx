"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, Share2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { ShareModal } from "@/components/share-modal"
import type { ColoringPage } from "@/components/categories/coloring-page-grid"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"

interface ColoringPageCardProps {
  page: ColoringPage
  userId: string | null
}

export function CategoryColoringPageCard({ page, userId }: ColoringPageCardProps) {
  const supabase = createClient()
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)

  useEffect(() => {
    const checkIfFavorited = async () => {
      if (userId) {
        const { data: favorited } = await supabase
          .from("favorited_coloring_pages")
          .select("coloring_page_id, user_id")
          .eq("coloring_page_id", page.id)
          .eq("user_id", userId)
          .single()
        setIsFavorited(!!favorited)
      }
    }
    checkIfFavorited()
  }, [userId, page.id, supabase])

  const handleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!userId) {
      toast("Must be logged in to favorite", {
        description: "Please log in to favorite this coloring page.",
      })
      return
    }

    if (isFavorited) {
      // If experience is already saved, remove it
      const { error } = await supabase
        .from("favorited_coloring_pages")
        .delete()
        .eq("coloring_page_id", page.id)
        .eq("user_id", userId)

      if (error) {
        console.log("error deleting saved experience", error)
      } else {
        setIsFavorited(!isFavorited)
      }
    } else {
      // If experience is not saved, save it
      const { error } = await supabase.from("favorited_coloring_pages").insert({
        coloring_page_id: page.id,
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

  return (
    <>
      <div
        className="group relative w-full overflow-hidden rounded-lg shadow-md bg-white border border-gray-100"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ aspectRatio: "8.5/11" }}
      >
        {/* Paper-like styling */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white opacity-10"></div>

        {/* Image */}
        <Link href={`/coloring-page/${page.id}`}>
          <div className="relative w-full h-full">
            <Image
              src={page.imageUrl || "/placeholder.svg"}
              alt={page.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </Link>

        {/* Title overlay - appears on hover, slides up from bottom */}
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 bg-black/30 backdrop-blur-sm p-4 transition-transform duration-300",
            isHovered ? "translate-y-0" : "translate-y-full",
          )}
        >
          <h3 className="text-white font-medium text-sm md:text-base line-clamp-1">{page.title}</h3>
        </div>

        {/* Action buttons - in top right with glassy effect */}
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={handleShare}
            className="rounded-full bg-white/40 backdrop-blur-md p-2 hover:bg-white/60 transition-colors shadow-md border border-white/50"
            aria-label="Share"
          >
            <Share2 className="h-4 w-4 text-gray-800" />
          </button>
          <button
            onClick={handleFavorite}
            className={cn(
              "rounded-full p-2 transition-colors shadow-md backdrop-blur-md border",
              isFavorited
                ? "bg-[#9d84ff]/80 text-white hover:bg-[#9d84ff] border-[#9d84ff]/70"
                : "bg-white/40 text-gray-800 hover:bg-white/60 border-white/50",
            )}
            aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
          >
            <Star className="h-4 w-4" fill={isFavorited ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title={page.title}
        imageUrl={page.imageUrl}
        pageUrl={`/coloring-page/${page.id}`}
      />
    </>
  )
}

