import DashboardLayout from "@/components/layout/dashboard-layout"
import HealthSeminaristesTable from "@/components/health/health-seminaristes-table"

export default function SanteSeminaristesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">SÉMINARISTE</h1>
            <p className="text-muted-foreground">Gestion médicale des séminaristes</p>
          </div>
        </div>

        <HealthSeminaristesTable />
      </div>
    </DashboardLayout>
  )
}
