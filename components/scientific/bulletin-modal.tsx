"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Download } from "lucide-react"

interface BulletinModalProps {
  seminarist: any
  onClose: () => void
}

export default function BulletinModal({ seminarist, onClose }: BulletinModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-bold text-secondary">BULLETIN DES NOTES</CardTitle>
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
                <div className="text-foreground font-medium">{seminarist.matricule}</div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Date de naissance</label>
                <div className="text-foreground">00/00/0000</div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Nom & Prénoms</label>
                <div className="text-foreground font-medium">{seminarist.nom}</div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Genre</label>
                <div>
                  <Badge variant={seminarist.genre === "M" ? "default" : "secondary"}>{seminarist.genre}</Badge>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Niveau</label>
                <div className="text-foreground">{seminarist.niveau}</div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Dortoir</label>
                <div className="text-foreground">Dortoir 1</div>
              </div>
            </div>
          </div>

          {/* Notes et Évaluations */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground border-b border-border pb-2">Évaluations</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <div className="font-medium text-foreground">NOTE 1</div>
                  <div className="text-sm text-muted-foreground">XXXX</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-primary">{seminarist.note1},00</div>
                  <div className="text-sm text-muted-foreground">APPRÉCIATIONS</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <div className="font-medium text-foreground">NOTE 2</div>
                  <div className="text-sm text-muted-foreground">XXXX</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-primary">{seminarist.note2},00</div>
                  <div className="text-sm text-muted-foreground">APPRÉCIATIONS</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <div className="font-medium text-foreground">NOTE 3</div>
                  <div className="text-sm text-muted-foreground">XXXX</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-primary">{seminarist.note3},00</div>
                  <div className="text-sm text-muted-foreground">APPRÉCIATIONS</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg border border-primary/20">
                <div>
                  <div className="font-bold text-foreground">CONDUITE</div>
                  <div className="text-sm text-muted-foreground">XXXX</div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-primary">{seminarist.moyenne}</div>
                  <div className="text-sm text-muted-foreground">MOYENNE GÉNÉRALE</div>
                </div>
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
