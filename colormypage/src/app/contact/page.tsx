import Link from "next/link";
import Image from "next/image";
import { MessageSquare } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import facebook from "@/assets/social/facebook.svg";
import instagram from "@/assets/social/instagram.svg";
import x from "@/assets/social/x.svg";
import pinterest from "@/assets/social/pinterest.svg";
import email from "@/assets/social/email.svg";

// Social Links Mapping
const socialLinks = [
  {
    href: "https://instagram.com",
    label: "Instagram",
    icon: instagram,
  },
  {
    href: "https://facebook.com",
    label: "Facebook",
    icon: facebook,
  },
  {
    href: "https://x.com",
    label: "X (Twitter)",
    icon: x,
  },
  {
    href: "https://pinterest.com",
    label: "Pinterest",
    icon: pinterest,
  },
  {
    href: "mailto:jasmine@colormypage.com",
    label: "Email",
    icon: email,
  },
];

export const metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the ColorMyPage team. We'd love to hear from you!",
  openGraph: {
    title: "Contact ColorMyPage",
    description: "Get in touch with the ColorMyPage team. We'd love to hear from you!",
    type: "website",
    url: "https://colormypage.com/contact",
    siteName: "ColorMyPage",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Contact ColorMyPage - Free Printable Coloring Pages",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact ColorMyPage",
    description: "Get in touch with the ColorMyPage team. We'd love to hear from you!",
    images: ["/logo.png"],
  },
};

export default function ContactPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#9d84ff] to-[#5bbce4] text-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl opacity-90 mb-8">
              Have questions, suggestions, or feedback? We'd love to hear from
              you!
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Contact Form */}
            <div className="p-6 md:p-8 rounded-xl shadow-md border border-gray-100 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="flex items-center mb-6">
                <div className="bg-[#9d84ff]/10 p-3 rounded-full mr-4">
                  <MessageSquare className="h-5 w-5 text-[#9d84ff]" />
                </div>
                <h2 className="text-2xl font-bold">Send Us a Message</h2>
              </div>

              <ContactForm />

              <div className="mt-8 pt-6 border-t">
                <h3 className="font-medium text-gray-900 mb-3 text-center">
                  Connect With Us
                </h3>
                <div className="flex justify-center space-x-4">
                  {socialLinks.map((social, index) => (
                    <Link
                      key={index}
                      href={social.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        src={social.icon}
                        alt={social.label}
                        width={25}
                        height={25}
                        className="h-7 w-7 transition-transform duration-300 hover:scale-110"
                      />
                      <span className="sr-only">{social.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
