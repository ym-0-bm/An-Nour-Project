import DashboardLayout from "@/components/layout/dashboard-layout"
import HealthStats from "@/components/health/health-stats"
import HealthDemographics from "@/components/health/health-demographics"
import RecentConsultations from "@/components/health/recent-consultations"

export default function SantePage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Vue d'ensemble des consultations médicales</p>
          </div>
        </div>

        {/* Health Statistics */}
        <HealthStats />

        {/* Demographics and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <HealthDemographics />
          <RecentConsultations />
        </div>
      </div>
    </DashboardLayout>
  )
}
