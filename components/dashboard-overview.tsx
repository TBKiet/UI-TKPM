"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BarChart3,
  Film,
  Clock,
  CheckCircle2,
  ArrowRight,
  ArrowUpRight,
  Plus,
  Calendar,
  Zap,
  TrendingUp,
  Users,
  Clock3,
} from "lucide-react"

// Mock data for the dashboard
const stats = [
  {
    title: "Total Videos",
    value: "42",
    change: "+12%",
    icon: Film,
    trend: "up",
  },
  {
    title: "Processing",
    value: "7",
    change: "+3%",
    icon: Clock,
    trend: "up",
  },
  {
    title: "Completed",
    value: "35",
    change: "+18%",
    icon: CheckCircle2,
    trend: "up",
  },
  {
    title: "Storage Used",
    value: "68%",
    change: "+5%",
    icon: BarChart3,
    trend: "up",
  },
]

const recentProjects = [
  {
    id: "a1b2c3d4",
    title: "Quantum Mechanics Explained",
    status: "completed",
    progress: 100,
    date: "2 hours ago",
    views: 128,
  },
  {
    id: "e5f6g7h8",
    title: "DNA Replication Process",
    status: "processing",
    progress: 65,
    date: "5 hours ago",
    views: 0,
  },
  {
    id: "i9j0k1l2",
    title: "Black Holes and Spacetime",
    status: "completed",
    progress: 100,
    date: "1 day ago",
    views: 342,
  },
  {
    id: "m3n4o5p6",
    title: "Climate Change Effects",
    status: "draft",
    progress: 20,
    date: "2 days ago",
    views: 0,
  },
]

const activities = [
  {
    id: 1,
    user: "You",
    action: "created a new video",
    project: "Quantum Mechanics Explained",
    time: "2 hours ago",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "YO",
  },
  {
    id: 2,
    user: "System",
    action: "completed processing",
    project: "Quantum Mechanics Explained",
    time: "1 hour ago",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "SY",
  },
  {
    id: 3,
    user: "You",
    action: "started a new video",
    project: "DNA Replication Process",
    time: "5 hours ago",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "YO",
  },
  {
    id: 4,
    user: "System",
    action: "is processing",
    project: "DNA Replication Process",
    time: "4 hours ago",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "SY",
  },
  {
    id: 5,
    user: "You",
    action: "viewed analytics for",
    project: "Black Holes and Spacetime",
    time: "Yesterday",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "YO",
  },
]

const quickActions = [
  {
    title: "Create New Video",
    description: "Start a new scientific video project",
    icon: Plus,
    action: "create",
  },
  {
    title: "Schedule Content",
    description: "Plan your upcoming video releases",
    icon: Calendar,
    action: "schedule",
  },
  {
    title: "View Analytics",
    description: "Check performance of your videos",
    icon: TrendingUp,
    action: "analytics",
  },
  {
    title: "Invite Collaborators",
    description: "Add team members to your projects",
    icon: Users,
    action: "invite",
  },
]

export default function DashboardOverview() {
  const [timeframe, setTimeframe] = useState("week")

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

  const handleQuickAction = (action: string) => {
    console.log(`Quick action: ${action}`)
    // Here you would handle the action, like navigation or opening a modal
  }

  return (
    <div className="w-full px-8 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Overview of your scientific video creation platform</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={`inline-flex items-center ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                  {stat.change}{" "}
                  <ArrowUpRight className={`ml-1 h-3 w-3 ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`} />
                </span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-7 mb-8">
        {/* Recent Projects */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Projects</CardTitle>
              <Tabs defaultValue={timeframe} onValueChange={setTimeframe} className="w-[200px]">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="day">Day</TabsTrigger>
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="month">Month</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <CardDescription>Your recently created or updated video projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div key={project.id} className="flex items-center">
                  <div className="w-full space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{project.title}</span>
                        <Badge variant="outline" className={getStatusColor(project.status)}>
                          {project.status}
                        </Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">{project.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={project.progress} className="h-2" />
                      <span className="text-sm text-muted-foreground">{project.progress}%</span>
                    </div>
                    {project.status === "completed" && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Zap className="mr-1 h-3 w-3" /> {project.views} views
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        {/* Activity Timeline */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest actions and system updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={activity.avatar || "/placeholder.svg"} alt={activity.user} />
                    <AvatarFallback>{activity.initials}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span> {activity.action}{" "}
                      <span className="font-medium">{activity.project}</span>
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center">
                      <Clock3 className="mr-1 h-3 w-3" /> {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Activity <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action, index) => (
            <Card
              key={index}
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => handleQuickAction(action.action)}
            >
              <CardHeader className="flex flex-row items-center gap-3 pb-2">
                <div className="bg-blue-100 p-2 rounded-md">
                  <action.icon className="h-5 w-5 text-blue-700" />
                </div>
                <div>
                  <CardTitle className="text-base">{action.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{action.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Usage and Limits */}
      <Card>
        <CardHeader>
          <CardTitle>Resource Usage</CardTitle>
          <CardDescription>Your current usage and plan limits</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Storage</span>
                <span className="text-sm text-muted-foreground">6.8 GB / 10 GB</span>
              </div>
              <Progress value={68} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Video Processing</span>
                <span className="text-sm text-muted-foreground">42 / 100 videos</span>
              </div>
              <Progress value={42} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">API Calls</span>
                <span className="text-sm text-muted-foreground">8,542 / 10,000 calls</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            Upgrade Plan <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
