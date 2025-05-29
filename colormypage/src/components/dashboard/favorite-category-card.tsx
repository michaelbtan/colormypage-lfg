"use client";

import { useState } from "react";
import { cn } from "@/lib/utils"
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Star, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShareModal } from "@/components/share-modal";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

interface Category {
  title: string;
  image_url: string;
  description: string;
  image_count: number;
}

interface FavoriteCategoryProps {
  category_id: string;
  category: Category;
  userId: string | null;
}

export function FavoriteCategoryCard({
  category_id,
  category,
  userId,
}: FavoriteCategoryProps) {
  const supabase = createClient();
  const [isFavorited, setIsFavorited] = useState(true);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!userId) {
      toast("Must be logged in to favorite", {
        description: "Please log in to favorite this category.",
      });
      return;
    }

    if (isFavorited) {
      // If experience is already saved, remove it
      const { error } = await supabase
        .from("favorited_categories")
        .delete()
        .eq("category_id", category_id)
        .eq("user_id", userId);

      if (error) {
        console.log("error deleting saved experience", error);
      } else {
        setIsFavorited(!isFavorited);
      }
    } else {
      // If experience is not saved, save it
      const { error } = await supabase.from("favorited_categories").insert({
        category_id: category_id,
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
    <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
      <Link
        href={`/categories/${category_id}`}
        className="flex items-center p-3 hover:bg-gray-50 transition-colors"
      >
        <div className="relative h-16 w-16 rounded-md overflow-hidden">
          <Image
            src={category.image_url || "/placeholder.svg"}
            alt={category.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="ml-4 flex-1">
          <h3 className="text-sm font-medium text-gray-900">
            {category.title}
          </h3>
          <p className="text-xs text-gray-500">
            {category.image_count} saved pages
          </p>
        </div>
        <div className="flex items-center gap-2">
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
              <Button
                onClick={handleFavorite}
                size="icon"
                variant="outline"
                className={cn(
                  "h-8 w-8 rounded-full shadow-sm cursor-pointer",
                  isFavorited
                    ? "bg-[#9d84ff] hover:bg-[#8a6dff] text-white hover:text-white"
                    : "bg-[#9d84ff]/20 backdrop-blur-sm hover:bg-[#9d84ff]/30 border border-[#9d84ff]/30 text-[#9d84ff] hover:text-white",
                )}
                aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
              >
                <Star className="h-4 w-4" />
                <span className="sr-only">
                  {isFavorited ? "Remove from favorites" : "Add to favorites"}
                </span>
              </Button>
          <ChevronRight className="h-4 w-4 text-gray-400" />
        </div>
      </Link>
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title={category.title}
        imageUrl={category.image_url}
        pageUrl={`/categories/${category_id}`}
      />
    </div>
  );
}
