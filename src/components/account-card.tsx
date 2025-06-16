"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { InstagramAccount, InstagramVideo, OutstandingVideo } from "@/types/instagram"
import { RefreshCw, Trash2, TrendingUp, Video, Eye } from "lucide-react"

interface AccountCardProps {
  account: InstagramAccount
  videos: InstagramVideo[]
  outstandingVideos: OutstandingVideo[]
  loading: boolean
  onRefresh: () => void
  onRemove: () => void
}

export function AccountCard({ account, videos, outstandingVideos, loading, onRefresh, onRemove }: AccountCardProps) {
  const averageViews =
    videos.length > 0 ? Math.round(videos.reduce((sum, v) => sum + v.viewCount, 0) / videos.length) : 0

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">@{account.username}</CardTitle>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" onClick={onRefresh} disabled={loading}>
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            </Button>
            <Button variant="ghost" size="sm" onClick={onRemove} className="text-destructive hover:text-destructive">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
            <span className="ml-2 text-muted-foreground">Analyzing content...</span>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Video className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Videos</p>
                  <p className="font-semibold">{videos.length}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Outstanding</p>
                  <p className="font-semibold">{outstandingVideos.length}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Eye className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Views</p>
                <p className="font-semibold">{averageViews.toLocaleString()}</p>
              </div>
            </div>

            {outstandingVideos.length > 0 && (
              <>
                <Separator />
                <div className="space-y-3">
                  <p className="text-sm font-medium">Top Performers</p>
                  <div className="space-y-2">
                    {outstandingVideos.slice(0, 3).map((video) => (
                      <div key={video.id} className="flex items-center justify-between text-sm">
                        <span className="truncate flex-1 mr-2 text-muted-foreground">
                          {video.caption.slice(0, 30)}...
                        </span>
                        <Badge variant="secondary">{video.viewsMultiplier.toFixed(1)}x</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}