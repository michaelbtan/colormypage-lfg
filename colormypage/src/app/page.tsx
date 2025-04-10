import { HeroSection } from "@/components/home/hero-section"
import { CategoriesSection } from "@/components/home/categories-section"
import { NewsletterSection } from "@/components/home/newsletter-section"
// import { EasterSection } from "@/components/home/easter-section"
import { createClient } from "@/lib/supabase/server"

export default async function Home() {
  const supabase = await createClient()

  // Get the current user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Fetch categories from Supabase
  const { data: categoriesData } = await supabase
    .from("categories")
    .select("id, created_at, title, image_url, image_count")
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
      <CategoriesSection title="Trending Coloring Pages" categories={categories} userId={user?.id || null} viewAllLink="/categories" />
      <NewsletterSection />
      <CategoriesSection title="New Coloring Pages" categories={categories} userId={user?.id || null} viewAllLink="/categories" />
      {/* <EasterSection easterPages={easterPages} /> */}
    </div>
  )
}
