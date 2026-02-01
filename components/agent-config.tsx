"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Brain, Plug, Shield, Gauge } from "lucide-react"
import { cn } from "@/lib/utils"

interface ConfigModule {
  id: string
  category: "logic" | "integration" | "security"
  name: string
  description: string
  enabled: boolean
}

const initialModules: ConfigModule[] = [
  {
    id: "conservative",
    category: "logic",
    name: "Conservative Negotiator",
    description: "Rejects anything below 90% match",
    enabled: true
  },
  {
    id: "aggressive",
    category: "logic",
    name: "Aggressive Networker",
    description: "Casts a wide net for opportunities",
    enabled: false
  },
  {
    id: "zoom",
    category: "integration",
    name: "Zoom Verifier",
    description: "Auto-verifies meeting attendance",
    enabled: true
  },
  {
    id: "calendar",
    category: "integration",
    name: "Calendar Optimizer",
    description: "Smart scheduling & buffer management",
    enabled: true
  },
  {
    id: "docusign",
    category: "integration",
    name: "DocuSign Autopilot",
    description: "Auto-process document signatures",
    enabled: false
  },
  {
    id: "spam",
    category: "security",
    name: "Spam Shield Mk II",
    description: "Advanced unsolicited outreach filtering",
    enabled: true
  },
  {
    id: "sentiment",
    category: "security",
    name: "Sentiment Adjuster",
    description: "Rewrites aggressive draft communications",
    enabled: false
  }
]

const categoryIcons = {
  logic: Brain,
  integration: Plug,
  security: Shield
}

const categoryLabels = {
  logic: "Decision Logic",
  integration: "Integrations",
  security: "Security"
}

const categoryColors = {
  logic: "text-primary",
  integration: "text-accent",
  security: "text-destructive"
}

const autonomyLevels = [
  {
    value: 0,
    label: "Passive",
    description: "Reacts only when you message it. Performs 1 proactive check every morning.",
    frequency: "Manual + 1 Daily",
    cost: "$21/mo"
  },
  {
    value: 1,
    label: "Hourly Monitor",
    description: "Wakes up once per hour to scan emails and news feeds for opportunities.",
    frequency: "24 checks/day",
    cost: "$63/mo"
  },
  {
    value: 2,
    label: "Active Executive",
    description: "Wakes up every 10 minutes to ensure you beat others to opportunities.",
    frequency: "144 checks/day",
    cost: "$295/mo"
  },
  {
    value: 3,
    label: "Hyper-Loop",
    description: "Continuous mode with complex multi-step research. High intensity scanning.",
    frequency: "Continuous",
    cost: "$600+/mo"
  }
]

export function AgentConfig() {
  const [modules, setModules] = useState(initialModules)
  const [autonomyLevel, setAutonomyLevel] = useState([1]) // Default to "Hourly Monitor"

  const toggleModule = (id: string) => {
    setModules(prev => prev.map(m => 
      m.id === id ? { ...m, enabled: !m.enabled } : m
    ))
  }

  const currentLevel = autonomyLevels[autonomyLevel[0]]

  const groupedModules = modules.reduce((acc, module) => {
    if (!acc[module.category]) {
      acc[module.category] = []
    }
    acc[module.category].push(module)
    return acc
  }, {} as Record<string, ConfigModule[]>)

  return (
    <div className="space-y-4">
      {/* Autonomy Level Control */}
      <Card className="bg-card/50 backdrop-blur border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2 text-primary">
            <Gauge className="w-4 h-4" />
            Autonomy Level
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-6">
            <Slider
              value={autonomyLevel}
              onValueChange={setAutonomyLevel}
              min={0}
              max={3}
              step={1}
              className="w-full"
            />
            
            {/* Current Level Display */}
            <div className="p-4 rounded-lg bg-secondary/50 border border-border">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-foreground">
                      {currentLevel.label}
                    </span>
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "text-[10px] h-4",
                        autonomyLevel[0] === 0 && "border-muted-foreground/30 text-muted-foreground",
                        autonomyLevel[0] === 1 && "border-primary/30 text-primary",
                        autonomyLevel[0] === 2 && "border-accent/30 text-accent",
                        autonomyLevel[0] === 3 && "border-destructive/30 text-destructive"
                      )}
                    >
                      {currentLevel.frequency}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {currentLevel.description}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <div className={cn(
                    "text-sm font-mono font-semibold",
                    autonomyLevel[0] === 0 && "text-muted-foreground",
                    autonomyLevel[0] === 1 && "text-primary",
                    autonomyLevel[0] === 2 && "text-accent",
                    autonomyLevel[0] === 3 && "text-destructive"
                  )}>
                    {currentLevel.cost}
                  </div>
                  <p className="text-[10px] text-muted-foreground/70 mt-0.5">
                    est. cost
                  </p>
                </div>
              </div>
            </div>

            {/* Level Markers */}
            <div className="flex justify-between px-1">
              {autonomyLevels.map((level) => (
                <button
                  key={level.value}
                  type="button"
                  onClick={() => setAutonomyLevel([level.value])}
                  className={cn(
                    "flex flex-col items-center gap-1 transition-opacity hover:opacity-100",
                    autonomyLevel[0] === level.value ? "opacity-100" : "opacity-40"
                  )}
                >
                  <div className={cn(
                    "w-1.5 h-1.5 rounded-full",
                    level.value === 0 && "bg-muted-foreground",
                    level.value === 1 && "bg-primary",
                    level.value === 2 && "bg-accent",
                    level.value === 3 && "bg-destructive"
                  )} />
                  <span className="text-[9px] text-muted-foreground">
                    {level.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Existing Module Cards */}
      {(Object.keys(groupedModules) as Array<keyof typeof categoryIcons>).map(category => {
        const Icon = categoryIcons[category]
        return (
          <Card key={category} className="bg-card/50 backdrop-blur border-border">
            <CardHeader className="pb-3">
              <CardTitle className={cn("text-sm font-medium flex items-center gap-2", categoryColors[category])}>
                <Icon className="w-4 h-4" />
                {categoryLabels[category]}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {groupedModules[category].map(module => (
                <div
                  key={module.id}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-lg border transition-all",
                    module.enabled
                      ? "bg-secondary/50 border-border"
                      : "bg-background/50 border-transparent opacity-60"
                  )}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">
                        {module.name}
                      </span>
                      {module.enabled && (
                        <Badge variant="outline" className="text-[10px] h-4 border-success/30 text-success">
                          Active
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {module.description}
                    </p>
                  </div>
                  <Switch
                    checked={module.enabled}
                    onCheckedChange={() => toggleModule(module.id)}
                    className="ml-4"
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
