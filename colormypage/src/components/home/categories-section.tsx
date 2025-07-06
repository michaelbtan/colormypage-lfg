import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { CategoryCard } from "@/components/category-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface CategoriesSectionProps {
  title: string;
  categories: {
    id: string | number;
    created_at: string;
    title: string;
    cover_image_url: string;
    image_count?: number;
    categoryFavorited?: boolean;
  }[];
  viewAllLink: string;
  userId: string | null;
}

export function CategoriesSection({
  title,
  categories,
  viewAllLink,
  userId,
}: CategoriesSectionProps) {
  return (
    <section className="w-full py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">{title}</h2>
          <Link
            href={viewAllLink}
            className="text-sm sm:text-base font-medium flex items-center transition-transform duration-300 hover:scale-105"
          >
            View All
            <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
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
              <CarouselItem
                key={category.id}
                className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
              >
                <div className="p-1">
                  <CategoryCard
                    id={category.id}
                    title={category.title}
                    imageUrl={category.cover_image_url}
                    imageCount={category.image_count}
                    categoryFavorited={category.categoryFavorited}
                    userId={userId}
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
  );
}
