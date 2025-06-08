"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import PLACEHOLDER from "@/assets/placeholder.svg"

interface ThemedPageCard {
  id: string | number
  title: string
  imageUrl: string
  href: string
}

interface ThemedSectionProps {
  title: string
  pages: ThemedPageCard[]
  viewAllLink: string
  viewAllText: string
  accentColor?: string
}

export function ThemedSection({ title, pages, viewAllLink, viewAllText, accentColor = "#9d84ff" }: ThemedSectionProps) {
  return (
    <section className="py-12 container">
      {/* Section Title */}
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-12" style={{ color: accentColor }}>
        {title}
      </h2>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {pages.map((page) => (
          <Link key={page.id} href={page.href} className="group block">
            <div className="bg-[#f9f7f2] rounded-xl p-4 shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="relative aspect-[4/3] mb-4 overflow-hidden rounded-lg">
                <Image src={page.imageUrl || PLACEHOLDER} alt={page.title} fill className="object-cover" />

                {/* Subtle overlay with pencils in bottom corners */}
                <div className="absolute bottom-2 left-2">
                  <div className="w-8 h-8 opacity-70">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 20L20 4M4 4L20 20" stroke="#9d84ff" strokeWidth="2" strokeLinecap="round" />
                      <path d="M4 12H20" stroke="#5bbce4" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              </div>

              <h3 className="text-center text-lg font-medium text-gray-800 group-hover:text-[#9d84ff] transition-colors">
                {page.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>

      {/* View All Button */}
      <div className="flex justify-center">
        <Button
          asChild
          className="rounded-full px-8 py-6 h-auto text-white font-medium"
          style={{ backgroundColor: accentColor, borderColor: accentColor }}
        >
          <Link href={viewAllLink}>{viewAllText}</Link>
        </Button>
      </div>
    </section>
  )
}

