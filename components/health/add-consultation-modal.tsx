"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X } from "lucide-react"

interface AddConsultationModalProps {
  onClose: () => void
}

export default function AddConsultationModal({ onClose }: AddConsultationModalProps) {
  const [formData, setFormData] = useState({
    matricule: "",
    dateConsultation: "",
    medecinResponsable: "",
    motifConsultation: "",
    observations: "",
    traitement: "",
    notesMedicales: "",
    contactParent: "",
    antecedents: "",
    allergies: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Consultation submitted:", formData)
    onClose()
  }

  const handleVerify = () => {
    // Handle matricule verification
    console.log("Verifying matricule:", formData.matricule)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-bold text-secondary">ENREGISTREMENT CONSULTATION</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informations générales */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground border-b border-border pb-2">Informations générales</h3>
              <div className="flex gap-2">
                <div className="flex-1">
                  <Label htmlFor="matricule">Matricule</Label>
                  <Input
                    id="matricule"
                    value={formData.matricule}
                    onChange={(e) => setFormData({ ...formData, matricule: e.target.value })}
                    placeholder="AN06-XXXX"
                    className="flex-1"
                  />
                </div>
                <Button type="button" onClick={handleVerify} className="bg-primary hover:bg-primary/90 text-white mt-6">
                  VÉRIFIER
                </Button>
              </div>
            </div>

            {/* Historique */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground border-b border-border pb-2">Historique</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dateConsultation">Date de la consultation</Label>
                  <Input
                    id="dateConsultation"
                    type="date"
                    value={formData.dateConsultation}
                    onChange={(e) => setFormData({ ...formData, dateConsultation: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="medecinResponsable">Médecin Responsable</Label>
                  <Input
                    id="medecinResponsable"
                    value={formData.medecinResponsable}
                    onChange={(e) => setFormData({ ...formData, medecinResponsable: e.target.value })}
                    placeholder="Nom du médecin"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="motifConsultation">Motif de la Consultation</Label>
                <Input
                  id="motifConsultation"
                  value={formData.motifConsultation}
                  onChange={(e) => setFormData({ ...formData, motifConsultation: e.target.value })}
                  placeholder="Motif de la consultation"
                />
              </div>
              <div>
                <Label htmlFor="observations">Observations et Diagnostic</Label>
                <textarea
                  id="observations"
                  value={formData.observations}
                  onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
                  className="w-full min-h-[80px] px-3 py-2 border border-input bg-background rounded-md text-sm"
                  placeholder="Observations et diagnostic..."
                />
              </div>
              <div>
                <Label htmlFor="traitement">Traitement Prescrit</Label>
                <textarea
                  id="traitement"
                  value={formData.traitement}
                  onChange={(e) => setFormData({ ...formData, traitement: e.target.value })}
                  className="w-full min-h-[60px] px-3 py-2 border border-input bg-background rounded-md text-sm"
                  placeholder="Traitement prescrit..."
                />
              </div>
              <div>
                <Label htmlFor="notesMedicales">Notes Médicales Supplémentaires</Label>
                <textarea
                  id="notesMedicales"
                  value={formData.notesMedicales}
                  onChange={(e) => setFormData({ ...formData, notesMedicales: e.target.value })}
                  className="w-full min-h-[60px] px-3 py-2 border border-input bg-background rounded-md text-sm"
                  placeholder="Notes médicales supplémentaires..."
                />
              </div>
            </div>

            {/* Informations Médicales */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground border-b border-border pb-2">Informations Médicales</h3>
              <div>
                <Label htmlFor="contactParent">Contact Parent</Label>
                <Input
                  id="contactParent"
                  value={formData.contactParent}
                  onChange={(e) => setFormData({ ...formData, contactParent: e.target.value })}
                  placeholder="+225"
                />
              </div>
              <div>
                <Label htmlFor="antecedents">Antécédents Médicaux</Label>
                <textarea
                  id="antecedents"
                  value={formData.antecedents}
                  onChange={(e) => setFormData({ ...formData, antecedents: e.target.value })}
                  className="w-full min-h-[60px] px-3 py-2 border border-input bg-background rounded-md text-sm"
                  placeholder="Antécédents médicaux..."
                />
              </div>
              <div>
                <Label htmlFor="allergies">Allergies</Label>
                <textarea
                  id="allergies"
                  value={formData.allergies}
                  onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                  className="w-full min-h-[60px] px-3 py-2 border border-input bg-background rounded-md text-sm"
                  placeholder="Allergies..."
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                ANNULER
              </Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90 text-white">
                ENREGISTRER
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
