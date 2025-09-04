import DashboardLayout from "@/components/layout/dashboard-layout"
import AddSeminaristForm from "@/components/seminaristes/add-seminarist-form"

export default function AjouterSeminaristePage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">SÉMINARISTE</h1>
            <p className="text-muted-foreground">Ajouter un nouveau séminariste</p>
          </div>
        </div>

        <AddSeminaristForm />
      </div>
    </DashboardLayout>
  )
}
