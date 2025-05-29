import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { FavoriteCategories } from "@/components/dashboard/favorite-categories"
import { FavoriteColoringPages } from "@/components/dashboard/favorite-coloring-pages"
import { createClient } from "@/lib/supabase/server"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()


  // Fetch favorite pages and categories
  const { data: favoritePages } = await supabase
    .from("favorited_coloring_pages")
    .select("*, coloring_pages(*)")
    .eq("user_id", user?.id)

  const { data: favoriteCategories } = await supabase
    .from("favorited_categories")
    .select("*, categories(*)")
    .eq("user_id", user?.id)


  // Fetch favorite pages and categories and then total
  const stats = {
    totalFavorites: 12,
  }

  console.log("favoriteCat", favoriteCategories)

  return (
    <div className="space-y-8">
      <DashboardHeader
        title="My Coloring Pages"
        description="Manage your favorite coloring pages and categories"
        userEmail={user?.email || null}
      />

      {/* Favorite Pages Section */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Favorite Coloring Pages</h2>
          <span className="bg-[#9d84ff]/10 text-[#9d84ff] text-sm font-medium px-2.5 py-1 rounded-full">
            {stats.totalFavorites} pages
          </span>
        </div>
        <FavoriteColoringPages favoritePages={favoritePages} userId={user.id || null} />
      </div>

      {/* Favorite Categories Section */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <h2 className="text-xl font-bold mb-6">Favorite Categories</h2>
        <FavoriteCategories favoriteCategories={favoriteCategories} userId={user.id || null} />
      </div>
    </div>
  )
}

