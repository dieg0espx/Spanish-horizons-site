import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Users, BookOpen, ChefHat, DollarSign, TrendingUp, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Cocinarte Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's a summary of your Cocinarte cooking programs.
            </p>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cocinarte Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">
                Active cooking students
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cooking Classes</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">
                Active cooking sessions
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$2,850</div>
              <p className="text-xs text-muted-foreground">
                Cocinarte income
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recipe Mastery</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87%</div>
              <p className="text-xs text-muted-foreground">
                Recipe completion rate
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Navigation */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  <CardTitle>Classes</CardTitle>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>
              <CardDescription>
                Manage your Cocinarte cooking classes and workshops
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">5 active cooking classes</p>
                <p className="text-sm text-muted-foreground">18 students enrolled</p>
              </div>
              <Button asChild className="w-full mt-4">
                <Link href="/dashboard/classes">Manage Classes</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <CardTitle>Payments</CardTitle>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>
              <CardDescription>
                Track Cocinarte payments and cooking class fees
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">$2,850 this month</p>
                <p className="text-sm text-muted-foreground">$425 pending</p>
              </div>
              <Button asChild className="w-full mt-4">
                <Link href="/dashboard/payments">View Payments</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-purple-600" />
                  <CardTitle>Students</CardTitle>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>
              <CardDescription>
                Manage Cocinarte student information and enrollment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">18 cooking students</p>
                <p className="text-sm text-muted-foreground">3 new this month</p>
              </div>
              <Button asChild className="w-full mt-4">
                <Link href="/dashboard/students">Manage Students</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest updates from your programs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <Users className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    New Cocinarte student enrolled
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Maria Rodriguez joined Paella Workshop
                  </p>
                </div>
                <div className="text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 inline mr-1" />
                  2 hours ago
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <DollarSign className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Cocinarte payment received
                  </p>
                  <p className="text-sm text-muted-foreground">
                    John Smith paid $85 for Tapas Workshop
                  </p>
                </div>
                <div className="text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 inline mr-1" />
                  4 hours ago
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                  <BookOpen className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Cooking class completed
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Spanish Tortilla Workshop - Session 3 finished
                  </p>
                </div>
                <div className="text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 inline mr-1" />
                  1 day ago
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
