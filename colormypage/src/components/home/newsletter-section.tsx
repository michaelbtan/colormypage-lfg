"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Send } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      setEmail("")

      // Reset success message after 3 seconds
      setTimeout(() => setIsSuccess(false), 3000)
    }, 1000)
  }

  return (
    <section className="w-full py-16">
      <div className="container mx-auto px-4">
      <div className="relative bg-[#f2f0ff] rounded-3xl p-8 md:p-12 overflow-hidden">
        <div className="max-w-3xl mx-auto text-center mt-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-[#9d84ff]">Join</span> Our Coloring Community
          </h2>

          <p className="text-gray-600 text-lg md:text-xl mb-8">
            Sign up to receive new coloring pages, exclusive content, and creative inspiration straight to your inbox!
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="email"
                placeholder="Your email address"
                className="pl-10 py-6 rounded-full bg-white border-0 shadow-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="bg-[#9d84ff] hover:bg-[#8a6dff] text-white rounded-full py-6 px-8 cursor-pointer"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "Signing Up..."
              ) : (
                <>
                  Sign Up
                  <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          {isSuccess && (
            <p className="text-green-600 mt-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
              Thanks for signing up! Check your inbox soon.
            </p>
          )}

          <p className="text-gray-500 text-sm mt-6">We respect your privacy. Unsubscribe at any time.</p>
        </div>
      </div>
      </div>
    </section>
  )
}
