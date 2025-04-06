import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import type { Category } from "@/components/categories/categories-grid"

interface CategoryCardProps {
  category: Category
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/categories/${category.id}`}>
      <div className="group bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg hover:border-[#9d84ff]/30">
        {/* Image with glass panel */}
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={category.featuredImage || "/placeholder.svg"}
            alt={category.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Glass panel overlay */}
          <div className="absolute inset-x-0 bottom-0 bg-black/40 backdrop-blur-sm p-4">
            <h3 className="text-white text-xl font-bold">{category.title}</h3>
            <p className="text-white/90 text-sm">{category.imageCount} coloring pages</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{category.description}</p>

          {/* Subcategories */}
          <div className="flex flex-wrap gap-2 mb-4">
            {category.subcategories.slice(0, 3).map((subcategory) => (
              <span key={subcategory} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                {subcategory}
              </span>
            ))}
            {category.subcategories.length > 3 && (
              <span className="text-xs text-gray-500">+{category.subcategories.length - 3} more</span>
            )}
          </div>

          {/* View button */}
          <div className="flex justify-end">
            <span className="text-sm font-medium text-[#9d84ff] flex items-center group-hover:underline">
              View Category <ChevronRight className="h-4 w-4 ml-1" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

