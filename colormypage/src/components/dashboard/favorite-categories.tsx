"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Star, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"

// Mock data - in a real app, this would come from a database
const favoriteCategories = [
  {
    id: "animals",
    title: "Animals",
    imageUrl: "/placeholder.svg?height=300&width=300&text=Animals",
    count: 5,
  },
  {
    id: "dinosaurs",
    title: "Dinosaurs",
    imageUrl: "/placeholder.svg?height=300&width=300&text=Dinosaurs",
    count: 3,
  },
  {
    id: "princess",
    title: "Princesses",
    imageUrl: "/placeholder.svg?height=300&width=300&text=Princesses",
    count: 2,
  },
  {
    id: "fantasy",
    title: "Fantasy",
    imageUrl: "/placeholder.svg?height=300&width=300&text=Fantasy",
    count: 2,
  },
]

export function FavoriteCategories() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {favoriteCategories.map((category) => (
        <div key={category.id} className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
          <Link
            href={`/categories/${category.id}`}
            className="flex items-center p-3 hover:bg-gray-50 transition-colors"
          >
            <div className="relative h-16 w-16 rounded-md overflow-hidden">
              <Image src={category.imageUrl || "/placeholder.svg"} alt={category.title} fill className="object-cover" />
            </div>
            <div className="ml-4 flex-1">
              <h3 className="text-sm font-medium text-gray-900">{category.title}</h3>
              <p className="text-xs text-gray-500">{category.count} saved pages</p>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="ghost" className="rounded-full h-8 w-8 p-0" title="Share">
                <Share2 className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                <span className="sr-only">Share</span>
              </Button>
              <Button size="sm" variant="ghost" className="rounded-full h-8 w-8 p-0" title="Favorited">
                <Star className="h-4 w-4 text-[#9d84ff] fill-[#9d84ff]" />
                <span className="sr-only">Favorited</span>
              </Button>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </div>
          </Link>
        </div>
      ))}

      {favoriteCategories.length === 0 && (
        <div className="text-center py-8 col-span-2">
          <p className="text-gray-500">You haven't favorited any categories yet.</p>
        </div>
      )}
    </div>
  )
}

