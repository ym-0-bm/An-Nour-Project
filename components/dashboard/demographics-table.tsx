import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

const demographicsData = [
  { niveau: "Niveau 1", garcons: "00", filles: "00" },
  { niveau: "Niveau 2", garcons: "00", filles: "00" },
  { niveau: "Niveau 3", garcons: "00", filles: "00" },
  { niveau: "Niveau 4", garcons: "00", filles: "00" },
  { niveau: "Niveau 5", garcons: "00", filles: "00" },
]

export default function DemographicsTable() {
  return (
    <Card className="border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-foreground">Démographie</CardTitle>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Download className="h-4 w-4" />
          Exporter
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4 text-sm font-medium text-muted-foreground border-b border-border pb-2">
            <div>Niveau</div>
            <div>Garçons</div>
            <div>Filles</div>
          </div>
          {demographicsData.map((row, index) => (
            <div key={index} className="grid grid-cols-3 gap-4 text-sm">
              <div className="font-medium text-foreground">{row.niveau}</div>
              <div className="text-secondary font-semibold">{row.garcons}</div>
              <div className="text-primary font-semibold">{row.filles}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
