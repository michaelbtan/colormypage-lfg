import { notFound } from "next/navigation"
import { ColoringPageView } from "@/components/coloring-page/coloring-page-view"
import { createClient } from "@/lib/supabase/server"

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

