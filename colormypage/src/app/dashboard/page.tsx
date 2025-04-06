import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { FavoriteCategories } from "@/components/dashboard/favorite-categories"
import { FavoritePages } from "@/components/dashboard/favorite-pages"

export default function DashboardPage() {
  // TEMPORARY: Using mock data for development
  // In production, this would fetch real user data

  // Mock user for UI display purposes
  const mockUser = {
    id: "mock-user-id",
    email: "demo@colormypage.com",
  }

  // Simplified stats data - only keeping favorites count
  const stats = {
    totalFavorites: 12,
  }

  return (
    <div className="space-y-8">
      <DashboardHeader
        title="My Coloring Pages"
        description="Manage your favorite coloring pages and categories"
        user={mockUser}
      />

      {/* Favorite Pages Section */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Favorite Coloring Pages</h2>
          <span className="bg-[#9d84ff]/10 text-[#9d84ff] text-sm font-medium px-2.5 py-1 rounded-full">
            {stats.totalFavorites} pages
          </span>
        </div>
        <FavoritePages />
      </div>

      {/* Favorite Categories Section */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <h2 className="text-xl font-bold mb-6">Favorite Categories</h2>
        <FavoriteCategories />
      </div>
    </div>
  )
}

