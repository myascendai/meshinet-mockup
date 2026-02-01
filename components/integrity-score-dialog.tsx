"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Shield, TrendingUp, Users, Clock, CheckCircle2, AlertTriangle, Zap, Eye } from "lucide-react"

interface IntegrityScoreDialogProps {
  score: number
  open: boolean
  onOpenChange: (open: boolean) => void
}

const scoreBands = [
  { min: 95, max: 100, label: "ELITE", color: "text-primary", bgColor: "bg-primary", description: "Top 1% - Exceptional integrity across all metrics" },
  { min: 85, max: 94.9, label: "TRUSTED", color: "text-success", bgColor: "bg-success", description: "Highly reliable with proven track record" },
  { min: 70, max: 84.9, label: "VERIFIED", color: "text-accent", bgColor: "bg-accent", description: "Established presence with good standing" },
  { min: 50, max: 69.9, label: "EMERGING", color: "text-warning", bgColor: "bg-warning", description: "Building reputation, limited history" },
  { min: 0, max: 49.9, label: "UNVERIFIED", color: "text-destructive", bgColor: "bg-destructive", description: "New or flagged accounts" },
]

const scoreFactors = [
  {
    id: "commitment",
    label: "Commitment History",
    score: 99.2,
    weight: 25,
    icon: CheckCircle2,
    description: "Meeting obligations, showing up to calls, delivering on promises",
    breakdown: [
      { label: "Calendar attendance", value: "98.5%" },
      { label: "Deadline adherence", value: "99.8%" },
      { label: "Response reliability", value: "99.3%" },
    ]
  },
  {
    id: "network",
    label: "Network Quality",
    score: 97.8,
    weight: 20,
    icon: Users,
    description: "Quality and integrity of your connections",
    breakdown: [
      { label: "Avg. connection score", value: "94.2" },
      { label: "Mutual verifications", value: "47" },
      { label: "Referral success rate", value: "89%" },
    ]
  },
  {
    id: "tenure",
    label: "Account Tenure",
    score: 98.0,
    weight: 15,
    icon: Clock,
    description: "Time-weighted consistency on the platform",
    breakdown: [
      { label: "Account age", value: "2.4 years" },
      { label: "Active months", value: "28/29" },
      { label: "Continuous streak", value: "14 mo" },
    ]
  },
  {
    id: "verification",
    label: "Verification Level",
    score: 100,
    weight: 20,
    icon: Shield,
    description: "Identity and credential verification status",
    breakdown: [
      { label: "Identity verified", value: "Yes" },
      { label: "LinkedIn connected", value: "Yes" },
      { label: "Domain verified", value: "Yes" },
    ]
  },
  {
    id: "activity",
    label: "Activity Signals",
    score: 96.5,
    weight: 10,
    icon: Zap,
    description: "Engagement patterns and platform activity",
    breakdown: [
      { label: "Signal quality", value: "High" },
      { label: "Spam reports", value: "0" },
      { label: "Dispatch success", value: "94%" },
    ]
  },
  {
    id: "transparency",
    label: "Transparency Score",
    score: 98.8,
    weight: 10,
    icon: Eye,
    description: "Openness and honesty in interactions",
    breakdown: [
      { label: "Profile completeness", value: "100%" },
      { label: "Disclosure rating", value: "A+" },
      { label: "Disputes resolved", value: "2/2" },
    ]
  },
]

function ScoreGauge({ score }: { score: number }) {
  const currentBand = scoreBands.find(b => score >= b.min && score <= b.max) || scoreBands[4]
  const rotation = (score / 100) * 180 - 90 // -90 to 90 degrees

  return (
    <div className="relative w-64 h-36 mx-auto">
      {/* Background arc segments */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 110">
        {/* Arc background */}
        <defs>
          <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="oklch(0.55 0.22 25)" stopOpacity="0.8" />
            <stop offset="25%" stopColor="oklch(0.78 0.15 85)" stopOpacity="0.8" />
            <stop offset="50%" stopColor="oklch(0.75 0.18 85)" stopOpacity="0.8" />
            <stop offset="75%" stopColor="oklch(0.65 0.18 145)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="oklch(0.65 0.15 180)" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        
        {/* Outer glow */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="url(#arcGradient)"
          strokeWidth="12"
          strokeLinecap="round"
          opacity="0.3"
          filter="blur(4px)"
        />
        
        {/* Main arc */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="url(#arcGradient)"
          strokeWidth="8"
          strokeLinecap="round"
        />
        
        {/* Score tick marks */}
        {[0, 25, 50, 75, 100].map((tick) => {
          const angle = ((tick / 100) * 180 - 180) * (Math.PI / 180)
          const x1 = 100 + 70 * Math.cos(angle)
          const y1 = 100 + 70 * Math.sin(angle)
          const x2 = 100 + 62 * Math.cos(angle)
          const y2 = 100 + 62 * Math.sin(angle)
          return (
            <line
              key={tick}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="currentColor"
              strokeWidth="2"
              className="text-muted-foreground/50"
            />
          )
        })}
      </svg>

      {/* Needle */}
      <div 
        className="absolute bottom-0 left-1/2 origin-bottom transition-transform duration-1000 ease-out"
        style={{ transform: `translateX(-50%) rotate(${rotation}deg)` }}
      >
        <div className="w-1 h-20 bg-foreground rounded-full shadow-lg relative">
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-foreground" />
        </div>
      </div>

      {/* Center pivot */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-card border-2 border-foreground" />

      {/* Score display */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
        <div className={cn("text-4xl font-mono font-bold tracking-tight", currentBand.color)}>
          {score.toFixed(1)}
        </div>
      </div>
    </div>
  )
}

function ScoreBands({ currentScore }: { currentScore: number }) {
  return (
    <div className="space-y-1.5">
      {scoreBands.map((band) => {
        const isActive = currentScore >= band.min && currentScore <= band.max
        return (
          <div
            key={band.label}
            className={cn(
              "flex items-center gap-3 p-2 rounded-md transition-all",
              isActive ? "bg-secondary/80 border border-border" : "opacity-40"
            )}
          >
            <div className={cn("w-3 h-3 rounded-sm shrink-0", band.bgColor)} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className={cn("text-xs font-mono font-semibold", isActive ? band.color : "text-muted-foreground")}>
                  {band.label}
                </span>
                <span className="text-[10px] text-muted-foreground/70 font-mono">
                  {band.min}-{band.max}
                </span>
              </div>
              {isActive && (
                <p className="text-[10px] text-muted-foreground mt-0.5 truncate">
                  {band.description}
                </p>
              )}
            </div>
            {isActive && (
              <Badge variant="outline" className={cn("text-[9px] h-4 shrink-0", band.color)}>
                YOU
              </Badge>
            )}
          </div>
        )
      })}
    </div>
  )
}

function FactorBar({ factor, expanded, onToggle }: { 
  factor: typeof scoreFactors[0]
  expanded: boolean
  onToggle: () => void 
}) {
  const Icon = factor.icon
  const getScoreColor = (score: number) => {
    if (score >= 95) return "text-primary"
    if (score >= 85) return "text-success"
    if (score >= 70) return "text-accent"
    return "text-warning"
  }

  return (
    <div 
      className={cn(
        "p-3 rounded-lg border border-border bg-secondary/30 transition-all cursor-pointer hover:bg-secondary/50",
        expanded && "bg-secondary/50"
      )}
      onClick={onToggle}
    >
      <div className="flex items-center gap-3">
        <div className="p-1.5 rounded bg-muted/50">
          <Icon className="w-3.5 h-3.5 text-muted-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-medium text-foreground truncate">
              {factor.label}
            </span>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] text-muted-foreground/70">
                {factor.weight}%
              </span>
              <span className={cn("text-sm font-mono font-semibold", getScoreColor(factor.score))}>
                {factor.score}
              </span>
            </div>
          </div>
          {/* Progress bar */}
          <div className="mt-1.5 h-1 bg-muted rounded-full overflow-hidden">
            <div 
              className={cn("h-full rounded-full transition-all", 
                factor.score >= 95 ? "bg-primary" :
                factor.score >= 85 ? "bg-success" :
                factor.score >= 70 ? "bg-accent" : "bg-warning"
              )}
              style={{ width: `${factor.score}%` }}
            />
          </div>
        </div>
      </div>
      
      {expanded && (
        <div className="mt-3 pt-3 border-t border-border/50 space-y-2">
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            {factor.description}
          </p>
          <div className="grid grid-cols-3 gap-2">
            {factor.breakdown.map((item) => (
              <div key={item.label} className="text-center p-1.5 rounded bg-muted/30">
                <div className="text-xs font-mono font-medium text-foreground">{item.value}</div>
                <div className="text-[9px] text-muted-foreground/70 truncate">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export function IntegrityScoreDialog({ score, open, onOpenChange }: IntegrityScoreDialogProps) {
  const [expandedFactor, setExpandedFactor] = useState<string | null>(null)
  const currentBand = scoreBands.find(b => score >= b.min && score <= b.max) || scoreBands[4]

  const weightedScore = scoreFactors.reduce((acc, f) => acc + (f.score * f.weight / 100), 0)
  const trend = 0.3 // Mock trend

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-card/95 backdrop-blur-xl border-border overflow-hidden">
        {/* Cyberpunk grid background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }} />
        </div>

        <DialogHeader className="relative">
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <Shield className="w-5 h-5 text-primary" />
            Integrity Score
          </DialogTitle>
        </DialogHeader>

        <div className="relative space-y-6">
          {/* Main Score Gauge */}
          <div className="text-center">
            <ScoreGauge score={score} />
            <div className="mt-2 flex items-center justify-center gap-2">
              <Badge 
                variant="outline" 
                className={cn("font-mono text-xs", currentBand.color)}
              >
                {currentBand.label}
              </Badge>
              <div className="flex items-center gap-1 text-xs">
                <TrendingUp className="w-3 h-3 text-success" />
                <span className="text-success font-mono">+{trend.toFixed(1)}</span>
                <span className="text-muted-foreground/70">30d</span>
              </div>
            </div>
          </div>

          {/* Score Bands Legend */}
          <div className="p-3 rounded-lg bg-secondary/30 border border-border">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2 font-medium">
              Score Bands
            </p>
            <ScoreBands currentScore={score} />
          </div>

          {/* Factor Breakdown */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                Factor Breakdown
              </p>
              <p className="text-[10px] text-muted-foreground font-mono">
                Weighted: <span className="text-foreground">{weightedScore.toFixed(1)}</span>
              </p>
            </div>
            <div className="space-y-2 max-h-[240px] overflow-y-auto pr-1">
              {scoreFactors.map((factor) => (
                <FactorBar
                  key={factor.id}
                  factor={factor}
                  expanded={expandedFactor === factor.id}
                  onToggle={() => setExpandedFactor(
                    expandedFactor === factor.id ? null : factor.id
                  )}
                />
              ))}
            </div>
          </div>

          {/* Footer note */}
          <div className="flex items-start gap-2 p-2 rounded bg-muted/30 border border-border/50">
            <AlertTriangle className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" />
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              Your Integrity Score is calculated from on-chain verifications, behavioral signals, and network attestations. 
              It updates in real-time and cannot be manipulated.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
