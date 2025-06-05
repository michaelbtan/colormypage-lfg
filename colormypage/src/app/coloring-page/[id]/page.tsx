import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ColoringPageView } from "@/components/coloring-page/coloring-page-view"
import { createClient } from "@/lib/supabase/server"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const id = (await params).id
  const supabase = await createClient()

  const { data: coloring_page, error } = await supabase
    .from("coloring_pages")
    .select("title, description")
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching coloring page for metadata", error)
    return {
      title: "Coloring Pages Not Found",
      description: "Unable to load coloring page information",
    }
  }

  return {
    title: coloring_page.title,
    description: coloring_page.description,
    openGraph: {
      title: coloring_page.title,
      description: coloring_page.description,
      type: "article",
      url: `https://colormypage.com/coloring-page/${id}`,
      siteName: "ColorMyPage",
      images: [
        {
          url: `https://colormypage.com/api/coloring-pages/${id}/image`,
          width: 800,
          height: 600,
          alt: coloring_page.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: coloring_page.title,
      description: coloring_page.description,
      images: [`https://colormypage.com/api/coloring-pages/${id}/image`],
    },
  }
}

export default async function ColoringPagePage({ params }: { params: { id: string } }) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Fetch coloring page data
  const { data: coloringPage } = await supabase
    .from("coloring_pages")
    .select("*")
    .eq("id", params.id)
    .single()

  if (!coloringPage) {
    notFound()
  }

  return <ColoringPageView coloringPage={coloringPage} userId={user?.id || null} />
}

