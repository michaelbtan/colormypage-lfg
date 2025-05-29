"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface CarouselImage {
  id: number
  src: string
  alt: string
  title?: string
  subtitle?: string
}

const carouselImages: CarouselImage[] = [
  {
    id: 1,
    src: "/placeholder.svg?height=400&width=1200&query=colorful children coloring book pages spread",
    alt: "Featured Coloring Pages",
    title: "Discover Amazing Coloring Pages",
    subtitle: "Unleash your creativity with our collection",
  },
  {
    id: 2,
    src: "/placeholder.svg?height=400&width=1200&query=artistic mandala coloring designs",
    alt: "Mandala Collection",
    title: "Beautiful Mandala Designs",
    subtitle: "Find peace through intricate patterns",
  },
  {
    id: 3,
    src: "/placeholder.svg?height=400&width=1200&query=nature animals coloring book illustrations",
    alt: "Nature & Animals",
    title: "Nature & Wildlife",
    subtitle: "Explore the beauty of the natural world",
  },
  {
    id: 4,
    src: "/placeholder.svg?height=400&width=1200&query=fantasy characters coloring pages",
    alt: "Fantasy Characters",
    title: "Fantasy Adventures",
    subtitle: "Bring magical characters to life",
  },
]

export function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1))
    }, 3000) // Change slide every 5 seconds

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
    <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden bg-gradient-to-r from-purple-100 to-pink-100">
      {/* Images */}
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {carouselImages.map((image) => (
          <div key={image.id} className="relative w-full h-full flex-shrink-0">
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              fill
              className="object-cover"
              priority={image.id === 1}
            />
            {/* Overlay with text */}
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="text-center text-white px-4">
                {image.title && (
                  <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 drop-shadow-lg">{image.title}</h2>
                )}
                {image.subtitle && <p className="text-sm md:text-lg lg:text-xl drop-shadow-lg">{image.subtitle}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white/90 text-gray-800 rounded-full w-10 h-10 md:w-12 md:h-12"
        onClick={goToPrevious}
        aria-label="Previous image"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white/90 text-gray-800 rounded-full w-10 h-10 md:w-12 md:h-12"
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
