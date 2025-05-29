"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Twitter, Facebook, Mail, Copy, Check, PinIcon as Pinterest, PhoneIcon as WhatsApp } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface ShareOption {
  name: string
  icon: React.ElementType
  color: string
  getShareUrl: (url: string, title: string) => string
}

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  imageUrl: string
  pageUrl: string
}

export function ShareModal({ isOpen, onClose, title, imageUrl, pageUrl }: ShareModalProps) {
  const [copied, setCopied] = useState(false)

  // Ensure we have the full URL
  const fullPageUrl = pageUrl.startsWith("http")
    ? pageUrl
    : `${process.env.NEXT_PUBLIC_APP_URL || window.location.origin}${pageUrl}`

  const shareOptions: ShareOption[] = [
    {
      name: "Facebook",
      icon: Facebook,
      color: "#1877F2",
      getShareUrl: (url, title) =>
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`,
    },
    {
      name: "Twitter",
      icon: Twitter,
      color: "#1DA1F2",
      getShareUrl: (url, title) =>
        `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    },
    {
      name: "Pinterest",
      icon: Pinterest,
      color: "#E60023",
      getShareUrl: (url, title) =>
        `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${encodeURIComponent(imageUrl)}&description=${encodeURIComponent(title)}`,
    },
    {
      name: "WhatsApp",
      icon: WhatsApp,
      color: "#25D366",
      getShareUrl: (url, title) => `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
    },
    {
      name: "Email",
      icon: Mail,
      color: "#9d84ff",
      getShareUrl: (url, title) =>
        `mailto:?subject=${encodeURIComponent(`Check out this coloring page: ${title}`)}&body=${encodeURIComponent(`I found this awesome coloring page on ColorMyPage: ${url}`)}`,
    },
  ]

  const handleShare = (option: ShareOption) => {
    const shareUrl = option.getShareUrl(fullPageUrl, title)
    window.open(shareUrl, "_blank", "noopener,noreferrer")
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fullPageUrl)
      setCopied(true)
      toast("Link copied!", {
        description: "The link has been copied to your clipboard.",
      })
      // Reset the copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast("Failed to copy", {
        description: "Please try again or copy the link manually.",
      })
    }
  }

  // Create a shortened version of the URL for display
  const displayUrl = (url: string) => {
    if (url.length > 40) {
      return url.substring(0, 37) + "..."
    }
    return url
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md w-full max-w-[95vw] p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle>Share Coloring Page</DialogTitle>
          <DialogDescription>Share this coloring page with friends and family</DialogDescription>
        </DialogHeader>

        <div className="flex items-center space-x-4 py-4">
          <div className="relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-md border">
            <Image src={imageUrl || "/placeholder.svg"} alt={title} fill className="object-cover" />
          </div>
          <div className="flex-1 min-w-0 overflow-hidden">
            <h3 className="text-sm font-medium text-gray-900 truncate">{title}</h3>
            <p className="text-xs text-gray-500 truncate mt-1" title={fullPageUrl}>
              {displayUrl(fullPageUrl)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 py-4">
          {shareOptions.map((option) => (
            <button
              key={option.name}
              onClick={() => handleShare(option)}
              className="flex flex-col items-center justify-center gap-1 rounded-lg p-2 hover:bg-gray-100 transition-colors"
            >
              <option.icon className="h-5 w-5" style={{ color: option.color }} />
              <span className="text-xs">{option.name}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center mt-2">
          <div className="w-full">
            <div className="flex items-center justify-between rounded-md border px-3 py-2 gap-2">
              <div className="flex-grow overflow-hidden">
                <p className="text-xs sm:text-sm text-gray-500 truncate w-full" title={fullPageUrl}>
                  {fullPageUrl}
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={copyToClipboard} className="h-8 w-8 p-0 flex-shrink-0">
                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                <span className="sr-only">Copy link</span>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
