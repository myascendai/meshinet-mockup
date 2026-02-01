"use client"

import { useEffect, useState, useRef } from "react"
import { cn } from "@/lib/utils"

interface NetworkNode {
  id: string
  x: number
  y: number
  type: "user" | "verified" | "discovered" | "unmapped"
  label?: string
}

interface NetworkGraphProps {
  className?: string
}

export function NetworkGraph({ className }: NetworkGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scoutPosition, setScoutPosition] = useState({ x: 50, y: 50 })
  const [nodes] = useState<NetworkNode[]>([
    { id: "user", x: 50, y: 50, type: "user", label: "You" },
    // Verified connections (inner ring)
    { id: "v1", x: 35, y: 35, type: "verified", label: "Sarah" },
    { id: "v2", x: 65, y: 35, type: "verified", label: "John" },
    { id: "v3", x: 35, y: 65, type: "verified", label: "Lisa" },
    { id: "v4", x: 65, y: 65, type: "verified", label: "Mike" },
    // Discovered nodes (outer ring)
    { id: "d1", x: 20, y: 25, type: "discovered" },
    { id: "d2", x: 80, y: 25, type: "discovered" },
    { id: "d3", x: 20, y: 75, type: "discovered" },
    { id: "d4", x: 80, y: 75, type: "discovered" },
    // Unmapped nodes (far outer)
    { id: "u1", x: 10, y: 50, type: "unmapped" },
    { id: "u2", x: 90, y: 50, type: "unmapped" },
    { id: "u3", x: 50, y: 10, type: "unmapped" },
    { id: "u4", x: 50, y: 90, type: "unmapped" },
    { id: "u5", x: 15, y: 15, type: "unmapped" },
    { id: "u6", x: 85, y: 15, type: "unmapped" },
    { id: "u7", x: 15, y: 85, type: "unmapped" },
    { id: "u8", x: 85, y: 85, type: "unmapped" },
  ])

  // Scout movement animation
  useEffect(() => {
    const unmappedNodes = nodes.filter(n => n.type === "unmapped")
    let currentTarget = 0
    
    const interval = setInterval(() => {
      const target = unmappedNodes[currentTarget]
      setScoutPosition({ x: target.x, y: target.y })
      currentTarget = (currentTarget + 1) % unmappedNodes.length
    }, 3000)

    return () => clearInterval(interval)
  }, [nodes])

  const getNodeStyle = (node: NetworkNode) => {
    const base = "absolute rounded-full transition-all duration-500 transform -translate-x-1/2 -translate-y-1/2"
    
    switch (node.type) {
      case "user":
        return cn(base, "w-6 h-6 bg-primary shadow-lg shadow-primary/30 z-20")
      case "verified":
        return cn(base, "w-4 h-4 bg-success shadow-md shadow-success/20 z-10")
      case "discovered":
        return cn(base, "w-3 h-3 bg-accent/60 z-10")
      case "unmapped":
        return cn(base, "w-2 h-2 bg-muted-foreground/30")
    }
  }

  return (
    <div ref={containerRef} className={cn("relative w-full h-full min-h-[300px]", className)}>
      {/* Background grid effect */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" className="text-border">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Unmapped network zone */}
      <div className="absolute inset-8 rounded-full border border-dashed border-muted-foreground/20 opacity-50" />
      
      {/* Verified zone */}
      <div className="absolute inset-[25%] rounded-full border border-success/20 bg-success/5" />

      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {nodes.filter(n => n.type === "verified").map(node => (
          <line
            key={`line-${node.id}`}
            x1="50%"
            y1="50%"
            x2={`${node.x}%`}
            y2={`${node.y}%`}
            stroke="currentColor"
            strokeWidth="1"
            className="text-success/30"
          />
        ))}
        {/* Scout path */}
        <line
          x1="50%"
          y1="50%"
          x2={`${scoutPosition.x}%`}
          y2={`${scoutPosition.y}%`}
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4 4"
          className="text-primary/50 transition-all duration-[3000ms]"
        />
      </svg>

      {/* Nodes */}
      {nodes.map(node => (
        <div
          key={node.id}
          className={getNodeStyle(node)}
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
        >
          {node.label && (
            <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1 text-[10px] text-muted-foreground whitespace-nowrap">
              {node.label}
            </span>
          )}
        </div>
      ))}

      {/* Scout indicator */}
      <div
        className="absolute w-3 h-3 rounded-full bg-primary/80 shadow-lg shadow-primary/50 transition-all duration-[3000ms] transform -translate-x-1/2 -translate-y-1/2 z-30"
        style={{ left: `${scoutPosition.x}%`, top: `${scoutPosition.y}%` }}
      >
        <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-50" />
      </div>

      {/* Legend */}
      <div className="absolute bottom-2 left-2 flex gap-4 text-[10px] text-muted-foreground">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-success" />
          <span>Verified</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-accent/60" />
          <span>Discovered</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
          <span>Unmapped</span>
        </div>
      </div>
    </div>
  )
}
