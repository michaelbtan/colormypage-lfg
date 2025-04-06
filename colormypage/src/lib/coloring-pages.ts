export interface ColoringPage {
  id: string
  title: string
  description?: string
  imageUrl: string
  downloadUrl: string
  tags: string[]
  categoryId: string
  categoryName: string
  isFeatured?: boolean
}

// Mock function to get a coloring page by ID
export function getColoringPageById(id: string): ColoringPage | null {
  // In a real app, this would fetch from an API or database
  const [categoryId, pageId] = id.split("-")

  if (!categoryId || !pageId) return null

  return {
    id,
    title: `${categoryId.charAt(0).toUpperCase() + categoryId.slice(1)} Coloring Page ${pageId}`,
    description: `This beautiful ${categoryId} coloring page is perfect for kids and adults alike. Print it out and start coloring!`,
    imageUrl: `/placeholder.svg?height=550&width=425&text=${categoryId}-${pageId}`,
    downloadUrl: `#download-${id}`,
    tags: ["kids", categoryId, Number(pageId) % 2 === 0 ? "easy" : "intermediate"],
    categoryId,
    categoryName: categoryId.charAt(0).toUpperCase() + categoryId.slice(1),
    isFeatured: Number(pageId) < 5,
  }
}

// Mock function to get recommended coloring pages
export function getRecommendedColoringPages(currentId: string, limit = 5): ColoringPage[] {
  // In a real app, this would fetch from an API or database
  const [categoryId] = currentId.split("-")

  if (!categoryId) return []

  return Array.from({ length: limit }, (_, i) => ({
    id: `${categoryId}-recommended-${i + 1}`,
    title: `${categoryId.charAt(0).toUpperCase() + categoryId.slice(1)} Coloring Page ${i + 10}`,
    imageUrl: `/placeholder.svg?height=550&width=425&text=${categoryId}-rec-${i + 1}`,
    downloadUrl: `#download-${categoryId}-recommended-${i + 1}`,
    tags: ["recommended", categoryId, i % 2 === 0 ? "popular" : "new"],
    categoryId,
    categoryName: categoryId.charAt(0).toUpperCase() + categoryId.slice(1),
    isFeatured: false,
  }))
}

