"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Skeleton } from "@/components/ui/skeleton"
import { RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface PreviewTabsProps {
  project: any
}

export default function PreviewTabs({ project }: PreviewTabsProps) {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("script")
  const [isLoading, setIsLoading] = useState(false)

  const handleRefresh = async () => {
    setIsLoading(true)

    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Refreshed",
        description: `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} has been refreshed`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to refresh ${activeTab}`,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="shadow-md h-full">
      <CardHeader className="flex flex-row items-center justify-between px-8 py-6 border-b">
        <CardTitle className="text-3xl font-bold">Preview Outputs</CardTitle>
        <Button variant="outline" onClick={handleRefresh} disabled={isLoading || !project} className="h-10 px-4">
          <RefreshCw className={`h-5 w-5 mr-2 ${isLoading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </CardHeader>
      <CardContent className="px-8 py-8">
        {!project ? (
          <div className="flex flex-col items-center justify-center h-[500px] text-center">
            <p className="text-xl text-muted-foreground mb-3">No preview available</p>
            <p className="text-lg text-muted-foreground">Generate a video to see the preview</p>
          </div>
        ) : (
          <Tabs defaultValue="script" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-6 h-12">
              <TabsTrigger value="script" className="text-base py-3">
                Script
              </TabsTrigger>
              <TabsTrigger value="audio" className="text-base py-3">
                Audio
              </TabsTrigger>
              <TabsTrigger value="visual" className="text-base py-3">
                Visual
              </TabsTrigger>
              <TabsTrigger value="video" className="text-base py-3">
                Video
              </TabsTrigger>
            </TabsList>

            <TabsContent value="script" className="min-h-[450px] m-0">
              {isLoading ? (
                <Skeleton className="w-full h-[450px]" />
              ) : (
                <Textarea readOnly value={project.script || ""} className="min-h-[450px] resize-none text-base p-4" />
              )}
            </TabsContent>

            <TabsContent value="audio" className="min-h-[450px] m-0">
              {isLoading ? (
                <Skeleton className="w-full h-[100px] my-[175px]" />
              ) : (
                <div className="flex flex-col items-center justify-center h-[450px]">
                  <audio controls src={project.audio_url} className="w-full max-w-3xl" style={{ height: "60px" }}>
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}
            </TabsContent>

            <TabsContent value="visual" className="min-h-[450px] m-0">
              {isLoading ? (
                <Skeleton className="w-full h-[450px]" />
              ) : (
                <div className="flex justify-center items-center h-[450px]">
                  <img
                    src={project.visual_url || "/placeholder.svg"}
                    alt="Visual preview"
                    className="max-w-full max-h-[450px] object-contain rounded-md"
                  />
                </div>
              )}
            </TabsContent>

            <TabsContent value="video" className="min-h-[450px] m-0">
              {isLoading ? (
                <Skeleton className="w-full h-[450px]" />
              ) : (
                <div className="flex justify-center items-center h-[450px]">
                  <video controls src={project.video_url} className="max-w-full max-h-[450px] rounded-md">
                    Your browser does not support the video element.
                  </video>
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  )
}
