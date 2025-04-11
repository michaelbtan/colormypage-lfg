import Link from "next/link"
import { Button } from "@/components/ui/button"
import ColoringPageCard from "./favorite-coloring-page-card"

interface FavoriteColoringPagesProps {
  userId?: string | null
  favoritePages: {
    id: string
    created_at: string
    user_id: string
    coloring_page_id: string
    coloring_pages: {
      id: string
      title: string
      image_url: string
      created_at: string
      description: string
      is_published: boolean
      file_name: string
    }
  }[]
}

export function FavoriteColoringPages({ userId, favoritePages }: FavoriteColoringPagesProps) {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {favoritePages.map((favorite) => (
          <ColoringPageCard
            key={favorite.id}
            page={{
              id: favorite.coloring_page_id,
              title: favorite.coloring_pages.title,
              image_url: favorite.coloring_pages.image_url,
              dateAdded: favorite.created_at,
            }}
            userId={userId}
          />
        ))}
      </div>

      {favoritePages.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">You haven&apos;t favorited any coloring pages yet.</p>
          <Link href="/categories">
            <Button className="mt-4 rounded-full bg-[#9d84ff] hover:bg-[#8a6dff]">Browse Categories</Button>
          </Link>
        </div>
      )}
    </div>
  )
}
