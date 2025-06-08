"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X as Close } from "lucide-react";
import { toast } from "sonner";

import facebook from "@/assets/social/facebook.svg";
import instagram from "@/assets/social/instagram.svg";
import x from "@/assets/social/x.svg";
import pinterest from "@/assets/social/pinterest.svg";
import email from "@/assets/social/email.svg";
import { baseURL } from "@/lib/constants";

interface ShareOption {
  name: string;
  icon: any;
  color: string;
  getShareUrl: (url: string, title: string) => string;
}

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  imageUrl: string;
  pageUrl: string;
}

export function ShareModal({
  isOpen,
  onClose,
  title,
  description,
  imageUrl,
  pageUrl,
}: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  const fullPageUrl = pageUrl.startsWith("http")
    ? pageUrl
    : `${baseURL ?? (typeof window !== "undefined" ? window.location.origin : "")}${pageUrl}`;

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
        `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${encodeURIComponent(imageUrl)}&description=${encodeURIComponent(title)}`,
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
        `mailto:?subject=${encodeURIComponent(`Check out this coloring page: ${title}`)}&body=${encodeURIComponent(`I found this awesome coloring page on ColorMyPage: ${url}`)}`,
    },
  ];

  const handleShare = (option: ShareOption) => {
    const shareUrl = option.getShareUrl(fullPageUrl, title);
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fullPageUrl);
      setCopied(true);
      toast("Link copied!", {
        description: "The link has been copied to your clipboard.",
        descriptionClassName: "!text-black font-medium",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast("Failed to copy", {
        description: "Please try again or copy the link manually.",
        descriptionClassName: "!text-black font-medium",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">

        <div className="flex flex-col items-center gap-4 pt-2">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            width={180}
            height={180}
            className="rounded-md object-cover"
          />

          <div className="text-center">
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>

          <div className="grid grid-cols-3 gap-4 w-full pt-2">
            {shareOptions.map((option) => (
              <button
                key={option.name}
                onClick={() => handleShare(option)}
                className="flex flex-col items-center gap-1 rounded-lg p-3 hover:bg-accent transition cursor-pointer"
                aria-label={`Share to ${option.name}`}
              >
                <Image src={option.icon} alt={option.name} width={24} height={24} />
                <span className="text-xs font-medium">{option.name}</span>
              </button>
            ))}
          </div>

          <Button variant="outline" className="w-full mt-2 cursor-pointer bg-[#9d84ff]/20 hover:bg-[#9d84ff]/20 backdrop-blur-sm border border-[#9d84ff]/30 text-[#9d84ff] hover:text-[#9d84ff] transition-transform duration-300 hover:scale-105" onClick={copyToClipboard}>
            {copied ? "Link Copied!" : "Copy Link"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
