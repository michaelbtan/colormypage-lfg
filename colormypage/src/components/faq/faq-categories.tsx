"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

const categories = [
  { id: "general", name: "General Questions" },
  { id: "account", name: "Account & Membership" },
  { id: "downloading", name: "Downloading & Printing" },
  { id: "usage", name: "Using Our Coloring Pages" },
  { id: "support", name: "Technical Support" },
]

export function FaqCategories() {
  const [activeCategory, setActiveCategory] = useState("general")

  const scrollToCategory = (categoryId: string) => {
    setActiveCategory(categoryId)

    // Find the heading element and scroll to it
    const element = document.getElementById(`category-${categoryId}`)
    if (element) {
      const yOffset = -100 // Adjust this value as needed for your header height
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: "smooth" })
    }
  }

  return (
    <div className="space-y-2">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => scrollToCategory(category.id)}
          className={cn(
            "w-full text-left px-4 py-2 rounded-lg transition-colors",
            activeCategory === category.id
              ? "bg-[#9d84ff]/10 text-[#9d84ff] font-medium"
              : "hover:bg-gray-100 text-gray-700",
          )}
        >
          {category.name}
        </button>
      ))}
    </div>
  )
}

