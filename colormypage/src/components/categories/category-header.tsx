"use client"

import Image from "next/image"
import { useState } from "react"
import { Share2, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ShareModal } from "@/components/share-modal"
import { toast } from "sonner"
import{ createClient } from "@/lib/supabase/client"

interface CategoryHeaderProps {
  id: string
  userId: string | null
  title: string
  description: string
  imageCount: number
  featuredImage?: string
  categoryFavorited?: boolean
}

export function CategoryHeader({ id, title, description, imageCount, featuredImage, categoryFavorited, userId }: CategoryHeaderProps) {
  const supabase = createClient()
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
    }  }

  const handleShare = () => {
    setIsShareModalOpen(true)
  }

  return (
    <div className="relative">
      {/* Background image with overlay */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        {featuredImage ? (
          <Image
            src={featuredImage || "/placeholder.svg"}
            alt={`${title} category`}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-[#9d84ff] to-[#5bbce4]" />
        )}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 absolute inset-0 flex flex-col justify-center text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
            <p className="text-lg md:text-xl max-w-2xl mb-2">{description}</p>
            <p className="text-sm md:text-base opacity-80">{imageCount} coloring pages available</p>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 mt-4 md:mt-0">
            <Button
              onClick={handleFavorite}
              variant="secondary"
              className="rounded-full bg-[#9d84ff] text-white hover:bg-[#8a6dff] cursor-pointer"
            >
              <Heart className="mr-2 h-4 w-4" fill={isFavorited ? "currentColor" : "none"} />
              {isFavorited ? "Favorited" : "Favorite"}
            </Button>

            <Button
              onClick={handleShare}
              variant="secondary"
              className="rounded-full bg-[#9d84ff] text-white hover:bg-[#8a6dff] cursor-pointer"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title={`${title} Coloring Pages`}
        imageUrl={featuredImage || "/placeholder.svg"}
        pageUrl={`/categories/${title.toLowerCase()}`}
      />
    </div>
  )
}

