"use client"

import Image from "next/image"
import { Activity, Network, Settings, BookOpen, LogOut, PanelLeftClose, PanelLeft } from "lucide-react"
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
  const { toggleSidebar, state } = useSidebar()
  const isCollapsed = state === "collapsed"
  
  const handleLogout = () => {
    alert("Logout clicked - This is a mock logout action")
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-2">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3 overflow-hidden">
            <Image
              src="/meshi-logo.png"
              alt="Meshi Logo"
              width={32}
              height={32}
              className="rounded-lg shrink-0"
            />
            {!isCollapsed && (
              <div className="min-w-0">
                <h1 className="text-lg font-semibold text-sidebar-foreground truncate">Meshi</h1>
                <p className="text-xs text-muted-foreground truncate">AI Agent Dashboard</p>
              </div>
            )}
          </div>
          {!isCollapsed && (
            <button 
              onClick={toggleSidebar}
              className="p-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md transition-colors shrink-0"
              title="Collapse Sidebar"
            >
              <PanelLeftClose className="size-4" />
            </button>
          )}
        </div>
        {isCollapsed && (
          <button 
            onClick={toggleSidebar}
            className="p-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md transition-colors w-full flex justify-center"
            title="Expand Sidebar"
          >
            <PanelLeft className="size-4" />
          </button>
        )}
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
