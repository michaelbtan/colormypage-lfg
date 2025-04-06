"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const router = useRouter()

  useEffect(() => {
    // We need to use client-side navigation here to preserve the state
    router.push("/auth")

    // This is a hack to communicate with the auth page to show the signup tab
    // In a real app, you might use URL parameters or a state management solution
    window.localStorage.setItem("auth_tab", "signup")
  }, [router])

  return <div className="min-h-screen flex items-center justify-center">Redirecting...</div>
}

