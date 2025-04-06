import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { Category } from "@/components/categories/categories-grid"

interface FeaturedCategoryProps {
  category: Category
}

export function FeaturedCategory({ category }: FeaturedCategoryProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Image */}
        <div className="relative h-64 md:h-auto">
          <Image
            src={category.featuredImage || "/placeholder.svg"}
            alt={category.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 flex flex-col justify-center">
          <div className="mb-2">
            <span className="inline-block bg-[#9d84ff]/10 text-[#9d84ff] text-xs font-medium px-2.5 py-1 rounded-full">
              Featured
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{category.title}</h2>
          <p className="text-gray-600 mb-6">{category.description}</p>

          {/* Stats */}
          <div className="flex gap-4 mb-6">
            <div>
              <p className="text-2xl font-bold text-[#9d84ff]">{category.imageCount}</p>
              <p className="text-sm text-gray-500">Coloring Pages</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#9d84ff]">{category.subcategories.length}</p>
              <p className="text-sm text-gray-500">Subcategories</p>
            </div>
          </div>

          {/* Subcategories */}
          <div className="flex flex-wrap gap-2 mb-6">
            {category.subcategories.map((subcategory) => (
              <span key={subcategory} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                {subcategory}
              </span>
            ))}
          </div>

          <Button asChild className="rounded-full bg-[#9d84ff] hover:bg-[#8a6dff] w-full md:w-auto">
            <Link href={`/categories/${category.id}`}>Explore {category.title} Coloring Pages</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

