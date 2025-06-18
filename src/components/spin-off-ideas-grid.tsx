'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Lightbulb } from "lucide-react"

interface SpinOffIdeasGridProps {
  ideas: string[]
}

export function SpinOffIdeasGrid({ ideas }: SpinOffIdeasGridProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5" />
          All Spin-off Ideas ({ideas.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {ideas.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No spin-off ideas generated yet</p>
        ) : (
          <ScrollArea className="h-96">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pr-4">
              {ideas.map((idea, index) => (
                <div key={index} className="p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                  <p className="text-sm">{idea}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  )
}
