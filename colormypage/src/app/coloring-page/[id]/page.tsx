import { notFound } from "next/navigation"
import { ColoringPageView } from "@/components/coloring-page/coloring-page-view"
import { getColoringPageById, getRecommendedColoringPages } from "@/lib/coloring-pages"

export async function generateMetadata({ params }: { params: { id: string } }) {
  const coloringPage = getColoringPageById(params.id)

  if (!coloringPage) {
    return {
      title: "Coloring Page Not Found - ColorMyPage",
      description: "The requested coloring page could not be found.",
    }
  }

  return {
    title: `${coloringPage.title} - ColorMyPage`,
    description: `Download and print the ${coloringPage.title} coloring page for free.`,
  }
}

export default function ColoringPagePage({ params }: { params: { id: string } }) {
  const coloringPage = getColoringPageById(params.id)

  if (!coloringPage) {
    notFound()
  }

  // Get recommended coloring pages
  const recommendedPages = getRecommendedColoringPages(params.id)

  return <ColoringPageView coloringPage={coloringPage} recommendedPages={recommendedPages} />
}

