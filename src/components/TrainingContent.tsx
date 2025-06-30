
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Search, Plus, BookOpen, File, Upload } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

interface TrainingMaterial {
  id: string
  title: string
  description: string
  type: 'video' | 'document' | 'quiz'
  category: string
  duration: string
  completionRate: number
  uploadDate: string
  fileUrl?: string
}

export function TrainingContent() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("all")
  
  const [materials, setMaterials] = useState<TrainingMaterial[]>([
    {
      id: "1",
      title: "Employee Onboarding Guide",
      description: "Complete guide for new employee onboarding process and company culture",
      type: "document",
      category: "HR",
      duration: "45 min",
      completionRate: 85,
      uploadDate: "2024-01-15",
      fileUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400"
    },
    {
      id: "2",
      title: "Cybersecurity Awareness Training",
      description: "Essential cybersecurity practices and threat awareness for all employees",
      type: "video",
      category: "IT Security",
      duration: "60 min",
      completionRate: 92,
      uploadDate: "2024-01-10",
      fileUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400"
    },
    {
      id: "3",
      title: "Sales Techniques Workshop",
      description: "Advanced sales methodologies and customer relationship management",
      type: "video",
      category: "Sales",
      duration: "90 min",
      completionRate: 78,
      uploadDate: "2024-01-05",
      fileUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400"
    },
    {
      id: "4",
      title: "Code Review Best Practices",
      description: "Guidelines and standards for effective code review processes",
      type: "document",
      category: "Engineering",
      duration: "30 min",
      completionRate: 94,
      uploadDate: "2023-12-20",
      fileUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400"
    }
  ])

  const categories = ["all", "HR", "IT Security", "Sales", "Engineering", "Management", "Compliance"]

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.category.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = selectedCategory === "all" || material.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const handleAddMaterial = (materialData: Partial<TrainingMaterial>) => {
    const newMaterial: TrainingMaterial = {
      id: Date.now().toString(),
      title: materialData.title || "",
      description: materialData.description || "",
      type: (materialData.type as 'video' | 'document' | 'quiz') || 'document',
      category: materialData.category || "",
      duration: materialData.duration || "0 min",
      completionRate: 0,
      uploadDate: new Date().toISOString().split('T')[0],
    }
    
    setMaterials([...materials, newMaterial])
    setIsDialogOpen(false)
    toast({
      title: "Training Material Added",
      description: `${newMaterial.title} has been uploaded successfully.`,
    })
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <BookOpen className="w-4 h-4" />
      case 'document':
        return <File className="w-4 h-4" />
      case 'quiz':
        return <Search className="w-4 h-4" />
      default:
        return <File className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video':
        return 'bg-blue-500'
      case 'document':
        return 'bg-green-500'
      case 'quiz':
        return 'bg-purple-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Training Content</h2>
          <p className="text-slate-600">Manage multimedia training materials and resources</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Upload Content
            </Button>
          </DialogTrigger>
          <TrainingDialog
            onSave={handleAddMaterial}
            onCancel={() => setIsDialogOpen(false)}
          />
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input
            placeholder="Search training materials..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category} value={category}>
                {category === "all" ? "All Categories" : category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Training Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMaterials.map((material, index) => (
          <Card key={material.id} className="hover:shadow-lg transition-shadow duration-200 animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-8 h-8 ${getTypeColor(material.type)} rounded-lg flex items-center justify-center`}>
                    {getTypeIcon(material.type)}
                  </div>
                  <div>
                    <Badge variant="outline" className="text-xs mb-1">
                      {material.category}
                    </Badge>
                  </div>
                </div>
                <Badge variant={material.type === 'video' ? 'default' : material.type === 'document' ? 'secondary' : 'outline'}>
                  {material.type}
                </Badge>
              </div>
              <CardTitle className="text-lg text-slate-800 line-clamp-2">{material.title}</CardTitle>
              <CardDescription className="line-clamp-2">{material.description}</CardDescription>
            </CardHeader>
            
            <CardContent>
              {material.fileUrl && (
                <div className="mb-4 rounded-lg overflow-hidden">
                  <img 
                    src={material.fileUrl} 
                    alt={material.title}
                    className="w-full h-32 object-cover hover:scale-105 transition-transform duration-200"
                  />
                </div>
              )}
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Duration:</span>
                  <span className="text-slate-800 font-medium">{material.duration}</span>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Completion Rate:</span>
                    <span className="text-slate-800 font-medium">{material.completionRate}%</span>
                  </div>
                  <Progress value={material.completionRate} className="h-2" />
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Uploaded:</span>
                  <span className="text-slate-800 font-medium">{new Date(material.uploadDate).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="flex-1">
                  View Content
                </Button>
                <Button variant="outline" size="sm">
                  Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMaterials.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500 text-lg">No training materials found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}

interface TrainingDialogProps {
  onSave: (data: Partial<TrainingMaterial>) => void
  onCancel: () => void
}

function TrainingDialog({ onSave, onCancel }: TrainingDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "document" as 'video' | 'document' | 'quiz',
    category: "",
    duration: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Upload Training Content</DialogTitle>
        <DialogDescription>
          Add new training material to your content library.
        </DialogDescription>
      </DialogHeader>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Enter content title"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Enter content description"
            rows={3}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="type">Content Type</Label>
          <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value as 'video' | 'document' | 'quiz' })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="video">Video</SelectItem>
              <SelectItem value="document">Document</SelectItem>
              <SelectItem value="quiz">Quiz</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="HR">HR</SelectItem>
              <SelectItem value="IT Security">IT Security</SelectItem>
              <SelectItem value="Sales">Sales</SelectItem>
              <SelectItem value="Engineering">Engineering</SelectItem>
              <SelectItem value="Management">Management</SelectItem>
              <SelectItem value="Compliance">Compliance</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="duration">Duration</Label>
          <Input
            id="duration"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            placeholder="e.g., 45 min"
            required
          />
        </div>
        
        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            Upload Content
          </Button>
        </div>
      </form>
    </DialogContent>
  )
}
