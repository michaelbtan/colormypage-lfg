import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="w-full bg-gradient-to-b from-[#f2f0ff] to-white py-10 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4 animate-in fade-in duration-700">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              <span className="text-[#9d84ff] block">Free</span> Coloring Pages
              <span className="text-[#5bbce4]"> for Everyone</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600">
              Download high-quality printable coloring pages for kids, adults, and everyone in between.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button className="bg-[#9d84ff] text-white hover:bg-[#8a6dff] rounded-full text-base px-5 py-5">
                <Download className="mr-2 h-4 w-4" />
                Start Coloring
              </Button>
              <Button variant="outline" className="rounded-full text-base px-5 py-5">
                Browse Categories
              </Button>
            </div>
          </div>
          <div className="relative flex justify-center">
            <div className="w-full max-w-sm aspect-square relative">
              <div className="absolute inset-0 bg-[#ffb380] rounded-3xl rotate-3 transform-gpu"></div>
              <div className="absolute inset-0 bg-[#5bbce4] rounded-3xl -rotate-3 transform-gpu opacity-70"></div>
              <div className="absolute inset-0 bg-white rounded-3xl shadow-lg flex items-center justify-center p-6">
                {/* Example coloring page outline */}
                <svg viewBox="0 0 200 200" className="w-full h-full animate-bounce-subtle duration-[3000ms]">
                  <path
                    fill="none"
                    stroke="#221F26"
                    strokeWidth="2"
                    d="M100,20 C130,20 160,50 160,90 C160,130 130,150 100,150 C70,150 40,130 40,90 C40,50 70,20 100,20 Z"
                  />
                  <circle cx="75" cy="80" r="5" fill="#221F26" />
                  <circle cx="125" cy="80" r="5" fill="#221F26" />
                  <path fill="none" stroke="#221F26" strokeWidth="2" d="M70,110 C80,120 120,120 130,110" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
