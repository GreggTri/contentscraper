"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"

interface AddAccountFormProps {
  username: string
  onUsernameChange: (username: string) => void
  onSubmit: () => void
}

export function AddAccountForm({ username, onUsernameChange, onSubmit }: AddAccountFormProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSubmit()
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Add Instagram Account
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Label htmlFor="username" className="sr-only">
              Instagram Username
            </Label>
            <Input
              id="username"
              placeholder="Enter Instagram username (without @)"
              value={username}
              onChange={(e) => onUsernameChange(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          <Button onClick={onSubmit} disabled={!username.trim()}>
            <Plus className="h-4 w-4 mr-2" />
            Add Account
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
