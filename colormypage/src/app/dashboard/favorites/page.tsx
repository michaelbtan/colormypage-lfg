import { getSession } from "@/lib/auth"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { FavoriteTabs } from "@/components/dashboard/favorite-tabs"

export default async function FavoritesPage() {
  const session = await getSession()

  return (
    <div className="space-y-8">
      <DashboardHeader
        title="My Favorites"
        description="Manage your favorite categories and coloring pages."
        user={session?.user}
      />

      <FavoriteTabs />
    </div>
  )
}

