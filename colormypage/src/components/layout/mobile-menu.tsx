"use client"

import Link from "next/link"
import { Menu, LogIn, Palette, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"

interface MobileMenuProps {
  loggedin: boolean
}

export function MobileMenu({ loggedin }: MobileMenuProps) {
  return (
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
              <Link href="/categories" className="flex py-2 text-lg font-medium hover:text-primary transition-colors">
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
              <Link href={loggedin ? "/dashboard" : "/login"} className="w-full">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <LogIn className="h-5 w-5" />
                  {loggedin ? "Account" : "Sign in"}
                </Button>
              </Link>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

