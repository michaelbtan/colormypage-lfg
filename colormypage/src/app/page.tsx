import { ImageCarousel } from "@/components/home/image-carousel"
import { CategoriesSection } from "@/components/home/categories-section"
import { NewsletterSection } from "@/components/home/newsletter-section"
// import { EasterSection } from "@/components/home/easter-section"
import { createClient } from "@/lib/supabase/server"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Printable Coloring Pages for Kids & Adults",
  description: "Discover thousands of high-quality, free printable coloring pages. Perfect for kids, adults, teachers, and parents. Download instantly and start coloring today!",
  openGraph: {
    title: "Free Printable Coloring Pages for Kids & Adults",
    description: "Discover thousands of high-quality, free printable coloring pages. Perfect for kids, adults, teachers, and parents. Download instantly and start coloring today!",
    type: "website",
    url: "https://colormypage.com",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "ColorMyPage - Free Printable Coloring Pages",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Printable Coloring Pages for Kids & Adults",
    description: "Discover thousands of high-quality, free printable coloring pages. Perfect for kids, adults, teachers, and parents. Download instantly and start coloring today!",
    images: ["/logo.png"],
  },
}

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
      categoryFavorited: favoritedCategoryIds.has(category.id),
    }))
  } else {
    // If no user is logged in, mark all as not favorited
    categories = categories.map((category) => ({
      ...category,
      categoryFavorited: false,
    }))
  }

  return (
    <div>
      <ImageCarousel />
      <CategoriesSection
        title="Trending Coloring Pages"
        categories={categories}
        userId={user?.id || null}
        viewAllLink="/categories"
      />
      <NewsletterSection />
      <CategoriesSection
        title="New Coloring Pages"
        categories={categories}
        userId={user?.id || null}
        viewAllLink="/categories"
      />
      {/* <EasterSection easterPages={easterPages} /> */}
    </div>
  )
}
