import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Plus, Edit, Trash2, Calendar, Users, Clock, DollarSign } from 'lucide-react'
import { ClasesService } from '@/lib/supabase/clases'
import { Clase } from '@/lib/types/clases'

export default async function ClassesPage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch classes from the database
  const clasesService = new ClasesService()
  let clases: Clase[] = []
  
  try {
    clases = await clasesService.getAllClases()
  } catch (error) {
    console.error('Error fetching classes:', error)
    // If table doesn't exist yet, show empty state
  }

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  // Helper function to format time
  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }

  // Helper function to get class status
  const getClassStatus = (clase: Clase) => {
    const classDate = new Date(`${clase.date}T${clase.time}`)
    const now = new Date()
    const diffTime = classDate.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays < 0) return { status: 'completed', label: null, variant: null }
    if (diffDays === 0) return { status: 'today', label: 'Today', variant: 'default' as const }
    if (diffDays <= 7) return { status: 'upcoming', label: 'Upcoming', variant: 'secondary' as const }
    return { status: 'scheduled', label: 'Scheduled', variant: 'secondary' as const }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Cocinarte Classes</h1>
            <p className="text-muted-foreground">
              Manage your Cocinarte cooking classes and workshops.
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add New Cooking Class
          </Button>
        </div>

        {/* Statistics */}
        {clases.length > 0 && (
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4 text-blue-700" />
                  <div>
                    <p className="text-sm font-medium text-blue-700">Total Classes</p>
                    <p className="text-2xl font-bold text-blue-900">{clases.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-green-700" />
                  <div>
                    <p className="text-sm font-medium text-green-700">Upcoming</p>
                    <p className="text-2xl font-bold text-green-900">
                      {clases.filter(clase => {
                        const classDate = new Date(`${clase.date}T${clase.time}`)
                        return classDate > new Date()
                      }).length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
  
            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-orange-700" />
                  <div>
                    <p className="text-sm font-medium text-orange-700">Avg Price</p>
                    <p className="text-2xl font-bold text-orange-900">
                      ${(clases.reduce((sum, clase) => sum + clase.price, 0) / clases.length).toFixed(0)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Classes Grid */}
        {clases.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Classes Found</h3>
              <p className="text-muted-foreground text-center mb-4">
                You haven't created any cooking classes yet. Create your first class to get started!
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Class
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {clases.map((clase) => {
              const status = getClassStatus(clase)
              const classDate = new Date(`${clase.date}T${clase.time}`)
              const isToday = new Date().toDateString() === classDate.toDateString()
              
              return (
                <Card key={clase.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {/* <BookOpen className="h-5 w-5 text-blue-600" /> */}
                        <CardTitle className="line-clamp-2 max-w-[80%]">{clase.title}</CardTitle>
                      </div>
                      {status.label && <Badge variant={status.variant}>{status.label}</Badge>}
                    </div>
                    <CardDescription>
                      {formatDate(clase.date)} at {formatTime(clase.time)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {clase.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {clase.description}
                        </p>
                      )}
                      
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{clase.minStudents}-{clase.maxStudents} students</span>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <DollarSign className="h-4 w-4" />
                        <span>${clase.price.toFixed(2)} per student</span>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>Duration: {clase.classDuration} minutes</span>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {isToday ? 'Today' : 
                           status.status === 'completed' ? 'Completed' : 
                           `In ${Math.ceil((classDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days`}
                        </span>
                      </div>
                      
                      <div className="flex space-x-2 pt-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {/* Quick Actions */}
        {/* <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common class management tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <Plus className="h-6 w-6" />
                <span>Create Class</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <Calendar className="h-6 w-6" />
                <span>Schedule Class</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <Users className="h-6 w-6" />
                <span>Enroll Students</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <BookOpen className="h-6 w-6" />
                <span>View Materials</span>
              </Button>
            </div>
          </CardContent>
        </Card> */}
      </div>
    </DashboardLayout>
  )
}
