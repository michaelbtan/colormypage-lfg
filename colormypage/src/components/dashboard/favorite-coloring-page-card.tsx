"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShareModal } from "@/components/share-modal"
import { Share2, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"

export interface ColoringPage {
  id: string | number
  title: string
  image_url: string
  dateAdded?: string
}

export interface ColoringPageCardProps {
  page: ColoringPage
  userId?: string | null
}

export default function FavoriteColoringPageCard({ page, userId }: ColoringPageCardProps) {
  const supabase = createClient()
  const [isFavorited, setIsFavorited] = useState(true)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)


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
    <div className="group relative">
      <Link href={`/coloring-page/${page.id}`} className="block">
        <div className="aspect-[8.5/11] relative overflow-hidden rounded-lg border border-gray-200 bg-white">
          <Image src={page.image_url || "/placeholder.svg"} alt={page.title} fill className="object-cover" />

          <div className="absolute top-3 right-3 flex gap-2">
            <Link href={`/coloring-page/${page.id}?share=true`} onClick={(e) => e.stopPropagation()}>
              <Button
                size="sm"
                variant="outline"
                className="rounded-full bg-white/80 backdrop-blur-sm text-gray-700 border-white/40 hover:bg-white/90 h-8 w-8 p-0"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4" />
                <span className="sr-only">Share</span>
              </Button>
            </Link>
            <Button
              size="sm"
              variant="outline"
              className={`rounded-full ${
                isFavorited
                  ? "bg-[#9d84ff] text-white border-[#9d84ff]/40 hover:bg-[#8a6dff]"
                  : "bg-white/80 text-gray-700 border-white/40 hover:bg-white/90"
              } h-8 w-8 p-0`}
              onClick={handleFavorite}
            >
              <Star className={`h-4 w-4 ${isFavorited ? "fill-white" : ""}`} />
              <span className="sr-only">{isFavorited ? "Favorited" : "Add to favorites"}</span>
            </Button>
          </div>
        </div>
      </Link>

      <div className="mt-2">
        <h3 className="text-sm font-medium text-gray-900 truncate">{page.title}</h3>
      </div>

            {/* Share Modal */}
            <ShareModal
              isOpen={isShareModalOpen}
              onClose={() => setIsShareModalOpen(false)}
              title={page.title}
              imageUrl={page.image_url}
              pageUrl={`/coloring-page/${page.id}`}
            />
    </div>
  )
}
