import { HeroSection } from "@/components/home/hero-section"
import { CategoriesSection } from "@/components/home/categories-section"
import { NewsletterSection } from "@/components/home/newsletter-section"
import { EasterSection } from "@/components/home/easter-section"

// Sample popular category data
const popularCategories = [
  { id: 1, title: "Animals", imageUrl: "/placeholder.svg?height=550&width=425", imageCount: 48 },
  { id: 2, title: "Flowers", imageUrl: "/placeholder.svg?height=550&width=425", imageCount: 32 },
  { id: 3, title: "Dinosaurs", imageUrl: "/placeholder.svg?height=550&width=425", isFavorited: true, imageCount: 36 },
  { id: 4, title: "Vehicles", imageUrl: "/placeholder.svg?height=550&width=425", imageCount: 38 },
  { id: 5, title: "Princesses", imageUrl: "/placeholder.svg?height=550&width=425", imageCount: 30 },
  { id: 6, title: "Superheroes", imageUrl: "/placeholder.svg?height=550&width=425", imageCount: 40 },
  { id: 7, title: "Holidays", imageUrl: "/placeholder.svg?height=550&width=425", imageCount: 65 },
  { id: 8, title: "Alphabet", imageUrl: "/placeholder.svg?height=550&width=425", imageCount: 26 },
]

// Sample new category data
const newCategories = [
  { id: 101, title: "Space", imageUrl: "/placeholder.svg?height=550&width=425", imageCount: 28 },
  { id: 102, title: "Ocean Life", imageUrl: "/placeholder.svg?height=550&width=425", imageCount: 34 },
  { id: 103, title: "Fantasy", imageUrl: "/placeholder.svg?height=550&width=425", imageCount: 45 },
  { id: 104, title: "Mandalas", imageUrl: "/placeholder.svg?height=550&width=425", isFavorited: true, imageCount: 50 },
  { id: 105, title: "Sports", imageUrl: "/placeholder.svg?height=550&width=425", imageCount: 22 },
  { id: 106, title: "Food", imageUrl: "/placeholder.svg?height=550&width=425", imageCount: 18 },
  { id: 107, title: "Insects", imageUrl: "/placeholder.svg?height=550&width=425", imageCount: 24 },
  { id: 108, title: "Seasons", imageUrl: "/placeholder.svg?height=550&width=425", imageCount: 30 },
]

export default function Page() {
  return (
    <div>
      <HeroSection />
      <CategoriesSection title="Trending Coloring Pages" categories={popularCategories} viewAllLink="/categories/popular" />
      <NewsletterSection />
      <CategoriesSection title="New Coloring Pages" categories={newCategories} viewAllLink="/categories/new" />
      {/* <EasterSection /> */}
    </div>
  )
}

