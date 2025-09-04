"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Download, Plus } from "lucide-react"
import LevelSelectionModal from "./level-selection-modal"

// Mock data
const seminaristes = [
  {
    id: "1",
    matricule: "AN06-XXXX",
    nom: "XXXX XXXX",
    genre: "M",
    niveau: "XXXX",
    note1: "00",
    note2: "00",
    note3: "00",
  },
  {
    id: "2",
    matricule: "AN06-XXXX",
    nom: "XXXX XXXX",
    genre: "F",
    niveau: "XXXX",
    note1: "00",
    note2: "00",
    note3: "00",
  },
]

export default function NotesManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("tous")
  const [selectedDortoir, setSelectedDortoir] = useState("tous")
  const [selectedNiveau, setSelectedNiveau] = useState("tous")
  const [showLevelModal, setShowLevelModal] = useState(false)

  return (
    <>
      <Card className="border-border">
        <CardHeader className="space-y-4">
          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Recherche..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tous">TOUS</SelectItem>
                  <SelectItem value="M">Masculin</SelectItem>
                  <SelectItem value="F">Féminin</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedDortoir} onValueChange={setSelectedDortoir}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Dortoir" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tous">TOUS</SelectItem>
                  <SelectItem value="Dortoir 1">Dortoir 1</SelectItem>
                  <SelectItem value="Dortoir 2">Dortoir 2</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedNiveau} onValueChange={setSelectedNiveau}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Niveau" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tous">TOUS</SelectItem>
                  <SelectItem value="1">Niveau 1</SelectItem>
                  <SelectItem value="2">Niveau 2</SelectItem>
                  <SelectItem value="3">Niveau 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:justify-between sm:items-center">
            <div className="flex gap-2">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                TOUS {seminaristes.length.toString().padStart(3, "0")}
              </Badge>
              <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/20">
                FORMATION {seminaristes.length.toString().padStart(3, "0")}
              </Badge>
              <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                PÉPINIÈRE 000
              </Badge>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Download className="h-4 w-4" />
                EXPORTER
              </Button>
              <Button
                size="sm"
                className="gap-2 bg-primary hover:bg-primary/90"
                onClick={() => setShowLevelModal(true)}
              >
                <Plus className="h-4 w-4" />
                AJOUTER DES NOTES
              </Button>
            </div>
          </div>

          {/* Results count */}
          <div className="text-sm text-muted-foreground">
            1-{Math.min(10, seminaristes.length)} sur {seminaristes.length.toString().padStart(3, "0")} séminaristes
          </div>
        </CardHeader>

        <CardContent>
          {/* Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>MATRICULE</TableHead>
                  <TableHead>NOM & PRÉNOMS</TableHead>
                  <TableHead>GENRE</TableHead>
                  <TableHead>NIVEAU</TableHead>
                  <TableHead>NOTE 1</TableHead>
                  <TableHead>NOTE 2</TableHead>
                  <TableHead>NOTE 3</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {seminaristes.map((seminarist) => (
                  <TableRow key={seminarist.id}>
                    <TableCell className="font-medium">{seminarist.matricule}</TableCell>
                    <TableCell>{seminarist.nom}</TableCell>
                    <TableCell>
                      <Badge variant={seminarist.genre === "M" ? "default" : "secondary"}>{seminarist.genre}</Badge>
                    </TableCell>
                    <TableCell>{seminarist.niveau}</TableCell>
                    <TableCell className="text-center font-semibold">{seminarist.note1}</TableCell>
                    <TableCell className="text-center font-semibold">{seminarist.note2}</TableCell>
                    <TableCell className="text-center font-semibold">{seminarist.note3}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <Button variant="outline" size="sm">
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              3
            </Button>
            <span className="text-muted-foreground">...</span>
            <Button variant="outline" size="sm">
              000
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Level Selection Modal */}
      {showLevelModal && (
        <LevelSelectionModal
          onClose={() => setShowLevelModal(false)}
          onSelectLevel={(level) => {
            setShowLevelModal(false)
            // Handle level selection
          }}
        />
      )}
    </>
  )
}
