import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CategoryBlog } from "@/components/categories/category-blog";
import { ColoringPageGrid } from "@/components/categories/coloring-page-grid";
import { createClient } from "@/lib/supabase/server";
import LOGO from "@/assets/logo.png";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ title: string }>;
}): Promise<Metadata> {
  const title = (await params).title;
  const supabase = await createClient();

  const { data: category, error } = await supabase
    .from("categories")
    .select("title, description, cover_image_url, banner_image_url")
    .eq("title", title)
    .single();

  if (error) {
    console.error("Error fetching category for metadata", error);
    return {
      title: "Category Not Found",
      description: "Unable to load category information",
    };
  }

  return {
    title: `Free Printable ${decodeURI(category.title)} Coloring Pages (PDF)`,
    description: `${category.description}. Download and print free coloring pages for kids and adults. Perfect for home, school, or therapy.`,
    openGraph: {
      title: `Free Printable ${decodeURI(category.title)} Coloring Pages (PDF)`,
      description: `${category.description}. Download and print free coloring pages for kids and adults. Perfect for home, school, or therapy.`,
      type: "website",
      url: `https://colormypage.com/categories/${title}`,
      siteName: "ColorMyPage",
      images: [
        {
          url: category.banner_image_url || LOGO,
          width: 1200,
          height: 630,
          alt: decodeURI(category.title),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Free Printable ${decodeURI(category.title)} Coloring Pages (PDF)`,
      description: `${category.description}. Download and print free coloring pages for kids and adults. Perfect for home, school, or therapy.`,
      images: [category.banner_image_url || category.cover_image_url || LOGO],
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: { title: string };
}) {
  const { title } = params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Fetch category data
  const { data: category } = await supabase
    .from("categories")
    .select("*")
    .eq("title", title)
    .single();

  if (!category) {
    notFound();
  }

  // Check if category is favorited by the current user
  let isFavorited = false;
  if (user) {
    const { data: favorited } = await supabase
      .from("favorited_categories")
      .select("*")
      .eq("category_id", category.id)
      .eq("user_id", user.id)
      .single();
    isFavorited = !!favorited;
  }

  // Fetch coloring pages for the category with related coloring_pages data
  const { data: pages, count } = await supabase
    .from("coloring_page_categories")
    .select(
      `
    *,
    coloring_pages:coloring_page_id(
      id,
      title,
      description,
      image_url,
      file_name,
      is_published
    )
  `,
      { count: "exact" }
    )
    .eq("category_id", category.id)
    .order("created_at", { ascending: false })
    .range(0, 11); // Get first 12 items (0-11)

  // Calculate if there are more pages
  const hasMore = count ? pages.length < count : false;

  return (
    <div>
      <CategoryBlog
        id={category.id}
        title={category.title}
        description={category.description}
        imageCount={category.image_count}
        featuredImage={category.cover_image_url || undefined}
        categoryFavorited={isFavorited}
        userId={user?.id || null}
        createdAt={category.created_at}
        author={category.author || "Jasmine"}
      />

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content - coloring pages grid */}
          <div className="w-full lg:w-4/5">
            <ColoringPageGrid
              userId={user?.id || null}
              categoryId={category.id}
              initialPages={pages || []}
              initialHasMore={hasMore}
              totalPages={count || 0}
            />
          </div>

          {/* Sidebar - Our Favorites (hidden on mobile) */}
          {/* Add the ad placeholder above the favorites */}
          {/* <div className="hidden lg:block lg:w-1/5">
            <AdPlaceholder />
            <div className="mt-6">
              <OurFavorites categoryId={categoryId} favorites={favorites} />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
