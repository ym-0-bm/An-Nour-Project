import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Users, Calendar, Activity } from "lucide-react"

const healthStats = [
  {
    title: "Totales Séminaristes",
    value: "000",
    icon: Users,
    color: "text-primary",
  },
  {
    title: "Totales Consultations",
    value: "000",
    icon: Heart,
    color: "text-secondary",
  },
  {
    title: "Consultations Aujourd'hui",
    value: "88",
    icon: Calendar,
    color: "text-accent",
  },
  {
    title: "Consultations Actives",
    value: "000",
    icon: Activity,
    color: "text-muted-foreground",
  },
]

const genderStats = [
  {
    title: "Séminaristes Masculins",
    value: "000",
    subtitle: "Consultations",
  },
  {
    title: "Séminaristes Féminins",
    value: "000",
    subtitle: "Consultations",
  },
  {
    title: "Séminaristes Pépinières",
    value: "000",
    subtitle: "Consultations",
  },
]

export default function HealthStats() {
  return (
    <div className="space-y-4">
      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {healthStats.map((stat, index) => (
          <Card key={index} className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Gender-based Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {genderStats.map((stat, index) => (
          <Card key={index} className="border-border">
            <CardHeader className="space-y-1">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.subtitle}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
