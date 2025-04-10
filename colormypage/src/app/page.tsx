import { HeroSection } from "@/components/home/hero-section"
import { CategoriesSection } from "@/components/home/categories-section"
import { NewsletterSection } from "@/components/home/newsletter-section"
// import { EasterSection } from "@/components/home/easter-section"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"

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

const easterPages = [
  {
    id: "easter-bunny",
    title: "Easter Bunny Coloring Pages",
    imageUrl: "/placeholder.svg?height=300&width=400&text=Easter+Bunny+Coloring+Pages",
    imageCount: 24,
  },
  {
    id: "easter-eggs",
    title: "Easter Egg Templates",
    imageUrl: "/placeholder.svg?height=300&width=400&text=Easter+Egg+Templates",
    imageCount: 18,
  },
  {
    id: "easter-disney",
    title: "Disney Easter Coloring Pages",
    imageUrl: "/placeholder.svg?height=300&width=400&text=Disney+Easter+Coloring+Pages",
    imageCount: 15,
  },
  {
    id: "easter-religious",
    title: "Religious Easter Pages",
    imageUrl: "/placeholder.svg?height=300&width=400&text=Religious+Easter+Pages",
    imageCount: 12,
  },
  {
    id: "easter-spring",
    title: "Spring Easter Designs",
    imageUrl: "/placeholder.svg?height=300&width=400&text=Spring+Easter+Designs",
    imageCount: 20,
  },
]

export default async function Home() {
  const supabase = await createClient()

  // Get the current user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Fetch categories from Supabase
  const { data: categoriesData } = await supabase
    .from("categories")
    .select("")
    .order("created_at", { ascending: false })
    .limit(8)

  let categories = categoriesData || []

  // Only check for favorites if user is logged in
  if (user) {
    // Get category IDs from the fetched categories
    const categoryIds = categories.map((category) => category.id)

    // Fetch only the favorited categories for the current user that match our category list
    const { data: favoritedCategories } = await supabase
      .from("favorited_categories")
      .select("category_id")
      .eq("user_id", user.id)
      .in("category_id", categoryIds)

    // Create a set of favorited category IDs for faster lookup
    const favoritedCategoryIds = new Set(favoritedCategories?.map((item) => item.category_id) || [])

    // Map through categories and add isFavorited flag
    categories = categories.map((category) => ({
      ...category,
      isFavorited: favoritedCategoryIds.has(category.id),
    }))
  } else {
    // If no user is logged in, mark all as not favorited
    categories = categories.map((category) => ({
      ...category,
      isFavorited: false,
    }))
  }

  console.log("Categories with favorited status:", categories)

  return (
    <div>
      <HeroSection />
      <CategoriesSection title="Trending Coloring Pages" categories={categories} userId={user.id} viewAllLink="/categories" />
      <NewsletterSection />
      <CategoriesSection title="New Coloring Pages" categories={newCategories} viewAllLink="/categories" />
      {/* <EasterSection easterPages={easterPages} /> */}
    </div>
  )
}
