"use client"

import Image from "next/image"
import Link from "next/link"
import { Share2, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

// Mock data - in a real app, this would come from a database
const favoritePages = [
  {
    id: "page-1",
    title: "Dinosaur T-Rex",
    category: "Dinosaurs",
    imageUrl: "/placeholder.svg?height=550&width=425&text=T-Rex",
    dateAdded: "2023-05-10T14:30:00Z",
  },
  {
    id: "page-2",
    title: "Princess Castle",
    category: "Princesses",
    imageUrl: "/placeholder.svg?height=550&width=425&text=Castle",
    dateAdded: "2023-05-08T09:15:00Z",
  },
  {
    id: "page-3",
    title: "Lion King",
    category: "Animals",
    imageUrl: "/placeholder.svg?height=550&width=425&text=Lion",
    dateAdded: "2023-05-05T16:45:00Z",
  },
  {
    id: "page-4",
    title: "Unicorn Magic",
    category: "Fantasy",
    imageUrl: "/placeholder.svg?height=550&width=425&text=Unicorn",
    dateAdded: "2023-05-03T11:20:00Z",
  },
]

export function FavoritePages() {
  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {favoritePages.map((page) => (
          <div key={page.id} className="group relative">
            <Link href={`/coloring-page/${page.id}`} className="block">
              <div className="aspect-[8.5/11] relative overflow-hidden rounded-lg border border-gray-200 bg-white">
                <Image src={page.imageUrl || "/placeholder.svg"} alt={page.title} fill className="object-cover" />

                {/* Action buttons - always visible */}
                <div className="absolute top-3 right-3 flex gap-2">
                  <Link href={`/coloring-page/${page.id}?share=true`} onClick={(e) => e.stopPropagation()}>
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-full bg-white/80 backdrop-blur-sm text-gray-700 border-white/40 hover:bg-white/90 h-8 w-8 p-0"
                    >
                      <Share2 className="h-4 w-4" />
                      <span className="sr-only">Share</span>
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-full bg-[#9d84ff] text-white border-[#9d84ff]/40 hover:bg-[#8a6dff] h-8 w-8 p-0"
                  >
                    <Star className="h-4 w-4 fill-white" />
                    <span className="sr-only">Favorited</span>
                  </Button>
                </div>
              </div>
            </Link>

            <div className="mt-2">
              <h3 className="text-sm font-medium text-gray-900 truncate">{page.title}</h3>
              <p className="text-xs text-gray-500">Added {formatDate(page.dateAdded)}</p>
            </div>
          </div>
        ))}
      </div>

      {favoritePages.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">You haven't favorited any coloring pages yet.</p>
          <Link href="/categories">
            <Button className="mt-4 rounded-full bg-[#9d84ff] hover:bg-[#8a6dff]">Browse Categories</Button>
          </Link>
        </div>
      )}
    </div>
  )
}

