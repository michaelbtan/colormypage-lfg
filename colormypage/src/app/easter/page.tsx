import { ColoringPageGrid } from "@/components/categories/coloring-page-grid"
import { AdPlaceholder } from "@/components/ad-placeholder"

// Mock function to get Easter coloring pages
function getEasterColoringPages() {
  // In a real app, this would fetch from an API or database
  const easterPages = Array.from({ length: 24 }, (_, i) => ({
    id: `easter-${i + 1}`,
    title: `Easter Coloring Page ${i + 1}`,
    imageUrl: `/placeholder.svg?height=550&width=425&text=Easter-${i + 1}`,
    downloadUrl: `#download-easter-${i + 1}`,
    tags: ["easter", i % 3 === 0 ? "bunny" : i % 3 === 1 ? "eggs" : "spring", i % 2 === 0 ? "easy" : "intermediate"],
    isFeatured: i < 5,
  }))

  return {
    pages: easterPages,
    hasMore: true,
    total: 48, // Pretend there are more pages than we initially load
  }
}

export const metadata = {
  title: "Easter Coloring Pages - ColorMyPage",
  description: "Download free Easter coloring pages featuring bunnies, eggs, baskets, and more spring-themed designs.",
}

export default function EasterColoringPagesPage() {
  // Get initial coloring pages
  const initialData = getEasterColoringPages()

  return (
    <div className="bg-gray-50">
      {/* Easter Hero Banner */}
      <div className="relative bg-gradient-to-r from-[#e4a5bd] to-[#ffb380] text-white py-12">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">Easter Coloring Pages</h1>
          <p className="text-xl max-w-2xl">
            Celebrate spring and Easter with our collection of free printable coloring pages featuring bunnies, eggs,
            baskets, and more!
          </p>
        </div>
      </div>

      <div className="container py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content - coloring pages grid */}
          <div className="w-full lg:w-3/4">
            <ColoringPageGrid
              categoryId="easter"
              initialPages={initialData.pages}
              initialHasMore={initialData.hasMore}
              totalPages={initialData.total}
            />
          </div>

          {/* Sidebar - Ad space */}
          <div className="w-full lg:w-1/4">
            <div className="sticky top-24">
              <AdPlaceholder />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

