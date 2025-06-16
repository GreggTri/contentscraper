"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { OutstandingVideo, ContentAnalysis } from "@/types/instagram"
import { Sparkles, Eye, Heart, MessageCircle, TrendingUp, Lightbulb, Clock } from "lucide-react"

interface VideoAnalysisCardProps {
  video: OutstandingVideo
  analysis?: ContentAnalysis
  onAnalyze: () => Promise<ContentAnalysis>
}

export function VideoAnalysisCard({ video, analysis, onAnalyze }: VideoAnalysisCardProps) {
  const [analyzing, setAnalyzing] = useState(false)

  const handleAnalyze = async () => {
    setAnalyzing(true)
    try {
      await onAnalyze()
    } finally {
      setAnalyzing(false)
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold">@{video.accountUsername}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{video.caption || "No caption"}</p>
            <div className="flex items-center gap-2 mt-2">
              <Clock className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{video.timestamp.toLocaleDateString()}</span>
            </div>
          </div>
          <Badge variant="secondary" className="ml-2">
            {video.viewsMultiplier.toFixed(1)}x above avg
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Video Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-blue-100 rounded">
              <Eye className="h-3 w-3 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Views</p>
              <p className="font-semibold text-sm">{video.viewCount.toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-red-100 rounded">
              <Heart className="h-3 w-3 text-red-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Likes</p>
              <p className="font-semibold text-sm">{video.likeCount.toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-green-100 rounded">
              <MessageCircle className="h-3 w-3 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Comments</p>
              <p className="font-semibold text-sm">{video.commentCount.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* AI Analysis */}
        {!analysis ? (
          <Button onClick={handleAnalyze} disabled={analyzing} className="w-full" variant="outline">
            <Sparkles className={`h-4 w-4 mr-2 ${analyzing ? "animate-spin" : ""}`} />
            {analyzing ? "Analyzing with AI..." : "Analyze with AI"}
          </Button>
        ) : (
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Content Analysis
              </h4>
              <p className="text-sm text-muted-foreground">{analysis.summary}</p>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-2">Key Topics</h4>
              <div className="flex flex-wrap gap-1">
                {analysis.keyTopics.map((topic, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                Spin-off Ideas
              </h4>
              <ScrollArea className="h-32">
                <ul className="space-y-2 pr-4">
                  {analysis.spinOffIdeas.map((idea, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1 text-xs">•</span>
                      <span>{idea}</span>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </div>

            <Separator />

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <Badge variant="outline" className="text-xs">
                {analysis.contentType}
              </Badge>
              <span>Confidence: {Math.round(analysis.confidence * 100)}%</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
