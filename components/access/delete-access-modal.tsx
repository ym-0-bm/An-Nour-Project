"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, AlertTriangle } from "lucide-react"

interface AccessUser {
  id: string
  username: string
  commission: "ADMINISTRATION" | "SCIENTIFIQUE" | "SANTÉ"
}

interface DeleteAccessModalProps {
  user: AccessUser
  onClose: () => void
}

export default function DeleteAccessModal({ user, onClose }: DeleteAccessModalProps) {
  const handleDelete = () => {
    // Handle deletion
    console.log("Access deleted:", user)
    onClose()
  }

  const getCommissionColor = (commission: string) => {
    switch (commission) {
      case "ADMINISTRATION":
        return "bg-secondary text-white"
      case "SCIENTIFIQUE":
        return "bg-primary text-white"
      case "SANTÉ":
        return "bg-green-600 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-bold text-secondary">SUPPRIMER L'ACCÈS</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex items-center gap-3 text-amber-600">
            <AlertTriangle className="h-5 w-5" />
            <p className="font-medium">Vous êtes sur le point de supprimer cet utilisateur</p>
          </div>

          <div className="space-y-3 p-4 bg-muted rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Nom d'utilisateur</span>
              <span className="font-medium">{user.username}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Commission</span>
              <Badge className={getCommissionColor(user.commission)}>{user.commission}</Badge>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onClose}>
              ANNULER
            </Button>
            <Button onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white">
              SUPPRIMER
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
