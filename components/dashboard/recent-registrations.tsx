import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const recentRegistrations = [
  {
    matricule: "AN06-XXXX",
    nom: "XXXXX XXXXXXX XXXXXX",
    genre: "M",
    dortoir: "XXXXXXX",
    lieu: "XXXXXXX",
    date: "20 Déc, 17:50",
  },
  {
    matricule: "AN06-XXXX",
    nom: "XXXXXX XXXXXXXXX XXXXXXX",
    genre: "F",
    dortoir: "XXXXXXX",
    lieu: "XXXXXXX",
    date: "20 Déc, 17:46",
  },
  {
    matricule: "AN06-XXXX",
    nom: "XXXX XXXXXXXXXX XXXX",
    genre: "M",
    dortoir: "XXXXXXX",
    lieu: "XXXXXXX",
    date: "20 Déc, 17:43",
  },
  {
    matricule: "AN06-XXXX",
    nom: "XXXXXXXX XXXXXXXX",
    genre: "F",
    dortoir: "XXXXXXX",
    lieu: "XXXXXXX",
    date: "20 Déc, 17:41",
  },
  {
    matricule: "AN06-XXXX",
    nom: "XXXX XXXXX X",
    genre: "M",
    dortoir: "XXXXXXX",
    lieu: "XXXXXXX",
    date: "20 Déc, 17:40",
  },
]

export default function RecentRegistrations() {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">Enregistrements récents</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentRegistrations.map((registration, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">{registration.matricule}</span>
                  <Badge variant={registration.genre === "M" ? "default" : "secondary"} className="text-xs">
                    {registration.genre}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">{registration.nom}</div>
                <div className="text-xs text-muted-foreground">{registration.lieu}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">{registration.date}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
