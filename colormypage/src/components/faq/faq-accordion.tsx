"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// FAQ data organized by category
const faqData = {
  general: [
    {
      question: "What is ColorMyPage?",
      answer:
        "ColorMyPage is a free platform that provides high-quality printable coloring pages for children, parents, teachers, and coloring enthusiasts of all ages. Our mission is to promote creativity, learning, and fun through coloring.",
    },
    {
      question: "Are all the coloring pages really free?",
      answer:
        "Yes! All coloring pages on ColorMyPage are completely free to download, print, and enjoy. We believe creativity should be accessible to everyone.",
    },
    {
      question: "How often do you add new coloring pages?",
      answer:
        "We add new coloring pages every week, including seasonal and holiday-themed collections. We also take requests from our community for new themes and designs.",
    },
    {
      question: "Who creates the coloring pages?",
      answer:
        "Our coloring pages are created by our team of professional artists and illustrators who specialize in creating engaging, age-appropriate designs. We also occasionally feature guest artists and community submissions.",
    },
  ],
  account: [
    {
      question: "Do I need to create an account to download coloring pages?",
      answer:
        "No, you can download coloring pages without creating an account. However, creating a free account allows you to save your favorite pages, receive personalized recommendations, and get notifications about new content.",
    },
    {
      question: "How do I create an account?",
      answer:
        "To create an account, click on the 'Sign in' button in the top right corner of the page, then select 'Sign up'. Fill in your email address and create a password. You'll receive a verification email to confirm your account.",
    },
    {
      question: "Is my personal information safe?",
      answer:
        "Yes, we take data privacy very seriously. We only collect the information necessary to provide our services and never share your personal information with third parties. You can read more in our Privacy Policy.",
    },
    {
      question: "How do I reset my password?",
      answer:
        "If you've forgotten your password, click on 'Sign in', then 'Forgot password?'. Enter your email address, and we'll send you a link to reset your password.",
    },
  ],
  downloading: [
    {
      question: "How do I download a coloring page?",
      answer:
        "Simply browse our categories, click on the coloring page you like, and click the download button. The page will download as a PDF that you can print at home.",
    },
    {
      question: "What format are the coloring pages in?",
      answer:
        "All our coloring pages are available as high-quality PDFs, which ensures they print clearly and maintain their quality. Some pages may also be available in PNG format for digital coloring.",
    },
    {
      question: "Can I print multiple copies of a coloring page?",
      answer:
        "Yes, you can print as many copies as you need for personal use. The PDF format allows you to print the same page multiple times without any loss in quality.",
    },
    {
      question: "What's the best way to print coloring pages?",
      answer:
        "For best results, we recommend printing on standard letter-sized (8.5 x 11 inch) white paper. Set your printer to 'high quality' or 'best' mode for the clearest lines. You can print in black and white to save colored ink.",
    },
  ],
  usage: [
    {
      question: "Can I use ColorMyPage coloring pages in my classroom?",
      answer:
        "Many teachers use our coloring pages as educational resources. You're welcome to print and distribute them to your students for educational purposes.",
    },
    {
      question: "Can I use the coloring pages for a birthday party or event?",
      answer:
        "Yes! Our coloring pages are perfect for parties, events, and gatherings. You can print multiple copies for all your guests to enjoy.",
    },
    {
      question: "Can I modify or edit the coloring pages?",
      answer:
        "Our coloring pages are for personal use only. While you can print and color them, we don't permit modifying, editing, or redistributing the original designs without permission.",
    },
    {
      question: "Can I submit my own coloring page designs?",
      answer:
        "Yes! We love featuring community-created content. Visit our 'Submit a Coloring Page' section to learn how to share your artwork with the ColorMyPage community.",
    },
  ],
  support: [
    {
      question: "The coloring page isn't downloading. What should I do?",
      answer:
        "First, check your internet connection. If that's not the issue, try using a different web browser or clearing your browser's cache. If you're still having trouble, please contact our support team.",
    },
    {
      question: "How do I report an issue with the website?",
      answer:
        "If you encounter any issues with our website, please use the 'Contact Us' form to report the problem. Include as much detail as possible, including what device and browser you're using.",
    },
    {
      question: "Can I request a specific coloring page theme?",
      answer:
        "We welcome suggestions for new coloring page themes. Use the 'Contact Us' form to send us your ideas, and our artists will consider them for future releases.",
    },
    {
      question: "How can I contact customer support?",
      answer:
        "You can reach our customer support team through the 'Contact Us' page on our website. We aim to respond to all inquiries within 24-48 hours during business days.",
    },
  ],
}

interface FaqAccordionProps {
  category: keyof typeof faqData
}

export function FaqAccordion({ category }: FaqAccordionProps) {
  const faqItems = faqData[category] || []

  return (
    <div id={`category-${category}`}>
      <Accordion type="single" collapsible className="w-full">
        {faqItems.map((item, index) => (
          <AccordionItem key={index} value={`${category}-item-${index}`}>
            <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
            <AccordionContent className="text-gray-600">{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

