"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Menu, LogIn, Palette, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Palette className="h-6 w-6 text-primary" />
          <span className="hidden font-bold text-xl sm:inline-block">ColorMyPage</span>
        </Link>

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

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4">
          <Link href="/categories" className="text-sm font-medium hover:text-primary transition-colors">
            Categories
          </Link>
          <Link
            href="/favorites"
            className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1"
          >
            <Heart className="h-4 w-4" />
            Favorites
          </Link>
          <Link href="/login">
            <Button variant="outline" size="sm" className="gap-1">
              <LogIn className="h-4 w-4" />
              Sign in
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col gap-6 py-6">
              <Link href="/" className="flex items-center gap-2">
                <Palette className="h-6 w-6 text-primary" />
                <span className="font-bold text-xl">ColorMyPage</span>
              </Link>
              <div className="flex flex-col gap-4">
                <SheetClose asChild>
                  <Link
                    href="/categories"
                    className="flex py-2 text-lg font-medium hover:text-primary transition-colors"
                  >
                    Categories
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/favorites"
                    className="flex py-2 text-lg font-medium hover:text-primary transition-colors items-center gap-2"
                  >
                    <Heart className="h-5 w-5" />
                    Favorites
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/account" className="w-full">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <LogIn className="h-5 w-5" />
                      Sign in
                    </Button>
                  </Link>
                </SheetClose>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Mobile Search Bar (Conditional) */}
      {isSearchOpen && (
        <div className="border-t p-2 md:hidden">
          <div className="relative w-full">
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
    </header>
  )
}
