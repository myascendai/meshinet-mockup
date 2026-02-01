"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mail, Calendar, FileText, Check, X, Clock, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface ActionDetailsDialogProps {
  action: {
    id: string
    type: "reply" | "invite" | "document"
    title: string
    description: string
    agentReasoning?: string
    metadata?: Record<string, unknown>
  } | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onApprove: () => void
  onReject: () => void
}

export function ActionDetailsDialog({
  action,
  open,
  onOpenChange,
  onApprove,
  onReject,
}: ActionDetailsDialogProps) {
  if (!action) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-card/95 backdrop-blur-xl border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            {action.type === "reply" && <Mail className="w-5 h-5 text-accent" />}
            {action.type === "invite" && <Calendar className="w-5 h-5 text-accent" />}
            {action.type === "document" && <FileText className="w-5 h-5 text-accent" />}
            {action.title}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Review this action before approving or dismissing
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Agent Reasoning */}
          {action.agentReasoning && (
            <div className="p-4 rounded-lg bg-secondary/30 border border-border">
              <div className="flex items-start gap-2 mb-2">
                <div className="p-1.5 rounded bg-primary/10">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                </div>
                <p className="text-xs font-medium text-primary">Agent Analysis</p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {action.agentReasoning}
              </p>
            </div>
          )}

          {/* Type-specific content */}
          {action.type === "reply" && <ReplyDetails metadata={action.metadata} />}
          {action.type === "invite" && <InviteDetails metadata={action.metadata} />}
          {action.type === "document" && <DocumentDetails metadata={action.metadata} />}
        </div>

        <DialogFooter className="gap-2 sm:gap-2">
          <Button
            variant="outline"
            onClick={() => {
              onReject()
              onOpenChange(false)
            }}
            className="border-destructive/30 hover:bg-destructive/10 hover:text-destructive hover:border-destructive bg-transparent"
          >
            <X className="w-4 h-4 mr-2" />
            Dismiss
          </Button>
          <Button
            onClick={() => {
              onApprove()
              onOpenChange(false)
            }}
            className="bg-success hover:bg-success/90 text-success-foreground"
          >
            <Check className="w-4 h-4 mr-2" />
            Approve
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function ReplyDetails({ metadata }: { metadata?: Record<string, unknown> }) {
  const data = metadata as {
    from?: string
    subject?: string
    originalMessage?: string
    draftReply?: string
    sentiment?: string
  }

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">From</span>
        </div>
        <p className="text-sm text-muted-foreground pl-6">{data?.from || "Unknown sender"}</p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Subject</span>
        </div>
        <p className="text-sm text-muted-foreground pl-6">{data?.subject || "No subject"}</p>
      </div>

      {data?.sentiment && (
        <Badge variant="outline" className={cn(
          "text-xs",
          data.sentiment === "positive" && "border-success/50 text-success",
          data.sentiment === "neutral" && "border-muted-foreground/50",
          data.sentiment === "urgent" && "border-warning/50 text-warning"
        )}>
          {data.sentiment}
        </Badge>
      )}

      <div className="p-3 rounded-lg bg-muted/30 border border-border">
        <p className="text-xs font-medium text-muted-foreground mb-2">Original Message</p>
        <p className="text-sm text-foreground leading-relaxed">
          {data?.originalMessage || "Message content unavailable"}
        </p>
      </div>

      <div className="p-3 rounded-lg bg-accent/5 border border-accent/20">
        <p className="text-xs font-medium text-accent mb-2">Drafted Reply</p>
        <p className="text-sm text-foreground leading-relaxed">
          {data?.draftReply || "Reply content unavailable"}
        </p>
      </div>
    </div>
  )
}

function InviteDetails({ metadata }: { metadata?: Record<string, unknown> }) {
  const data = metadata as {
    organizer?: string
    attendees?: string[]
    date?: string
    time?: string
    duration?: string
    location?: string
    notes?: string
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Organizer</p>
          <p className="text-sm font-medium text-foreground">{data?.organizer || "Unknown"}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Duration</p>
          <p className="text-sm font-medium text-foreground">{data?.duration || "Unknown"}</p>
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Date & Time</span>
        </div>
        <p className="text-sm font-medium text-foreground pl-6">
          {data?.date || "TBD"} at {data?.time || "TBD"}
        </p>
      </div>

      {data?.location && (
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Location</p>
          <p className="text-sm text-foreground">{data.location}</p>
        </div>
      )}

      {data?.attendees && data.attendees.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Attendees ({data.attendees.length})</p>
          <div className="flex flex-wrap gap-2">
            {data.attendees.map((attendee, i) => (
              <Badge key={i} variant="outline" className="text-xs">
                {attendee}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {data?.notes && (
        <div className="p-3 rounded-lg bg-muted/30 border border-border">
          <p className="text-xs font-medium text-muted-foreground mb-2">Notes</p>
          <p className="text-sm text-foreground leading-relaxed">{data.notes}</p>
        </div>
      )}
    </div>
  )
}

function DocumentDetails({ metadata }: { metadata?: Record<string, unknown> }) {
  const data = metadata as {
    documentName?: string
    documentType?: string
    from?: string
    deadline?: string
    summary?: string
    requiresSignature?: boolean
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Document Type</p>
          <p className="text-sm font-medium text-foreground">{data?.documentType || "Unknown"}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">From</p>
          <p className="text-sm font-medium text-foreground">{data?.from || "Unknown"}</p>
        </div>
      </div>

      {data?.deadline && (
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-warning" />
            <span className="text-xs text-warning">Deadline</span>
          </div>
          <p className="text-sm font-medium text-foreground pl-6">{data.deadline}</p>
        </div>
      )}

      {data?.requiresSignature && (
        <Badge variant="outline" className="border-accent/50 text-accent">
          Signature Required
        </Badge>
      )}

      <div className="p-3 rounded-lg bg-muted/30 border border-border">
        <p className="text-xs font-medium text-muted-foreground mb-2">Summary</p>
        <p className="text-sm text-foreground leading-relaxed">
          {data?.summary || "No summary available"}
        </p>
      </div>

      <div className="p-3 rounded-lg bg-accent/5 border border-accent/20">
        <p className="text-xs font-medium text-accent mb-2">Document Preview</p>
        <div className="flex items-center justify-center py-8 text-muted-foreground">
          <FileText className="w-12 h-12 opacity-50" />
        </div>
        <p className="text-xs text-center text-muted-foreground">
          {data?.documentName || "document.pdf"}
        </p>
      </div>
    </div>
  )
}
