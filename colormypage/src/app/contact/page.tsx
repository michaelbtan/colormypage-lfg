import { MessageSquare } from "lucide-react"
import { ContactForm } from "@/components/contact/contact-form"
import { SocialLinks } from "@/components/contact/social-links"

export const metadata = {
  title: "Contact Us - ColorMyPage",
  description: "Get in touch with the ColorMyPage team. We'd love to hear from you!",
}

export default function ContactPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#9d84ff] to-[#5bbce4] text-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl opacity-90 mb-8">
              Have questions, suggestions, or feedback? We'd love to hear from you!
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="bg-[#9d84ff]/10 p-3 rounded-full mr-4">
                  <MessageSquare className="h-5 w-5 text-[#9d84ff]" />
                </div>
                <h2 className="text-2xl font-bold">Send Us a Message</h2>
              </div>

              <ContactForm />

              <div className="mt-8 pt-6 border-t">
                <h3 className="font-medium text-gray-900 mb-3 text-center">Connect With Us</h3>
                <div className="flex justify-center">
                  <SocialLinks />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

