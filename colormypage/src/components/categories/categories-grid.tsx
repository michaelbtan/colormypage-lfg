import { CategoryCard } from "@/components/categories/category-card"

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

interface CategoriesGridProps {
  categories: Category[]
}

export function CategoriesGrid({ categories }: CategoriesGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  )
}

