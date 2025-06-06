"use client";

import type React from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Share2, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { ShareModal } from "@/components/share-modal";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface CategoryCardProps {
  id: string | number;
  title: string;
  imageUrl: string;
  imageCount?: number;
  categoryFavorited?: boolean;
  categoryLink?: string;
  userId?: string | null;
}

export function CategoryCard({
  id,
  title,
  imageUrl,
  imageCount,
  categoryFavorited = false,
  categoryLink,
  userId,
}: CategoryCardProps) {
  const supabase = createClient();
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(categoryFavorited);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!userId) {
      toast("Must be logged in to favorite", {
        description: "Please log in to favorite this category.",
        descriptionClassName: "!text-black font-medium"
      });
      return;
    }

    if (isFavorited) {
      // If experience is already saved, remove it
      const { error } = await supabase
        .from("favorited_categories")
        .delete()
        .eq("category_id", id)
        .eq("user_id", userId);

      if (error) {
        console.log("error deleting saved experience", error);
      } else {
        setIsFavorited(!isFavorited);
      }
    } else {
      // If experience is not saved, save it
      const { error } = await supabase.from("favorited_categories").insert({
        category_id: id,
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

  return (
    <>
      <div className="flex flex-col w-full transition-transform duration-300 hover:scale-105">
        <Link
          href={categoryLink ? `${categoryLink}/${id}` : `/categories/${id}`}
        >
          <div
            className="group relative w-full overflow-hidden rounded-lg shadow-md bg-white border border-gray-100"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ aspectRatio: "3/4" }}
          >
            {/* Paper-like styling */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white opacity-10"></div>

            {/* Image */}
            <div className="relative w-full h-full">
              <Image
                src={imageUrl || "/placeholder.svg"}
                alt={title}
                fill
                className="object-cover"
              />
            </div>

            {/* Action buttons - in top right */}
            <div className="absolute top-3 right-3 flex gap-2">
              <Button
                onClick={handleShare}
                size="icon"
                variant="outline"
                className="h-8 w-8 rounded-full bg-[#9d84ff]/20 backdrop-blur-sm hover:bg-[#9d84ff]/30 shadow-sm cursor-pointer border border-[#9d84ff]/30"
                aria-label="Share"
              >
                <Share2 className="h-4 w-4 text-[#9d84ff]" />
              </Button>
              <Button
                onClick={handleFavorite}
                size="icon"
                variant="outline"
                className={cn(
                  "h-8 w-8 rounded-full shadow-sm cursor-pointer",
                  isFavorited
                    ? "bg-[#9d84ff] hover:bg-[#8a6dff] text-white hover:text-white"
                    : "bg-[#9d84ff]/20 backdrop-blur-sm hover:bg-[#9d84ff]/30 border border-[#9d84ff]/30 text-[#9d84ff] hover:text-white"
                )}
                aria-label={
                  isFavorited ? "Remove from favorites" : "Add to favorites"
                }
              >
                <Star className="h-4 w-4" />
                <span className="sr-only">
                  {isFavorited ? "Remove from favorites" : "Add to favorites"}
                </span>
              </Button>
            </div>

            {/* Add a badge showing the number of pages (visible even when not hovering) */}
            {imageCount !== undefined && (
              <div className="absolute top-3 left-3 bg-[#9d84ff] backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full">
                {imageCount} pages
              </div>
            )}
          </div>
        </Link>

        {/* Title below the image */}
        <div className="mt-3 px-1">
          <h3 className="font-medium text-2xl text-gray-800 text-center">
            {title}
          </h3>
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title={title}
        description={`Check out free downloadable ${title} coloring pages`}
        imageUrl={imageUrl}
        pageUrl={`/categories/${id}`}
      />
    </>
  );
}
