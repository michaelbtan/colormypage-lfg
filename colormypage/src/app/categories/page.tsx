import { InfiniteCategoriesGrid, type Category } from "@/components/categories/infinite-categories-grid"
import { AdPlaceholder } from "@/components/ad-placeholder"

// Mock categories data for initial load
const initialCategories: Category[] = [
  {
    id: "animals",
    title: "Animals",
    description: "Explore our collection of animal coloring pages featuring pets, wildlife, and more.",
    imageCount: 48,
    featuredImage: "/placeholder.svg?height=300&width=300&text=Animals",
    subcategories: ["Farm Animals", "Pets", "Wildlife", "Sea Creatures", "Birds"],
    isPopular: true,
  },
  {
    id: "dinosaurs",
    title: "Dinosaurs",
    description: "Discover prehistoric creatures with our dinosaur coloring pages.",
    imageCount: 36,
    featuredImage: "/placeholder.svg?height=300&width=300&text=Dinosaurs",
    subcategories: ["T-Rex", "Triceratops", "Stegosaurus", "Pterodactyl"],
    isPopular: true,
  },
  {
    id: "easter",
    title: "Easter",
    description: "Celebrate Easter with our collection of bunnies, eggs, and spring-themed coloring pages.",
    imageCount: 42,
    featuredImage: "/placeholder.svg?height=300&width=300&text=Easter",
    subcategories: ["Easter Bunny", "Easter Eggs", "Easter Baskets", "Spring Flowers"],
    isSeasonal: true,
  },
  {
    id: "princess",
    title: "Princesses",
    description: "Magical princess coloring pages for fairy tale lovers.",
    imageCount: 30,
    featuredImage: "/placeholder.svg?height=300&width=300&text=Princesses",
    subcategories: ["Disney Princesses", "Fairy Tales", "Castles", "Prince & Princess"],
    isPopular: true,
  },
  {
    id: "vehicles",
    title: "Vehicles",
    description: "Cars, trucks, planes, and more for vehicle enthusiasts.",
    imageCount: 38,
    featuredImage: "/placeholder.svg?height=300&width=300&text=Vehicles",
    subcategories: ["Cars", "Trucks", "Construction", "Airplanes", "Boats"],
    isPopular: true,
  },
  {
    id: "alphabet",
    title: "Alphabet",
    description: "Learn letters with our alphabet coloring pages.",
    imageCount: 26,
    featuredImage: "/placeholder.svg?height=300&width=300&text=Alphabet",
    subcategories: ["Letters A-Z", "Numbers", "Words", "Educational"],
    isEducational: true,
  },
  {
    id: "flowers",
    title: "Flowers",
    description: "Beautiful floral designs for nature lovers.",
    imageCount: 32,
    featuredImage: "/placeholder.svg?height=300&width=300&text=Flowers",
    subcategories: ["Roses", "Tulips", "Daisies", "Bouquets", "Gardens"],
  },
  {
    id: "superheroes",
    title: "Superheroes",
    description: "Action-packed superhero coloring pages for little heroes.",
    imageCount: 40,
    featuredImage: "/placeholder.svg?height=300&width=300&text=Superheroes",
    subcategories: ["Marvel", "DC Comics", "Avengers", "Justice League"],
    isPopular: true,
  },
  {
    id: "holidays",
    title: "Holidays",
    description: "Celebrate special occasions with holiday-themed coloring pages.",
    imageCount: 65,
    featuredImage: "/placeholder.svg?height=300&width=300&text=Holidays",
    subcategories: ["Christmas", "Halloween", "Thanksgiving", "Valentine's Day", "4th of July"],
    isSeasonal: true,
  },
  {
    id: "fantasy",
    title: "Fantasy",
    description: "Dragons, unicorns, fairies, and magical creatures.",
    imageCount: 45,
    featuredImage: "/placeholder.svg?height=300&width=300&text=Fantasy",
    subcategories: ["Dragons", "Unicorns", "Fairies", "Mermaids", "Wizards"],
    isPopular: true,
  },
  {
    id: "space",
    title: "Space",
    description: "Explore the cosmos with space-themed coloring pages.",
    imageCount: 28,
    featuredImage: "/placeholder.svg?height=300&width=300&text=Space",
    subcategories: ["Planets", "Astronauts", "Rockets", "Aliens", "Stars"],
    isEducational: true,
  },
  {
    id: "mandalas",
    title: "Mandalas",
    description: "Intricate mandala designs for relaxation and mindfulness.",
    imageCount: 50,
    featuredImage: "/placeholder.svg?height=300&width=300&text=Mandalas",
    subcategories: ["Simple", "Intermediate", "Advanced", "Geometric", "Floral"],
    isPopular: true,
  },
]

export const metadata = {
  title: "Browse All Categories - ColorMyPage",
  description: "Explore our complete collection of coloring page categories for all ages and interests.",
}

export default function CategoriesPage() {
  // In a real app, this would fetch the initial categories from an API
  const hasMore = true // Indicate that there are more categories to load

  return (
    <div className="bg-gray-50 py-8">
      <div className="container">
        <h1 className="text-3xl font-bold mb-8">All Categories</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content - categories grid */}
          <div className="w-full lg:w-3/4">
            <InfiniteCategoriesGrid initialCategories={initialCategories} initialHasMore={hasMore} />
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

