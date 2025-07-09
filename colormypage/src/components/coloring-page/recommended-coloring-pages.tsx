"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShareModal } from "@/components/share-modal";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import PLACEHOLDER from "@/assets/placeholder.svg";

interface ColoringPage {
  id: string;
  title: string;
  description?: string;
  image_url: string;
  file_name: string;
  is_published: boolean;
}

interface RecommendedColoringPagesProps {
  currentPageId: string;
  userId: string | null;
}

export function RecommendedColoringPages({ 
  currentPageId, 
  userId 
}: RecommendedColoringPagesProps) {
  const [pages, setPages] = useState<ColoringPage[]>([]);
  const [favoriteStatuses, setFavoriteStatuses] = useState<Record<string, boolean>>({});
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState<ColoringPage | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchRecommendedPages();
    if (userId) {
      fetchFavoriteStatuses();
    }
  }, [currentPageId, userId]);

  const fetchRecommendedPages = async () => {
    try {
      const { data, error } = await supabase
        .from("coloring_pages")
        .select("*")
        .eq("is_published", true)
        .neq("id", currentPageId)
        .limit(6)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching recommended pages:", error);
        return;
      }

      setPages(data || []);
    } catch (error) {
      console.error("Error fetching recommended pages:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFavoriteStatuses = async () => {
    if (!userId || pages.length === 0) return;

    try {
      const pageIds = pages.map(page => page.id);
      const { data, error } = await supabase
        .from("favorited_coloring_pages")
        .select("coloring_page_id")
        .eq("user_id", userId)
        .in("coloring_page_id", pageIds);

      if (error) {
        console.error("Error fetching favorite statuses:", error);
        return;
      }

      const favorites = data?.reduce((acc: Record<string, boolean>, item) => {
        acc[item.coloring_page_id] = true;
        return acc;
      }, {}) || {};

      setFavoriteStatuses(favorites);
    } catch (error) {
      console.error("Error fetching favorite statuses:", error);
    }
  };

  const handleFavorite = async (page: ColoringPage, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!userId) {
      toast("Must be logged in to favorite", {
        description: "Please log in to favorite this coloring page.",
        descriptionClassName: "!text-black font-medium",
      });
      return;
    }

    const isFavorited = favoriteStatuses[page.id];

    try {
      if (isFavorited) {
        const { error } = await supabase
          .from("favorited_coloring_pages")
          .delete()
          .eq("coloring_page_id", page.id)
          .eq("user_id", userId);

        if (error) {
          console.error("Error removing favorite:", error);
          return;
        }
      } else {
        const { error } = await supabase
          .from("favorited_coloring_pages")
          .insert({
            coloring_page_id: page.id,
            user_id: userId,
          });

        if (error) {
          console.error("Error adding favorite:", error);
          return;
        }
      }

      setFavoriteStatuses(prev => ({
        ...prev,
        [page.id]: !isFavorited
      }));
    } catch (error) {
      console.error("Error handling favorite:", error);
    }
  };

  const handleShare = (page: ColoringPage, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedPage(page);
    setIsShareModalOpen(true);
  };

  useEffect(() => {
    if (pages.length > 0 && userId) {
      fetchFavoriteStatuses();
    }
  }, [pages, userId]);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Recommended Coloring Pages</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-gray-200 animate-pulse rounded-lg aspect-[4/5]" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (pages.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Recommended Coloring Pages</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pages.map((page) => (
            <div key={page.id} className="group relative bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300">
              <Link href={`/coloring-page/${page.title}`} className="block">
                <div className="aspect-[4/5] relative">
                  <Image
                    src={page.image_url || PLACEHOLDER}
                    alt={decodeURI(page.title)}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-[#9d84ff] transition-colors">
                    {decodeURI(page.title)}
                  </h3>
                  {page.description && (
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {page.description}
                    </p>
                  )}
                </div>
              </Link>
              
              {/* Action buttons */}
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => handleFavorite(page, e)}
                  className={`w-8 h-8 p-0 rounded-full bg-white/90 backdrop-blur-sm ${
                    favoriteStatuses[page.id]
                      ? "text-[#9d84ff] border-[#9d84ff]"
                      : "text-gray-600 border-gray-300"
                  }`}
                >
                  <Heart
                    className="w-4 h-4"
                    fill={favoriteStatuses[page.id] ? "currentColor" : "none"}
                  />
                </Button>
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => handleShare(page, e)}
                  className="w-8 h-8 p-0 rounded-full bg-white/90 backdrop-blur-sm text-gray-600 border-gray-300"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Share Modal */}
      {selectedPage && (
        <ShareModal
          isOpen={isShareModalOpen}
          onClose={() => {
            setIsShareModalOpen(false);
            setSelectedPage(null);
          }}
          title={selectedPage.title}
          description={`Check out this free ${selectedPage.title} coloring page`}
          imageUrl={selectedPage.image_url}
          pageUrl={`/coloring-page/${selectedPage.title}`}
        />
      )}
    </div>
  );
}