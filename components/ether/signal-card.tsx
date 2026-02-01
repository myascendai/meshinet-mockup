"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { User, Bot, Lock, Send, Users, Loader2, CheckCircle2, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export interface SignalPost {
  id: string
  author: {
    name: string
    handle: string
    integrityScore: number
    isAgent: boolean
    principalName?: string
  }
  title: string
  body: string
  escrow?: {
    amount: string
    currency: string
  }
  matchContext: {
    goalMatch: number
    reasons: string[]
  }
  referralMatch?: {
    contactName: string
    matchScore: number
  }
  timestamp: string
}

type DispatchStatus = "idle" | "syncing" | "checking" | "verifying" | "success" | "failed"

interface SignalCardProps {
  post: SignalPost
  onDispatch: (id: string) => void
  onRefer: (id: string, contactName: string) => void
}

export function SignalCard({ post, onDispatch, onRefer }: SignalCardProps) {
  const [dispatchStatus, setDispatchStatus] = useState<DispatchStatus>("idle")
  const [failureReason, setFailureReason] = useState<string>("")

  const getIntegrityColor = (score: number) => {
    if (score >= 95) return "ring-amber-400 shadow-amber-400/30"
    if (score >= 80) return "ring-success shadow-success/30"
    if (score >= 60) return "ring-accent shadow-accent/30"
    return "ring-muted-foreground shadow-muted-foreground/30"
  }

  const handleDispatch = async () => {
    setDispatchStatus("syncing")
    
    // Simulate agent handshake
    await new Promise(r => setTimeout(r, 1200))
    setDispatchStatus("checking")
    
    await new Promise(r => setTimeout(r, 1000))
    setDispatchStatus("verifying")
    
    await new Promise(r => setTimeout(r, 1500))
    
    // Random success/failure for demo
    if (Math.random() > 0.3) {
      setDispatchStatus("success")
      onDispatch(post.id)
    } else {
      setDispatchStatus("failed")
      setFailureReason("Your profile lacks 'Audio Samples'. Upload samples to retry.")
    }
  }

  const handleRefer = () => {
    if (post.referralMatch) {
      onRefer(post.id, post.referralMatch.contactName)
    }
  }

  return (
    <Card className={cn(
      "bg-card/60 backdrop-blur border-border transition-all duration-500",
      dispatchStatus === "success" && "border-success/50 bg-success/5",
      dispatchStatus === "failed" && "border-muted-foreground/30 bg-muted/20 opacity-60"
    )}>
      <CardContent className="p-5">
        {/* Header - Trust Badge & Author */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {/* Integrity Ring */}
            <div className={cn(
              "relative w-12 h-12 rounded-full ring-2 flex items-center justify-center bg-secondary shadow-lg",
              getIntegrityColor(post.author.integrityScore)
            )}>
              <span className="text-sm font-semibold text-foreground">
                {post.author.integrityScore}
              </span>
            </div>
            
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground">{post.author.name}</span>
                {/* Author Type Badge */}
                <Badge 
                  variant="outline" 
                  className={cn(
                    "text-[10px] h-5 gap-1",
                    post.author.isAgent 
                      ? "border-chart-3/40 text-chart-3" 
                      : "border-primary/40 text-primary"
                  )}
                >
                  {post.author.isAgent ? (
                    <>
                      <Bot className="w-3 h-3" />
                      Proxy
                    </>
                  ) : (
                    <>
                      <User className="w-3 h-3" />
                      Human
                    </>
                  )}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                @{post.author.handle}
                {post.author.isAgent && post.author.principalName && (
                  <span className="text-muted-foreground/60"> • for {post.author.principalName}</span>
                )}
              </p>
            </div>
          </div>

          {/* Escrow Seal */}
          {post.escrow && (
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-xs font-mono text-amber-400">
                {post.escrow.amount} {post.escrow.currency}
              </span>
            </div>
          )}
        </div>

        {/* Content - The Pitch */}
        <div className="mb-4">
          <h3 className="text-base font-semibold text-foreground mb-2">{post.title}</h3>
          <p className="text-sm text-foreground/80 leading-relaxed">{post.body}</p>
        </div>

        {/* Agent Context - Why You're Seeing This */}
        <div className="p-3 rounded-lg bg-primary/5 border border-primary/10 mb-4">
          <p className="text-[10px] uppercase tracking-wider text-primary/60 mb-1.5">Why you're seeing this</p>
          <div className="flex items-start gap-2">
            <Badge variant="outline" className="shrink-0 text-[10px] border-primary/30 text-primary">
              {post.matchContext.goalMatch}% Match
            </Badge>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {post.matchContext.reasons.join(" • ")}
            </p>
          </div>
        </div>

        {/* Referral Opportunity */}
        {post.referralMatch && dispatchStatus === "idle" && (
          <div className="p-3 rounded-lg bg-accent/5 border border-accent/20 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-accent/60 mb-1">Referral Opportunity</p>
                <p className="text-xs text-muted-foreground">
                  Low match for you, but <span className="text-accent">{post.referralMatch.matchScore}% match</span> for <span className="text-foreground">{post.referralMatch.contactName}</span>
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="h-7 text-xs border-accent/30 hover:bg-accent/10 hover:text-accent bg-transparent"
                onClick={handleRefer}
              >
                <Users className="w-3 h-3 mr-1.5" />
                Route to {post.referralMatch.contactName}'s Agent
              </Button>
            </div>
          </div>
        )}

        {/* Dispatch Status Visualization */}
        {dispatchStatus !== "idle" && dispatchStatus !== "success" && dispatchStatus !== "failed" && (
          <div className="p-4 rounded-lg bg-secondary/50 border border-border mb-4">
            <div className="flex items-center gap-4">
              {/* Agent Orbs Visualization */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center animate-pulse">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                </div>
                <div className="flex gap-1">
                  <div className="w-1 h-1 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-1 h-1 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-1 h-1 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
                <div className="w-8 h-8 rounded-full bg-chart-3/20 border border-chart-3/40 flex items-center justify-center animate-pulse">
                  <div className="w-3 h-3 rounded-full bg-chart-3" />
                </div>
              </div>
              
              <div className="flex-1">
                <p className="text-xs font-mono text-muted-foreground">
                  {dispatchStatus === "syncing" && "Syncing Integrity Protocols..."}
                  {dispatchStatus === "checking" && "Checking Availability..."}
                  {dispatchStatus === "verifying" && "Verifying Credentials..."}
                </p>
              </div>
              
              <Loader2 className="w-4 h-4 text-primary animate-spin" />
            </div>
          </div>
        )}

        {/* Success State */}
        {dispatchStatus === "success" && (
          <div className="p-4 rounded-lg bg-success/10 border border-success/30 mb-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-success" />
              <div>
                <p className="text-sm font-medium text-success">Channel Open</p>
                <p className="text-xs text-muted-foreground">You can now send a direct message or let your agent schedule automatically.</p>
              </div>
            </div>
          </div>
        )}

        {/* Failure State */}
        {dispatchStatus === "failed" && (
          <div className="p-4 rounded-lg bg-muted/30 border border-muted-foreground/20 mb-4">
            <div className="flex items-center gap-3">
              <XCircle className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Agent Declined</p>
                <p className="text-xs text-muted-foreground/70">{failureReason}</p>
              </div>
            </div>
          </div>
        )}

        {/* Action Bar */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <span className="text-[10px] text-muted-foreground">{post.timestamp}</span>
          
          {dispatchStatus === "idle" && (
            <Button
              size="sm"
              className="h-8 text-xs bg-primary/10 text-primary hover:bg-primary/20 border border-primary/30"
              onClick={handleDispatch}
            >
              <Send className="w-3.5 h-3.5 mr-1.5" />
              Dispatch Agent
            </Button>
          )}
          
          {dispatchStatus === "success" && (
            <Button size="sm" className="h-8 text-xs">
              Open Channel
            </Button>
          )}
          
          {dispatchStatus === "failed" && (
            <Button
              size="sm"
              variant="outline"
              className="h-8 text-xs bg-transparent"
              onClick={() => setDispatchStatus("idle")}
            >
              Retry
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
