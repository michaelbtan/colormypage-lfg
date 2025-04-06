"use client"

import { useState } from "react"
import { Loader2, Bell, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export function NotificationSettings() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // State for notification preferences
  const [emailNotifications, setEmailNotifications] = useState({
    newContent: true,
    favorites: true,
    newsletter: true,
  })

  const [pushNotifications, setPushNotifications] = useState({
    newContent: false,
    favorites: true,
  })

  const handleSave = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Notification preferences updated",
      description: "Your notification settings have been saved successfully.",
    })

    setIsLoading(false)
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Email Notifications</CardTitle>
          <CardDescription>Choose what types of email notifications you'd like to receive.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Mail className="h-5 w-5 text-gray-500" />
              <div>
                <Label htmlFor="email-new-content" className="font-medium">
                  New Content Alerts
                </Label>
                <p className="text-sm text-gray-500">
                  Get notified when new coloring pages are added to your favorite categories.
                </p>
              </div>
            </div>
            <Switch
              id="email-new-content"
              checked={emailNotifications.newContent}
              onCheckedChange={(checked) => setEmailNotifications({ ...emailNotifications, newContent: checked })}
              disabled={isLoading}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Mail className="h-5 w-5 text-gray-500" />
              <div>
                <Label htmlFor="email-favorites" className="font-medium">
                  Favorites Updates
                </Label>
                <p className="text-sm text-gray-500">Receive emails about updates to your favorite coloring pages.</p>
              </div>
            </div>
            <Switch
              id="email-favorites"
              checked={emailNotifications.favorites}
              onCheckedChange={(checked) => setEmailNotifications({ ...emailNotifications, favorites: checked })}
              disabled={isLoading}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Mail className="h-5 w-5 text-gray-500" />
              <div>
                <Label htmlFor="email-newsletter" className="font-medium">
                  Weekly Newsletter
                </Label>
                <p className="text-sm text-gray-500">
                  Receive our weekly newsletter with coloring tips and featured pages.
                </p>
              </div>
            </div>
            <Switch
              id="email-newsletter"
              checked={emailNotifications.newsletter}
              onCheckedChange={(checked) => setEmailNotifications({ ...emailNotifications, newsletter: checked })}
              disabled={isLoading}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Push Notifications</CardTitle>
          <CardDescription>Configure browser push notifications for immediate updates.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Bell className="h-5 w-5 text-gray-500" />
              <div>
                <Label htmlFor="push-new-content" className="font-medium">
                  New Content Alerts
                </Label>
                <p className="text-sm text-gray-500">
                  Get notified when new coloring pages are added to your favorite categories.
                </p>
              </div>
            </div>
            <Switch
              id="push-new-content"
              checked={pushNotifications.newContent}
              onCheckedChange={(checked) => setPushNotifications({ ...pushNotifications, newContent: checked })}
              disabled={isLoading}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Bell className="h-5 w-5 text-gray-500" />
              <div>
                <Label htmlFor="push-favorites" className="font-medium">
                  Favorites Updates
                </Label>
                <p className="text-sm text-gray-500">
                  Receive notifications about updates to your favorite coloring pages.
                </p>
              </div>
            </div>
            <Switch
              id="push-favorites"
              checked={pushNotifications.favorites}
              onCheckedChange={(checked) => setPushNotifications({ ...pushNotifications, favorites: checked })}
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
          "Save Notification Preferences"
        )}
      </Button>
    </div>
  )
}

