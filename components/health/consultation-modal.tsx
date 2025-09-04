"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Download } from "lucide-react"

interface ConsultationModalProps {
  consultation: any
  onClose: () => void
}

export default function ConsultationModal({ consultation, onClose }: ConsultationModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-bold text-secondary">FICHE DE CONSULTATION</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Photo placeholder */}
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
              <div className="text-center text-muted-foreground">
                <div className="w-6 h-6 mx-auto mb-1 bg-muted-foreground/20 rounded"></div>
                <div className="text-xs">Photo</div>
              </div>
            </div>
          </div>

          {/* Informations générales */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground border-b border-border pb-2">Informations générales</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Matricule</label>
                <div className="text-foreground font-medium">{consultation.matricule}</div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Date de naissance</label>
                <div className="text-foreground">00/00/0000</div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Nom & Prénoms</label>
                <div className="text-foreground font-medium">{consultation.nom}</div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Genre</label>
                <div>
                  <Badge variant={consultation.genre === "M" ? "default" : "secondary"}>{consultation.genre}</Badge>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Niveau</label>
                <div className="text-foreground">{consultation.niveau}</div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Dortoir</label>
                <div className="text-foreground">Dortoir 1</div>
              </div>
            </div>
          </div>

          {/* Historique */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground border-b border-border pb-2">Historique</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Date de la consultation</label>
                <div className="text-foreground">0000/00/00</div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Médecin Responsable</label>
                <div className="text-foreground">XXXXXX XXXXXXXXX XXXXXXX</div>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-muted-foreground">Motif de la Consultation</label>
                <div className="text-foreground">XXXXXX XXXXXXX</div>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-muted-foreground">Observations et Diagnostic</label>
                <div className="text-foreground">XXXXXXXXXXX XXXXXXXXX XXXXXXXXX XXXXXXXXXXXX XXXXXXX XXXXXXXXXX</div>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-muted-foreground">Traitement Prescrit</label>
                <div className="text-foreground">XXXXXXX XXXXXXX XXXXXXXXXX XXXX</div>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-muted-foreground">Notes Médicales Supplémentaires</label>
                <div className="text-foreground">-</div>
              </div>
            </div>
          </div>

          {/* Informations Médicales */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground border-b border-border pb-2">Informations Médicales</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Contact Parent</label>
                <div className="text-foreground">+225 00 00 00 00 00</div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Antécédents Médicaux</label>
                <div className="text-foreground">Exemple d'antécédents médicaux</div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Allergies</label>
                <div className="text-foreground">Exemple d'allergie</div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" className="gap-2 bg-transparent">
              <Download className="h-4 w-4" />
              Exporter en PDF
            </Button>
            <Button onClick={onClose} className="bg-primary hover:bg-primary/90 ml-auto">
              FERMER
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
