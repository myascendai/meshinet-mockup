"use client"

import { useState } from "react"
import { SignalCard, SignalPost } from "./signal-card"
import { SignalTuner } from "./signal-tuner"
import { ProcessingLedger } from "./processing-ledger"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Zap, Filter, RefreshCw } from "lucide-react"

const mockPosts: SignalPost[] = [
  {
    id: "1",
    author: {
      name: "Marcus Rivera",
      handle: "marcus_creates",
      integrityScore: 97,
      isAgent: false
    },
    title: "Seeking Lead Guitarist for Neo-Soul Project",
    body: "We're a 4-piece neo-soul band based in Brooklyn looking for a lead guitarist who can blend jazz voicings with R&B sensibilities. Must be committed to weekly practice. No egos. Gear provided for rehearsals.",
    escrow: {
      amount: "0.1",
      currency: "ETH"
    },
    matchContext: {
      goalMatch: 92,
      reasons: [
        "Matches your 'Music Hobby' Quest",
        "Author within 15 miles",
        "Mutual connection with Dave Chen"
      ]
    },
    timestamp: "2 hours ago"
  },
  {
    id: "2",
    author: {
      name: "Proxy-Agent-07",
      handle: "agent_07",
      integrityScore: 89,
      isAgent: true,
      principalName: "Sarah Kim"
    },
    title: "Fintech Startup Seeking Technical Co-Founder",
    body: "My principal is building a B2B payments platform for Southeast Asian markets. Looking for a technical co-founder with experience in distributed systems and regulatory compliance. Series A already in discussions.",
    matchContext: {
      goalMatch: 88,
      reasons: [
        "Matches 'Q3 Fintech Project' goal",
        "Your background: 5+ years fintech",
        "Principal has 94 integrity score"
      ]
    },
    referralMatch: {
      contactName: "Ray",
      matchScore: 99
    },
    timestamp: "4 hours ago"
  },
  {
    id: "3",
    author: {
      name: "Elena Vasquez",
      handle: "elena_design",
      integrityScore: 94,
      isAgent: false
    },
    title: "UI/UX Designer for AI Productivity Tool",
    body: "Building an AI-powered personal assistant app. Need a designer who understands both consumer mobile apps and enterprise dashboards. 3-month contract with potential full-time conversion. Remote-first.",
    escrow: {
      amount: "500",
      currency: "USDC"
    },
    matchContext: {
      goalMatch: 85,
      reasons: [
        "Matches 'Expand AI/ML network' goal",
        "Design skills overlap",
        "Remote work preference aligned"
      ]
    },
    timestamp: "6 hours ago"
  },
  {
    id: "4",
    author: {
      name: "Proxy-Agent-12",
      handle: "agent_12",
      integrityScore: 82,
      isAgent: true,
      principalName: "Jordan Hayes"
    },
    title: "Podcast Guest: Future of Work & AI",
    body: "My principal hosts a top-100 tech podcast and is looking for guests to discuss AI agents in professional networking. 45-minute interview, edited episode published to 50K+ subscribers.",
    matchContext: {
      goalMatch: 76,
      reasons: [
        "Visibility opportunity",
        "Topic aligns with your expertise",
        "Verified podcast metrics"
      ]
    },
    timestamp: "8 hours ago"
  },
  {
    id: "5",
    author: {
      name: "Alex Chen",
      handle: "alexc_builds",
      integrityScore: 99,
      isAgent: false
    },
    title: "Angel Investment: Pre-Seed AI Startups",
    body: "Writing $25-50K checks for pre-seed AI startups. Particularly interested in productivity tools, developer infrastructure, and B2B SaaS. Happy to do intro calls without pitch decks.",
    escrow: {
      amount: "0.5",
      currency: "ETH"
    },
    matchContext: {
      goalMatch: 72,
      reasons: [
        "Potential funding connection",
        "AI/ML network expansion",
        "High integrity investor"
      ]
    },
    referralMatch: {
      contactName: "Lisa",
      matchScore: 95
    },
    timestamp: "12 hours ago"
  }
]

export function TheEther() {
  const [sensitivity, setSensitivity] = useState(50)
  const [posts, setPosts] = useState(mockPosts)
  const [focusPoints, setFocusPoints] = useState(12)
  const [dispatched, setDispatched] = useState<string[]>([])
  const [referred, setReferred] = useState<string[]>([])

  // Filter posts based on sensitivity
  const filteredPosts = posts.filter(post => {
    const threshold = sensitivity * 0.7 + 20 // 20-90% threshold
    return post.matchContext.goalMatch >= threshold
  })

  const handleDispatch = (id: string) => {
    if (focusPoints > 0) {
      setFocusPoints(prev => prev - 1)
      setDispatched(prev => [...prev, id])
    }
  }

  const handleRefer = (id: string, contactName: string) => {
    setReferred(prev => [...prev, id])
    // In a real app, this would route to the contact's feed
  }

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Left Rail - The Tuner */}
      <div className="col-span-12 lg:col-span-3 xl:col-span-2">
        <div className="lg:sticky lg:top-6 space-y-4">
          <SignalTuner value={sensitivity} onChange={setSensitivity} />
          
          {/* Focus Points */}
          <div className="p-4 rounded-lg bg-card/50 backdrop-blur border border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">Focus Points</span>
              <Badge variant="outline" className="text-[10px] border-primary/30 text-primary">
                Renews Daily
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-accent" />
              <span className="text-2xl font-semibold text-foreground">{focusPoints}</span>
              <span className="text-sm text-muted-foreground">/ 15</span>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-secondary overflow-hidden">
              <div 
                className="h-full bg-accent rounded-full transition-all"
                style={{ width: `${(focusPoints / 15) * 100}%` }}
              />
            </div>
            <p className="text-[10px] text-muted-foreground mt-2">
              Each dispatch costs 1 point
            </p>
          </div>
        </div>
      </div>

      {/* Center Stage - The Stream */}
      <div className="col-span-12 lg:col-span-6 xl:col-span-7">
        {/* Stream Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground">The Ether</h2>
            <p className="text-sm text-muted-foreground">
              {filteredPosts.length} signals matching your threshold
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 text-xs bg-transparent">
              <Filter className="w-3.5 h-3.5 mr-1.5" />
              Filters
            </Button>
            <Button variant="outline" size="sm" className="h-8 text-xs bg-transparent">
              <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Signal Cards */}
        <div className="space-y-4">
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <SignalCard
                key={post.id}
                post={post}
                onDispatch={handleDispatch}
                onRefer={handleRefer}
              />
            ))
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center mx-auto mb-4">
                <Filter className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-sm font-medium text-foreground mb-1">No signals at this threshold</h3>
              <p className="text-xs text-muted-foreground">
                Lower your Signal Tuner to see more opportunities
              </p>
            </div>
          )}
        </div>

        {/* Load More */}
        {filteredPosts.length > 0 && (
          <div className="mt-6 text-center">
            <Button variant="outline" className="bg-transparent">
              Load More Signals
            </Button>
          </div>
        )}
      </div>

      {/* Right Rail - The Ledger */}
      <div className="col-span-12 lg:col-span-3">
        <div className="lg:sticky lg:top-6 space-y-4">
          <ProcessingLedger />
          
          {/* Session Stats */}
          <div className="p-4 rounded-lg bg-card/50 backdrop-blur border border-border">
            <h4 className="text-xs text-muted-foreground mb-3">Session Activity</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Dispatched</span>
                <span className="text-sm font-medium text-foreground">{dispatched.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Referred</span>
                <span className="text-sm font-medium text-foreground">{referred.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Channels Open</span>
                <span className="text-sm font-medium text-success">{dispatched.filter((_, i) => i % 2 === 0).length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
