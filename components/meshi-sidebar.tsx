"use client"

import Image from "next/image"
import { Activity, Network, Settings, BookOpen, LogOut } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"

interface MeshiSidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const navItems = [
  {
    id: "monitor",
    label: "Live Monitor",
    icon: Activity,
  },
  {
    id: "network",
    label: "Network",
    icon: Network,
  },
  {
    id: "memories",
    label: "Memories",
    icon: BookOpen,
  },
  {
    id: "config",
    label: "Configure",
    icon: Settings,
  },
]

export function MeshiSidebar({ activeTab, onTabChange }: MeshiSidebarProps) {
  const handleLogout = () => {
    alert("Logout clicked - This is a mock logout action")
  }

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <Image
            src="/meshi-logo.png"
            alt="Meshi Logo"
            width={40}
            height={40}
            className="rounded-lg"
          />
          <div>
            <h1 className="text-lg font-semibold text-sidebar-foreground">Meshi</h1>
            <p className="text-xs text-muted-foreground">AI Agent Dashboard</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={activeTab === item.id}
                    onClick={() => onTabChange(item.id)}
                    tooltip={item.label}
                  >
                    <item.icon className="size-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarSeparator />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              tooltip="Logout"
              className="text-muted-foreground hover:text-destructive"
            >
              <LogOut className="size-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
