"use client"

import React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Target, 
  Users, 
  Briefcase, 
  Wrench, 
  User, 
  Heart, 
  MoreHorizontal,
  Brain,
  StickyNote,
  Clock
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Memory {
  id: string
  content: string
  timestamp?: string
}

interface MemoryCategory {
  id: string
  label: string
  icon: React.ElementType
  color: string
  bgColor: string
  borderColor: string
  memories: Memory[]
}

interface AgentNote {
  id: string
  content: string
  context: string
  timestamp: string
}

interface AgentMemoriesProps {
  categories: MemoryCategory[]
  agentNotes: AgentNote[]
}

const defaultCategories: MemoryCategory[] = [
  {
    id: "goals",
    label: "Your Goals",
    icon: Target,
    color: "text-destructive",
    bgColor: "bg-destructive/5",
    borderColor: "border-destructive/30",
    memories: [
      { id: "g1", content: "Find 2-3 collaborators for Q3 fintech project" },
      { id: "g2", content: "Expand network in AI/ML space by 20%" },
      { id: "g3", content: "Maintain 4+ hours of focus time daily" }
    ]
  },
  {
    id: "network",
    label: "Your Network",
    icon: Users,
    color: "text-primary",
    bgColor: "bg-primary/5",
    borderColor: "border-primary/30",
    memories: [
      { id: "n1", content: "Close collaborator: John Martinez (Creative Tech)" },
      { id: "n2", content: "Mentor relationship: Dr. Sarah Park (Stanford)" },
      { id: "n3", content: "Prefers warm introductions over cold outreach" }
    ]
  },
  {
    id: "experiences",
    label: "Your Experiences",
    icon: Briefcase,
    color: "text-accent",
    bgColor: "bg-accent/5",
    borderColor: "border-accent/30",
    memories: [
      { id: "e1", content: "Led design for fintech startup (2023-2024)" },
      { id: "e2", content: "Freelance UX consulting for 5+ years" },
      { id: "e3", content: "Bad experience with rushed contracts - needs buffer time" }
    ]
  },
  {
    id: "skills",
    label: "Your Skills",
    icon: Wrench,
    color: "text-success",
    bgColor: "bg-success/5",
    borderColor: "border-success/30",
    memories: [
      { id: "s1", content: "Expert: Figma, Sketch, Adobe Suite" },
      { id: "s2", content: "Strong: User research, prototyping, design systems" },
      { id: "s3", content: "Learning: AI prompt engineering, no-code tools" }
    ]
  },
  {
    id: "background",
    label: "Your Background",
    icon: User,
    color: "text-chart-3",
    bgColor: "bg-chart-3/5",
    borderColor: "border-chart-3/30",
    memories: [
      { id: "b1", content: "Based in San Francisco, CA (PST timezone)" },
      { id: "b2", content: "Education: Stanford HCI program (2018)" },
      { id: "b3", content: "Industry focus: Fintech, Healthcare, EdTech" }
    ]
  },
  {
    id: "personality",
    label: "Your Personality",
    icon: Heart,
    color: "text-chart-4",
    bgColor: "bg-chart-4/5",
    borderColor: "border-chart-4/30",
    memories: [
      { id: "p1", content: "Communication style: Friendly but concise" },
      { id: "p2", content: "Values: Transparency, quality over speed" },
      { id: "p3", content: "Pet peeve: Unprepared meetings, scope creep" }
    ]
  },
  {
    id: "misc",
    label: "Miscellaneous",
    icon: MoreHorizontal,
    color: "text-muted-foreground",
    bgColor: "bg-muted/30",
    borderColor: "border-border",
    memories: [
      { id: "m1", content: "Allergic to peanuts (for event catering)" },
      { id: "m2", content: "Prefers morning meetings (before 2pm)" },
      { id: "m3", content: "Currently reading: 'Thinking, Fast and Slow'" }
    ]
  }
]

const defaultAgentNotes: AgentNote[] = [
  {
    id: "an1",
    content: "John Martinez responded positively to timeline flexibility last conversation. Use similar approach for future negotiations.",
    context: "Email negotiation pattern",
    timestamp: "2 hours ago"
  },
  {
    id: "an2",
    content: "User rejected 3 calendar invites this week during focus hours (9-11am). Adjusting scheduling preferences.",
    context: "Calendar optimization",
    timestamp: "Yesterday"
  },
  {
    id: "an3",
    content: "Fintech Co. NDA uses non-standard arbitration clause in Section 7. Flag for user review.",
    context: "Document analysis",
    timestamp: "Yesterday"
  },
  {
    id: "an4",
    content: "Sarah Chen's agent indicated interest in long-term collaboration. Monitor for follow-up signals.",
    context: "Agent-to-agent negotiation",
    timestamp: "3 days ago"
  }
]

export function AgentMemories({ 
  categories = defaultCategories, 
  agentNotes = defaultAgentNotes 
}: Partial<AgentMemoriesProps>) {
  return (
    <div className="space-y-8">
      {/* User Memories Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <User className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">What Your Agent Knows About You</h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Card 
                key={category.id}
                className={cn(
                  "border transition-all hover:shadow-lg",
                  category.borderColor,
                  category.bgColor
                )}
              >
                <CardHeader className="pb-2">
                  <CardTitle className={cn(
                    "text-sm font-medium flex items-center gap-2",
                    category.color
                  )}>
                    <Icon className="w-4 h-4" />
                    {category.label}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {category.memories.map((memory) => (
                    <div
                      key={memory.id}
                      className="text-xs text-foreground/80 leading-relaxed pl-2 border-l-2 border-current/20"
                    >
                      {memory.content}
                    </div>
                  ))}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Agent Scratchpad Section */}
      <div>
        <Card className="bg-secondary/30 border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Brain className="w-4 h-4 text-primary" />
              Agent Scratchpad
              <Badge variant="outline" className="ml-auto text-[10px] h-5 text-muted-foreground border-border">
                Internal Memory
              </Badge>
            </CardTitle>
            <p className="text-xs text-muted-foreground/70 mt-1">
              Notes your agent saves between tasks to improve its assistance
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            {agentNotes.map((note) => (
              <div
                key={note.id}
                className="p-3 rounded-lg bg-background/50 border border-border"
              >
                <div className="flex items-start gap-3">
                  <StickyNote className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground leading-relaxed">
                      {note.content}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <Badge variant="outline" className="text-[10px] h-4 text-muted-foreground border-border">
                        {note.context}
                      </Badge>
                      <span className="text-[10px] text-muted-foreground/60 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {note.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
