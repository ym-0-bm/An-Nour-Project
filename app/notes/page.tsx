import DashboardLayout from "@/components/layout/dashboard-layout"
import NotesManagement from "@/components/scientific/notes-management"

export default function NotesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">NOTES</h1>
            <p className="text-muted-foreground">Gestion des notes et évaluations</p>
          </div>
        </div>

        <NotesManagement />
      </div>
    </DashboardLayout>
  )
}
