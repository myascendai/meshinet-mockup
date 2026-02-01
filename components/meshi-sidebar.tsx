"use client"

import Image from "next/image"
import { Activity, Network, Settings, BookOpen, LogOut, PanelLeftClose } from "lucide-react"
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
  useSidebar,
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
  const { toggleSidebar } = useSidebar()
  
  const handleLogout = () => {
    alert("Logout clicked - This is a mock logout action")
  }

  return (
    <Sidebar>
      <SidebarHeader className="p-4 flex-row items-center justify-between">
        <div className="flex items-center gap-3 overflow-hidden">
          <Image
            src="/meshi-logo.png"
            alt="Meshi Logo"
            width={40}
            height={40}
            className="rounded-lg shrink-0"
          />
          <div className="min-w-0">
            <h1 className="text-lg font-semibold text-sidebar-foreground truncate">Meshi</h1>
            <p className="text-xs text-muted-foreground truncate">AI Agent Dashboard</p>
          </div>
        </div>
        <button 
          onClick={toggleSidebar}
          className="p-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md transition-colors"
          title="Collapse Sidebar"
        >
          <PanelLeftClose className="size-4" />
        </button>
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
