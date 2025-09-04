import DashboardLayout from "@/components/layout/dashboard-layout"
import DashboardStats from "@/components/dashboard/dashboard-stats"
import DemographicsTable from "@/components/dashboard/demographics-table"
import RecentRegistrations from "@/components/dashboard/recent-registrations"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Vue d'ensemble du séminaire An-Nour</p>
          </div>
        </div>

        {/* Statistics Cards */}
        <DashboardStats />

        {/* Demographics and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DemographicsTable />
          <RecentRegistrations />
        </div>
      </div>
    </DashboardLayout>
  )
}
