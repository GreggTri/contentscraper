import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp } from "lucide-react"

interface TopicsListProps {
  topics: [string, number][]
}

export function TopicsList({ topics }: TopicsListProps) {
  const maxCount = topics.length > 0 ? topics[0][1] : 1

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Trending Topics
        </CardTitle>
      </CardHeader>
      <CardContent>
        {topics.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No topics analyzed yet</p>
        ) : (
          <div className="space-y-3">
            {topics.map(([topic, count]) => (
              <div key={topic} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{topic}</span>
                  <Badge variant="secondary">{count}</Badge>
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
