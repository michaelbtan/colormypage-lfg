import { redirect } from "next/navigation"

export default function LoginPage() {
  // Redirect to the auth page with the login tab active
  redirect("/auth")
}

