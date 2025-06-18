'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart3 } from "lucide-react"

interface ContentTypesListProps {
  contentTypes: [string, number][]
}

export function ContentTypesList({ contentTypes }: ContentTypesListProps) {
  const maxCount = contentTypes.length > 0 ? contentTypes[0][1] : 1

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Top Content Types
        </CardTitle>
      </CardHeader>
      <CardContent>
        {contentTypes.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No content types analyzed yet</p>
        ) : (
          <div className="space-y-3">
            {contentTypes.map(([type, count]) => (
              <div key={type} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium capitalize">{type}</span>
                  <Badge variant="outline">{count}</Badge>
                </div>
                <Progress value={(count / maxCount) * 100} className="h-2" />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}