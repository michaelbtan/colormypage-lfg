interface DashboardHeaderProps {
  title: string
  description?: string
  userEmail: string | null
}

export function DashboardHeader({ title, description, userEmail }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h1>
        {description && <p className="mt-1 text-lg text-gray-500">{description}</p>}
      </div>

      {userEmail && (
        <div className="mt-4 md:mt-0">
          <p className="text-lg text-gray-500">
            Logged in as <span className="font-medium text-gray-900">{userEmail}</span>
          </p>
        </div>
      )}
    </div>
  )
}

