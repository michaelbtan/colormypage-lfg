import { InfiniteCategoriesGrid } from "@/components/categories/infinite-categories-grid";
import { createClient } from "@/lib/supabase/server";
import { AdPlaceholder } from "@/components/ad-placeholder";

export const metadata = {
  title: "Browse All Coloring Page Categories",
  description:
    "Explore our complete collection of coloring page categories for all ages and interests.",
};

export default async function CategoriesPage() {
  const supabase = await createClient();

  // Get the current user
  const { data: { user }} = await supabase.auth.getUser();

  // Fetch the initial categories from the database
  const { data: categoriesData, count } = await supabase
    .from("categories")
    .select("id, created_at, title, image_url, image_count")
    .order("created_at", { ascending: false })
    .limit(8);

  console.log('COUNT+++', count);

  let categories = categoriesData || [];

  // Only check for favorites if user is logged in
  if (user) {
    const categoryIds = categories.map((category) => category.id);

    const { data: favoritedCategories } = await supabase
      .from("favorited_categories")
      .select("category_id")
      .eq("user_id", user.id)
      .in("category_id", categoryIds);

    const favoritedCategoryIds = new Set(favoritedCategories?.map((item) => item.category_id) || []);

    categories = categories.map((category) => ({
      ...category,
      categoryFavorited: favoritedCategoryIds.has(category.id),
    }));
  } else {
    categories = categories.map((category) => ({
      ...category,
      categoryFavorited: false,
    }));
  }

  const hasMore = count ? (categories?.length || 0) < count : false;

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-4">All Categories</h1>

        <p className="text-lg text-gray-700 mb-8">
          Discover a world of free downloadable coloring pages at ColorMyPage! Whether you’re looking for fun activities for kids, creative stress relief for adults, or unique designs to spark your imagination, our collection has something for everyone. All pages are available for instant download, so you can start coloring right away—anytime, anywhere.
        </p>

        <div className="flex flex-col lg:flex-row gap-8">
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