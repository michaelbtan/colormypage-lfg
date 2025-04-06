"use client"

import { Download, Heart, Eye } from "lucide-react"

// Mock data - in a real app, this would come from a database
const recentActivities = [
  {
    id: 1,
    type: "download",
    title: "Dinosaur Coloring Page",
    date: "2023-05-15T10:30:00Z",
  },
  {
    id: 2,
    type: "favorite",
    title: "Princess Castle",
    date: "2023-05-14T15:45:00Z",
  },
  {
    id: 3,
    type: "view",
    title: "Space Exploration",
    date: "2023-05-14T09:20:00Z",
  },
  {
    id: 4,
    type: "download",
    title: "Ocean Animals",
    date: "2023-05-13T14:10:00Z",
  },
  {
    id: 5,
    type: "favorite",
    title: "Jungle Safari",
    date: "2023-05-12T11:05:00Z",
  },
]

export function RecentActivity() {
  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  // Function to get icon based on activity type
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "download":
        return <Download className="h-4 w-4 text-[#5bbce4]" />
      case "favorite":
        return <Heart className="h-4 w-4 text-[#9d84ff]" />
      case "view":
        return <Eye className="h-4 w-4 text-[#ffb380]" />
      default:
        return null
    }
  }

  // Function to get text based on activity type
  const getActivityText = (type: string, title: string) => {
    switch (type) {
      case "download":
        return (
          <>
            Downloaded <span className="font-medium">{title}</span>
          </>
        )
      case "favorite":
        return (
          <>
            Added <span className="font-medium">{title}</span> to favorites
          </>
        )
      case "view":
        return (
          <>
            Viewed <span className="font-medium">{title}</span>
          </>
        )
      default:
        return null
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h2 className="text-lg font-bold text-gray-900 mb-6">Recent Activity</h2>

      <div className="space-y-4">
        {recentActivities.map((activity) => (
          <div key={activity.id} className="flex items-start">
            <div className="bg-gray-100 p-2 rounded-full">{getActivityIcon(activity.type)}</div>
            <div className="ml-3 flex-1">
              <p className="text-sm text-gray-600">{getActivityText(activity.type, activity.title)}</p>
              <p className="text-xs text-gray-400 mt-1">{formatDate(activity.date)}</p>
            </div>
          </div>
        ))}
      </div>

      {recentActivities.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No recent activity to display.</p>
        </div>
      )}
    </div>
  )
}

