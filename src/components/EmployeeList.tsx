
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Plus, Edit, Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

interface Employee {
  id: string
  name: string
  email: string
  position: string
  department: string
  status: 'active' | 'inactive'
  joinDate: string
  avatar?: string
}

export function EmployeeList() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)
  
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      position: "Senior Developer",
      department: "Engineering",
      status: "active",
      joinDate: "2023-01-15",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b6d3bd42?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: "2",
      name: "Mike Chen",
      email: "mike.chen@company.com",
      position: "Product Manager",
      department: "Product",
      status: "active",
      joinDate: "2022-08-20",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: "3",
      name: "Emma Davis",
      email: "emma.davis@company.com",
      position: "UX Designer",
      department: "Design",
      status: "active",
      joinDate: "2023-03-10",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: "4",
      name: "John Smith",
      email: "john.smith@company.com",
      position: "Marketing Director",
      department: "Marketing",
      status: "inactive",
      joinDate: "2021-11-05",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    }
  ])

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddEmployee = (employeeData: Partial<Employee>) => {
    const newEmployee: Employee = {
      id: Date.now().toString(),
      name: employeeData.name || "",
      email: employeeData.email || "",
      position: employeeData.position || "",
      department: employeeData.department || "",
      status: (employeeData.status as 'active' | 'inactive') || 'active',
      joinDate: new Date().toISOString().split('T')[0],
    }
    
    setEmployees([...employees, newEmployee])
    setIsDialogOpen(false)
    toast({
      title: "Employee Added",
      description: `${newEmployee.name} has been added to the system.`,
    })
  }

  const handleEditEmployee = (employeeData: Partial<Employee>) => {
    if (!editingEmployee) return
    
    const updatedEmployees = employees.map(emp =>
      emp.id === editingEmployee.id ? { ...emp, ...employeeData } : emp
    )
    
    setEmployees(updatedEmployees)
    setEditingEmployee(null)
    setIsDialogOpen(false)
    toast({
      title: "Employee Updated",
      description: `${employeeData.name}'s information has been updated.`,
    })
  }

  const handleDeleteEmployee = (id: string) => {
    const employee = employees.find(emp => emp.id === id)
    setEmployees(employees.filter(emp => emp.id !== id))
    toast({
      title: "Employee Removed",
      description: `${employee?.name} has been removed from the system.`,
      variant: "destructive",
    })
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Employee Management</h2>
          <p className="text-slate-600">Manage your team members and their information</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingEmployee(null)} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Employee
            </Button>
          </DialogTrigger>
          <EmployeeDialog
            employee={editingEmployee}
            onSave={editingEmployee ? handleEditEmployee : handleAddEmployee}
            onCancel={() => {
              setIsDialogOpen(false)
              setEditingEmployee(null)
            }}
          />
        </Dialog>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
        <Input
          placeholder="Search employees by name, email, position, or department..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Employee Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((employee, index) => (
          <Card key={employee.id} className="hover:shadow-lg transition-shadow duration-200 animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={employee.avatar} alt={employee.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {employee.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg text-slate-800">{employee.name}</CardTitle>
                    <CardDescription>{employee.position}</CardDescription>
                  </div>
                </div>
                <Badge variant={employee.status === 'active' ? 'default' : 'secondary'}>
                  {employee.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Email:</span>
                  <span className="text-slate-800 font-medium">{employee.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Department:</span>
                  <span className="text-slate-800 font-medium">{employee.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Join Date:</span>
                  <span className="text-slate-800 font-medium">{new Date(employee.joinDate).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingEmployee(employee)
                    setIsDialogOpen(true)
                  }}
                  className="flex items-center gap-1"
                >
                  <Edit className="w-3 h-3" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteEmployee(employee.id)}
                  className="flex items-center gap-1 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-3 h-3" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEmployees.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500 text-lg">No employees found matching your search.</p>
        </div>
      )}
    </div>
  )
}

interface EmployeeDialogProps {
  employee: Employee | null
  onSave: (data: Partial<Employee>) => void
  onCancel: () => void
}

function EmployeeDialog({ employee, onSave, onCancel }: EmployeeDialogProps) {
  const [formData, setFormData] = useState({
    name: employee?.name || "",
    email: employee?.email || "",
    position: employee?.position || "",
    department: employee?.department || "",
    status: employee?.status || "active",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{employee ? 'Edit Employee' : 'Add New Employee'}</DialogTitle>
        <DialogDescription>
          {employee ? 'Update employee information below.' : 'Enter the details for the new employee.'}
        </DialogDescription>
      </DialogHeader>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter full name"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Enter email address"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="position">Position</Label>
          <Input
            id="position"
            value={formData.position}
            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
            placeholder="Enter job position"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="department">Department</Label>
          <Select value={formData.department} onValueChange={(value) => setFormData({ ...formData, department: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Engineering">Engineering</SelectItem>
              <SelectItem value="Product">Product</SelectItem>
              <SelectItem value="Design">Design</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
              <SelectItem value="Sales">Sales</SelectItem>
              <SelectItem value="HR">Human Resources</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value as 'active' | 'inactive' })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {employee ? 'Update Employee' : 'Add Employee'}
          </Button>
        </div>
      </form>
    </DialogContent>
  )
}
