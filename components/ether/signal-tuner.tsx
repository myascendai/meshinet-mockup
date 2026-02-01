"use client"

import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { Radio, Sparkles, Eye, Radar } from "lucide-react"
import { cn } from "@/lib/utils"

interface SignalTunerProps {
  value: number
  onChange: (value: number) => void
}

const tunerLevels = [
  {
    value: 0,
    label: "Discovery",
    description: "Broad opportunities and network chatter",
    icon: Radar
  },
  {
    value: 33,
    label: "Balanced",
    description: "Moderate filtering with good coverage",
    icon: Eye
  },
  {
    value: 66,
    label: "Focused",
    description: "High relevance, verified sources",
    icon: Radio
  },
  {
    value: 100,
    label: "High Signal",
    description: "95%+ goal match & verified escrow only",
    icon: Sparkles
  }
]

export function SignalTuner({ value, onChange }: SignalTunerProps) {
  const getCurrentLevel = () => {
    if (value >= 85) return tunerLevels[3]
    if (value >= 50) return tunerLevels[2]
    if (value >= 20) return tunerLevels[1]
    return tunerLevels[0]
  }

  const currentLevel = getCurrentLevel()
  const IconComponent = currentLevel.icon

  return (
    <Card className="bg-card/50 backdrop-blur border-border">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Radio className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-medium text-foreground">Signal Tuner</h3>
        </div>

        {/* Vertical Slider Area */}
        <div className="flex flex-col items-center gap-4">
          {/* Current Level Display */}
          <div className="text-center">
            <div className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 transition-all",
              value >= 85 && "bg-amber-500/20 text-amber-400",
              value >= 50 && value < 85 && "bg-primary/20 text-primary",
              value >= 20 && value < 50 && "bg-accent/20 text-accent",
              value < 20 && "bg-muted text-muted-foreground"
            )}>
              <IconComponent className="w-5 h-5" />
            </div>
            <p className="text-sm font-medium text-foreground">{currentLevel.label}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5 max-w-[140px] leading-relaxed">
              {currentLevel.description}
            </p>
          </div>

          {/* Slider */}
          <div className="w-full px-2">
            <Slider
              value={[value]}
              onValueChange={([v]) => onChange(v)}
              min={0}
              max={100}
              step={1}
              className="w-full"
            />
          </div>

          {/* Level Markers */}
          <div className="w-full flex justify-between px-1">
            {tunerLevels.map((level) => {
              const LevelIcon = level.icon
              return (
                <button
                  key={level.value}
                  type="button"
                  onClick={() => onChange(level.value)}
                  className={cn(
                    "p-1.5 rounded-lg transition-all",
                    Math.abs(value - level.value) < 17 
                      ? "bg-primary/10 text-primary" 
                      : "text-muted-foreground/50 hover:text-muted-foreground"
                  )}
                >
                  <LevelIcon className="w-3.5 h-3.5" />
                </button>
              )
            })}
          </div>
        </div>

        {/* Filter Stats */}
        <div className="mt-4 pt-4 border-t border-border">
          <div className="grid grid-cols-2 gap-3 text-center">
            <div>
              <p className="text-lg font-semibold text-foreground">
                {Math.round(100 - value * 0.7)}%
              </p>
              <p className="text-[10px] text-muted-foreground">Feed Filtered</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-primary">
                {Math.round(value * 0.12 + 70)}%
              </p>
              <p className="text-[10px] text-muted-foreground">Avg Match</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
