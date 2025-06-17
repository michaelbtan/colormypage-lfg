import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.png";
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
    href: "mailto:contact@colormypage.com",
    label: "Email",
    icon: email,
  },
];

// Policy Links Mapping
const policyLinks = [
  {
    href: "/privacy-policy",
    label: "Privacy Policy",
  },
  {
    href: "/terms-and-conditions",
    label: "Terms & Conditions",
  },
  {
    href: "/takedown-policy",
    label: "Takedown Policy",
  },
  {
    href: "/licensing",
    label: "Licensing",
  },
];

// Help & Support Links Mapping
const helpLinks = [
  {
    href: "/about",
    label: "About Us",
  },
  {
    href: "/faq",
    label: "FAQ",
  },
  {
    href: "/contact",
    label: "Contact Us",
  },
];

export function Footer() {
  return (
    <footer className="w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo and Description */}
          <div className="flex flex-col gap-2">
            <Link href="/" className="inline-block transition-transform duration-300 hover:scale-110">
              <div className="flex items-center gap-2">
                <Image
                  src={logo}
                  alt="Logo"
                  width={40}
                  height={40}
                  className="h-10 w-10 object-contain"
                />
                <h1 className="text-3xl font-bold">
                  <span className="text-[#9d84ff]">Color</span>
                  <span className="text-gray-800">My</span>
                  <span className="text-gray-800">Page</span>
                </h1>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground mt-2">
              Free, high-quality coloring pages for kids, parents, and teachers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-3 text-lg font-medium">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/categories"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Favorites
                </Link>
              </li>
              <li>
                <Link
                  href="/new"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  New Additions
                </Link>
              </li>
              <li>
                <Link
                  href="/popular"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Popular Pages
                </Link>
              </li>
            </ul>
          </div>

          {/* Help & Support */}
          <div>
            <h3 className="mb-3 text-lg font-medium">Help & Support</h3>
            <ul className="space-y-2 text-sm">
              {helpLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="mb-3 text-lg font-medium">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
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
            <p className="text-sm text-muted-foreground">
              Subscribe to our newsletter for updates and new coloring pages.
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} ColorMyPage Inc. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 text-xs justify-center">
            {policyLinks.map((policy, index) => (
              <Link
                key={index}
                href={policy.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {policy.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
