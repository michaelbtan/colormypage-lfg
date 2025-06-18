"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface CarouselImage {
  id: number
  src: string
  alt: string
  title?: string
  subtitle?: string
  href: string
}

const carouselImages: CarouselImage[] = [
  {
    id: 1,
    src: "https://puswptfnpjdigfsatylx.supabase.co/storage/v1/object/public/category-covers/jungle_animals/jungle-banner.png",
    alt: "Featured Jungle animal coloring pages",
    title: "Jungle Adventures",
    subtitle: "Explore the wild with our jungle-themed coloring pages",
    href: "/categories/Jungle%20Animals",
  },
  {
    id: 2,
    src: "https://puswptfnpjdigfsatylx.supabase.co/storage/v1/object/public/category-covers/unicorns/unicorns-banner.png",
    alt: "Featured Unicorn coloring pages",
    title: "Unicorn Dreams",
    subtitle: "Color magical unicorns and their enchanting worlds",
    href: "/categories/Unicorns",

  },
  {
    id: 3,
    src: "https://puswptfnpjdigfsatylx.supabase.co/storage/v1/object/public/category-covers/summer_kids/summer-kids-banner.png",
    alt: "Featured Summer Kids coloring pages",
    title: "Summer Fun",
    subtitle: "Enjoy sunny days with our summer-themed coloring pages",
    href: "/categories/Summer%20Kids",
  },
  {
    id: 4,
    src: "https://puswptfnpjdigfsatylx.supabase.co/storage/v1/object/public/category-covers/ocean_animals/ocean-animals-banner.png",
    alt: "Featured Ocean Animals coloring pages",
    title: "Ocean Wonders",
    subtitle: "Dive into the sea with our ocean animal coloring pages",
    href: "/categories/Ocean%20Animals",
  },
]

export function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1))
    }, 3000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToPrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex(currentIndex === 0 ? carouselImages.length - 1 : currentIndex - 1)
  }

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex(currentIndex === carouselImages.length - 1 ? 0 : currentIndex + 1)
  }

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false)
    setCurrentIndex(index)
  }

  return (
    <div className="relative w-full aspect-[6/2] overflow-hidden bg-gradient-to-r from-purple-100 to-pink-100">
      {/* Images */}
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {carouselImages.map((image) => (
          <Link href={image.href} key={image.id} className="relative w-full h-full flex-shrink-0">
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              fill
              className="object-cover"
              priority={image.id === 1}
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="text-center text-white px-4">
                {image.title && (
                  <h2 className="text-xl md:text-3xl lg:text-4xl font-bold mb-1 drop-shadow-lg">
                    {image.title}
                  </h2>
                )}
                {image.subtitle && (
                  <p className="text-xs md:text-base lg:text-lg drop-shadow-lg">
                    {image.subtitle}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 rounded-full w-10 h-10 md:w-12 md:h-12 cursor-pointer bg-[#9d84ff]/20 backdrop-blur-sm hover:bg-[#9d84ff]/30 border border-[#9d84ff]/30 text-[#9d84ff] hover:text-white"
        onClick={goToPrevious}
        aria-label="Previous image"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full w-10 h-10 md:w-12 md:h-12 cursor-pointer bg-[#9d84ff]/20 backdrop-blur-sm hover:bg-[#9d84ff]/30 border border-[#9d84ff]/30 text-[#9d84ff] hover:text-white"
        onClick={goToNext}
        aria-label="Next image"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play indicator */}
      <div className="absolute top-4 right-4">
        <Button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          aria-label={isAutoPlaying ? "Pause autoplay" : "Resume autoplay"}
          className="cursor-pointer bg-[#9d84ff]/20 backdrop-blur-sm hover:bg-[#9d84ff]/30 border border-[#9d84ff]/30 text-[#9d84ff] hover:text-white"
        >
          {isAutoPlaying ? <Pause /> : <Play />}
        </Button>
      </div>
    </div>
  )
}
