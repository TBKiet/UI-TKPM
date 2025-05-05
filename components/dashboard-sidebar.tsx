"use client"

import { useState } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Film, FolderOpen, LogOut, Menu } from "lucide-react"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { useIsMobile } from "@/hooks/use-mobile"

interface DashboardSidebarProps {
  activePage: string
  setActivePage: (page: string) => void
  onAccountClick: () => void
}

export default function DashboardSidebar({ activePage, setActivePage, onAccountClick }: DashboardSidebarProps) {
  const isMobile = useIsMobile()
  const [open, setOpen] = useState(false)

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "create", label: "Create Video", icon: Film },
    { id: "projects", label: "Projects", icon: FolderOpen },
  ]

  const sidebarContent = (
    <>
      <SidebarHeader className="flex items-center justify-center py-6">
        <div className="flex items-center gap-2">
          <Film className="h-6 w-6 text-blue-700" />
          <h1 className="text-xl font-bold text-blue-700">Science Video Creator</h1>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                isActive={activePage === item.id}
                onClick={() => setActivePage(item.id)}
                className="gap-3"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="mt-auto border-t p-4">
        <div className="flex items-center gap-3 cursor-pointer" onClick={onAccountClick}>
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-sm font-medium">Jane Doe</p>
            <p className="text-xs text-muted-foreground">jane.doe@example.com</p>
          </div>
          <Button variant="ghost" size="icon" aria-label="Account settings">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </SidebarFooter>
    </>
  )

  if (isMobile) {
    return (
      <>
        <Button variant="ghost" size="icon" className="fixed left-4 top-4 z-50 md:hidden" onClick={() => setOpen(true)}>
          <Menu className="h-6 w-6" />
        </Button>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="left" className="p-0 w-[250px]">
            {sidebarContent}
          </SheetContent>
        </Sheet>
      </>
    )
  }

  return (
    <Sidebar className="w-[250px] border-r">
      {sidebarContent}
      <SidebarRail />
    </Sidebar>
  )
}
