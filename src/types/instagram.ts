export interface InstagramAccount {
  id: string
  username: string
  displayName: string
  followersCount: number
  addedAt: Date
  isActive: boolean
}

export interface InstagramVideo {
  id: string
  shortCode: string
  caption: string
  viewCount: number
  likeCount: number
  commentCount: number
  timestamp: Date
  thumbnailUrl: string
  videoUrl: string
  accountUsername: string
}

export interface OutstandingVideo extends InstagramVideo {
  averageViews: number
  viewsMultiplier: number
  isOutstanding: boolean
}

export interface ContentAnalysis {
  videoId: string
  summary: string
  keyTopics: string[]
  contentType: string
  spinOffIdeas: string[]
  confidence: number
}

export interface NicheInsight {
  niche: string
  accounts: string[]
  totalVideos: number
  averageViews: number
  topPerformingContent: string[]
  trendingTopics: string[]
}
