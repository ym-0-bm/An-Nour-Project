import DashboardLayout from "@/components/layout/dashboard-layout"
import ConsultationsTable from "@/components/health/consultations-table"

export default function ConsultationsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">CONSULTATIONS</h1>
            <p className="text-muted-foreground">Gestion des consultations médicales</p>
          </div>
        </div>

        <ConsultationsTable />
      </div>
    </DashboardLayout>
  )
}
