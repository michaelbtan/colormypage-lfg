"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FavoriteCategories } from "@/components/dashboard/favorite-categories"
import { FavoritePages } from "@/components/dashboard/favorite-pages"

export function FavoriteTabs() {
  const [activeTab, setActiveTab] = useState("pages")

  return (
    <Tabs defaultValue="pages" onValueChange={setActiveTab} value={activeTab}>
      <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
        <TabsTrigger value="pages">Coloring Pages</TabsTrigger>
        <TabsTrigger value="categories">Categories</TabsTrigger>
      </TabsList>

      <TabsContent value="pages" className="mt-0">
        <FavoritePages />
      </TabsContent>

      <TabsContent value="categories" className="mt-0">
        <FavoriteCategories />
      </TabsContent>
    </Tabs>
  )
}

