"use client";

import type React from "react";
import Image from "next/image";
import { useState } from "react";
import { Share2, Heart, Calendar, BadgeCheck, FileHeart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShareModal } from "@/components/share-modal";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

interface CategoryBlogProps {
  id: string;
  userId: string | null;
  title: string;
  description: string;
  imageCount: number;
  featuredImage?: string;
  categoryFavorited?: boolean;
  updatedAt?: string;
  author?: string;
}

export function CategoryBlog({
  id,
  title,
  description,
  imageCount,
  featuredImage,
  categoryFavorited,
  userId,
  updatedAt,
  author,
}: CategoryBlogProps) {
  const supabase = createClient();
  const [isFavorited, setIsFavorited] = useState(categoryFavorited);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!userId) {
      toast("Must be logged in to favorite", {
        description: "Please log in to favorite this category.",
        descriptionClassName: "!text-black font-medium",
      });
      return;
    }

    if (isFavorited) {
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

  const handleShare = () => {
    setIsShareModalOpen(true);
  };

  const formattedDate = updatedAt
    ? new Date(updatedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <>
      {/* Add structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: title,
            image: featuredImage || "/placeholder.svg",
            description: description.replace(/<[^>]*>/g, ""), // Strip HTML for schema
            ...(author && { author: { "@type": "Person", name: author } }),
            ...(updatedAt && { datePublished: updatedAt }),
          }),
        }}
      />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] lg:min-h-[70vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={
              featuredImage ||
              "/placeholder.svg?height=800&width=1200&query=colorful abstract pattern for coloring pages"
            }
            alt={decodeURI(title)}
            fill
            className="object-cover"
            priority
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="max-w-6xl">
            <header className="space-y-6">
              {/* Title */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                {`${decodeURI(title)} Downloadable Coloring Pages`}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-col gap-2 text-sm text-white/80">
                {author && (
                  <div className="flex items-center gap-2 text-lg font-semibold">
                    {/* <User className="h-4 w-4" /> */}
                    <span>{`By: ${author}`}</span>
                    <BadgeCheck className="h-4 w-4" />
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-4">
                  {formattedDate && (
                    <div className="flex items-center gap-2 text-lg">
                      <Calendar className="h-4 w-4" />
                      <time
                        dateTime={updatedAt}
                      >{`Last updated: ${formattedDate}`}</time>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-lg">
                    <FileHeart className="h-4 w-4" />
                    <span>{imageCount} coloring pages</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  onClick={handleFavorite}
                  size="lg"
                  className="bg-[#9d84ff] hover:bg-[#8a6dff] text-white border-0 rounded-full px-8 py-3 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
                >
                  <Heart
                    className="mr-2 h-5 w-5"
                    fill={isFavorited ? "currentColor" : "none"}
                  />
                  {isFavorited ? "Favorited" : "Add to Favorites"}
                </Button>

                <Button
                  onClick={handleShare}
                  size="lg"
                  className="bg-[#9d84ff] hover:bg-[#8a6dff] text-white border-0 rounded-full px-8 py-3 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
                >
                  <Share2 className="mr-2 h-5 w-5" />
                  Share Collection
                </Button>
              </div>
            </header>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="pt-6 lg:pt-12">
        <div className="container mx-auto px-4">
          <div className="max-w-8xl mx-auto">
            <div className="p-8 lg:p-12 rounded-xl shadow-md border border-gray-100 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div
                className="prose prose-lg prose-gray max-w-none
                  prose-headings:font-bold prose-headings:tracking-tight
                  prose-h1:text-4xl prose-h1:mb-8 prose-h1:mt-0 prose-h1:text-gray-900
                  prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-12 prose-h2:text-[#9d84ff] prose-h2:border-b prose-h2:border-gray-100 prose-h2:pb-3
                  prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-8 prose-h3:text-gray-800
                  prose-h4:text-xl prose-h4:mb-3 prose-h4:mt-6 prose-h4:text-gray-700
                  prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg
                  prose-ul:my-6 prose-ol:my-6 prose-ul:space-y-2 prose-ol:space-y-2
                  prose-li:text-gray-600 prose-li:text-lg prose-li:leading-relaxed
                  prose-strong:text-gray-900 prose-strong:font-semibold
                  prose-a:text-[#9d84ff] prose-a:font-medium prose-a:no-underline hover:prose-a:underline prose-a:transition-colors
                  prose-blockquote:border-l-4 prose-blockquote:border-[#9d84ff] prose-blockquote:bg-[#9d84ff]/5 prose-blockquote:p-6 prose-blockquote:rounded-r-xl prose-blockquote:my-8
                  prose-code:text-[#9d84ff] prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
                  prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-xl prose-pre:p-6"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </div>
          </div>
        </div>
      </section>

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title={`${title} Coloring Pages`}
        description={`Check out free downloadable ${title} coloring pages`}
        imageUrl={featuredImage || "/placeholder.svg"}
        pageUrl={`/categories/${title}`}
      />
    </>
  );
}
