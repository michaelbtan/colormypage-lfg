import Link from "next/link"
import { Palette, Mail, Instagram, Facebook, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo and Description */}
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Palette className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">ColorMyPage</span>
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
                <Link href="/categories" className="text-muted-foreground hover:text-foreground transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="text-muted-foreground hover:text-foreground transition-colors">
                  Favorites
                </Link>
              </li>
              <li>
                <Link href="/new" className="text-muted-foreground hover:text-foreground transition-colors">
                  New Additions
                </Link>
              </li>
              <li>
                <Link href="/popular" className="text-muted-foreground hover:text-foreground transition-colors">
                  Popular Pages
                </Link>
              </li>
            </ul>
          </div>

          {/* Help & Support */}
          <div>
            <h3 className="mb-3 text-lg font-medium">Help & Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="mb-3 text-lg font-medium">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <Link
                href="https://instagram.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="https://facebook.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="https://twitter.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="mailto:contact@colormypage.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              Subscribe to our newsletter for updates and new coloring pages.
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} ColorMyPage. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 text-xs justify-center">
            <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-muted-foreground hover:text-foreground transition-colors">
              Cookie Policy
            </Link>
            <Link href="/takedown" className="text-muted-foreground hover:text-foreground transition-colors">
              Takedown Policy and Licensing
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
