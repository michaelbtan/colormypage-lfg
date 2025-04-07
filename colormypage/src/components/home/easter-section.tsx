
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { CategoryCard } from "@/components/category-card"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface EasterPage {
  id: string;
  title: string;
  imageUrl: string;
  imageCount: number;
}

export function EasterSection({ easterPages }: { easterPages: EasterPage[] }) {
  return (
    <section className="w-full py-8">
      <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-[#e4a5bd]">Easter</h2>
        <Link href="/topics/easter" className="text-[#e4a5bd] hover:text-[#d989a9] font-medium flex items-center">
          View All Easter Coloring Pages
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {easterPages.map((page) => (
            <CarouselItem key={page.id} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
              <div className="p-1">
                <CategoryCard
                  id={page.id}
                  title={page.title}
                  imageUrl={page.imageUrl}
                  imageCount={page.imageCount}
                  onFavorite={(id) => console.log(`Toggled favorite for Easter page ${id}`)}
                  onShare={(id) => console.log(`Shared Easter page ${id}`)}
                  isHorizontal={true}
                  categoryLink="/easter"
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
