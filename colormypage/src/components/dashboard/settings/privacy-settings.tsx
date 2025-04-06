"use client"

import { useState } from "react"
import { Loader2, Shield, Eye, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export function PrivacySettings() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // State for privacy preferences
  const [dataSharing, setDataSharing] = useState(false)
  const [activityTracking, setActivityTracking] = useState(true)
  const [profileVisibility, setProfileVisibility] = useState("public")

  const handleSave = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Privacy settings updated",
      description: "Your privacy preferences have been saved successfully.",
    })

    setIsLoading(false)
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Privacy Preferences</CardTitle>
          <CardDescription>Control how your information is used and shared on ColorMyPage.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Shield className="h-5 w-5 text-gray-500" />
              <div>
                <Label htmlFor="data-sharing" className="font-medium">
                  Data Sharing
                </Label>
                <p className="text-sm text-gray-500">
                  Allow us to share anonymized usage data to improve our services.
                </p>
              </div>
            </div>
            <Switch id="data-sharing" checked={dataSharing} onCheckedChange={setDataSharing} disabled={isLoading} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Eye className="h-5 w-5 text-gray-500" />
              <div>
                <Label htmlFor="activity-tracking" className="font-medium">
                  Activity Tracking
                </Label>
                <p className="text-sm text-gray-500">
                  Allow us to track your activity to provide personalized recommendations.
                </p>
              </div>
            </div>
            <Switch
              id="activity-tracking"
              checked={activityTracking}
              onCheckedChange={setActivityTracking}
              disabled={isLoading}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Profile Visibility</CardTitle>
          <CardDescription>Control who can see your profile and activity on ColorMyPage.</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={profileVisibility}
            onValueChange={setProfileVisibility}
            className="space-y-4"
            disabled={isLoading}
          >
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="public" id="public" className="mt-1" />
              <div>
                <Label htmlFor="public" className="font-medium">
                  Public
                </Label>
                <p className="text-sm text-gray-500">Anyone can see your profile, favorites, and activity.</p>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <RadioGroupItem value="limited" id="limited" className="mt-1" />
              <div>
                <Label htmlFor="limited" className="font-medium">
                  Limited
                </Label>
                <p className="text-sm text-gray-500">
                  Only your profile is public, but your favorites and activity are private.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <RadioGroupItem value="private" id="private" className="mt-1" />
              <div>
                <Label htmlFor="private" className="font-medium">
                  Private
                </Label>
                <p className="text-sm text-gray-500">Your profile, favorites, and activity are completely private.</p>
              </div>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cookie Preferences</CardTitle>
          <CardDescription>Manage how we use cookies on ColorMyPage.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Lock className="h-5 w-5 text-gray-500" />
              <div>
                <Label className="font-medium">Essential Cookies</Label>
                <p className="text-sm text-gray-500">
                  Required for the website to function properly. Cannot be disabled.
                </p>
              </div>
            </div>
            <Switch checked={true} disabled={true} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Lock className="h-5 w-5 text-gray-500" />
              <div>
                <Label htmlFor="analytics-cookies" className="font-medium">
                  Analytics Cookies
                </Label>
                <p className="text-sm text-gray-500">Help us understand how you use our website.</p>
              </div>
            </div>
            <Switch
              id="analytics-cookies"
              checked={activityTracking}
              onCheckedChange={setActivityTracking}
              disabled={isLoading}
            />
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} disabled={isLoading} className="bg-[#9d84ff] hover:bg-[#8a6dff]">
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
          </>
        ) : (
          "Save Privacy Settings"
        )}
      </Button>
    </div>
  )
}

