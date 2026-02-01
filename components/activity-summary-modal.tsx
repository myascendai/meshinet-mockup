"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Shield, Users, TrendingUp, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface ActivitySummaryModalProps {
  onSync: () => void
  isOpen: boolean
}

const metrics = [
  {
    icon: Clock,
    label: "Focus Saved",
    value: "45 min",
    description: "Saved you 45 minutes of processing low-value content.",
    color: "text-primary"
  },
  {
    icon: Shield,
    label: "Noise Filtered",
    value: "43",
    description: "Intrusions blocked (0 alerts generated).",
    color: "text-destructive"
  },
  {
    icon: Users,
    label: "Connections",
    value: "1 New",
    description: "High-priority opportunity identified.",
    color: "text-accent"
  },
  {
    icon: TrendingUp,
    label: "Reputation",
    value: "98.4",
    description: "Score stabilized. Verified attendance confirmed.",
    color: "text-success"
  }
]

export function ActivitySummaryModal({ onSync, isOpen }: ActivitySummaryModalProps) {
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const [synced, setSynced] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setVisibleCards([])
      setSynced(false)
      metrics.forEach((_, index) => {
        setTimeout(() => {
          setVisibleCards(prev => [...prev, index])
        }, 200 * (index + 1))
      })
    }
  }, [isOpen])

  const handleSync = () => {
    setSynced(true)
    setTimeout(onSync, 500)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="w-full max-w-md mx-4">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur border border-border mb-4">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-sm text-muted-foreground">Background Sync Complete</span>
          </div>
          <h2 className="text-2xl font-semibold text-foreground">Daily Briefing</h2>
          <p className="text-sm text-muted-foreground mt-1">While you were offline (8h 12m)</p>
        </div>

        {/* Metrics Stack */}
        <div className="space-y-3 mb-6">
          {metrics.map((metric, index) => (
            <Card
              key={metric.label}
              className={cn(
                "p-4 bg-card/50 backdrop-blur border-border transition-all duration-500",
                visibleCards.includes(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              )}
            >
              <div className="flex items-start gap-4">
                <div className={cn("p-2 rounded-lg bg-secondary", metric.color)}>
                  <metric.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-muted-foreground">{metric.label}</span>
                    <span className={cn("text-lg font-semibold font-mono", metric.color)}>
                      {metric.value}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Action Button */}
        <Button 
          onClick={handleSync}
          className={cn(
            "w-full h-12 font-medium transition-all duration-300",
            synced ? "bg-success text-success-foreground" : "bg-primary text-primary-foreground"
          )}
          disabled={synced}
        >
          {synced ? (
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4" />
              Synced
            </span>
          ) : (
            "Sync Updates"
          )}
        </Button>
      </div>
    </div>
  )
}
