import { notFound } from "next/navigation"
import { CategoryHeader } from "@/components/categories/category-header"
import { ColoringPageGrid } from "@/components/categories/coloring-page-grid"
import { OurFavorites } from "@/components/categories/our-favorites"
import { AdPlaceholder } from "@/components/coloring-page/ad-placeholder"

// Mock data for categories
const categories = [
  {
    id: "animals",
    title: "Animals",
    description: "Explore our collection of animal coloring pages featuring pets, wildlife, and more.",
    imageCount: 48,
    featuredImage: "/placeholder.svg?height=300&width=600&text=Animals",
  },
  {
    id: "dinosaurs",
    title: "Dinosaurs",
    description: "Discover prehistoric creatures with our dinosaur coloring pages.",
    imageCount: 36,
    featuredImage: "/placeholder.svg?height=300&width=600&text=Dinosaurs",
  },
  {
    id: "easter",
    title: "Easter",
    description: "Celebrate Easter with our collection of bunnies, eggs, and spring-themed coloring pages.",
    imageCount: 42,
    featuredImage: "/placeholder.svg?height=300&width=600&text=Easter",
  },
  {
    id: "princess",
    title: "Princesses",
    description: "Magical princess coloring pages for fairy tale lovers.",
    imageCount: 30,
    featuredImage: "/placeholder.svg?height=300&width=600&text=Princesses",
  },
]

// Mock function to get category by ID
function getCategoryById(id: string) {
  return categories.find((category) => category.id === id)
}

// Mock function to get coloring pages for a category
function getColoringPages(categoryId: string, page = 1, limit = 12) {
  // In a real app, this would fetch from an API or database
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
    total: basePages.length,
  }
}

// Mock function to get favorite coloring pages for a category
function getFavoriteColoringPages(categoryId: string, limit = 5) {
  // In a real app, this would fetch from an API or database
  return Array.from({ length: limit }, (_, i) => ({
    id: `${categoryId}-favorite-${i + 1}`,
    title: `Editor's Pick: ${categoryId.charAt(0).toUpperCase() + categoryId.slice(1)} Coloring Page ${i + 1}`,
    imageUrl: `/placeholder.svg?height=550&width=425&text=${categoryId}-favorite-${i + 1}`,
    downloadUrl: `#download-${categoryId}-favorite-${i + 1}`,
    tags: ["featured", categoryId, i % 2 === 0 ? "popular" : "new"],
    isFeatured: true,
  }))
}

export default function CategoryPage({ params }: { params: { categoryId: string } }) {
  const { categoryId } = params
  const category = getCategoryById(categoryId)

  if (!category) {
    notFound()
  }

  // Get initial coloring pages
  const initialData = getColoringPages(categoryId)

  // Get favorite coloring pages
  const favorites = getFavoriteColoringPages(categoryId)

  return (
    <div>
      <CategoryHeader
        title={category.title}
        description={category.description}
        imageCount={category.imageCount}
        featuredImage={category.featuredImage}
      />

      <div className="container py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content - coloring pages grid */}
          <div className="w-full lg:w-4/5">
            <ColoringPageGrid
              categoryId={categoryId}
              initialPages={initialData.pages}
              initialHasMore={initialData.hasMore}
              totalPages={initialData.total}
            />
          </div>

          {/* Sidebar - Our Favorites (hidden on mobile) */}
          <div className="hidden lg:block lg:w-1/5">
            {/* Add the ad placeholder above the favorites */}
            <AdPlaceholder />
            <div className="mt-6">
              <OurFavorites categoryId={categoryId} favorites={favorites} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

