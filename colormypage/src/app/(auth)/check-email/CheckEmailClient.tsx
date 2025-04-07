"use client"

import Link from "next/link"
import { Mail, RefreshCw, ArrowLeft, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CheckEmailClient() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-[#f2f0ff] to-white">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md border border-gray-100">
        {/* Email verification illustration */}
        <div className="relative h-48 w-full mb-6 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Animated envelope with coloring page */}
            <div className="relative w-32 h-32 animate-bounce-gentle">
              <div className="absolute inset-0 bg-[#9d84ff]/10 rounded-lg transform rotate-6"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Mail className="h-16 w-16 text-[#9d84ff]" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                </div>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-[#ffb380]/20 rounded-full animate-float-slow"></div>
          <div className="absolute bottom-1/3 right-1/4 w-6 h-6 bg-[#5bbce4]/20 rounded-full animate-float-medium"></div>
          <div className="absolute bottom-1/4 right-1/3 w-10 h-10 bg-[#9d84ff]/20 rounded-full animate-float-fast"></div>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center text-gray-800">
          Check Your <span className="text-[#9d84ff]">Email</span>!
        </h1>

        <p className="text-gray-600 mb-6 text-center">
          We've sent a verification link to your email address. Please check your inbox (and maybe your spam folder) to
          activate your account.
        </p>

        <div className="bg-[#f2f0ff] rounded-lg p-4 mb-6">
          <h3 className="font-medium flex items-center text-gray-700 mb-2">
            <Clock className="h-4 w-4 mr-2 text-[#9d84ff]" />
            While you wait...
          </h3>
          <p className="text-gray-600 text-sm">
            Did you know? Coloring reduces stress and anxiety by relaxing the amygdala, the fear center of your brain.
            Soon you'll have access to hundreds of stress-busting coloring pages!
          </p>
        </div>

        <div className="space-y-4">
          {/* <Button
            onClick={() => window.location.reload()}
            className="w-full bg-[#9d84ff] hover:bg-[#8a6dff] rounded-full"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            I've Verified My Email
          </Button>

          <div className="text-center text-sm text-gray-500">
            <p className="mb-2">Didn't receive an email?</p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <button className="text-[#9d84ff] hover:underline">Resend verification email</button>
              <span className="hidden sm:inline text-gray-400">•</span>
              <button className="text-[#9d84ff] hover:underline">Check your spam folder</button>
            </div>
          </div> */}

          <div className="pt-4 border-t border-gray-100">
            <Link href="/account" className="flex items-center justify-center text-sm text-gray-500 hover:text-gray-700">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to login
            </Link>
          </div>
        </div>
      </div>

      {/* Fun coloring pencils at the bottom */}
      <div className="mt-8 flex justify-center">
        {["#9d84ff", "#5bbce4", "#ffb380", "#e4a5bd", "#a5e4ad"].map((color, index) => (
          <div
            key={index}
            className="w-6 h-24 mx-1 rounded-t-full"
            style={{
              backgroundColor: color,
              transform: `rotate(${(index - 2) * 5}deg)`,
              transformOrigin: "bottom",
            }}
          />
        ))}
      </div>
    </div>
  )
}

// Add these animations to your globals.css file

