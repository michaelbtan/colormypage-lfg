import Link from "next/link"
import Image from "next/image"
import type { ColoringPage } from "@/lib/coloring-pages"

interface RecommendedPagesProps {
  pages: ColoringPage[]
}

export function RecommendedPages({ pages }: RecommendedPagesProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">You Might Also Like</h2>

        <div className="space-y-4">
          {pages.map((page) => (
            <Link key={page.id} href={`/coloring-page/${page.id}`} className="flex items-start gap-3 group">
              <div className="relative w-16 h-20 flex-shrink-0 rounded-md overflow-hidden border border-gray-200">
                <Image
                  src={page.imageUrl || "/placeholder.svg"}
                  alt={page.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div>
                <h3 className="text-sm font-medium group-hover:text-[#9d84ff] transition-colors line-clamp-2">
                  {page.title}
                </h3>
                <div className="mt-1 flex flex-wrap gap-1">
                  {page.tags.slice(0, 1).map((tag) => (
                    <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

