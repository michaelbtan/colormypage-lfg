import Link from "next/link"
import { Palette, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FaqAccordion } from "@/components/faq/faq-accordion"
import { FaqCategories } from "@/components/faq/faq-categories"

export const metadata = {
  title: "Frequently Asked Questions - ColorMyPage",
  description: "Find answers to common questions about ColorMyPage, our coloring pages, and how to use our website.",
}

export default function FaqPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#9d84ff] to-[#5bbce4] text-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
            <p className="text-xl opacity-90 mb-8">
              Find answers to common questions about ColorMyPage and our coloring pages
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* FAQ Content */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <div className="bg-white rounded-xl shadow-md p-6 md:p-8 border border-gray-100">
                <h2 className="text-2xl font-bold mb-6" id="category-general">
                  General Questions
                </h2>
                <FaqAccordion category="general" />

                <h2 className="text-2xl font-bold mt-12 mb-6" id="category-account">
                  Account & Membership
                </h2>
                <FaqAccordion category="account" />

                <h2 className="text-2xl font-bold mt-12 mb-6" id="category-downloading">
                  Downloading & Printing
                </h2>
                <FaqAccordion category="downloading" />

                <h2 className="text-2xl font-bold mt-12 mb-6" id="category-usage">
                  Using Our Coloring Pages
                </h2>
                <FaqAccordion category="usage" />

                <h2 className="text-2xl font-bold mt-12 mb-6" id="category-support">
                  Technical Support
                </h2>
                <FaqAccordion category="support" />
              </div>
            </div>

            {/* Sidebar with Categories */}
            <div className="lg:col-span-1 order-1 lg:order-2">
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 sticky top-24">
                <h2 className="text-xl font-bold mb-4">FAQ Categories</h2>
                <FaqCategories />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-12 md:py-16 bg-[#f2f0ff]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-white rounded-xl shadow-md p-8 md:p-10 border border-gray-100">
              <div className="w-16 h-16 bg-[#9d84ff]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Palette className="h-8 w-8 text-[#9d84ff]" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Still Have Questions?</h2>
              <p className="text-gray-600 mb-8">
                Can't find the answer you're looking for? Please reach out to our friendly team.
              </p>
              <Button asChild className="rounded-full bg-[#9d84ff] hover:bg-[#8a6dff]">
                <Link href="/contact">
                  Contact Us <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

