/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useInstagramAccounts } from "@/hooks/useInstagramAccounts"
import { VideoAnalysisCard } from "./video-analysis-card"
import { AccountCard } from "./account-card"
import { NicheInsights } from "./niche-insights"
import { DashboardHeader } from "./dashboard-header"
import { AddAccountForm } from "./add-account-form"
import { EmptyState } from "./empty-state"
import { TrendingUp, Users } from "lucide-react"

export function InstagramDashboard() {
  const [newUsername, setNewUsername] = useState("")
  const {
    accounts,
    videos,
    outstandingVideos,
    analyses,
    loading,
    addAccount,
    fetchAccountData,
    analyzeVideoWithAI,
    removeAccount,
  } = useInstagramAccounts()

  const handleAddAccount = async () => {
    if (newUsername.trim()) {
      await addAccount(newUsername.trim())
      setNewUsername("")
    }
  }

  const totalOutstandingVideos = Object.values(outstandingVideos).flat().length
  const totalVideos = Object.values(videos).flat().length

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <DashboardHeader accountsCount={accounts.length} outstandingVideosCount={totalOutstandingVideos} />

        <AddAccountForm username={newUsername} onUsernameChange={setNewUsername} onSubmit={handleAddAccount} />

        <Tabs defaultValue="accounts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="accounts">Accounts</TabsTrigger>
            <TabsTrigger value="outstanding">Outstanding Videos</TabsTrigger>
            <TabsTrigger value="insights">Niche Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="accounts" className="space-y-4">
            {accounts.length === 0 ? (
              <EmptyState
                icon={Users}
                title="No accounts tracked yet"
                description="Add Instagram accounts to start analyzing their content"
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {accounts.map((account) => (
                  <AccountCard
                    key={account.id}
                    account={account}
                    videos={videos[account.username] || []}
                    outstandingVideos={outstandingVideos[account.username] || []}
                    loading={loading[account.username] || false}
                    onRefresh={() => fetchAccountData(account.username)}
                    onRemove={() => removeAccount(account.id)}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="outstanding" className="space-y-4">
            {totalOutstandingVideos === 0 ? (
              <EmptyState
                icon={TrendingUp}
                title="No outstanding videos found"
                description="Add accounts and wait for analysis to find high-performing content"
              />
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {Object.entries(outstandingVideos).map(([username, videos]) =>
                  videos.map((video) => (
                    <VideoAnalysisCard
                      key={video.id}
                      video={video}
                      analysis={analyses[video.id]}
                      onAnalyze={() => analyzeVideoWithAI(video)}
                    />
                  )),
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="insights">
            <NicheInsights
              accounts={accounts}
              outstandingVideos={Object.values(outstandingVideos).flat()}
              analyses={Object.values(analyses)}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
