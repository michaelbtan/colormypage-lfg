import { CategoryCard } from "@/components/category-card"
import { AdPlaceholder } from "@/components/ad-placeholder"

// Mock data for Halloween-related categories
const halloweenCategories = [
  {
    id: "halloween-pumpkins",
    title: "Pumpkins & Jack-o'-lanterns",
    description: "Spooky and fun pumpkin coloring pages for Halloween.",
    imageCount: 28,
    featuredImage: "/placeholder.svg?height=300&width=300&text=Pumpkins",
    subcategories: ["Jack-o'-lanterns", "Carved Pumpkins", "Pumpkin Patches"],
  },
  {
    id: "halloween-ghosts",
    title: "Ghosts",
    description: "Spooky ghost coloring pages for Halloween fun.",
    imageCount: 22,
    featuredImage: "/placeholder.svg?height=300&width=300&text=Ghosts",
    subcategories: ["Friendly Ghosts", "Spooky Ghosts", "Cartoon Ghosts"],
  },
  {
    id: "halloween-witches",
    title: "Witches",
    description: "Witch coloring pages with broomsticks, cauldrons, and more.",
    imageCount: 24,
    featuredImage: "/placeholder.svg?height=300&width=300&text=Witches",
    subcategories: ["Witch Hats", "Broomsticks", "Cauldrons", "Spells"],
  },
  {
    id: "halloween-monsters",
    title: "Monsters",
    description: "Scary and silly monster coloring pages for Halloween.",
    imageCount: 30,
    featuredImage: "/placeholder.svg?height=300&width=300&text=Monsters",
    subcategories: ["Frankenstein", "Vampires", "Werewolves", "Zombies"],
  },
  {
    id: "halloween-skeletons",
    title: "Skeletons & Skulls",
    description: "Skeleton and skull coloring pages for Halloween.",
    imageCount: 18,
    featuredImage: "/placeholder.svg?height=300&width=300&text=Skeletons",
    subcategories: ["Skulls", "Dancing Skeletons", "Cartoon Skeletons"],
  },
  {
    id: "halloween-bats",
    title: "Bats & Spiders",
    description: "Creepy crawly bat and spider coloring pages.",
    imageCount: 20,
    featuredImage: "/placeholder.svg?height=300&width=300&text=Bats",
    subcategories: ["Bats", "Spiders", "Webs", "Insects"],
  },
  {
    id: "halloween-costumes",
    title: "Halloween Costumes",
    description: "Coloring pages featuring kids in Halloween costumes.",
    imageCount: 26,
    featuredImage: "/placeholder.svg?height=300&width=300&text=Costumes",
    subcategories: ["Trick or Treating", "Costume Ideas", "Masks"],
  },
  {
    id: "halloween-scenes",
    title: "Halloween Scenes",
    description: "Complete Halloween scene coloring pages with haunted houses and more.",
    imageCount: 16,
    featuredImage: "/placeholder.svg?height=300&width=300&text=Scenes",
    subcategories: ["Haunted Houses", "Graveyards", "Trick or Treating"],
  },
]

export const metadata = {
  title: "Halloween Coloring Page Categories - ColorMyPage",
  description:
    "Browse our collection of Halloween coloring page categories including pumpkins, ghosts, witches, and more spooky designs.",
}

export default function HalloweenCategoriesPage() {
  return (
    <div className="bg-gray-50">
      {/* Halloween Topic Hero Banner */}
      <div className="relative bg-gradient-to-r from-[#ff7700] to-[#6b0080] text-white py-12">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">Halloween Coloring Pages</h1>
          <p className="text-xl max-w-2xl">
            Explore our spooky collection of Halloween coloring page categories featuring pumpkins, ghosts, witches, and
            more frightfully fun designs!
          </p>
        </div>
      </div>

      <div className="container py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content - categories grid */}
          <div className="w-full lg:w-3/4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {halloweenCategories.map((category) => (
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

