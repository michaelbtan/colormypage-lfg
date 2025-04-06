import { ColoringPageGrid } from "@/components/categories/coloring-page-grid"
import { AdPlaceholder } from "@/components/ad-placeholder"

// Mock function to get Halloween coloring pages
function getHalloweenColoringPages() {
  // In a real app, this would fetch from an API or database
  const halloweenPages = Array.from({ length: 24 }, (_, i) => ({
    id: `halloween-${i + 1}`,
    title: `Halloween Coloring Page ${i + 1}`,
    imageUrl: `/placeholder.svg?height=550&width=425&text=Halloween-${i + 1}`,
    downloadUrl: `#download-halloween-${i + 1}`,
    tags: [
      "halloween",
      i % 3 === 0 ? "pumpkin" : i % 3 === 1 ? "ghost" : "witch",
      i % 2 === 0 ? "easy" : "intermediate",
    ],
    isFeatured: i < 5,
  }))

  return {
    pages: halloweenPages,
    hasMore: true,
    total: 48, // Pretend there are more pages than we initially load
  }
}

export const metadata = {
  title: "Halloween Coloring Pages - ColorMyPage",
  description: "Download free Halloween coloring pages featuring pumpkins, ghosts, witches, and more spooky designs.",
}

export default function HalloweenColoringPagesPage() {
  // Get initial coloring pages
  const initialData = getHalloweenColoringPages()

  return (
    <div className="bg-gray-50">
      {/* Halloween Hero Banner */}
      <div className="relative bg-gradient-to-r from-[#ff7700] to-[#6b0080] text-white py-12">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">Halloween Coloring Pages</h1>
          <p className="text-xl max-w-2xl">
            Get into the spooky spirit with our collection of free printable Halloween coloring pages featuring
            pumpkins, ghosts, witches, and more!
          </p>
        </div>
      </div>

      <div className="container py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content - coloring pages grid */}
          <div className="w-full lg:w-3/4">
            <ColoringPageGrid
              categoryId="halloween"
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

