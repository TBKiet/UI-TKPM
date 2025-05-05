"use client"

import { useState } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import DashboardSidebar from "@/components/dashboard-sidebar"
import DashboardContent from "@/components/dashboard-content"
import LoginPage from "@/components/login-page"
import { Toaster } from "@/components/ui/toaster"

export default function Dashboard() {
  const [activePage, setActivePage] = useState("create")
  const [showLogin, setShowLogin] = useState(false)

  const handleAccountClick = () => {
    setShowLogin(true)
  }

  if (showLogin) {
    return (
      <>
        <LoginPage onBack={() => setShowLogin(false)} />
        <Toaster />
      </>
    )
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50">
        <DashboardSidebar activePage={activePage} setActivePage={setActivePage} onAccountClick={handleAccountClick} />
        <DashboardContent activePage={activePage} />
      </div>
      <Toaster />
    </SidebarProvider>
  )
}
