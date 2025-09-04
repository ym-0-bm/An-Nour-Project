"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Plus } from "lucide-react"

interface CreateAccessModalProps {
  onClose: () => void
}

export default function CreateAccessModal({ onClose }: CreateAccessModalProps) {
  const [formData, setFormData] = useState({
    username: "",
    commission: "",
    password: "",
    confirmPassword: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas")
      return
    }
    // Handle form submission
    console.log("Access created:", formData)
    onClose()
  }

  const handleAddAnother = () => {
    // Handle adding another access
    console.log("Access created:", formData)
    setFormData({
      username: "",
      commission: "",
      password: "",
      confirmPassword: "",
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-bold text-secondary">CRÉER UN ACCÈS</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="username">Nom d'utilisateur</Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="commission">Commission</Label>
              <Select
                value={formData.commission}
                onValueChange={(value) => setFormData({ ...formData, commission: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une commission" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ADMINISTRATION">ADMINISTRATION</SelectItem>
                  <SelectItem value="SCIENTIFIQUE">SCIENTIFIQUE</SelectItem>
                  <SelectItem value="SANTÉ">SANTÉ</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirmer Mot de passe</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
              />
            </div>

            <div className="flex justify-between gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleAddAnother}
                className="flex items-center gap-2 bg-transparent"
              >
                <Plus className="h-4 w-4" />
                AJOUTER UN AUTRE
              </Button>
              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={onClose}>
                  ANNULER
                </Button>
                <Button type="submit" className="bg-primary hover:bg-primary/90 text-white">
                  AJOUTER L'ACCÈS
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
