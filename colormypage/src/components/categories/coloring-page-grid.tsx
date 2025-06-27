"use client"

import { useState, useEffect, useRef } from "react"
import { Loader2 } from 'lucide-react'
import { CategoryColoringPageCard } from "@/components/categories/category-coloring-page-card"
import { createClient } from "@/lib/supabase/client"

// Updated interface to match the Supabase data model
export interface ColoringPageCategory {
  id: number
  created_at: string
  coloring_page_id: string
  category_id: string
  coloring_pages: {
    id: string
    title: string
    description: string
    image_url: string
    file_name: string
    is_published: boolean
  }
}

// Simplified interface for the card component
export interface ColoringPage {
  id: string
  title: string
  imageUrl: string
  description: string
  fileName: string
}

interface ColoringPageGridProps {
  userId: string | null
  categoryId: string
  initialPages: ColoringPageCategory[]
  initialHasMore: boolean
  totalPages: number

}

export function ColoringPageGrid({ 
  userId,
  categoryId, 
  initialPages, 
  initialHasMore, 
  totalPages 
}: ColoringPageGridProps) {
  const [pages, setPages] = useState<ColoringPageCategory[]>(initialPages)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(initialHasMore)
  const loaderRef = useRef<HTMLDivElement>(null)
  const limit = 12

  // Fetch more coloring pages from Supabase
  const fetchMoreColoringPages = async (
    categoryId: string,
    page: number,
    limit = 12,
  ): Promise<{
    pages: ColoringPageCategory[]
    hasMore: boolean
  }> => {
    const supabase = createClient()
    
    // Calculate pagination
    const from = (page - 1) * limit
    const to = from + limit - 1
    
    // Query Supabase for more pages
    const { data, error, count } = await supabase
      .from("coloring_page_categories")
      .select(`
        *,
        coloring_pages:coloring_page_title(
          id,
          title,
          description,
          image_url,
          file_name,
          is_published
        )
      `, { count: 'exact' })
      .eq("category_id", categoryId)
      .range(from, to)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error("Error fetching coloring pages:", error)
      throw error
    }
    
    return {
      pages: data || [],
      hasMore: count ? from + data.length < count : false,
    }
  }

  // Handle infinite scroll with Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting && hasMore && !loading) {
          loadMore()
        }
      },
      { threshold: 0.1 },
    )

    const currentLoaderRef = loaderRef.current
    if (currentLoaderRef) {
      observer.observe(currentLoaderRef)
    }

    return () => {
      if (currentLoaderRef) {
        observer.unobserve(currentLoaderRef)
      }
    }
  }, [hasMore, loading])

  const loadMore = async () => {
    if (loading || !hasMore) return

    setLoading(true)
    const nextPage = page + 1

    try {
      const result = await fetchMoreColoringPages(categoryId, nextPage, limit)
      setPages((prevPages) => [...prevPages, ...result.pages])
      setHasMore(result.hasMore)
      setPage(nextPage)
    } catch (error) {
      console.error("Error loading more pages:", error)
    } finally {
      setLoading(false)
    }
  }

  // Transform the data for the ColoringPageCard component
  const transformedPages = pages
    .filter(page => page.coloring_pages && page.coloring_pages.is_published)
    .map(page => ({
      id: page.coloring_pages.id,
      title: page.coloring_pages.title,
      imageUrl: page.coloring_pages.image_url,
      description: page.coloring_pages.description,
      fileName: page.coloring_pages.file_name
    }))

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
        {transformedPages.map((coloringPage) => (
          <CategoryColoringPageCard key={coloringPage.id} page={coloringPage} userId={userId} />
        ))}
      </div>

      {/* Loading indicator */}
      <div ref={loaderRef} className="flex justify-center items-center py-8">
        {loading && (
          <div className="flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin text-[#9d84ff]" />
            <p className="mt-2 text-sm text-gray-500">Loading more coloring pages...</p>
          </div>
        )}

        {!hasMore && pages.length > 0 && (
          <p className="text-gray-500">
            You&apos;ve reached the end! {transformedPages.length} of {totalPages} coloring pages loaded.
          </p>
        )}
      </div>
    </div>
  )
}