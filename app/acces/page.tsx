"use client"

import { useState } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Download, Plus, Edit, Trash2 } from "lucide-react"
import CreateAccessModal from "@/components/access/create-access-modal"
import EditAccessModal from "@/components/access/edit-access-modal"
import DeleteAccessModal from "@/components/access/delete-access-modal"

interface AccessUser {
  id: string
  username: string
  commission: "ADMINISTRATION" | "SCIENTIFIQUE" | "SANTÉ"
}

export default function AccessManagementPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<AccessUser | null>(null)

  // Mock data
  const [users] = useState<AccessUser[]>([
    { id: "1", username: "admin1", commission: "ADMINISTRATION" },
    { id: "2", username: "scientifique1", commission: "SCIENTIFIQUE" },
    { id: "3", username: "sante1", commission: "SANTÉ" },
    { id: "4", username: "scientifique2", commission: "SCIENTIFIQUE" },
    { id: "5", username: "admin2", commission: "ADMINISTRATION" },
    { id: "6", username: "sante2", commission: "SANTÉ" },
  ])

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.commission.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleEdit = (user: AccessUser) => {
    setSelectedUser(user)
    setShowEditModal(true)
  }

  const handleDelete = (user: AccessUser) => {
    setSelectedUser(user)
    setShowDeleteModal(true)
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
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold text-secondary">GESTION DES ACCÈS</h1>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Download className="h-4 w-4" />
              EXPORTER
            </Button>
            <Button
              onClick={() => setShowCreateModal(true)}
              className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              CRÉER UN ACCÈS
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Recherche..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="text-sm text-muted-foreground">TOUS {filteredUsers.length.toString().padStart(3, "0")}</div>
        </div>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              1-{Math.min(10, filteredUsers.length)} sur {filteredUsers.length} accès
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">COMMISSION</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">NOM D'UTILISATEUR</th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">
                        <Badge className={getCommissionColor(user.commission)}>{user.commission}</Badge>
                      </td>
                      <td className="py-3 px-4 text-foreground">{user.username}</td>
                      <td className="py-3 px-4">
                        <div className="flex justify-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(user)}
                            className="text-primary hover:text-primary/80"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(user)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-6">
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
                {Math.ceil(filteredUsers.length / 10)
                  .toString()
                  .padStart(3, "0")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      {showCreateModal && <CreateAccessModal onClose={() => setShowCreateModal(false)} />}
      {showEditModal && selectedUser && (
        <EditAccessModal
          user={selectedUser}
          onClose={() => {
            setShowEditModal(false)
            setSelectedUser(null)
          }}
        />
      )}
      {showDeleteModal && selectedUser && (
        <DeleteAccessModal
          user={selectedUser}
          onClose={() => {
            setShowDeleteModal(false)
            setSelectedUser(null)
          }}
        />
      )}
    </DashboardLayout>
  )
}
