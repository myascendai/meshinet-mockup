"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ActivitySummaryModal } from "@/components/activity-summary-modal"
import { AgentOrb } from "@/components/agent-orb"
import { WorkflowLog } from "@/components/workflow-log"
import { ActionQueue } from "@/components/action-queue"
import { AgentConfig } from "@/components/agent-config"
import { TheEther } from "@/components/ether/the-ether"
import { UserGoals } from "@/components/user-goals"
import { AgentMemories } from "@/components/agent-memories"
import { Zap } from "lucide-react"
import { IntegrityScoreDialog } from "@/components/integrity-score-dialog"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { MeshiSidebar } from "@/components/meshi-sidebar"

const initialWorkflows = [
  {
    id: "1",
    title: "Find 1 Video Editor for Q3 Project",
    status: "active" as const,
    progress: 45
  },
  {
    id: "2",
    title: "Maintain Calendar buffer",
    status: "passive" as const,
    statusText: "Active"
  },
  {
    id: "3",
    title: "Verify Yesterday's Zoom Attendance",
    status: "completed" as const
  }
]

const initialActions = [
  {
    id: "1",
    type: "reply" as const,
    title: "Drafted Reply to John",
    description: "Re: Q3 Project Timeline Discussion",
    agentReasoning: "High-priority connection with recurring collaboration history. Professional tone maintained, timeline commitment deferred pending calendar review.",
    metadata: {
      from: "john.martinez@creativetech.io",
      subject: "Q3 Project Timeline Discussion",
      sentiment: "urgent",
      originalMessage: "Hey Alex, hope you're doing well! I wanted to touch base about the Q3 project we discussed last month. We're looking at a mid-September kickoff and would love to have you on board. Can you commit to 20 hours/week for 8 weeks? Let me know your thoughts!",
      draftReply: "Hi John, thanks for reaching out! I'm definitely interested in continuing our collaboration. Before committing to the timeline, I'd like to review my Q3 calendar to ensure I can give this project the attention it deserves. Can we schedule a brief call this week to discuss the scope in more detail? Looking forward to it."
    }
  },
  {
    id: "2",
    type: "invite" as const,
    title: "Calendar Invite: Sarah",
    description: "Creative Director - Portfolio Review",
    agentReasoning: "Verified connection from target industry (fintech design). Portfolio review aligns with your 'seeking collaborators' status. Scheduled during your preferred meeting hours.",
    metadata: {
      organizer: "Sarah Chen",
      attendees: ["Alex (You)", "Sarah Chen"],
      date: "Tuesday, Feb 11",
      time: "2:00 PM EST",
      duration: "45 minutes",
      location: "Zoom (link provided)",
      notes: "Sarah wants to review your recent work and discuss potential collaboration opportunities for upcoming fintech projects."
    }
  },
  {
    id: "3",
    type: "document" as const,
    title: "NDA Document Ready",
    description: "Awaiting your signature for Fintech Co.",
    agentReasoning: "Standard mutual NDA with no red flags detected. Terms reviewed against your template. Company verified through LinkedIn with 50+ employees. Expires in 2 years.",
    metadata: {
      documentName: "Mutual_NDA_FintechCo_2026.pdf",
      documentType: "Non-Disclosure Agreement",
      from: "Fintech Co. Legal Team",
      deadline: "Feb 5, 2026",
      summary: "Standard bilateral NDA covering confidential business discussions. Key terms: 2-year duration, mutual obligations, standard exclusions for publicly available information. No non-compete clauses detected.",
      requiresSignature: true
    }
  }
]

const userGoals = [
  {
    id: "1",
    title: "Find 2-3 collaborators for Q3 fintech project",
    progress: 45,
    priority: "high" as const,
    deadline: "Mar 15, 2026"
  },
  {
    id: "2",
    title: "Expand network in AI/ML space by 20%",
    progress: 72,
    priority: "medium" as const,
    deadline: "Jun 30, 2026"
  },
  {
    id: "3",
    title: "Maintain 4+ hours of focus time daily",
    progress: 88,
    priority: "low" as const
  }
]

const statusMessages = [
  { status: "scanning" as const, text: 'Scanning network for "Fintech" keywords...' },
  { status: "negotiating" as const, text: "Negotiating protocol with [Sarah's Agent]..." },
  { status: "filtering" as const, text: "Filtering unsolicited outreach..." },
  { status: "scanning" as const, text: "Analyzing reputation scores..." },
]

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const hasSeenBriefing = localStorage.getItem("hasSeenDailyBriefing")
    if (!hasSeenBriefing) {
      setShowModal(true)
    }
  }, [])

  const handleModalSync = () => {
    setShowModal(false)
    localStorage.setItem("hasSeenDailyBriefing", "true")
  }

  const [actions, setActions] = useState(initialActions)
  const [agentStatus, setAgentStatus] = useState<"scanning" | "negotiating" | "filtering" | "idle">("scanning")
  const [statusText, setStatusText] = useState(statusMessages[0].text)
  const [statusIndex, setStatusIndex] = useState(0)
  const [showScoreDialog, setShowScoreDialog] = useState(false)
  const [activeTab, setActiveTab] = useState("monitor")

  useEffect(() => {
    if (showModal) return

    const interval = setInterval(() => {
      setStatusIndex(prev => {
        const next = (prev + 1) % statusMessages.length
        setAgentStatus(statusMessages[next].status)
        setStatusText(statusMessages[next].text)
        return next
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [showModal])

  const handleApprove = (id: string) => {
    setActions(prev => prev.filter(a => a.id !== id))
  }

  const handleReject = (id: string) => {
    setActions(prev => prev.filter(a => a.id !== id))
  }

  return (
    <SidebarProvider>
      <MeshiSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <SidebarInset>
        <div className="min-h-screen bg-background">
          <ActivitySummaryModal 
            isOpen={showModal} 
            onSync={handleModalSync} 
          />

          <IntegrityScoreDialog
            score={98.4}
            open={showScoreDialog}
            onOpenChange={setShowScoreDialog}
          />

          <div className="container mx-auto px-4 py-6 max-w-7xl">
            <header className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <SidebarTrigger className="md:hidden" />
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-foreground">Your Agent</h1>
                  <p className="text-xs text-muted-foreground">Alex's Agent • Level 3 Automation</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="border-success/30 text-success">
                  <span className="w-1.5 h-1.5 rounded-full bg-success mr-2 animate-pulse" />
                  Online
                </Badge>
                <button type="button" onClick={() => setShowScoreDialog(true)}>
                  <Badge variant="outline" className="border-border text-muted-foreground font-mono hover:border-primary/50 hover:text-primary transition-colors cursor-pointer">
                    Rep: 98.4
                  </Badge>
                </button>
              </div>
            </header>

            {activeTab === "monitor" && (
              <div className="space-y-6">
                <UserGoals goals={userGoals} />

                <div className="grid lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-1">
                    <WorkflowLog items={initialWorkflows} />
                  </div>

                  <div className="lg:col-span-1">
                    <Card className="bg-card/50 backdrop-blur border-border h-full flex flex-col">
                      <CardContent className="flex-1 flex flex-col items-center justify-center py-8">
                        <AgentOrb status={agentStatus} className="mb-6" />
                        <p className="text-sm text-muted-foreground text-center max-w-[200px] font-mono">
                          {statusText}
                        </p>
                        <div className="mt-4 flex gap-2">
                          {["scanning", "negotiating", "filtering"].map((s) => (
                            <div
                              key={s}
                              className={`w-2 h-2 rounded-full transition-all ${
                                agentStatus === s ? "bg-primary" : "bg-muted"
                              }`}
                            />
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="lg:col-span-1">
                    <ActionQueue 
                      items={actions} 
                      onApprove={handleApprove}
                      onReject={handleReject}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "network" && <TheEther />}

            {activeTab === "memories" && <AgentMemories />}

            {activeTab === "config" && (
              <div className="max-w-2xl">
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-foreground">Agent Configuration</h2>
                  <p className="text-sm text-muted-foreground">Customize your agent's behavior and capabilities</p>
                </div>
                <AgentConfig />
              </div>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
