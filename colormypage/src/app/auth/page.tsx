import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import { AuthUI } from "@/components/auth/auth-ui"

export default async function AuthPage() {
  // Check if user is already logged in
  const session = await getSession()

  // If user is logged in, redirect to home page
  if (session) {
    redirect("/")
  }

  return <AuthUI />
}

