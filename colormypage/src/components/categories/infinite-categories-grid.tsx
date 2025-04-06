"use client"

import { useState, useEffect, useRef } from "react"
import { Loader2 } from "lucide-react"
import { CategoryCard } from "@/components/category-card"

export interface Category {
  id: string
  title: string
  description: string
  imageCount: number
  featuredImage: string
  subcategories: string[]
  isPopular?: boolean
  isSeasonal?: boolean
  isEducational?: boolean
}

interface InfiniteCategoriesGridProps {
  initialCategories: Category[]
  initialHasMore: boolean
}

// Mock function to fetch more categories (in a real app, this would be an API call)
async function fetchMoreCategories(
  page: number,
  limit = 12,
): Promise<{
  categories: Category[]
  hasMore: boolean
}> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Generate mock categories
  const mockCategories = Array.from({ length: limit }, (_, i) => {
    const index = (page - 1) * limit + i
    return {
      id: `category-${index + 1}`,
      title: `Category ${index + 1}`,
      description: `This is a description for category ${index + 1}.`,
      imageCount: Math.floor(Math.random() * 50) + 10, // Random number between 10-60
      featuredImage: `/placeholder.svg?height=300&width=300&text=Category+${index + 1}`,
      subcategories: ["Subcategory 1", "Subcategory 2", "Subcategory 3"],
    }
  })

  return {
    categories: mockCategories,
    hasMore: page < 5, // Limit to 5 pages for demo purposes
  }
}

export function InfiniteCategoriesGrid({ initialCategories, initialHasMore }: InfiniteCategoriesGridProps) {
  const [categories, setCategories] = useState<Category[]>(initialCategories)
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
      const result = await fetchMoreCategories(nextPage)
      setCategories((prevCategories) => [...prevCategories, ...result.categories])
      setHasMore(result.hasMore)
      setPage(nextPage)
    } catch (error) {
      console.error("Error loading more categories:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            id={category.id}
            title={category.title}
            imageUrl={category.featuredImage}
            imageCount={category.imageCount}
            onFavorite={(id) => console.log(`Toggled favorite for category ${id}`)}
            onShare={(id) => console.log(`Shared category ${id}`)}
          />
        ))}
      </div>

      {/* Loading indicator */}
      <div ref={loaderRef} className="flex justify-center items-center py-8">
        {loading && (
          <div className="flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin text-[#9d84ff]" />
            <p className="mt-2 text-sm text-gray-500">Loading more categories...</p>
          </div>
        )}

        {!hasMore && categories.length > 0 && (
          <p className="text-gray-500">You've reached the end! No more categories to load.</p>
        )}
      </div>
    </div>
  )
}

