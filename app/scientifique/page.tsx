import DashboardLayout from "@/components/layout/dashboard-layout"
import ScientificStats from "@/components/scientific/scientific-stats"
import NotesTable from "@/components/scientific/notes-table"

export default function ScientifiquePage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">SCIENTIFIQUE</h1>
            <p className="text-muted-foreground">Gestion des notes et évaluations des séminaristes</p>
          </div>
        </div>

        {/* Statistics */}
        <ScientificStats />

        {/* Notes Management */}
        <NotesTable />
      </div>
    </DashboardLayout>
  )
}
