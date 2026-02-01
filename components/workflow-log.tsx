"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Circle, CheckCircle2, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface WorkflowItem {
  id: string
  title: string
  status: "active" | "passive" | "completed"
  progress?: number
  statusText?: string
}

interface WorkflowLogProps {
  items: WorkflowItem[]
}

export function WorkflowLog({ items }: WorkflowLogProps) {
  return (
    <Card className="bg-card/50 backdrop-blur border-border h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Workflow (Your Agent's sub-goals)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className={cn(
              "p-3 rounded-lg border transition-all duration-300",
              item.status === "active" && "bg-primary/5 border-primary/30",
              item.status === "passive" && "bg-secondary/50 border-border",
              item.status === "completed" && "bg-success/5 border-success/30 opacity-70"
            )}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                {item.status === "active" && (
                  <Loader2 className="w-4 h-4 text-primary animate-spin" />
                )}
                {item.status === "passive" && (
                  <Circle className="w-4 h-4 text-muted-foreground" />
                )}
                {item.status === "completed" && (
                  <CheckCircle2 className="w-4 h-4 text-success" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className={cn(
                  "text-sm font-medium truncate",
                  item.status === "completed" && "line-through text-muted-foreground"
                )}>
                  {item.title}
                </p>
                {item.status === "active" && item.progress !== undefined && (
                  <div className="mt-2 space-y-1">
                    <Progress value={item.progress} className="h-1" />
                    <p className="text-xs text-muted-foreground">
                      {item.progress}% scanned
                    </p>
                  </div>
                )}
                {item.statusText && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Status: {item.statusText}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
