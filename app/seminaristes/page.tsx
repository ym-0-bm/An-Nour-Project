import DashboardLayout from "@/components/layout/dashboard-layout"
import SeminaristesTable from "@/components/seminaristes/seminaristes-table"

export default function SeminaristesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">SÉMINARISTE</h1>
            <p className="text-muted-foreground">Gestion des séminaristes du séminaire An-Nour</p>
          </div>
        </div>

        {/* Seminaristes Table */}
        <SeminaristesTable />
      </div>
    </DashboardLayout>
  )
}
