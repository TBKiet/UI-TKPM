"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, FileText, LinkIcon, AlertCircle } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"

interface VideoFormProps {
  onSubmit: (formData: any) => void
  isLoading: boolean
}

export default function VideoForm({ onSubmit, isLoading }: VideoFormProps) {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("text")
  const [scriptText, setScriptText] = useState("")
  const [scriptUrl, setScriptUrl] = useState("")
  const [scriptFile, setScriptFile] = useState<File | null>(null)
  const [fetchedText, setFetchedText] = useState("")
  const [textError, setTextError] = useState("")
  const [urlError, setUrlError] = useState("")
  const [fileError, setFileError] = useState("")
  const [isFetching, setIsFetching] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    style: "simple",
    language: "en",
    voice_id: "Joanna",
    visual_style: "modern",
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Validate text input
  const validateText = (text: string) => {
    if (!text) {
      setTextError("Script is required")
      return false
    }
    if (text.length < 50) {
      setTextError("Script must be at least 50 characters")
      return false
    }
    if (text.length > 5000) {
      setTextError("Script cannot exceed 5000 characters")
      return false
    }
    setTextError("")
    return true
  }

  // Validate URL input
  const validateUrl = (url: string) => {
    if (!url) {
      setUrlError("URL is required")
      return false
    }
    // Simple URL validation regex
    const urlRegex = /^https?:\/\/.+/
    if (!urlRegex.test(url)) {
      setUrlError("Please enter a valid URL")
      return false
    }
    setUrlError("")
    return true
  }

  // Validate file input
  const validateFile = (file: File | null) => {
    if (!file) {
      setFileError("File is required")
      return false
    }

    // Check file type
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]
    if (!allowedTypes.includes(file.type)) {
      setFileError("Only PDF, DOC, or DOCX files are allowed")
      return false
    }

    // Check file size (5MB max)
    const maxSize = 5 * 1024 * 1024 // 5MB in bytes
    if (file.size > maxSize) {
      setFileError("File size cannot exceed 5MB")
      return false
    }

    setFileError("")
    return true
  }

  // Handle text input change
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value
    setScriptText(text)
    validateText(text)
  }

  // Handle URL input change
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    setScriptUrl(url)
    if (url) {
      validateUrl(url)
    } else {
      setUrlError("")
    }
  }

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setScriptFile(file)
      validateFile(file)
      toast({
        title: "File selected",
        description: `File "${file.name}" selected`,
      })
    }
  }

  // Handle URL fetch
  const handleFetchUrl = async () => {
    if (!validateUrl(scriptUrl)) return

    setIsFetching(true)
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock response
      const mockText =
        "Fetched script: Quantum mechanics is a fundamental theory in physics that provides a description of the physical properties of nature at the scale of atoms and subatomic particles. It is the foundation of all quantum physics including quantum chemistry, quantum field theory, quantum technology, and quantum information science."
      setFetchedText(mockText)

      // In a real implementation, you would use:
      // const response = await fetch('/api/scripts/from-url', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ url: scriptUrl })
      // });
      // if (!response.ok) throw new Error('Failed to fetch script');
      // const data = await response.json();
      // setFetchedText(data.text);
    } catch (error) {
      console.error("Error fetching script:", error)
      toast({
        title: "Error",
        description: "Failed to fetch script from URL",
        variant: "destructive",
      })
    } finally {
      setIsFetching(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    let scriptContent = ""
    let isValid = false

    // Get content based on active tab
    switch (activeTab) {
      case "text":
        isValid = validateText(scriptText)
        scriptContent = scriptText
        break
      case "url":
        isValid = !!fetchedText
        scriptContent = fetchedText
        break
      case "file":
        isValid = !!scriptFile && validateFile(scriptFile)
        scriptContent = scriptFile ? `Content from file: ${scriptFile.name}` : ""
        break
    }

    if (!isValid) {
      toast({
        title: "Error",
        description: "Please provide a valid script",
        variant: "destructive",
      })
      return
    }

    onSubmit({
      ...formData,
      topic: scriptContent,
      fileUpload: scriptFile,
    })

    toast({
      title: "Success",
      description: "Video generation started!",
    })
  }

  return (
    <Card className="shadow-md h-full">
      <CardHeader className="px-8 py-6 border-b">
        <CardTitle className="text-3xl font-bold">Video Details</CardTitle>
      </CardHeader>
      <CardContent className="px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <Label className="text-lg font-medium">Script Input Method</Label>
            <Tabs defaultValue="text" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 h-12 mb-6">
                <TabsTrigger value="text" className="text-base">
                  Text Input
                </TabsTrigger>
                <TabsTrigger value="file" className="text-base">
                  File Upload
                </TabsTrigger>
                <TabsTrigger value="url" className="text-base">
                  URL
                </TabsTrigger>
              </TabsList>

              {/* Text Input Tab */}
              <TabsContent value="text" className="space-y-4">
                <div className="space-y-3">
                  <Label htmlFor="script-text" className="text-lg font-medium">
                    Detail Script
                  </Label>
                  <Textarea
                    id="script-text"
                    placeholder="e.g., Detailed explanation of Quantum Mechanics"
                    value={scriptText}
                    onChange={handleTextChange}
                    className={`min-h-[250px] resize-vertical text-base p-4 ${textError ? "border-red-500" : ""}`}
                  />
                  {textError && (
                    <div className="flex items-center text-red-500 text-sm">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {textError}
                    </div>
                  )}
                  <div className="text-sm text-muted-foreground">{scriptText.length}/5000 characters (minimum 50)</div>
                </div>
              </TabsContent>

              {/* File Upload Tab */}
              <TabsContent value="file" className="space-y-4">
                <div className="space-y-3">
                  <Label htmlFor="script-file" className="text-lg font-medium">
                    Upload Script File
                  </Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center transition-colors hover:border-blue-400 hover:bg-blue-50">
                    <div className="space-y-6">
                      <div className="flex justify-center">
                        <FileText className="h-16 w-16 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-lg font-medium">Drag and drop your file here, or click to browse</p>
                        <p className="text-sm text-muted-foreground mt-2">Supports PDF, DOC, DOCX (max 5MB)</p>
                      </div>
                      <div>
                        <input
                          ref={fileInputRef}
                          id="script-file"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                          className="h-12 px-6 text-base"
                        >
                          Browse Files
                        </Button>
                      </div>
                    </div>
                  </div>
                  {scriptFile && (
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-md">
                      <span className="text-base text-blue-600 truncate max-w-[80%]">{scriptFile.name}</span>
                    </div>
                  )}
                  {fileError && (
                    <div className="flex items-center text-red-500 text-sm">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {fileError}
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* URL Tab */}
              <TabsContent value="url" className="space-y-4">
                <div className="space-y-3">
                  <Label htmlFor="script-url" className="text-lg font-medium">
                    Script URL
                  </Label>
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-3">
                      <Input
                        id="script-url"
                        type="url"
                        placeholder="e.g., https://docs.google.com/document/..."
                        value={scriptUrl}
                        onChange={handleUrlChange}
                        className={`flex-1 h-12 text-base ${urlError ? "border-red-500" : ""}`}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleFetchUrl}
                        disabled={isFetching || !scriptUrl}
                        className="h-12 px-6 text-base whitespace-nowrap"
                      >
                        {isFetching ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Fetching...
                          </>
                        ) : (
                          <>
                            <LinkIcon className="mr-2 h-5 w-5" />
                            Fetch Text
                          </>
                        )}
                      </Button>
                    </div>
                    {urlError && (
                      <div className="flex items-center text-red-500 text-sm">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {urlError}
                      </div>
                    )}
                  </div>
                  {isFetching ? (
                    <div className="mt-4">
                      <Skeleton className="h-[200px] w-full" />
                    </div>
                  ) : fetchedText ? (
                    <div className="mt-4">
                      <Label htmlFor="fetched-text" className="text-base font-medium">
                        Fetched Content
                      </Label>
                      <Textarea
                        id="fetched-text"
                        value={fetchedText}
                        readOnly
                        className="min-h-[200px] resize-vertical text-base p-4 mt-2 bg-gray-50"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-[200px] border border-dashed border-gray-300 rounded-md bg-gray-50 mt-4">
                      <p className="text-muted-foreground text-center">
                        Enter a URL above and click "Fetch Text" to retrieve content
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-8">
            <div className="space-y-3">
              <Label htmlFor="style" className="text-lg font-medium">
                Style
              </Label>
              <Select value={formData.style} onValueChange={(value) => handleChange("style", value)}>
                <SelectTrigger id="style" className="h-12 text-base">
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="simple">Simple</SelectItem>
                  <SelectItem value="popular">Popular</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="language" className="text-lg font-medium">
                Language
              </Label>
              <Select value={formData.language} onValueChange={(value) => handleChange("language", value)}>
                <SelectTrigger id="language" className="h-12 text-base">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="vi">Vietnamese</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="voice" className="text-lg font-medium">
                Voice
              </Label>
              <Select value={formData.voice_id} onValueChange={(value) => handleChange("voice_id", value)}>
                <SelectTrigger id="voice" className="h-12 text-base">
                  <SelectValue placeholder="Select voice" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Joanna">Joanna</SelectItem>
                  <SelectItem value="Matthew">Matthew</SelectItem>
                  <SelectItem value="Salli">Salli</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="visual-style" className="text-lg font-medium">
                Visual Style
              </Label>
              <Select value={formData.visual_style} onValueChange={(value) => handleChange("visual_style", value)}>
                <SelectTrigger id="visual-style" className="h-12 text-base">
                  <SelectValue placeholder="Select visual style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="modern">Modern</SelectItem>
                  <SelectItem value="cartoon">Cartoon</SelectItem>
                  <SelectItem value="realistic">Realistic</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 h-14 text-lg font-medium mt-8"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Video"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
