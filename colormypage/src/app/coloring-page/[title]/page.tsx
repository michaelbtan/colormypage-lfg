import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ColoringPageView } from "@/components/coloring-page/coloring-page-view";
import { createClient } from "@/lib/supabase/server";
import { PageBreadcrumbs, createHomeBreadcrumb, createCategoriesBreadcrumb, createCategoryBreadcrumb } from "@/components/navigation/page-breadcrumbs";
import LOGO from "@/assets/logo.png";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ title: string }>;
}): Promise<Metadata> {
  const title = (await params).title;
  const supabase = await createClient();

  const { data: coloring_page, error } = await supabase
    .from("coloring_pages")
    .select("title, description, image_url")
    .eq("title", title)
    .single();

  if (error) {
    console.error("Error fetching coloring page for metadata", error);
    return {
      title: "Coloring Pages Not Found",
      description: "Unable to load coloring page information",
    };
  }

  return {
    title: `Free Printable ${decodeURI(
      coloring_page.title
    )} Coloring Page (PDF)`,
    description: `${coloring_page.description}. Download and print free coloring pages for kids and adults. Perfect for home, school, or therapy.`,
    openGraph: {
      title: `Free Printable ${decodeURI(
        coloring_page.title
      )} Coloring Page (PDF)`,
      description: `${coloring_page.description}. Download and print free coloring pages for kids and adults. Perfect for home, school, or therapy.`,
      type: "article",
      url: `https://colormypage.com/coloring-page/${title}`,
      siteName: "ColorMyPage",
      images: [
        {
          url: coloring_page.image_url || LOGO,
          width: 800,
          height: 600,
          alt: decodeURI(coloring_page.title),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Free Printable ${decodeURI(
        coloring_page.title
      )} Coloring Page (PDF)`,
      description: `${coloring_page.description}. Download and print free coloring pages for kids and adults. Perfect for home, school, or therapy.`,
      images: [coloring_page.image_url || LOGO],
    },
  };
}

export default async function ColoringPagePage({
  params,
}: {
  params: { title: string };
}) {
  const supabase = await createClient();

  const title = (await params).title;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Fetch coloring page data
  const { data: coloringPage } = await supabase
    .from("coloring_pages")
    .select("*")
    .eq("title", title)
    .single();

  if (!coloringPage) {
    notFound();
  }

  // Fetch category information for breadcrumbs
  const { data: categoryData } = await supabase
    .from("coloring_page_categories")
    .select(`
      categories!inner(
        id,
        title
      )
    `)
    .eq("coloring_page_title", coloringPage.title)
    .limit(1)
    .single();

  // Create breadcrumbs
  const breadcrumbs = [
    createHomeBreadcrumb(),
    createCategoriesBreadcrumb(),
  ];

  // Add category breadcrumb if we found one
  if (categoryData?.categories) {
    breadcrumbs.push(createCategoryBreadcrumb(categoryData.categories.title));
  }

  // Add current page
  breadcrumbs.push({ label: decodeURI(coloringPage.title) });

  return (
    <div>
      <PageBreadcrumbs items={breadcrumbs} />
      <ColoringPageView coloringPage={coloringPage} userId={user?.id || null} />
    </div>
  );
}
