"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, TrendingUp, Clock, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface Goal {
  id: string
  title: string
  progress: number
  priority: "high" | "medium" | "low"
  deadline?: string
}

interface UserGoalsProps {
  goals: Goal[]
  compact?: boolean
}

const priorityStyles = {
  high: "border-rose-500/40 bg-rose-500/5 text-rose-500",
  medium: "border-amber-500/40 bg-amber-500/5 text-amber-500",
  low: "border-emerald-500/40 bg-emerald-500/5 text-emerald-500"
}

export function UserGoals({ goals, compact = false }: UserGoalsProps) {
  if (compact) {
    return (
      <div className="space-y-2">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className={cn(
              "p-3 rounded-lg border transition-all",
              priorityStyles[goal.priority]
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-2 min-w-0">
                <Target className="w-4 h-4 mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{goal.title}</p>
                  {goal.deadline && (
                    <p className="text-xs opacity-70 mt-0.5 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {goal.deadline}
                    </p>
                  )}
                </div>
              </div>
              <Badge 
                variant="outline" 
                className={cn(
                  "shrink-0 text-[10px] h-5",
                  goal.progress === 100 && "border-success/40 text-success"
                )}
              >
                {goal.progress === 100 ? (
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                ) : (
                  <TrendingUp className="w-3 h-3 mr-1" />
                )}
                {goal.progress}%
              </Badge>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <Card className="bg-card/50 backdrop-blur border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <Target className="w-4 h-4 text-accent" />
          Your Goals
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className={cn(
              "p-3 rounded-lg border transition-all",
              priorityStyles[goal.priority]
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{goal.title}</p>
                {goal.deadline && (
                  <p className="text-xs opacity-70 mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {goal.deadline}
                  </p>
                )}
              </div>
              <div className="flex flex-col items-end gap-1">
                <Badge 
                  variant="outline" 
                  className={cn(
                    "text-[10px] h-5",
                    goal.progress === 100 && "border-success/40 text-success"
                  )}
                >
                  {goal.progress === 100 ? (
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                  ) : (
                    <TrendingUp className="w-3 h-3 mr-1" />
                  )}
                  {goal.progress}%
                </Badge>
                <Badge 
                  variant="outline" 
                  className="text-[9px] h-4 capitalize opacity-70"
                >
                  {goal.priority}
                </Badge>
              </div>
            </div>
            <div className="mt-3 h-1.5 rounded-full bg-background/50 overflow-hidden">
              <div 
                className={cn(
                  "h-full rounded-full transition-all",
                  goal.priority === "high" && "bg-rose-500",
                  goal.priority === "medium" && "bg-amber-500",
                  goal.priority === "low" && "bg-emerald-500"
                )}
                style={{ width: `${goal.progress}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
