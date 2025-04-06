import Image from "next/image"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Jessica M.",
    role: "Parent of two",
    quote:
      "ColorMyPage has been a lifesaver during rainy days! My kids love the variety of coloring pages, and I appreciate the educational ones that help them learn while having fun.",
    image: "/placeholder.svg?height=100&width=100&text=Jessica",
    stars: 5,
  },
  {
    name: "Robert T.",
    role: "Elementary School Teacher",
    quote:
      "I use ColorMyPage regularly in my classroom. The quality of the coloring pages is excellent, and my students get excited whenever I bring out a new set.",
    image: "/placeholder.svg?height=100&width=100&text=Robert",
    stars: 5,
  },
  {
    name: "Amanda K.",
    role: "Art Therapist",
    quote:
      "The detailed designs are perfect for my adult clients. Coloring helps them relax and focus, and ColorMyPage offers a wonderful variety of options.",
    image: "/placeholder.svg?height=100&width=100&text=Amanda",
    stars: 4,
  },
]

export function AboutTestimonials() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-[#f2f0ff]">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">What Our Users Say</h2>
          <p className="text-lg text-gray-600">
            Don't just take our word for it. Here's what the ColorMyPage community has to say.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              {/* Stars */}
              <div className="flex mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < testimonial.stars ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-600 mb-6 italic">"{testimonial.quote}"</p>

              {/* Person */}
              <div className="flex items-center">
                <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

