"use client"

import { useState } from "react"
import VideoForm from "@/components/video-form"
import PreviewTabs from "@/components/preview-tabs"
import ProjectTable from "@/components/project-table"
import DashboardOverview from "@/components/dashboard-overview"

interface DashboardContentProps {
  activePage: string
}

export default function DashboardContent({ activePage }: DashboardContentProps) {
  const [currentProject, setCurrentProject] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleFormSubmit = async (formData: any) => {
    setIsLoading(true)

    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock response
      const response = {
        id: Math.random().toString(36).substring(2, 10),
        ...formData,
        status: "processing",
        script_id: Math.random().toString(36).substring(2, 10),
        script:
          "Quantum mechanics is a fundamental theory in physics that provides a description of the physical properties of nature at the scale of atoms and subatomic particles. It is the foundation of all quantum physics including quantum chemistry, quantum field theory, quantum technology, and quantum information science.",
        audio_url: "/mock/audio.mp3",
        visual_url: "/mock/visual.png",
        video_url: "/mock/video.mp4",
      }

      setCurrentProject(response)
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Render different content based on active page
  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardOverview />
      case "create":
        return (
          <div className="w-full px-8">
            <div className="mb-10">
              <h1 className="text-4xl font-bold text-gray-900">Create Scientific Video</h1>
              <p className="text-xl text-gray-600 mt-2">Input details to generate your video</p>
            </div>

            <div className="grid gap-10 grid-cols-12">
              <div className="col-span-5">
                <VideoForm onSubmit={handleFormSubmit} isLoading={isLoading} />
              </div>
              <div className="col-span-7">
                <PreviewTabs project={currentProject} />
              </div>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Recent Projects</h2>
              <ProjectTable />
            </div>
          </div>
        )
      case "projects":
        return (
          <div className="w-full px-8">
            <div className="mb-10">
              <h1 className="text-4xl font-bold text-gray-900">Projects</h1>
              <p className="text-xl text-gray-600 mt-2">Manage your scientific video projects</p>
            </div>
            <ProjectTable />
          </div>
        )
      default:
        return <DashboardOverview />
    }
  }

  return <main className="flex-1 overflow-auto py-10">{renderContent()}</main>
}
