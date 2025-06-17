"use client"

import { useState, useEffect, useRef } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import Image from "next/image"

interface SearchResult {
  type: 'category' | 'coloring_page'
  id: string
  title: string
  image_url: string
  description?: string
}

export function SearchBar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  // Close search results when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Debounced search function
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim().length > 2) {
        performSearch(searchQuery)
      } else {
        setSearchResults([])
        setShowResults(false)
      }
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [searchQuery])

  const performSearch = async (query: string) => {
    setIsLoading(true)
    const supabase = createClient()

    try {
      // Search categories
      const { data: categories } = await supabase
        .from('categories')
        .select('id, title, cover_image_url')
        .ilike('title', `%${query}%`)
        .limit(5)

      // Search coloring pages
      const { data: coloringPages } = await supabase
        .from('coloring_pages')
        .select('id, title, image_url, description')
        .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
        .limit(5)

      const results: SearchResult[] = [
        ...(categories || []).map(cat => ({
          type: 'category' as const,
          id: cat.id,
          title: cat.title,
          image_url: cat.cover_image_url,
        })),
        ...(coloringPages || []).map(page => ({
          type: 'coloring_page' as const,
          id: page.id,
          title: page.title,
          image_url: page.image_url,
          description: page.description,
        }))
      ]

      setSearchResults(results)
      setShowResults(results.length > 0)
    } catch (error) {
      console.error('Search error:', error)
    }
    
    setIsLoading(false)
  }

  const handleResultClick = () => {
    setShowResults(false)
    setSearchQuery("")
    setIsSearchOpen(false)
  }

  return (
    <>
      {/* Desktop Search - Compact Search Bar (Large screens and up) */}
      <div className="hidden lg:flex lg:w-80" ref={searchRef}>
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search coloring pages and categories..."
            className="w-full rounded-full bg-background/80 backdrop-blur-sm border border-[#9d84ff]/20 pl-9 pr-10 h-10 transition-all duration-300 focus:border-[#9d84ff] focus:ring-[#9d84ff]/20 hover:border-[#9d84ff]/30"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchResults.length > 0 && setShowResults(true)}
          />
          
          {/* Desktop Search Results Dropdown */}
          {showResults && (
            <div className="absolute top-full mt-2 w-full bg-background/95 backdrop-blur-sm border border-[#9d84ff]/20 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
              {isLoading ? (
                <div className="p-4 text-center text-muted-foreground">
                  Searching...
                </div>
              ) : searchResults.length > 0 ? (
                <div className="py-2">
                  {searchResults.map((result) => (
                    <Link
                      key={`${result.type}-${result.id}`}
                      href={result.type === 'category' ? `/categories/${result.title}` : `/coloring-page/${result.title}`}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-[#9d84ff]/10 transition-all duration-300 hover:scale-[1.02] mx-2 rounded-lg"
                      onClick={handleResultClick}
                    >
                      <Image
                        src={result.image_url}
                        alt={result.title}
                        width={40}
                        height={40}
                        className="rounded-lg object-cover border border-[#9d84ff]/20"
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800">{decodeURI(result.title)}</div>
                        <div className="text-sm text-[#9d84ff]/70 font-medium">
                          {result.type === 'category' ? 'Coloring Page Category' : 'Coloring Page'}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-muted-foreground">
                  No results found
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile/Tablet Search - Icon Only (Small and Medium screens) */}
      <button 
        className="lg:hidden p-3 rounded-full bg-[#9d84ff]/10 hover:bg-[#9d84ff]/20 border border-[#9d84ff]/20 hover:border-[#9d84ff]/30 transition-all duration-300 hover:scale-105 backdrop-blur-sm" 
        onClick={() => setIsSearchOpen(!isSearchOpen)}
      >
        <Search className="h-5 w-5 text-[#9d84ff]" />
        <span className="sr-only">Search</span>
      </button>

      {/* Mobile/Tablet Search Modal/Overlay */}
      {isSearchOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={() => setIsSearchOpen(false)}>
          <div className="bg-background/95 backdrop-blur-sm p-4 shadow-lg" onClick={(e) => e.stopPropagation()} ref={searchRef}>
            <div className="container mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search coloring pages and categories..."
                    className="w-full rounded-full bg-background/80 backdrop-blur-sm border border-[#9d84ff]/20 pl-9 pr-10 h-12 text-base transition-all duration-300 focus:border-[#9d84ff] focus:ring-[#9d84ff]/20"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                </div>
              </div>
              
              {/* Mobile Search Results */}
              <div className="max-h-[70vh] overflow-y-auto">
                {isLoading ? (
                  <div className="p-8 text-center text-muted-foreground">
                    Searching...
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="space-y-2">
                    {searchResults.map((result) => (
                      <Link
                        key={`${result.type}-${result.id}`}
                        href={result.type === 'category' ? `/categories/${result.title}` : `/coloring-page/${result.title}`}
                        className="flex items-center gap-4 p-4 hover:bg-[#9d84ff]/10 transition-all duration-300 rounded-lg border border-[#9d84ff]/10"
                        onClick={handleResultClick}
                      >
                        <Image
                          src={result.image_url}
                          alt={result.title}
                          width={50}
                          height={50}
                          className="rounded-lg object-cover border border-[#9d84ff]/20"
                        />
                        <div className="flex-1">
                          <div className="font-semibold text-gray-800 text-lg">{decodeURI(result.title)}</div>
                          <div className="text-sm text-[#9d84ff]/70 font-medium">
                            {result.type === 'category' ? 'Category' : 'Coloring Page'}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : searchQuery.length > 2 ? (
                  <div className="p-8 text-center text-muted-foreground">
                    No results found for "{searchQuery}"
                  </div>
                ) : (
                  <div className="p-8 text-center text-muted-foreground">
                    Start typing to search for coloring pages and categories
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

