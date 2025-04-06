import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SimpleCategoriesHero() {
  return (
    <div className="bg-gradient-to-r from-[#9d84ff] to-[#5bbce4] text-white py-12 md:py-16">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Coloring Page Categories</h1>
          <p className="text-xl opacity-90 mb-8">
            Browse all our categories and find the perfect coloring pages for any interest
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-500" />
            </div>
            <Input
              type="search"
              placeholder="Search categories..."
              className="pl-10 py-6 rounded-full bg-white text-gray-800 border-0 shadow-lg w-full"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-1">
              <Button className="rounded-full bg-[#9d84ff] hover:bg-[#8a6dff] h-10 px-4">Search</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

