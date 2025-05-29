import { InfiniteCategoriesGrid } from "@/components/categories/infinite-categories-grid";
import { createClient } from "@/lib/supabase/server";
import { AdPlaceholder } from "@/components/ad-placeholder";

export const metadata = {
  title: "Browse All Categories - ColorMyPage",
  description:
    "Explore our complete collection of coloring page categories for all ages and interests.",
};

export default async function CategoriesPage() {
  const supabase = await createClient();

  // Get the current user
  const { data: { user }} = await supabase.auth.getUser();

  // Fetch the initial categories from the database
  // Fetch categories from Supabase
  const { data: categoriesData, count } = await supabase
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

  // Determine if there are more categories to load
  const hasMore = count ? (categories?.length || 0) < count : false;

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">All Categories</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content - categories grid */}
          <div className="w-full lg:w-3/4">
            <InfiniteCategoriesGrid
              initialCategories={categories || []}
              initialHasMore={hasMore}
              totalCount={count || 0}
              userId={user?.id || null}
            />
          </div>

          {/* Sidebar - Ad space, add in when we have ads */}
          {/* <div className="w-full lg:w-1/4">
            <div className="sticky top-24">
              <AdPlaceholder />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}