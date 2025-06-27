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

  return (
    <div className="min-h-screen">
      {/* Alert banner to indicate this is a demo mode */}
      <main className="p-4 md:p-6 max-w-7xl mx-auto">{children}</main>
    </div>
  )
}

