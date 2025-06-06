"use client"

import type React from "react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        className:
          "flex items-center gap-3 px-4 py-3 text-lg font-semibold bg-[#9d84ff]/20 backdrop-blur-sm hover:bg-[#9d84ff]/30 border border-[#9d84ff]/30 text-black hover:text-white rounded-xl transition-all duration-200 shadow-md hover:shadow-lg h-auto justify-start cursor-pointer [&>[data-description]]:text-black [&>[data-description]]:font-normal [&>[data-description]]:text-base",
      }}
      style={
        {
          "--normal-bg": "rgba(157, 132, 255, 0.2)",
          "--normal-text": "#000000",
          "--normal-border": "rgba(157, 132, 255, 0.3)",
          "--success-bg": "rgba(157, 132, 255, 0.2)",
          "--success-text": "#9d84ff",
          "--success-border": "rgba(157, 132, 255, 0.3)",
          "--error-bg": "rgba(157, 132, 255, 0.2)",
          "--error-text": "#9d84ff",
          "--error-border": "rgba(157, 132, 255, 0.3)",
          "--warning-bg": "rgba(157, 132, 255, 0.2)",
          "--warning-text": "#9d84ff",
          "--warning-border": "rgba(157, 132, 255, 0.3)",
          "--info-bg": "rgba(157, 132, 255, 0.2)",
          "--info-text": "#9d84ff",
          "--info-border": "rgba(157, 132, 255, 0.3)",
          "--toast-description-color": "#000000",
          "--toast-description-opacity": "0.9",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
