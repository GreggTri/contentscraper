"use client"
import type { InstagramAccount, OutstandingVideo, ContentAnalysis } from "@/types/instagram"
import { TrendingUp, Target, BarChart3 } from "lucide-react"
import { StatsGrid } from "./stats-grid"
import { TopicsList } from "./topics-list"
import { ContentTypesList } from "./content-types-list"
import { SpinOffIdeasGrid } from "./spin-off-ideas-grid"

interface NicheInsightsProps {
  accounts: InstagramAccount[]
  outstandingVideos: OutstandingVideo[]
  analyses: ContentAnalysis[]
}

export function NicheInsights({ accounts, outstandingVideos, analyses }: NicheInsightsProps) {
  // Calculate insights
  const totalViews = outstandingVideos.reduce((sum, video) => sum + video.viewCount, 0)
  const averageMultiplier =
    outstandingVideos.length > 0
      ? outstandingVideos.reduce((sum, video) => sum + video.viewsMultiplier, 0) / outstandingVideos.length
      : 0

  // Extract trending topics from analyses
  const allTopics = analyses.flatMap((analysis) => analysis.keyTopics)
  const topicCounts = allTopics.reduce(
    (acc, topic) => {
      acc[topic] = (acc[topic] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const trendingTopics = Object.entries(topicCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)

  // Extract content types
  const contentTypes = analyses.reduce(
    (acc, analysis) => {
      acc[analysis.contentType] = (acc[analysis.contentType] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const topContentTypes = Object.entries(contentTypes)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)

  // Get all spin-off ideas
  const allSpinOffIdeas = analyses.flatMap((analysis) => analysis.spinOffIdeas)

  const stats = [
    {
      icon: Target,
      label: "Tracked Accounts",
      value: accounts.length.toString(),
      color: "blue",
    },
    {
      icon: TrendingUp,
      label: "Outstanding Videos",
      value: outstandingVideos.length.toString(),
      color: "green",
    },
    {
      icon: BarChart3,
      label: "Total Views",
      value: `${(totalViews / 1000000).toFixed(1)}M`,
      color: "purple",
    },
    {
      icon: TrendingUp,
      label: "Avg Performance",
      value: `${averageMultiplier.toFixed(1)}x`,
      color: "orange",
    },
  ]

  return (
    <div className="space-y-6">
      <StatsGrid stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopicsList topics={trendingTopics} />
        <ContentTypesList contentTypes={topContentTypes} />
      </div>

      <SpinOffIdeasGrid ideas={allSpinOffIdeas} />
    </div>
  )
}
