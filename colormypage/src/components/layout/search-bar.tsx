"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function SearchBar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <>
      {/* Desktop Search */}
      <div className="hidden md:flex md:w-1/3 lg:w-1/2">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search coloring pages..."
            className="w-full rounded-full bg-muted pl-8 pr-4"
          />
        </div>
      </div>

      {/* Mobile Search Toggle */}
      <button className="md:hidden p-2 rounded-full hover:bg-muted" onClick={() => setIsSearchOpen(!isSearchOpen)}>
        <Search className="h-5 w-5" />
        <span className="sr-only">Search</span>
      </button>

      {/* Mobile Search Bar (Conditional) */}
      {isSearchOpen && (
        <div className="border-t p-2 md:hidden absolute top-16 left-0 right-0 bg-background z-10">
          <div className="relative w-full container mx-auto px-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search coloring pages..."
              className="w-full rounded-full bg-muted pl-8 pr-4"
              autoFocus
            />
          </div>
        </div>
      )}
    </>
  )
}

