import Link from "next/link"
import { Instagram, Facebook, Twitter, Youtube } from "lucide-react"

export function SocialLinks() {
  return (
    <div className="flex space-x-4">
      <Link
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#9d84ff]/10 p-2 rounded-full text-[#9d84ff] hover:bg-[#9d84ff] hover:text-white transition-colors"
      >
        <Instagram className="h-5 w-5" />
        <span className="sr-only">Instagram</span>
      </Link>
      <Link
        href="https://facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#9d84ff]/10 p-2 rounded-full text-[#9d84ff] hover:bg-[#9d84ff] hover:text-white transition-colors"
      >
        <Facebook className="h-5 w-5" />
        <span className="sr-only">Facebook</span>
      </Link>
      <Link
        href="https://twitter.com"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#9d84ff]/10 p-2 rounded-full text-[#9d84ff] hover:bg-[#9d84ff] hover:text-white transition-colors"
      >
        <Twitter className="h-5 w-5" />
        <span className="sr-only">Twitter</span>
      </Link>
      <Link
        href="https://youtube.com"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#9d84ff]/10 p-2 rounded-full text-[#9d84ff] hover:bg-[#9d84ff] hover:text-white transition-colors"
      >
        <Youtube className="h-5 w-5" />
        <span className="sr-only">YouTube</span>
      </Link>
    </div>
  )
}

