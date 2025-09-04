"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"

interface AccessUser {
  id: string
  username: string
  commission: "ADMINISTRATION" | "SCIENTIFIQUE" | "SANTÉ"
}

interface EditAccessModalProps {
  user: AccessUser
  onClose: () => void
}

export default function EditAccessModal({ user, onClose }: EditAccessModalProps) {
  const [formData, setFormData] = useState({
    username: user.username,
    commission: user.commission,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.newPassword !== formData.confirmPassword) {
      alert("Les nouveaux mots de passe ne correspondent pas")
      return
    }
    // Handle form submission
    console.log("Access updated:", formData)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-bold text-secondary">MODIFIER UN ACCÈS</CardTitle>
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
                onValueChange={(value) => setFormData({ ...formData, commission: value as any })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ADMINISTRATION">ADMINISTRATION</SelectItem>
                  <SelectItem value="SCIENTIFIQUE">SCIENTIFIQUE</SelectItem>
                  <SelectItem value="SANTÉ">SANTÉ</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="oldPassword">Ancien mot de passe</Label>
              <Input
                id="oldPassword"
                type="password"
                value={formData.oldPassword}
                onChange={(e) => setFormData({ ...formData, oldPassword: e.target.value })}
                placeholder="........"
              />
            </div>

            <div>
              <Label htmlFor="newPassword">Nouveau mot de passe</Label>
              <Input
                id="newPassword"
                type="password"
                value={formData.newPassword}
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                placeholder="......"
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirmer Mot de passe</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
            </div>

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
