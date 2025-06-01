"use client";

import type React from "react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShareModal } from "@/components/share-modal";
import { Share2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

export interface ColoringPage {
  id: string | number;
  title: string;
  image_url: string;
  dateAdded?: string;
}

export interface ColoringPageCardProps {
  page: ColoringPage;
  userId?: string | null;
}

export default function FavoriteColoringPageCard({
  page,
  userId,
}: ColoringPageCardProps) {
  const supabase = createClient();
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(true);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

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
        .eq("coloring_page_id", page.id)
        .eq("user_id", userId);

      if (error) {
        console.log("error deleting saved experience", error);
      } else {
        setIsFavorited(!isFavorited);
      }
    } else {
      // If experience is not saved, save it
      const { error } = await supabase.from("favorited_coloring_pages").insert({
        coloring_page_id: page.id,
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
    <div className="group relative transition-transform duration-300 hover:scale-105">
      <Link href={`/coloring-page/${page.id}`} className="block">
        <div
          className="relative overflow-hidden rounded-lg border border-gray-200 bg-white"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ aspectRatio: "3/4" }}
        >
          <Image
            src={page.image_url || "/placeholder.svg"}
            alt={page.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />

          <div className="absolute top-3 right-3 flex gap-2">
            <Link
              href={`/coloring-page/${page.id}?share=true`}
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                onClick={handleShare}
                size="icon"
                variant="outline"
                className="h-8 w-8 rounded-full bg-[#9d84ff]/20 backdrop-blur-sm hover:bg-[#9d84ff]/30 shadow-sm cursor-pointer border border-[#9d84ff]/30"
                aria-label="Share"
              >
                <Share2 className="h-4 w-4 text-[#9d84ff]" />
                <span className="sr-only">Share</span>
              </Button>
            </Link>
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
        </div>
      </Link>

      <div className="mt-2">
        <h3 className="text-xl font-medium text-gray-900 truncate">
          {page.title}
        </h3>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title={page.title}
        description={`Check out free downloadable ${page.title} coloring pages`}
        imageUrl={page.image_url}
        pageUrl={`/coloring-page/${page.id}`}
      />
    </div>
  );
}
