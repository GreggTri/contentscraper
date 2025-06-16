"use client"

import { useState, useCallback } from "react"
import type { InstagramAccount, InstagramVideo, OutstandingVideo, ContentAnalysis } from "@/types/instagram"

export function useInstagramAccounts() {
  const [accounts, setAccounts] = useState<InstagramAccount[]>([])
  const [videos, setVideos] = useState<Record<string, InstagramVideo[]>>({})
  const [outstandingVideos, setOutstandingVideos] = useState<Record<string, OutstandingVideo[]>>({})
  const [analyses, setAnalyses] = useState<Record<string, ContentAnalysis>>({})
  const [loading, setLoading] = useState<Record<string, boolean>>({})


  const fetchAccountData = useCallback(async (username: string) => {
    setLoading((prev) => ({ ...prev, [username]: true }))

    try {
      // Fetch videos
      const videosResponse = await fetch("/api/instagram/fetch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      })

      if (!videosResponse.ok) throw new Error("Failed to fetch videos")

      const { videos: fetchedVideos } = await videosResponse.json()
      setVideos((prev) => ({ ...prev, [username]: fetchedVideos }))

      // Analyze for outstanding videos
      const analysisResponse = await fetch("/api/instagram/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videos: fetchedVideos }),
      })

      if (!analysisResponse.ok) throw new Error("Failed to analyze videos")

      const { outstandingVideos: outstanding } = await analysisResponse.json()
      setOutstandingVideos((prev) => ({ ...prev, [username]: outstanding }))
    } catch (error) {
      console.error("Error fetching account data:", error)
    } finally {
      setLoading((prev) => ({ ...prev, [username]: false }))
    }
  }, [])

  const addAccount = useCallback(async (username: string) => {
    const accountId = `account_${Date.now()}`
    const newAccount: InstagramAccount = {
      id: accountId,
      username,
      displayName: username,
      followersCount: 0,
      addedAt: new Date(),
      isActive: true,
    }

    setAccounts((prev) => [...prev, newAccount])
    await fetchAccountData(username)
  }, [fetchAccountData])

  

  const analyzeVideoWithAI = useCallback(async (video: OutstandingVideo) => {
    try {
      const response = await fetch("/api/instagram/ai-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ video }),
      })

      if (!response.ok) throw new Error("Failed to analyze with AI")

      const analysis = await response.json()
      setAnalyses((prev) => ({ ...prev, [video.id]: analysis }))
      return analysis
    } catch (error) {
      console.error("Error in AI analysis:", error)
      throw error
    }
  }, [])

  const removeAccount = useCallback((accountId: string) => {
    setAccounts((prev) => prev.filter((account) => account.id !== accountId))
  }, [])

  return {
    accounts,
    videos,
    outstandingVideos,
    analyses,
    loading,
    addAccount,
    fetchAccountData,
    analyzeVideoWithAI,
    removeAccount,
  }
}
