import Link from "next/link"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function CategoriesHero() {
  return (
    <div className="bg-gradient-to-r from-[#9d84ff] to-[#5bbce4] text-white py-16 md:py-24">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Explore Our Coloring Page Categories</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Find the perfect coloring pages for any interest, age, or occasion
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-500" />
            </div>
            <Input
              type="search"
              placeholder="Search categories or coloring pages..."
              className="pl-10 py-6 rounded-full bg-white text-gray-800 border-0 shadow-lg w-full"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-1">
              <Button className="rounded-full bg-[#9d84ff] hover:bg-[#8a6dff] h-10 px-4">Search</Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/categories/animals">
              <Button
                variant="secondary"
                className="rounded-full bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                Animals
              </Button>
            </Link>
            <Link href="/categories/princess">
              <Button
                variant="secondary"
                className="rounded-full bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                Princesses
              </Button>
            </Link>
            <Link href="/categories/dinosaurs">
              <Button
                variant="secondary"
                className="rounded-full bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                Dinosaurs
              </Button>
            </Link>
            <Link href="/categories/holidays">
              <Button
                variant="secondary"
                className="rounded-full bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                Holidays
              </Button>
            </Link>
            <Link href="/categories/superheroes">
              <Button
                variant="secondary"
                className="rounded-full bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                Superheroes
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

