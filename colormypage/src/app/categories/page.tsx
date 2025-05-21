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

  // Fetch the initial categories from the database
  const { data: categories, count } = await supabase
    .from("categories")
    .select("id, created_at, title, image_url, image_count", { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(0, 11); // Get first 12 items (0-11)

  console.log("Fetched categories:", categories);

  // Determine if there are more categories to load
  const hasMore = count ? (categories?.length || 0) < count : false;

  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">All Categories</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content - categories grid */}
          <div className="w-full lg:w-3/4">
            <InfiniteCategoriesGrid
              initialCategories={categories || []}
              initialHasMore={hasMore}
              totalCount={count || 0}
            />
          </div>

          {/* Sidebar - Ad space */}
          <div className="w-full lg:w-1/4">
            <div className="sticky top-24">
              <AdPlaceholder />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}