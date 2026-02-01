"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface AgentOrbProps {
  status: "scanning" | "negotiating" | "idle" | "filtering"
  className?: string
}

export function AgentOrb({ status, className }: AgentOrbProps) {
  const [particles, setParticles] = useState<Array<{ id: number; angle: number; distance: number }>>([])

  useEffect(() => {
    if (status === "filtering") {
      const interval = setInterval(() => {
        setParticles(prev => {
          const newParticle = {
            id: Date.now(),
            angle: Math.random() * 360,
            distance: 0
          }
          return [...prev.slice(-5), newParticle]
        })
      }, 800)
      return () => clearInterval(interval)
    }
  }, [status])

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      {/* Outer glow ring */}
      <div className={cn(
        "absolute w-48 h-48 rounded-full opacity-20 blur-xl transition-colors duration-1000",
        status === "scanning" && "bg-primary animate-pulse",
        status === "negotiating" && "bg-accent animate-pulse",
        status === "filtering" && "bg-destructive animate-pulse",
        status === "idle" && "bg-muted-foreground"
      )} />
      
      {/* Middle ring */}
      <div className={cn(
        "absolute w-36 h-36 rounded-full border opacity-40 transition-all duration-500",
        status === "scanning" && "border-primary animate-spin",
        status === "negotiating" && "border-accent",
        status === "filtering" && "border-destructive",
        status === "idle" && "border-muted-foreground"
      )} style={{ animationDuration: "8s" }} />
      
      {/* Inner ring */}
      <div className={cn(
        "absolute w-28 h-28 rounded-full border opacity-60 transition-all duration-500",
        status === "scanning" && "border-primary animate-spin",
        status === "negotiating" && "border-accent animate-spin",
        status === "filtering" && "border-destructive",
        status === "idle" && "border-muted-foreground"
      )} style={{ animationDuration: "4s", animationDirection: "reverse" }} />

      {/* Core orb */}
      <div className={cn(
        "relative w-20 h-20 rounded-full backdrop-blur-sm transition-all duration-500",
        "bg-gradient-to-br shadow-lg",
        status === "scanning" && "from-primary/80 to-primary/40 shadow-primary/30",
        status === "negotiating" && "from-accent/80 to-accent/40 shadow-accent/30",
        status === "filtering" && "from-destructive/80 to-destructive/40 shadow-destructive/30",
        status === "idle" && "from-muted/80 to-muted/40 shadow-muted/30"
      )}>
        {/* Inner glow */}
        <div className={cn(
          "absolute inset-2 rounded-full opacity-60 blur-sm",
          status === "scanning" && "bg-primary",
          status === "negotiating" && "bg-accent",
          status === "filtering" && "bg-destructive",
          status === "idle" && "bg-muted-foreground"
        )} />
        
        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={cn(
            "w-3 h-3 rounded-full",
            status === "scanning" && "bg-primary-foreground",
            status === "negotiating" && "bg-accent-foreground",
            status === "filtering" && "bg-destructive-foreground",
            status === "idle" && "bg-foreground/50"
          )} />
        </div>
      </div>

      {/* Deflection particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 bg-destructive rounded-full animate-ping"
          style={{
            transform: `rotate(${particle.angle}deg) translateX(80px)`,
            animationDuration: "1s"
          }}
        />
      ))}

      {/* Scanning line */}
      {status === "scanning" && (
        <div 
          className="absolute w-48 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent animate-spin"
          style={{ animationDuration: "3s" }}
        />
      )}
    </div>
  )
}
