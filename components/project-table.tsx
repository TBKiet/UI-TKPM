"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, Pencil, ExternalLink, Search, ChevronLeft, ChevronRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock project data
const mockProjects = [
  {
    id: "a1b2c3d4",
    topic: "Quantum Mechanics",
    status: "completed",
    script_id: "s1d2f3",
    video_url: "/mock/video1.mp4",
  },
  { id: "e5f6g7h8", topic: "DNA Replication", status: "processing", script_id: "s4d5f6", video_url: null },
  { id: "i9j0k1l2", topic: "Black Holes", status: "completed", script_id: "s7d8f9", video_url: "/mock/video2.mp4" },
  { id: "m3n4o5p6", topic: "Climate Change", status: "draft", script_id: "s0d1f2", video_url: null },
  { id: "q7r8s9t0", topic: "Photosynthesis", status: "completed", script_id: "s3d4f5", video_url: "/mock/video3.mp4" },
]

export default function ProjectTable() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const projectsPerPage = 10

  // Filter projects based on search query
  const filteredProjects = mockProjects.filter((project) =>
    project.topic.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Calculate pagination
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage)
  const currentProjects = filteredProjects.slice((currentPage - 1) * projectsPerPage, currentPage * projectsPerPage)

  const handleEdit = (project: any) => {
    console.log("Navigate to edit", project)
    toast({
      title: "Edit Project",
      description: `Navigating to edit project: ${project.topic}`,
    })
  }

  const handleExport = (project: any) => {
    toast({
      title: "Exporting to YouTube...",
      description: `Project: ${project.topic} is being exported`,
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "draft":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="shadow-md w-full">
      <CardHeader className="flex flex-row items-center justify-between px-8 py-6 border-b">
        <CardTitle className="text-2xl font-bold">Video Projects</CardTitle>
        <div className="relative w-80">
          <Search className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            className="pl-10 h-12 text-base"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent className="px-8 py-6">
        <div className="rounded-md border w-full">
          <Table className="w-full table-fixed">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[15%] text-base font-medium py-4 px-6">Project ID</TableHead>
                <TableHead className="w-[55%] text-base font-medium py-4 px-6">Topic</TableHead>
                <TableHead className="w-[15%] text-base font-medium py-4 px-6">Status</TableHead>
                <TableHead className="w-[15%] text-right text-base font-medium py-4 px-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentProjects.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-10 text-lg text-muted-foreground">
                    No projects found
                  </TableCell>
                </TableRow>
              ) : (
                currentProjects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-mono text-base py-4 px-6 truncate">{project.id}</TableCell>
                    <TableCell className="text-base py-4 px-6">{project.topic}</TableCell>
                    <TableCell className="py-4 px-6">
                      <Badge variant="outline" className={`${getStatusColor(project.status)} text-sm px-3 py-1`}>
                        {project.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right py-4 px-6">
                      <div className="flex justify-end gap-3">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => setSelectedProject(project)}
                              aria-label="View project details"
                              className="h-10 w-10"
                            >
                              <Eye className="h-5 w-5" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle className="text-xl">Project Details</DialogTitle>
                            </DialogHeader>
                            {selectedProject && (
                              <div className="grid gap-6 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <span className="text-base font-medium">ID:</span>
                                  <span className="col-span-3 font-mono text-base">{selectedProject.id}</span>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <span className="text-base font-medium">Topic:</span>
                                  <span className="col-span-3 text-base">{selectedProject.topic}</span>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <span className="text-base font-medium">Status:</span>
                                  <Badge
                                    variant="outline"
                                    className={`col-span-3 w-fit ${getStatusColor(selectedProject.status)} text-sm px-3 py-1`}
                                  >
                                    {selectedProject.status}
                                  </Badge>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <span className="text-base font-medium">Script ID:</span>
                                  <span className="col-span-3 font-mono text-base">{selectedProject.script_id}</span>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <span className="text-base font-medium">Video URL:</span>
                                  <span className="col-span-3 font-mono text-base break-all">
                                    {selectedProject.video_url || "Not available"}
                                  </span>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>

                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleEdit(project)}
                          aria-label="Edit project"
                          className="h-10 w-10"
                        >
                          <Pencil className="h-5 w-5" />
                        </Button>

                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleExport(project)}
                          disabled={project.status !== "completed"}
                          aria-label="Export project"
                          className="h-10 w-10"
                        >
                          <ExternalLink className="h-5 w-5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-end space-x-4 py-6 mt-4">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="h-10 px-4"
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              Previous
            </Button>
            <div className="text-base text-muted-foreground">
              Page {currentPage} of {totalPages}
            </div>
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="h-10 px-4"
            >
              Next
              <ChevronRight className="h-5 w-5 ml-1" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
