"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Activity, Ban, Bookmark, Check, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

interface LedgerEntry {
  id: string
  type: "blocked" | "saved" | "passed" | "warning"
  message: string
  timestamp: number
}

const blockReasons = [
  "Blocked: Crypto Spam",
  "Blocked: Low Integrity (23)",
  "Blocked: Unverified Source",
  "Blocked: Off-topic (Marketing)",
  "Blocked: Duplicate Post",
  "Blocked: Bot Network Detected",
  "Blocked: Missing Context",
]

const saveReasons = [
  "Saved: Bandmate Inquiry",
  "Saved: Potential Collaboration",
  "Saved: Industry Contact",
  "Saved: Referral Opportunity",
]

const passReasons = [
  "Passed: 87% Goal Match",
  "Passed: Verified Escrow",
  "Passed: Mutual Connection",
  "Passed: High Integrity (94)",
]

const warningReasons = [
  "Warning: New Account",
  "Warning: First Post",
  "Warning: No Mutual Connections",
]

export function ProcessingLedger() {
  const [entries, setEntries] = useState<LedgerEntry[]>([])

  useEffect(() => {
    const addEntry = () => {
      const rand = Math.random()
      let type: LedgerEntry["type"]
      let message: string

      if (rand < 0.55) {
        type = "blocked"
        message = blockReasons[Math.floor(Math.random() * blockReasons.length)]
      } else if (rand < 0.75) {
        type = "saved"
        message = saveReasons[Math.floor(Math.random() * saveReasons.length)]
      } else if (rand < 0.9) {
        type = "passed"
        message = passReasons[Math.floor(Math.random() * passReasons.length)]
      } else {
        type = "warning"
        message = warningReasons[Math.floor(Math.random() * warningReasons.length)]
      }

      const newEntry: LedgerEntry = {
        id: Date.now().toString(),
        type,
        message,
        timestamp: Date.now()
      }

      setEntries(prev => [newEntry, ...prev].slice(0, 50))
    }

    // Add initial entries
    for (let i = 0; i < 8; i++) {
      setTimeout(() => addEntry(), i * 100)
    }

    // Continue adding entries
    const interval = setInterval(addEntry, 800 + Math.random() * 1200)
    return () => clearInterval(interval)
  }, [])

  const getEntryStyle = (type: LedgerEntry["type"]) => {
    switch (type) {
      case "blocked":
        return { icon: Ban, color: "text-destructive/60" }
      case "saved":
        return { icon: Bookmark, color: "text-accent" }
      case "passed":
        return { icon: Check, color: "text-success" }
      case "warning":
        return { icon: AlertTriangle, color: "text-warning" }
    }
  }

  return (
    <Card className="bg-card/50 backdrop-blur border-border">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Activity className="w-4 h-4 text-primary animate-pulse" />
          <h3 className="text-sm font-medium text-foreground">Processing Ledger</h3>
        </div>

        <ScrollArea className="h-[320px]">
          <div className="space-y-1 font-mono text-[11px]">
            {entries.map((entry, idx) => {
              const { icon: Icon, color } = getEntryStyle(entry.type)
              return (
                <div
                  key={entry.id}
                  className={cn(
                    "flex items-center gap-2 py-1 px-2 rounded transition-all",
                    idx === 0 && "bg-secondary/50 animate-pulse"
                  )}
                  style={{
                    opacity: Math.max(0.3, 1 - idx * 0.03)
                  }}
                >
                  <Icon className={cn("w-3 h-3 shrink-0", color)} />
                  <span className={cn("truncate", color)}>
                    {entry.message}
                  </span>
                </div>
              )
            })}
          </div>
        </ScrollArea>

        {/* Stats Footer */}
        <div className="mt-3 pt-3 border-t border-border">
          <div className="grid grid-cols-4 gap-2 text-center">
            <div>
              <p className="text-sm font-semibold text-destructive/60">
                {entries.filter(e => e.type === "blocked").length}
              </p>
              <p className="text-[9px] text-muted-foreground">Blocked</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-accent">
                {entries.filter(e => e.type === "saved").length}
              </p>
              <p className="text-[9px] text-muted-foreground">Saved</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-success">
                {entries.filter(e => e.type === "passed").length}
              </p>
              <p className="text-[9px] text-muted-foreground">Passed</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-warning">
                {entries.filter(e => e.type === "warning").length}
              </p>
              <p className="text-[9px] text-muted-foreground">Flagged</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
