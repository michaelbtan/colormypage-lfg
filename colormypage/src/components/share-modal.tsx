"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { Copy, Check } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import facebook from "@/assets/social/facebook.svg"
import instagram from "@/assets/social/instagram.svg"
import x from "@/assets/social/x.svg"
import pinterest from "@/assets/social/pinterest.svg"
import email from "@/assets/social/email.svg"

interface ShareOption {
  name: string
  icon: any 
  color: string
  getShareUrl: (url: string, title: string) => string
}

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description: string
  imageUrl: string
  pageUrl: string
}

export function ShareModal({ isOpen, onClose, title, description, imageUrl, pageUrl }: ShareModalProps) {
  const [copied, setCopied] = useState(false)

  const fullPageUrl = pageUrl.startsWith("http")
    ? pageUrl
    : `${process.env.NEXT_PUBLIC_APP_URL || window.location.origin}${pageUrl}`

  const shareOptions: ShareOption[] = [
    {
      name: "Facebook",
      icon: facebook,
      color: "#1877F2",
      getShareUrl: (url, title) =>
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`,
    },
    {
      name: "Twitter",
      icon: x,
      color: "#1DA1F2",
      getShareUrl: (url, title) =>
        `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    },
    {
      name: "Pinterest",
      icon: pinterest,
      color: "#E60023",
      getShareUrl: (url, title) =>
        `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${encodeURIComponent(
          imageUrl,
        )}&description=${encodeURIComponent(title)}`,
    },
    {
      name: "Instagram",
      icon: instagram,
      color: "#E4405F",
      getShareUrl: () => `https://www.instagram.com/`,
    },
    {
      name: "Email",
      icon: email,
      color: "#9d84ff",
      getShareUrl: (url, title) =>
        `mailto:?subject=${encodeURIComponent(`Check out this coloring page: ${title}`)}&body=${encodeURIComponent(
          `I found this awesome coloring page on ColorMyPage: ${url}`,
        )}`,
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
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast("Failed to copy", {
        description: "Please try again or copy the link manually.",
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-xl w-full max-w-[95vw] p-0 overflow-hidden bg-gradient-to-br from-cyan-50 to-blue-100 border-0 shadow-2xl">
        <div className="bg-gradient-to-r from-purple-400 to-purple-500 p-6 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">Share Coloring Page</DialogTitle>
            <DialogDescription className="text-purple-100">
              Share this coloring page with friends and family
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-4 sm:p-6">
          <div className="flex items-center space-x-4 py-4 bg-white rounded-2xl p-4 shadow-sm border border-purple-100">
            <div className="relative h-32 w-24 flex-shrink-0 overflow-hidden rounded-xl border-2 border-purple-200">
              <Image src={imageUrl || "/placeholder.svg"} alt={title} fill className="object-cover" />
            </div>
            <div className="flex-1 min-w-0 overflow-hidden">
              <h3 className="text-sm font-semibold text-gray-800 truncate">{title}</h3>
              <p className="text-xs text-purple-600 truncate mt-1" title={fullPageUrl}>
                {description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 py-6">
            {shareOptions.map((option) => (
              <button
                key={option.name}
                onClick={() => handleShare(option)}
                className="flex flex-col items-center justify-center gap-1 rounded-2xl p-2 cursor-pointer bg-white hover:bg-purple-50 transition-all duration-200 shadow-sm border border-purple-100 hover:border-purple-200 hover:shadow-md transform hover:scale-105"
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${option.color}15` }}
                >
                  <Image src={option.icon} alt={option.name} width={20} height={20} />
                </div>
                <span className="text-xs font-medium text-gray-700 text-center leading-tight">{option.name}</span>
              </button>
            ))}
          </div>

          <div className="mt-4">
            <div className="bg-white rounded-2xl border-2 border-purple-200 overflow-hidden shadow-sm">
              <div className="flex items-center justify-between px-2 py-2 gap-2">
                <div className="flex-grow overflow-hidden min-w-0">
                  <p
                    className="text-xs sm:text-sm text-gray-600 truncate w-full font-medium break-all"
                    title={fullPageUrl}
                  >
                    {fullPageUrl}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyToClipboard}
                  className="h-7 w-7 p-0 flex-shrink-0 rounded-xl hover:bg-purple-100 transition-colors"
                >
                  {copied ? (
                    <Check className="h-3.5 w-3.5 text-green-500" />
                  ) : (
                    <Copy className="h-3.5 w-3.5 text-purple-600" />
                  )}
                  <span className="sr-only">Copy link</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
