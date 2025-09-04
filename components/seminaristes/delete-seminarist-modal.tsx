"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

interface DeleteSeminaristModalProps {
  seminarist: any
  onClose: () => void
  onConfirm: () => void
}

export default function DeleteSeminaristModal({ seminarist, onClose, onConfirm }: DeleteSeminaristModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="h-6 w-6 text-destructive" />
          </div>
          <CardTitle className="text-xl font-bold text-destructive">SUPPRIMER LE SÉMINARISTE</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-center text-muted-foreground">Vous êtes sur le point de supprimer le séminariste</p>

          <div className="bg-muted/50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium text-muted-foreground">Matricule:</span>
              <span className="text-sm text-foreground">{seminarist.matricule}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium text-muted-foreground">Nom:</span>
              <span className="text-sm text-foreground">{seminarist.nom}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium text-muted-foreground">Prénoms:</span>
              <span className="text-sm text-foreground">{seminarist.prenoms}</span>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              ANNULER
            </Button>
            <Button variant="destructive" onClick={onConfirm} className="flex-1">
              SUPPRIMER
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
