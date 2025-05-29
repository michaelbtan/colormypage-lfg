"use client"

import { useState, useEffect, useRef } from "react"
import { Loader2 } from 'lucide-react'
import { CategoryCard } from "@/components/category-card"
import { createClient } from "@/lib/supabase/client"

// Updated interface to match Supabase data structure
export interface Category {
  id: string
  created_at: string
  title: string
  image_url: string
  image_count: number
  description?: string // Optional as it's not in your current data
  categoryFavorited?: boolean // Optional, added for favorited state
}

interface InfiniteCategoriesGridProps {
  initialCategories: Category[]
  initialHasMore: boolean
  totalCount: number
  userId?: string | null
}

export function InfiniteCategoriesGrid({ 
  initialCategories, 
  initialHasMore,
  totalCount,
  userId = null
}: InfiniteCategoriesGridProps) {
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(initialHasMore)
  const loaderRef = useRef<HTMLDivElement>(null)
  const limit = 12

  // Fetch more categories from Supabase
  const fetchMoreCategories = async (
    page: number,
    limit = 12,
  ): Promise<{
    categories: Category[]
    hasMore: boolean
  }> => {
    const supabase = createClient()
    
    // Calculate pagination
    const from = page * limit
    const to = from + limit - 1
    
    // Query Supabase for more categories
    const { data, error, count } = await supabase
      .from("categories")
      .select("id, created_at, title, image_url, image_count", { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(from, to)
    
    if (error) {
      console.error("Error fetching categories:", error)
      throw error
    }
    
    return {
      categories: data || [],
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
      const result = await fetchMoreCategories(nextPage, limit)
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
            imageUrl={category.image_url}
            imageCount={category.image_count}
            categoryFavorited={category.categoryFavorited}
            userId={userId}
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
          <p className="text-gray-500">
            You've reached the end! {categories.length} of {totalCount} categories loaded.
          </p>
        )}
      </div>
    </div>
  )
}