import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Users, BookOpen, Award } from "lucide-react"

const stats = [
  {
    title: "Totales Séminaristes",
    value: "000",
    icon: Users,
    color: "text-primary",
  },
  {
    title: "Notes Saisies",
    value: "000",
    icon: BookOpen,
    color: "text-secondary",
  },
  {
    title: "Bulletins Générés",
    value: "000",
    icon: Award,
    color: "text-accent",
  },
  {
    title: "Moyenne Générale",
    value: "00.00",
    icon: GraduationCap,
    color: "text-muted-foreground",
  },
]

export default function ScientificStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
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
  )
}
