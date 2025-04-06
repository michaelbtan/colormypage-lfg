import { CategoryCard } from "@/components/category-card"
import { AdPlaceholder } from "@/components/ad-placeholder"

// Mock data for Easter-related categories
const easterCategories = [
  {
    id: "easter-bunny",
    title: "Easter Bunny",
    description: "Cute and fun Easter bunny coloring pages for kids of all ages.",
    imageCount: 24,
    featuredImage: "/placeholder.svg?height=300&width=300&text=Easter+Bunny",
    subcategories: ["Cartoon Bunnies", "Realistic Rabbits", "Bunny Scenes"],
  },
  {
    id: "easter-eggs",
    title: "Easter Eggs",
    description: "Beautiful Easter egg designs and patterns to color and decorate.",
    imageCount: 32,
    featuredImage: "/placeholder.svg?height=300&width=300&text=Easter+Eggs",
    subcategories: ["Decorated Eggs", "Egg Patterns", "Egg Hunt Scenes"],
  },
  {
    id: "easter-religious",
    title: "Religious Easter",
    description: "Religious-themed Easter coloring pages celebrating the resurrection.",
    imageCount: 18,
    featuredImage: "/placeholder.svg?height=300&width=300&text=Religious+Easter",
    subcategories: ["Cross", "Jesus", "Bible Scenes", "Church"],
  },
  {
    id: "easter-baskets",
    title: "Easter Baskets",
    description: "Easter basket coloring pages filled with eggs, candy, and treats.",
    imageCount: 15,
    featuredImage: "/placeholder.svg?height=300&width=300&text=Easter+Baskets",
    subcategories: ["Filled Baskets", "Empty Baskets", "Basket Designs"],
  },
  {
    id: "easter-chicks",
    title: "Easter Chicks",
    description: "Adorable baby chick coloring pages perfect for Easter.",
    imageCount: 20,
    featuredImage: "/placeholder.svg?height=300&width=300&text=Easter+Chicks",
    subcategories: ["Baby Chicks", "Chicks with Eggs", "Cartoon Chicks"],
  },
  {
    id: "easter-flowers",
    title: "Easter Flowers",
    description: "Spring flowers and Easter-themed floral coloring pages.",
    imageCount: 22,
    featuredImage: "/placeholder.svg?height=300&width=300&text=Easter+Flowers",
    subcategories: ["Lilies", "Tulips", "Daffodils", "Spring Bouquets"],
  },
  {
    id: "easter-scenes",
    title: "Easter Scenes",
    description: "Complete Easter scenes with bunnies, eggs, baskets and more.",
    imageCount: 16,
    featuredImage: "/placeholder.svg?height=300&width=300&text=Easter+Scenes",
    subcategories: ["Egg Hunts", "Easter Morning", "Spring Scenes"],
  },
  {
    id: "easter-crafts",
    title: "Easter Crafts",
    description: "Easter-themed craft templates and activity coloring pages.",
    imageCount: 14,
    featuredImage: "/placeholder.svg?height=300&width=300&text=Easter+Crafts",
    subcategories: ["Paper Crafts", "Decorations", "Cards"],
  },
]

export const metadata = {
  title: "Easter Coloring Page Categories - ColorMyPage",
  description:
    "Browse our collection of Easter coloring page categories including bunnies, eggs, religious themes, and more.",
}

export default function EasterCategoriesPage() {
  return (
    <div className="bg-gray-50">
      {/* Easter Topic Hero Banner */}
      <div className="relative bg-gradient-to-r from-[#e4a5bd] to-[#ffb380] text-white py-12">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">Easter Coloring Pages</h1>
          <p className="text-xl max-w-2xl">
            Explore our collection of Easter coloring page categories featuring bunnies, eggs, religious themes, and
            more spring-inspired designs!
          </p>
        </div>
      </div>

      <div className="container py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content - categories grid */}
          <div className="w-full lg:w-3/4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {easterCategories.map((category) => (
                <CategoryCard
                  key={category.id}
                  id={category.id}
                  title={category.title}
                  imageUrl={category.featuredImage}
                  imageCount={category.imageCount}
                  onFavorite={(id) => console.log(`Toggled favorite for category ${id}`)}
                  onShare={(id) => console.log(`Shared category ${id}`)}
                />
              ))}
            </div>
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
  )
}

