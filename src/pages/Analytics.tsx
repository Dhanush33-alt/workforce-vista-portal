
import { Layout } from "@/components/Layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

const Analytics = () => {
  const departmentData = [
    { name: 'Engineering', employees: 45, performance: 8.7 },
    { name: 'Sales', employees: 32, performance: 8.2 },
    { name: 'Marketing', employees: 28, performance: 8.5 },
    { name: 'HR', employees: 15, performance: 8.9 },
    { name: 'Design', employees: 18, performance: 8.4 },
  ]

  const trainingProgress = [
    { month: 'Jan', completed: 85, inProgress: 15 },
    { month: 'Feb', completed: 88, inProgress: 12 },
    { month: 'Mar', completed: 92, inProgress: 8 },
    { month: 'Apr', completed: 89, inProgress: 11 },
    { month: 'May', completed: 94, inProgress: 6 },
    { month: 'Jun', completed: 91, inProgress: 9 },
  ]

  const employeeStatus = [
    { name: 'Active', value: 142, color: '#3b82f6' },
    { name: 'On Leave', value: 8, color: '#f59e0b' },
    { name: 'Inactive', value: 3, color: '#ef4444' },
  ]

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in-up">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Analytics Dashboard</h2>
          <p className="text-slate-600">Comprehensive insights into your workforce and training programs</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Employees</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800">153</div>
              <p className="text-xs text-green-600 font-medium">+5.2% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Avg Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800">8.5</div>
              <p className="text-xs text-green-600 font-medium">+0.3 from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Training Completion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800">91%</div>
              <p className="text-xs text-green-600 font-medium">+2% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Retention Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800">94%</div>
              <p className="text-xs text-green-600 font-medium">+1% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Department Performance</CardTitle>
              <CardDescription>Employee count and performance score by department</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={departmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="employees" fill="#3b82f6" name="Employees" />
                  <Bar yAxisId="right" dataKey="performance" fill="#10b981" name="Performance Score" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Training Progress</CardTitle>
              <CardDescription>Monthly training completion trends</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trainingProgress}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="completed" stroke="#3b82f6" strokeWidth={2} name="Completed %" />
                  <Line type="monotone" dataKey="inProgress" stroke="#f59e0b" strokeWidth={2} name="In Progress %" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Employee Status Distribution</CardTitle>
              <CardDescription>Current status breakdown of all employees</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={employeeStatus}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {employeeStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Insights</CardTitle>
              <CardDescription>Key findings and recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="font-medium text-green-800">Strong Performance</div>
                  <div className="text-sm text-green-700">Engineering team shows highest performance score (8.7)</div>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="font-medium text-blue-800">Training Success</div>
                  <div className="text-sm text-blue-700">91% training completion rate exceeds target</div>
                </div>
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="font-medium text-orange-800">Growth Opportunity</div>
                  <div className="text-sm text-orange-700">Sales team could benefit from additional training</div>
                </div>
                <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="font-medium text-purple-800">Retention Excellence</div>
                  <div className="text-sm text-purple-700">94% retention rate indicates strong employee satisfaction</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Analytics;
