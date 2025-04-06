import { Heart } from "lucide-react"

interface DashboardStatsProps {
  stats: {
    totalFavorites: number
  }
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <div className="inline-flex items-center bg-[#9d84ff]/10 text-[#9d84ff] px-3 py-1.5 rounded-full">
      <Heart className="h-4 w-4 mr-1.5" />
      <span className="text-sm font-medium">{stats.totalFavorites} favorites</span>
    </div>
  )
}

