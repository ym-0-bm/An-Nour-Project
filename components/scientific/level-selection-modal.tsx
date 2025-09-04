"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

interface LevelSelectionModalProps {
  onClose: () => void
  onSelectLevel: (level: string) => void
}

export default function LevelSelectionModal({ onClose, onSelectLevel }: LevelSelectionModalProps) {
  const [selectedLevel, setSelectedLevel] = useState("")

  const handleConfirm = () => {
    if (selectedLevel) {
      onSelectLevel(selectedLevel)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-secondary">Choix du niveau pour ajouter les notes</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Select value={selectedLevel} onValueChange={setSelectedLevel}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner le niveau" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="niveau1">Niveau 1</SelectItem>
              <SelectItem value="niveau2">Niveau 2</SelectItem>
              <SelectItem value="niveau3">Niveau 3</SelectItem>
              <SelectItem value="niveau4">Niveau 4</SelectItem>
              <SelectItem value="niveau5">Niveau 5</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              ANNULER
            </Button>
            <Button onClick={handleConfirm} disabled={!selectedLevel} className="flex-1 bg-primary hover:bg-primary/90">
              OK
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
