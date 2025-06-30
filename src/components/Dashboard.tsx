
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, BookOpen, BarChart3, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function Dashboard() {
  const stats = [
    {
      title: "Total Employees",
      value: "247",
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "bg-blue-500"
    },
    {
      title: "Training Completed",
      value: "89%",
      change: "+5%",
      trend: "up",
      icon: BookOpen,
      color: "bg-green-500"
    },
    {
      title: "Performance Score",
      value: "8.4",
      change: "+0.3",
      trend: "up",
      icon: BarChart3,
      color: "bg-purple-500"
    },
    {
      title: "Productivity",
      value: "94%",
      change: "+2%",
      trend: "up",
      icon: TrendingUp,
      color: "bg-orange-500"
    }
  ]

  const recentActivities = [
    { action: "New employee added", employee: "Sarah Johnson", time: "2 hours ago", type: "add" },
    { action: "Training completed", employee: "Mike Chen", time: "4 hours ago", type: "training" },
    { action: "Profile updated", employee: "Emma Davis", time: "6 hours ago", type: "update" },
    { action: "Performance review", employee: "John Smith", time: "1 day ago", type: "review" },
  ]

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Dashboard Overview</h2>
        <p className="text-slate-600">Welcome back! Here's what's happening with your team today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={stat.title} className="hover:shadow-lg transition-shadow duration-200 animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                {stat.title}
              </CardTitle>
              <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <span className="text-green-600 font-medium">{stat.change}</span>
                <span className="ml-1">from last month</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="animate-fade-in-up" style={{ animationDelay: "400ms" }}>
          <CardHeader>
            <CardTitle className="text-xl text-slate-800">Recent Activities</CardTitle>
            <CardDescription>Latest updates from your team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 hover:bg-slate-50 rounded-lg transition-colors">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'add' ? 'bg-green-500' :
                    activity.type === 'training' ? 'bg-blue-500' :
                    activity.type === 'update' ? 'bg-yellow-500' :
                    'bg-purple-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800">{activity.action}</p>
                    <p className="text-sm text-slate-600">{activity.employee}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {activity.time}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-in-up" style={{ animationDelay: "500ms" }}>
          <CardHeader>
            <CardTitle className="text-xl text-slate-800">Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              <button className="p-4 text-left hover:bg-slate-50 rounded-lg transition-colors border border-slate-200">
                <div className="font-medium text-slate-800">Add New Employee</div>
                <div className="text-sm text-slate-600">Create a new employee profile</div>
              </button>
              <button className="p-4 text-left hover:bg-slate-50 rounded-lg transition-colors border border-slate-200">
                <div className="font-medium text-slate-800">Upload Training Material</div>
                <div className="text-sm text-slate-600">Add new training content</div>
              </button>
              <button className="p-4 text-left hover:bg-slate-50 rounded-lg transition-colors border border-slate-200">
                <div className="font-medium text-slate-800">Generate Report</div>
                <div className="text-sm text-slate-600">Export employee data</div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
