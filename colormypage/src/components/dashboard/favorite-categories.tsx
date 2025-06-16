"use client"

import { FavoriteCategoryCard } from "./favorite-category-card"

interface Category {
  id: string
  title: string
  image_url: string
  description: string
  image_count: number
}

interface FavoriteCategory {
  id: string
  created_at: string
  user_id: string
  category_id: string
  categories: Category
}

interface FavoriteCategoriesProps {
  favoriteCategories: FavoriteCategory[]
  userId: string | null
}

export function FavoriteCategories({ favoriteCategories, userId }: FavoriteCategoriesProps) {
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {favoriteCategories.map((category) => (
        <FavoriteCategoryCard
          key={category.id}
          category_id={category.category_id}
          category={category.categories}
          userId={userId}
        />
      ))}

      {favoriteCategories.length === 0 && (
        <div className="text-center py-8 col-span-2">
          <p className="text-gray-500">You haven&apos;t favorited any categories yet.</p>
        </div>
      )}
    </div>
  )
}
