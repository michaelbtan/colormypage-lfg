"use client"

import { useState, useEffect, useRef } from "react"
import { Loader2 } from "lucide-react"
import { ColoringPageCard } from "@/components/categories/coloring-page-card"

export interface ColoringPage {
  id: string
  title: string
  imageUrl: string
  downloadUrl: string
  tags: string[]
  isFeatured?: boolean
}

interface ColoringPageGridProps {
  categoryId: string
  initialPages: ColoringPage[]
  initialHasMore: boolean
  totalPages: number
}

// Mock function to get more coloring pages (client-side)
async function fetchMoreColoringPages(
  categoryId: string,
  page: number,
  limit = 12,
): Promise<{
  pages: ColoringPage[]
  hasMore: boolean
}> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // In a real app, this would be an API call
  const basePages = Array.from({ length: 100 }, (_, i) => ({
    id: `${categoryId}-${i + 1}`,
    title: `${categoryId.charAt(0).toUpperCase() + categoryId.slice(1)} Coloring Page ${i + 1}`,
    imageUrl: `/placeholder.svg?height=550&width=425&text=${categoryId}-${i + 1}`,
    downloadUrl: `#download-${categoryId}-${i + 1}`,
    tags: ["kids", categoryId, i % 2 === 0 ? "easy" : "intermediate"],
    isFeatured: i < 5,
  }))

  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit

  return {
    pages: basePages.slice(startIndex, endIndex),
    hasMore: endIndex < basePages.length,
  }
}

export function ColoringPageGrid({ categoryId, initialPages, initialHasMore, totalPages }: ColoringPageGridProps) {
  const [pages, setPages] = useState<ColoringPage[]>(initialPages)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(initialHasMore)
  const loaderRef = useRef<HTMLDivElement>(null)

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
      const result = await fetchMoreColoringPages(categoryId, nextPage)
      setPages((prevPages) => [...prevPages, ...result.pages])
      setHasMore(result.hasMore)
      setPage(nextPage)
    } catch (error) {
      console.error("Error loading more pages:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {pages.map((coloringPage) => (
          <ColoringPageCard key={coloringPage.id} page={coloringPage} />
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
            You've reached the end! {pages.length} of {totalPages} coloring pages loaded.
          </p>
        )}
      </div>
    </div>
  )
}

