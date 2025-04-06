"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqItems = [
  {
    question: "Are all the coloring pages really free?",
    answer:
      "Yes! All coloring pages on ColorMyPage are completely free to download, print, and enjoy. We believe creativity should be accessible to everyone.",
  },
  {
    question: "How do I download a coloring page?",
    answer:
      "Simply browse our categories, click on the coloring page you like, and click the download button. The page will download as a PDF that you can print at home.",
  },
  {
    question: "Can I use ColorMyPage coloring pages in my classroom?",
    answer:
      "Many teachers use our coloring pages as educational resources. You're welcome to print and distribute them to your students for educational purposes.",
  },
  {
    question: "How often do you add new coloring pages?",
    answer:
      "We add new coloring pages every week, including seasonal and holiday-themed collections. We also take requests from our community for new themes and designs.",
  },
  {
    question: "Can I submit my own coloring page designs?",
    answer:
      "Yes! We love featuring community-created content. Visit our 'Submit a Coloring Page' section to learn how to share your artwork with the ColorMyPage community.",
  },
  {
    question: "Do I need to create an account to download coloring pages?",
    answer:
      "No, you can download coloring pages without creating an account. However, creating a free account allows you to save your favorite pages and receive notifications about new content.",
  },
]

export function AboutFaq() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600">
            Have questions about ColorMyPage? Find answers to common questions below.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                <AccordionContent className="text-gray-600">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

