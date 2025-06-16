import { Card, CardContent } from "@/components/ui/card"
import { Users, TrendingUp } from "lucide-react"

interface DashboardHeaderProps {
  accountsCount: number
  outstandingVideosCount: number
}

export function DashboardHeader({ accountsCount, outstandingVideosCount }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Instagram Content Analyzer</h1>
        <p className="text-muted-foreground">Track creators and discover outstanding content in your niche</p>
      </div>
      <div className="flex gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tracked Accounts</p>
                <p className="text-2xl font-bold">{accountsCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Outstanding Videos</p>
                <p className="text-2xl font-bold">{outstandingVideosCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
