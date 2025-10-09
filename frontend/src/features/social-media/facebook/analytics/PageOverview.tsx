// filepath: src\features\social-media\facebook\analytics\PageOverview.tsx
import { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  Clock,
  ThumbsUp,
  Users,
} from 'lucide-react'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useFacebookAnalytics } from './useFacebookAnalytics'

export default function PageOverview() {
  const { data, isLoading, error } = useFacebookAnalytics()

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className='h-8 w-1/2' />
          </CardTitle>
          <CardDescription>
            <Skeleton className='h-4 w-full' />
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-8'>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i}>
                <CardContent className='p-6'>
                  <Skeleton className='mb-2 h-5 w-1/2' />
                  <Skeleton className='h-8 w-1/3' />
                </CardContent>
              </Card>
            ))}
          </div>

          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <Card>
              <CardHeader className='pb-2'>
                <Skeleton className='h-6 w-2/3' />
              </CardHeader>
              <CardContent className='h-[200px]'>
                <Skeleton className='h-full w-full' />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='pb-2'>
                <Skeleton className='h-6 w-2/3' />
              </CardHeader>
              <CardContent className='h-[200px]'>
                <Skeleton className='h-full w-full' />
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Alert variant='destructive'>
        <AlertCircle className='h-4 w-4' />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load Facebook page analytics. Please try again later.
        </AlertDescription>
      </Alert>
    )
  }

  // COLORS for charts
  const DEMOGRAPHICS_COLORS = [
    '#4267B2',
    '#5B7BD5',
    '#7889DB',
    '#98A4E9',
    '#BDC5F3',
    '#DCE1FA',
  ]
  const LOCATION_COLORS = [
    '#36A2EB',
    '#4BB3F9',
    '#72C3FA',
    '#97D3FB',
    '#BCDFFB',
    '#DCF0FB',
  ]

  // Format metrics
  const formatMetricChange = (value: number) => {
    const isPositive = value > 0
    const formattedValue = Math.abs(value).toFixed(1)

    return (
      <span
        className={`flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}
      >
        {isPositive ? (
          <ArrowUp className='mr-1 h-3 w-3' />
        ) : (
          <ArrowDown className='mr-1 h-3 w-3' />
        )}
        {formattedValue}%
      </span>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Facebook Page Overview</CardTitle>
        <CardDescription>
          Key performance metrics and audience insights for your Facebook page
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-8'>
        {/* High-level metrics */}
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
          <Card>
            <CardContent className='p-6'>
              <div className='flex items-start justify-between'>
                <div className='space-y-1'>
                  <p className='text-sm text-muted-foreground'>
                    Total Page Likes
                  </p>
                  <h3 className='text-2xl font-bold'>
                    {data?.pageMetrics.totalLikes.toLocaleString()}
                  </h3>
                  <div className='flex items-center text-xs'>
                    <Badge
                      variant={
                        data?.pageMetrics.newLikes > 0
                          ? 'default'
                          : 'destructive'
                      }
                    >
                      +{data?.pageMetrics.newLikes}
                    </Badge>
                    <span className='ml-1 text-muted-foreground'>
                      this month
                    </span>
                  </div>
                </div>
                <div className='rounded-full bg-blue-100 p-2'>
                  <ThumbsUp className='h-5 w-5 text-blue-600' />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='p-6'>
              <div className='flex items-start justify-between'>
                <div className='space-y-1'>
                  <p className='text-sm text-muted-foreground'>
                    Page Followers
                  </p>
                  <h3 className='text-2xl font-bold'>
                    {data?.pageMetrics.totalFollowers.toLocaleString()}
                  </h3>
                  <div className='flex items-center text-xs'>
                    <Badge
                      variant={
                        data?.pageMetrics.newFollowers > 0
                          ? 'default'
                          : 'destructive'
                      }
                    >
                      +{data?.pageMetrics.newFollowers}
                    </Badge>
                    <span className='ml-1 text-muted-foreground'>
                      this month
                    </span>
                  </div>
                </div>
                <div className='rounded-full bg-purple-100 p-2'>
                  <Users className='h-5 w-5 text-purple-600' />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='p-6'>
              <div className='flex items-start justify-between'>
                <div className='space-y-1'>
                  <p className='text-sm text-muted-foreground'>
                    Engagement Rate
                  </p>
                  <h3 className='text-2xl font-bold'>
                    {data?.pageMetrics.engagementRate.toFixed(2)}%
                  </h3>
                  <div className='text-xs text-muted-foreground'>
                    Reach growth:{' '}
                    {formatMetricChange(data?.pageMetrics.reachGrowth || 0)}
                  </div>
                </div>
                <div className='rounded-full bg-green-100 p-2'>
                  <ArrowUp className='h-5 w-5 text-green-600' />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='p-6'>
              <div className='flex items-start justify-between'>
                <div className='space-y-1'>
                  <p className='text-sm text-muted-foreground'>Response Rate</p>
                  <h3 className='text-2xl font-bold'>
                    {data?.pageMetrics.responseRate.toFixed(2)}%
                  </h3>
                  <div className='flex items-center text-xs text-muted-foreground'>
                    <Clock className='mr-1 h-3 w-3' />
                    Avg: {data?.pageMetrics.averageResponseTime} min
                  </div>
                </div>
                <div className='rounded-full bg-orange-100 p-2'>
                  <Clock className='h-5 w-5 text-orange-600' />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Demographics and Locations */}
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <Card>
            <CardHeader className='pb-2'>
              <CardTitle className='text-lg'>
                Audience Age Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='h-[250px]'>
                <ResponsiveContainer width='100%' height='100%'>
                  <PieChart>
                    <Pie
                      data={data?.demographics}
                      dataKey='percentage'
                      nameKey='ageGroup'
                      cx='50%'
                      cy='50%'
                      outerRadius={80}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {data?.demographics.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            DEMOGRAPHICS_COLORS[
                              index % DEMOGRAPHICS_COLORS.length
                            ]
                          }
                        />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='pb-2'>
              <CardTitle className='text-lg'>Audience Geography</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='h-[250px]'>
                <ResponsiveContainer width='100%' height='100%'>
                  <PieChart>
                    <Pie
                      data={data?.locations}
                      dataKey='percentage'
                      nameKey='country'
                      cx='50%'
                      cy='50%'
                      outerRadius={80}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {data?.locations.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={LOCATION_COLORS[index % LOCATION_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top performing posts */}
        <Card>
          <CardHeader>
            <CardTitle className='text-lg'>Top Performing Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {data?.topPosts.map((post, index) => (
                <div
                  key={post.id}
                  className='flex items-start gap-3 rounded-md border p-3'
                >
                  <div className='flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600'>
                    {index + 1}
                  </div>
                  <div className='min-w-0 flex-1'>
                    <p className='line-clamp-2 text-sm'>{post.content}</p>
                    <div className='mt-2 flex gap-3 text-xs text-muted-foreground'>
                      <span>Engagement: {post.engagement.toFixed(1)}%</span>
                      <span>Reach: {post.reach.toLocaleString()}</span>
                      <span>
                        {formatDistanceToNow(new Date(post.date), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}
