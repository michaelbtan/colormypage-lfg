import { Suspense } from "react"
import { AuthUI } from "@/components/auth/auth-ui"

export const metadata = {
  title: "Sign In or Create Account",
  description:
    "Join ColorMyPage to access thousands of free coloring pages, save your favorites, and share your creations with our community.",
};

export default function AccountPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthUI />
    </Suspense>
  )
}
