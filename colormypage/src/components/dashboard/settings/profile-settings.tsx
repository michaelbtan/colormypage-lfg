"use client"

import { useState } from "react"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Loader2, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useToast } from "@/hooks/use-toast"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  bio: z.string().max(160, { message: "Bio must not be longer than 160 characters" }).optional(),
  location: z.string().max(30, { message: "Location must not be longer than 30 characters" }).optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

interface ProfileSettingsProps {
  user: {
    id: string
    email?: string | null
    name?: string | null
    avatar?: string | null
  }
}

export function ProfileSettings({ user }: ProfileSettingsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // Get initials from name or email
  const getInitials = () => {
    if (user.name) return user.name.charAt(0).toUpperCase()
    if (user.email) return user.email.charAt(0).toUpperCase()
    return "U"
  }

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user.name || "",
      bio: "",
      location: "",
    },
  })

  const onSubmit = async (data: ProfileFormValues) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    })

    setIsLoading(false)
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium">Profile Picture</h3>
        <div className="flex items-center gap-6 mt-4">
          <Avatar className="h-20 w-20 bg-[#9d84ff]">
            {user.avatar ? (
              <Image src={user.avatar || "/placeholder.svg"} alt={user.name || "User"} width={80} height={80} />
            ) : (
              <AvatarFallback className="text-2xl">{getInitials()}</AvatarFallback>
            )}
          </Avatar>

          <div>
            <Button variant="outline" size="sm" className="mb-2">
              <Upload className="h-4 w-4 mr-2" />
              Upload New Picture
            </Button>
            <p className="text-xs text-gray-500">JPG, GIF or PNG. Max size 1MB.</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Personal Information</h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormDescription>This is the name that will be displayed on your profile.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little about yourself"
                      className="resize-none"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormDescription>Brief description for your profile. Max 160 characters.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Your location" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormDescription>Your location will be visible to other users.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading} className="bg-[#9d84ff] hover:bg-[#8a6dff]">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

