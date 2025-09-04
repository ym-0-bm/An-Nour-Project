import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const recentConsultations = [
  {
    matricule: "AN06-XXXX",
    nom: "XXXXX XXXXXXX XXXXXX",
    genre: "M",
    dortoir: "XXXXXXX",
    motif: "XXXXXXX",
    date: "20 Déc, 17:50",
  },
  {
    matricule: "AN06-XXXX",
    nom: "XXXXXX XXXXXXXXX",
    genre: "F",
    dortoir: "XXXXXXX",
    motif: "XXXXXXX",
    date: "20 Déc, 17:46",
  },
  {
    matricule: "AN06-XXXX",
    nom: "XXXX XXXXXXXXXX XXXX",
    genre: "M",
    dortoir: "XXXXXXX",
    motif: "XXXXXXX",
    date: "20 Déc, 17:43",
  },
  {
    matricule: "AN06-XXXX",
    nom: "XXXXXXXX XXXXXXXX",
    genre: "F",
    dortoir: "XXXXXXX",
    motif: "XXXXXXX",
    date: "20 Déc, 17:41",
  },
  {
    matricule: "AN06-XXXX",
    nom: "XXXX XXXXX X",
    genre: "M",
    dortoir: "XXXXXXX",
    motif: "XXXXXXX",
    date: "20 Déc, 17:40",
  },
]

export default function RecentConsultations() {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">Consultations récentes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentConsultations.map((consultation, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">{consultation.matricule}</span>
                  <Badge variant={consultation.genre === "M" ? "default" : "secondary"} className="text-xs">
                    {consultation.genre}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">{consultation.nom}</div>
                <div className="text-xs text-muted-foreground">Motif: {consultation.motif}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">{consultation.date}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
