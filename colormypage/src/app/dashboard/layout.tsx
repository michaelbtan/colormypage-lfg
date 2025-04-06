import type React from "react"

export const metadata = {
  title: "Dashboard - ColorMyPage",
  description: "Manage your favorite coloring pages and account settings.",
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // TEMPORARY: Bypassing authentication check for development
  // In production, this would check for a valid session

  // Create a mock user for UI display purposes
  const mockUser = {
    id: "mock-user-id",
    email: "demo@colormypage.com",
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Alert banner to indicate this is a demo mode */}
      <div className="fixed top-0 left-0 right-0 bg-yellow-400 text-yellow-900 py-1 px-4 text-center z-50">
        <p className="text-sm font-medium">⚠️ Demo Mode: Authentication temporarily disabled for development</p>
      </div>

      <main className="p-4 md:p-6 max-w-7xl mx-auto mt-12">{children}</main>
    </div>
  )
}

