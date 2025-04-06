import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"
import type { ColoringPage } from "@/components/categories/coloring-page-grid"

interface OurFavoritesProps {
  categoryId: string
  favorites: ColoringPage[]
}

export function OurFavorites({ categoryId, favorites }: OurFavoritesProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <Star className="h-5 w-5 text-[#9d84ff] fill-[#9d84ff]" />
        <h2 className="text-lg font-bold">Our Favorites</h2>
      </div>

      <div className="space-y-4">
        {favorites.map((page) => (
          <Link key={page.id} href={`/coloring-page/${page.id}`} className="group block">
            <div className="flex gap-3">
              <div className="relative w-16 h-20 flex-shrink-0 rounded-md overflow-hidden border border-gray-200">
                <Image
                  src={page.imageUrl || "/placeholder.svg"}
                  alt={page.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium group-hover:text-[#9d84ff] transition-colors line-clamp-2">
                  {page.title}
                </h3>
                <div className="mt-1 flex flex-wrap gap-1">
                  {page.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <Link
        href={`/categories/${categoryId}/favorites`}
        className="block text-center text-sm text-[#9d84ff] hover:underline mt-4 font-medium"
      >
        View All Favorites
      </Link>
    </div>
  )
}

