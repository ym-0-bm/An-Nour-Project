import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCheck, UserX, GraduationCap } from "lucide-react"

const stats = [
  {
    title: "Totales Séminaristes",
    value: "000",
    icon: Users,
    color: "text-primary",
  },
  {
    title: "Séminaristes Masculins",
    value: "000",
    icon: UserCheck,
    color: "text-secondary",
  },
  {
    title: "Séminaristes Féminins",
    value: "000",
    icon: UserX,
    color: "text-accent",
  },
  {
    title: "Séminaristes Pépinières",
    value: "000",
    icon: GraduationCap,
    color: "text-muted-foreground",
  },
]

export default function DashboardStats() {
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
