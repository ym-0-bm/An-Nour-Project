"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Plus } from "lucide-react"
import Link from "next/link"

export default function AddSeminaristForm() {
  const [formData, setFormData] = useState({
    nom: "",
    prenoms: "",
    dateNaissance: "",
    genre: "",
    commune: "",
    contact: "",
    email: "",
    contactParent: "",
    statut: "",
    niveauEtude: "",
    dortoir: "",
    antecedents: "",
    allergies: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  return (
    <Card className="border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold text-secondary">AJOUT DE SÉMINARISTE</CardTitle>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Upload className="h-4 w-4" />
          Importer via CSV
        </Button>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Photo Upload */}
          <div className="flex justify-center">
            <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border cursor-pointer hover:bg-muted/80 transition-colors">
              <div className="text-center text-muted-foreground">
                <Upload className="w-8 h-8 mx-auto mb-2" />
                <div className="text-xs font-medium">AJOUTER UNE PHOTO</div>
              </div>
            </div>
          </div>

          {/* Informations générales */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground border-b border-border pb-2">Informations générales</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nom">Nom</Label>
                <Input
                  id="nom"
                  value={formData.nom}
                  onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="prenoms">Prénoms</Label>
                <Input
                  id="prenoms"
                  value={formData.prenoms}
                  onChange={(e) => setFormData({ ...formData, prenoms: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateNaissance">Date de naissance</Label>
                <Input
                  id="dateNaissance"
                  type="date"
                  value={formData.dateNaissance}
                  onChange={(e) => setFormData({ ...formData, dateNaissance: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="genre">Genre</Label>
                <Select value={formData.genre} onValueChange={(value) => setFormData({ ...formData, genre: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner le genre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="M">Masculin</SelectItem>
                    <SelectItem value="F">Féminin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="commune">Commune</Label>
                <Input
                  id="commune"
                  value={formData.commune}
                  onChange={(e) => setFormData({ ...formData, commune: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          {/* Coordonnées */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground border-b border-border pb-2">Coordonnées</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contact">Contact</Label>
                <div className="flex">
                  <div className="flex items-center px-3 bg-muted border border-r-0 rounded-l-md text-sm text-muted-foreground">
                    +225
                  </div>
                  <Input
                    id="contact"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    className="rounded-l-none"
                    placeholder="00 00 00 00 00"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactParent">Contact Parent</Label>
                <div className="flex">
                  <div className="flex items-center px-3 bg-muted border border-r-0 rounded-l-md text-sm text-muted-foreground">
                    +225
                  </div>
                  <Input
                    id="contactParent"
                    value={formData.contactParent}
                    onChange={(e) => setFormData({ ...formData, contactParent: e.target.value })}
                    className="rounded-l-none"
                    placeholder="00 00 00 00 00"
                    required
                  />
                </div>
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          {/* Catégorie */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground border-b border-border pb-2">Catégorie</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="statut">Statut</Label>
                <Select value={formData.statut} onValueChange={(value) => setFormData({ ...formData, statut: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner le statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="eleve">Élève</SelectItem>
                    <SelectItem value="etudiant">Étudiant</SelectItem>
                    <SelectItem value="professionnel">Professionnel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="niveauEtude">Niveau d'étude ou Profession</Label>
                <Input
                  id="niveauEtude"
                  value={formData.niveauEtude}
                  onChange={(e) => setFormData({ ...formData, niveauEtude: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dortoir">Dortoir</Label>
                <Select
                  value={formData.dortoir}
                  onValueChange={(value) => setFormData({ ...formData, dortoir: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner le dortoir" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dortoir1">Dortoir 1</SelectItem>
                    <SelectItem value="dortoir2">Dortoir 2</SelectItem>
                    <SelectItem value="dortoir3">Dortoir 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Informations Médicales */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground border-b border-border pb-2">Informations Médicales</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="antecedents">Antécédents Médicaux</Label>
                <Textarea
                  id="antecedents"
                  value={formData.antecedents}
                  onChange={(e) => setFormData({ ...formData, antecedents: e.target.value })}
                  placeholder="Décrire les antécédents médicaux..."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="allergies">Allergies</Label>
                <Textarea
                  id="allergies"
                  value={formData.allergies}
                  onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                  placeholder="Décrire les allergies..."
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6">
            <Button type="button" variant="outline" className="gap-2 bg-transparent">
              <Plus className="h-4 w-4" />
              AJOUTER UN AUTRE
            </Button>
            <div className="flex gap-3 sm:ml-auto">
              <Link href="/seminaristes">
                <Button type="button" variant="outline">
                  ANNULER
                </Button>
              </Link>
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                AJOUTER LE SÉMINARISTE
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
