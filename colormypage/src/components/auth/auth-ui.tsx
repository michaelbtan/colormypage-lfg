"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Palette } from "lucide-react"
import { LoginForm } from "@/components/auth/login-form"
import { RegisterForm } from "@/components/auth/register-form"

export function AuthUI() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const tabParam = searchParams.get("tab")
  const [activeTab, setActiveTab] = useState(tabParam === "signup" ? "signup" : "login")

  useEffect(() => {
    router.push(`?tab=${activeTab}`, { scroll: false })
  }, [activeTab, router])

  const handleTabChange = (value: string) => {
    if (value === "login" || value === "signup") {
      setActiveTab(value)
    }
  }

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-col items-center justify-center w-full p-6">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <Link href="/" className="inline-block mb-6">
              <div className="flex items-center justify-center gap-2">
                <Palette className="h-6 w-6 text-[#9d84ff]" />
                <h1 className="text-3xl font-bold">
                  <span className="text-[#9d84ff]">Color</span>
                  <span className="text-gray-800">My</span>
                  <span className="text-gray-800">Page</span>
                </h1>
              </div>
            </Link>
            <h2 className="text-2xl font-bold">{activeTab === "login" ? "Welcome Back!" : "Create an Account"}</h2>
            <p className="mt-2 text-gray-600">
              {activeTab === "login"
                ? "Sign in to access your favorite coloring pages"
                : "Join our community for free coloring pages"}
            </p>
          </div>

          {/* Form Container with Tabs */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300">
            {/* Tabs */}
            <div className="flex mb-6 border-b">
              <button
                onClick={() => handleTabChange("login")}
                className={`flex-1 py-4 text-center font-medium transition-colors cursor-pointer ${
                  activeTab === "login" ? "text-[#9d84ff] border-b-2 border-[#9d84ff]" : "text-gray-500"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => handleTabChange("signup")}
                className={`flex-1 py-4 text-center font-medium transition-colors cursor-pointer ${
                  activeTab === "signup" ? "text-[#9d84ff] border-b-2 border-[#9d84ff]" : "text-gray-500"
                }`}
              >
                Sign Up
              </button>
            </div>

            <div className="px-6 pb-8">
              {activeTab === "login" ? <LoginForm /> : <RegisterForm />}

              <div className="mt-8 text-center text-sm text-gray-500">
                {activeTab === "login" ? (
                  <p>
                    Don't have an account?{" "}
                    <button
                      onClick={() => handleTabChange("signup")}
                      className="text-[#9d84ff] hover:underline font-medium cursor-pointer"
                    >
                      Sign up
                    </button>
                  </p>
                ) : (
                  <p>
                    Already have an account?{" "}
                    <button
                      onClick={() => handleTabChange("login")}
                      className="text-[#9d84ff] hover:underline font-medium cursor-pointer"
                    >
                      Sign in
                    </button>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -z-10 blur-3xl opacity-20 bg-[#9d84ff] w-40 h-40 rounded-full top-20 -right-10"></div>
          <div className="absolute -z-10 blur-3xl opacity-20 bg-[#5bbce4] w-40 h-40 rounded-full bottom-20 -left-10"></div>
        </div>
      </div>
    </div>
  )
}

