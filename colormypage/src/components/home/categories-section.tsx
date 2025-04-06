"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { CategoryCard } from "@/components/category-card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

interface CategoriesSectionProps {
  title: string
  categories: {
    id: string | number
    title: string
    imageUrl: string
    imageCount?: number
    isFavorited?: boolean
  }[]
  viewAllLink: string
}

export function CategoriesSection({ title, categories, viewAllLink }: CategoriesSectionProps) {
  return (
    <section className="w-full py-8">
      <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">{title}</h2>
        <Link href={viewAllLink} className="text-[#9d84ff] hover:text-[#8a6dff] font-medium flex items-center">
          View All
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>

      {/* Carousel for all screen sizes */}
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {categories.map((category) => (
            <CarouselItem key={category.id} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
              <div className="p-1">
                <CategoryCard
                  id={category.id}
                  title={category.title}
                  imageUrl={category.imageUrl}
                  imageCount={category.imageCount}
                  isFavorited={category.isFavorited}
                  onFavorite={(id) => console.log(`Toggled favorite for category ${id}`)}
                  onShare={(id) => console.log(`Shared category ${id}`)}
                  isHorizontal={true}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
      </div>
    </section>
  )
}
