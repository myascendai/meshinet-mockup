"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Calendar, FileText, Check, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { ActionDetailsDialog } from "@/components/action-details-dialog"

interface ActionItem {
  id: string
  type: "reply" | "invite" | "document"
  title: string
  description: string
  agentReasoning?: string
  metadata?: Record<string, unknown>
  approved?: boolean
}

interface ActionQueueProps {
  items: ActionItem[]
  onApprove: (id: string) => void
  onReject: (id: string) => void
}

const iconMap = {
  reply: Mail,
  invite: Calendar,
  document: FileText
}

const typeStyles = {
  reply: {
    bg: "bg-blue-500/10",
    text: "text-blue-500",
    border: "hover:border-blue-500/50"
  },
  invite: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-500",
    border: "hover:border-emerald-500/50"
  },
  document: {
    bg: "bg-amber-500/10",
    text: "text-amber-500",
    border: "hover:border-amber-500/50"
  }
}

export function ActionQueue({ items, onApprove, onReject }: ActionQueueProps) {
  const [animatingItems, setAnimatingItems] = useState<string[]>([])
  const [selectedAction, setSelectedAction] = useState<ActionItem | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleAction = (id: string, action: "approve" | "reject") => {
    setAnimatingItems(prev => [...prev, id])
    setTimeout(() => {
      if (action === "approve") {
        onApprove(id)
      } else {
        onReject(id)
      }
    }, 300)
  }

  const handleViewDetails = (item: ActionItem) => {
    setSelectedAction(item)
    setDialogOpen(true)
  }

  return (
    <>
      <Card className="bg-card/50 backdrop-blur border-border h-full">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Action Queue
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {items.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground text-sm">
              No pending actions
            </div>
          ) : (
            items.map((item) => {
              const Icon = iconMap[item.type]
              const isAnimating = animatingItems.includes(item.id)
              
              const styles = typeStyles[item.type]
              
              return (
                <div
                  key={item.id}
                  className={cn(
                    "p-3 rounded-lg border border-border bg-secondary/30 transition-all duration-300",
                    styles.border,
                    "cursor-pointer",
                    isAnimating && "opacity-0 scale-95"
                  )}
                  onClick={() => handleViewDetails(item)}
                >
                  <div className="flex items-start gap-3">
                    <div className={cn("p-2 rounded-lg", styles.bg)}>
                      <Icon className={cn("w-4 h-4", styles.text)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {item.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {item.description}
                      </p>
                      {item.agentReasoning && (
                        <p className="text-xs text-muted-foreground/70 mt-2 italic leading-relaxed">
                          {item.agentReasoning}
                        </p>
                      )}
                      <div className="flex gap-2 mt-3">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs flex-1 border-success/30 hover:bg-success/10 hover:text-success hover:border-success bg-transparent"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleAction(item.id, "approve")
                          }}
                        >
                          <Check className="w-3 h-3 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs flex-1 border-destructive/30 hover:bg-destructive/10 hover:text-destructive hover:border-destructive bg-transparent"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleAction(item.id, "reject")
                          }}
                        >
                          <X className="w-3 h-3 mr-1" />
                          Dismiss
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </CardContent>
      </Card>

      <ActionDetailsDialog
        action={selectedAction}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onApprove={() => {
          if (selectedAction) {
            handleAction(selectedAction.id, "approve")
          }
        }}
        onReject={() => {
          if (selectedAction) {
            handleAction(selectedAction.id, "reject")
          }
        }}
      />
    </>
  )
}
