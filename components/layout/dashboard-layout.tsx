"use client"

import type React from "react"

import { useState } from "react"
import { cn } from "@/lib/utils"
import Sidebar from "./sidebar"
import Header from "./header"
import ProtectedRoute from "@/components/auth/protected-route"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        {/* Sidebar */}
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

        {/* Main Content */}
        <div className={cn("transition-all duration-300", "lg:ml-64")}>
          <Header onMenuClick={() => setSidebarOpen(true)} />
          <main className="p-6">{children}</main>
        </div>

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}
      </div>
    </ProtectedRoute>
  )
}
