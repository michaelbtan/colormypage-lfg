"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ShareModal } from "@/components/share-modal";
import type { ColoringPage } from "@/components/categories/coloring-page-grid";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

interface ColoringPageCardProps {
  page: ColoringPage;
  userId: string | null;
}

export function CategoryColoringPageCard({
  page,
  userId,
}: ColoringPageCardProps) {
  const supabase = createClient();
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  useEffect(() => {
    const checkIfFavorited = async () => {
      if (userId) {
        const { data: favorited } = await supabase
          .from("favorited_coloring_pages")
          .select("coloring_page_id, user_id")
          .eq("coloring_page_id", page.id)
          .eq("user_id", userId)
          .single();
        setIsFavorited(!!favorited);
      }
    };
    checkIfFavorited();
  }, [userId, page.id, supabase]);

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
    <>
      <div className="flex flex-col w-full">
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
        </div>

        {/* Title below the image */}
        <div className="mt-3 px-1">
          <h3 className="font-medium text-base text-gray-800 line-clamp-2">
            {page.title}
          </h3>
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title={page.title}
        description={`Check out free downloadable ${page.title} coloring pages`}
        imageUrl={page.imageUrl}
        pageUrl={`/coloring-page/${page.id}`}
      />
    </>
  );
}
