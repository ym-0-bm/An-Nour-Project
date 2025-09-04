"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type UserRole = "SUPER_ADMIN" | "ADMINISTRATION" | "SCIENTIFIQUE" | "SANTE" | "FINANCE"

interface User {
  id: string
  email: string
  name: string
  role: UserRole
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const mockUsers: Record<string, User> = {
  "superadmin@annour.com": {
    id: "1",
    email: "superadmin@annour.com",
    name: "Super Admin",
    role: "SUPER_ADMIN",
  },
  "admin@annour.com": {
    id: "2",
    email: "admin@annour.com",
    name: "Administrateur",
    role: "ADMINISTRATION",
  },
  "scientifique@annour.com": {
    id: "3",
    email: "scientifique@annour.com",
    name: "Comité Scientifique",
    role: "SCIENTIFIQUE",
  },
  "sante@annour.com": {
    id: "4",
    email: "sante@annour.com",
    name: "Comité Santé",
    role: "SANTE",
  },
  "finance@annour.com": {
    id: "5",
    email: "finance@annour.com",
    name: "Comité Finance",
    role: "FINANCE",
  },
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem("an-nour-user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication
    const user = mockUsers[email]
    if (user) {
      setUser(user)
      localStorage.setItem("an-nour-user", JSON.stringify(user))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("an-nour-user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
