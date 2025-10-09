// filepath: src\features\social-media\youtube\analytics\AudienceAnalytics.tsx
import { useState } from 'react'
import { format } from 'date-fns'
import {
  AlertCircle,
  Users,
  TrendingUp,
  TrendingDown,
  Smartphone,
  Monitor,
  Tablet,
  ArrowRight,
  Bell,
  RefreshCw,
  Loader2,
  Globe,
} from 'lucide-react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAudienceAnalytics } from './useAudienceAnalytics'

export default function AudienceAnalytics() {
  const { data, isLoading, error, refetch, isRefetching } =
    useAudienceAnalytics()
  const [timeRange, setTimeRange] = useState<string>('30days')

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className='h-8 w-64' />
          <Skeleton className='mt-1 h-4 w-48' />
        </CardHeader>
        <CardContent>
          <div className='mb-6 grid grid-cols-1 gap-4 md:grid-cols-3'>
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className='h-24 w-full' />
            ))}
          </div>
          <Skeleton className='mt-6 h-72 w-full' />
        </CardContent>
      </Card>
    )
  }

  if (error || !data) {
    return (
      <Alert variant='destructive'>
        <AlertCircle className='h-4 w-4' />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load audience analytics. Please try again later.
        </AlertDescription>
      </Alert>
    )
  }

  // Chart colors
  const COLORS = [
    '#4f46e5',
    '#7c3aed',
    '#0ea5e9',
    '#14b8a6',
    '#6366f1',
    '#8b5cf6',
    '#a855f7',
    '#d946ef',
  ]
  const CHART_LINE_COLOR = '#4f46e5'
  const CHART_AREA_COLOR = 'rgba(99, 102, 241, 0.2)'
  const GENDER_COLORS = {
    male: '#4f46e5',
    female: '#ec4899',
    other: '#6366f1',
  }

  const DEVICE_ICONS = {
    Mobile: <Smartphone className='mr-1 h-3 w-3' />,
    Desktop: <Monitor className='mr-1 h-3 w-3' />,
    Tablet: <Tablet className='mr-1 h-3 w-3' />,
    TV: <Monitor className='mr-1 h-3 w-3' />,
  }

  return (
    <Card className='w-full'>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle className='text-xl font-bold'>
              Audience Analytics
            </CardTitle>
            <CardDescription>
              Understand your audience demographics and engagement patterns
            </CardDescription>
          </div>
          <div className='flex items-center gap-2'>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className='w-[140px]'>
                <SelectValue placeholder='Time Range' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='7days'>Last 7 Days</SelectItem>
                <SelectItem value='30days'>Last 30 Days</SelectItem>
                <SelectItem value='90days'>Last 90 Days</SelectItem>
                <SelectItem value='year'>This Year</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant='outline'
              size='sm'
              onClick={() => refetch()}
              disabled={isRefetching}
            >
              {isRefetching ? (
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              ) : (
                <RefreshCw className='mr-2 h-4 w-4' />
              )}
              Refresh
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className='space-y-6'>
        {/* Key Metrics */}
        <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
          <Card>
            <CardContent className='flex flex-col p-4'>
              <div className='mb-2 flex items-center justify-between'>
                <span className='text-sm font-medium text-muted-foreground'>
                  Total Subscribers
                </span>
                <Users className='h-4 w-4 text-muted-foreground' />
              </div>
              <div className='flex items-baseline gap-2'>
                <span className='text-2xl font-bold'>
                  {data.totalSubscribers.toLocaleString()}
                </span>
                <div
                  className={`flex items-center text-xs ${data.subscriberChange.percentage > 0 ? 'text-green-500' : 'text-red-500'}`}
                >
                  {data.subscriberChange.percentage > 0 ? (
                    <TrendingUp className='mr-1 h-3 w-3' />
                  ) : (
                    <TrendingDown className='mr-1 h-3 w-3' />
                  )}
                  {Math.abs(data.subscriberChange.percentage).toFixed(1)}%
                </div>
              </div>
              <div className='text-xs text-muted-foreground'>
                {data.subscriberChange.count > 0 ? '+' : ''}
                {data.subscriberChange.count} this period
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='flex flex-col p-4'>
              <div className='mb-2 flex items-center justify-between'>
                <span className='text-sm font-medium text-muted-foreground'>
                  Returning Viewers
                </span>
                <Users className='h-4 w-4 text-muted-foreground' />
              </div>
              <div className='flex items-baseline gap-2'>
                <span className='text-2xl font-bold'>
                  {data.returningViewerPercentage}%
                </span>
              </div>
              <div className='mt-1 text-xs text-muted-foreground'>
                Of your total audience
              </div>
              <Progress
                value={data.returningViewerPercentage}
                className='mt-2 h-1.5'
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className='flex flex-col p-4'>
              <div className='mb-2 flex items-center justify-between'>
                <span className='text-sm font-medium text-muted-foreground'>
                  Notification Bell
                </span>
                <Bell className='h-4 w-4 text-muted-foreground' />
              </div>
              <div className='flex items-baseline gap-2'>
                <span className='text-2xl font-bold'>
                  {data.notificationStats.bellIconRate}%
                </span>
              </div>
              <div className='text-xs text-muted-foreground'>
                {data.notificationStats.clickRate}% avg. click rate
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Demographic Tabs */}
        <Tabs defaultValue='demographics' className='w-full'>
          <TabsList className='grid w-full grid-cols-4 md:w-[500px]'>
            <TabsTrigger value='demographics'>Demographics</TabsTrigger>
            <TabsTrigger value='geography'>Geography</TabsTrigger>
            <TabsTrigger value='behavior'>Behavior</TabsTrigger>
            <TabsTrigger value='retention'>Retention</TabsTrigger>
          </TabsList>

          {/* Demographics Tab */}
          <TabsContent value='demographics' className='mt-6 space-y-6'>
            <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
              {/* Age Distribution */}
              <Card>
                <CardHeader className='pb-2'>
                  <CardTitle className='text-lg'>Age Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width='100%' height={250}>
                    <BarChart
                      data={data.demographics.age}
                      margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray='3 3' />
                      <XAxis dataKey='ageRange' />
                      <YAxis tickFormatter={(value) => `${value}%`} />
                      <Tooltip
                        formatter={(value) => [`${value}%`, 'Percentage']}
                      />{' '}
                      <Bar
                        dataKey='percentage'
                        fill='#4f46e5'
                        radius={[4, 4, 0, 0]}
                      >
                        {data.demographics.age.map((_, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Gender Distribution */}
              <Card>
                <CardHeader className='pb-2'>
                  <CardTitle className='text-lg'>Gender Distribution</CardTitle>
                </CardHeader>
                <CardContent className='flex flex-col items-center'>
                  <ResponsiveContainer width='100%' height={250}>
                    <PieChart>
                      <Pie
                        data={[
                          {
                            name: 'Male',
                            value: data.demographics.gender.male,
                          },
                          {
                            name: 'Female',
                            value: data.demographics.gender.female,
                          },
                          {
                            name: 'Other',
                            value: data.demographics.gender.other,
                          },
                        ]}
                        cx='50%'
                        cy='50%'
                        innerRadius={60}
                        outerRadius={80}
                        fill='#8884d8'
                        paddingAngle={2}
                        dataKey='value'
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        <Cell fill={GENDER_COLORS.male} />
                        <Cell fill={GENDER_COLORS.female} />
                        <Cell fill={GENDER_COLORS.other} />
                      </Pie>
                      <Tooltip
                        formatter={(value) => [`${value}%`, 'Percentage']}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className='mt-2 flex justify-center gap-4'>
                    {Object.entries(GENDER_COLORS).map(([key, color]) => (
                      <div key={key} className='flex items-center'>
                        <div
                          className='mr-1 h-3 w-3 rounded-full'
                          style={{ backgroundColor: color }}
                        />
                        <span className='text-xs capitalize'>{key}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Device Distribution */}
            <Card>
              <CardHeader className='pb-2'>
                <CardTitle className='text-lg'>Device Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                  <div className='flex flex-col space-y-4'>
                    {data.demographics.devices.map((device) => (
                      <div key={device.device} className='flex flex-col'>
                        <div className='mb-1 flex items-center justify-between'>
                          <div className='flex items-center'>
                            {
                              DEVICE_ICONS[
                                device.device as keyof typeof DEVICE_ICONS
                              ]
                            }
                            <span className='text-sm'>{device.device}</span>
                          </div>
                          <span className='text-sm font-medium'>
                            {device.percentage}%
                          </span>
                        </div>
                        <Progress value={device.percentage} className='h-2' />
                      </div>
                    ))}
                  </div>
                  <ResponsiveContainer width='100%' height={200}>
                    <PieChart>
                      <Pie
                        data={data.demographics.devices}
                        cx='50%'
                        cy='50%'
                        innerRadius={45}
                        outerRadius={80}
                        fill='#8884d8'
                        paddingAngle={2}
                        dataKey='percentage'
                      >
                        {' '}
                        {data.demographics.devices.map((_, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [`${value}%`, 'Percentage']}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Geography Tab */}
          <TabsContent value='geography' className='mt-6'>
            <Card>
              <CardHeader className='pb-2'>
                <CardTitle className='text-lg'>
                  Geographic Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
                  <div className='lg:col-span-2'>
                    <ResponsiveContainer width='100%' height={300}>
                      <BarChart
                        data={data.countries.slice(0, 10)}
                        layout='vertical'
                        margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray='3 3' />
                        <XAxis
                          type='number'
                          tickFormatter={(value) => `${value}%`}
                        />
                        <YAxis type='category' dataKey='country' width={100} />
                        <Tooltip
                          formatter={(value) => [`${value}%`, 'Percentage']}
                        />
                        <Bar
                          dataKey='percentage'
                          fill='#4f46e5'
                          radius={[0, 4, 4, 0]}
                        >
                          {' '}
                          {data.countries.slice(0, 10).map((_, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className='max-h-[300px] space-y-2 overflow-y-auto'>
                    {data.countries.slice(0, 8).map((country, index) => (
                      <div
                        key={index}
                        className='flex items-center justify-between rounded-md border p-2'
                      >
                        <div className='flex items-center gap-2'>
                          <Globe className='h-4 w-4 text-muted-foreground' />
                          <span>{country.country}</span>
                        </div>
                        <div className='flex flex-col items-end'>
                          <span className='font-medium'>
                            {country.percentage}%
                          </span>
                          <span className='text-xs text-muted-foreground'>
                            {country.subscriberCount.toLocaleString()}{' '}
                            subscribers
                          </span>
                        </div>
                      </div>
                    ))}
                    {data.countries.length > 8 && (
                      <Button variant='ghost' size='sm' className='w-full'>
                        See all countries{' '}
                        <ArrowRight className='ml-2 h-4 w-4' />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Behavior Tab */}
          <TabsContent value='behavior' className='mt-6 space-y-6'>
            <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
              {/* Subscriber Activity */}
              <Card>
                <CardHeader className='pb-2'>
                  <CardTitle className='text-lg'>
                    Subscriber Activity by Day
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width='100%' height={250}>
                    <BarChart
                      data={data.subscriberActivity}
                      margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray='3 3' />
                      <XAxis dataKey='day' />
                      <YAxis tickFormatter={(value) => `${value}%`} />
                      <Tooltip
                        formatter={(value) => [`${value}%`, 'Active Users']}
                      />
                      <Bar
                        dataKey='activePercentage'
                        fill='#4f46e5'
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Subscriber Hours */}
              <Card>
                <CardHeader className='pb-2'>
                  <CardTitle className='text-lg'>
                    Subscriber Activity by Hour
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width='100%' height={250}>
                    <LineChart
                      data={data.subscribersDates}
                      margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray='3 3' />
                      <XAxis
                        dataKey='hour'
                        tickFormatter={(value) => `${value}:00`}
                      />
                      <YAxis tickFormatter={(value) => `${value}%`} />
                      <Tooltip
                        formatter={(value) => [`${value}%`, 'Activity']}
                        labelFormatter={(label) => `${label}:00`}
                      />
                      <Line
                        type='monotone'
                        dataKey='percentage'
                        stroke={CHART_LINE_COLOR}
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Traffic Sources */}
            <Card>
              <CardHeader className='pb-2'>
                <CardTitle className='text-lg'>
                  Watch Time by Traffic Source
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width='100%' height={300}>
                  <BarChart
                    data={data.watchTimeByTrafficSource}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='source' />
                    <YAxis yAxisId='left' orientation='left' stroke='#4f46e5' />
                    <YAxis
                      yAxisId='right'
                      orientation='right'
                      stroke='#6366f1'
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip />
                    <Legend />
                    <Bar
                      yAxisId='left'
                      name='Watch Time (min)'
                      dataKey='minutes'
                      fill='#4f46e5'
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      yAxisId='right'
                      name='Percentage'
                      dataKey='percentage'
                      fill='#6366f1'
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Retention Tab */}
          <TabsContent value='retention' className='mt-6 space-y-6'>
            {/* Audience Retention */}
            <Card>
              <CardHeader className='pb-2'>
                <CardTitle className='text-lg'>
                  Audience Retention Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width='100%' height={300}>
                  <AreaChart
                    data={data.audienceRetentionTrend}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis
                      dataKey='date'
                      tickFormatter={(value) => {
                        const date = new Date(value)
                        return format(date, 'MMM d')
                      }}
                    />
                    <YAxis tickFormatter={(value) => `${value}%`} />
                    <Tooltip
                      formatter={(value) => [`${value}%`, 'Retention']}
                      labelFormatter={(value) => {
                        const date = new Date(value)
                        return format(date, 'MMMM d, yyyy')
                      }}
                    />
                    <Area
                      type='monotone'
                      dataKey='value'
                      stroke={CHART_LINE_COLOR}
                      fillOpacity={1}
                      fill={CHART_AREA_COLOR}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Views Per Subscriber */}
            <Card>
              <CardHeader className='pb-2'>
                <CardTitle className='text-lg'>
                  Views per Subscriber Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width='100%' height={300}>
                  <LineChart
                    data={data.viewsPerSubscriberTrend}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis
                      dataKey='date'
                      tickFormatter={(value) => {
                        const date = new Date(value)
                        return format(date, 'MMM d')
                      }}
                    />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => [
                        typeof value === 'number' ? value.toFixed(2) : value,
                        'Views per Subscriber',
                      ]}
                      labelFormatter={(value) => {
                        const date = new Date(value)
                        return format(date, 'MMMM d, yyyy')
                      }}
                    />
                    <Line
                      type='monotone'
                      dataKey='value'
                      stroke={CHART_LINE_COLOR}
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Top Subscribed Videos */}
            <Card>
              <CardHeader className='pb-2'>
                <CardTitle className='text-lg'>
                  Top Videos by Subscriber Gain
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  {data.topSubscribedVideos.map((video, index) => (
                    <div
                      key={index}
                      className='flex flex-col gap-4 border-b pb-4 last:border-0 md:flex-row'
                    >
                      <div className='relative aspect-video w-full overflow-hidden rounded-md md:w-48'>
                        <img
                          src={video.thumbnailUrl}
                          alt={video.title}
                          className='h-full w-full object-cover'
                        />
                      </div>
                      <div className='flex-1'>
                        <h4 className='line-clamp-2 font-medium'>
                          {video.title}
                        </h4>
                        <div className='mt-1 text-sm text-muted-foreground'>
                          Published{' '}
                          {format(new Date(video.publishedAt), 'MMMM d, yyyy')}
                        </div>
                        <div className='mt-2 grid grid-cols-3 gap-2'>
                          <div>
                            <div className='text-xs text-muted-foreground'>
                              Subscribers Gained
                            </div>
                            <div className='font-medium text-green-600'>
                              +{video.subscribersGained}
                            </div>
                          </div>
                          <div>
                            <div className='text-xs text-muted-foreground'>
                              Subscribers Lost
                            </div>
                            <div className='font-medium text-red-600'>
                              -{video.subscribersLost}
                            </div>
                          </div>
                          <div>
                            <div className='text-xs text-muted-foreground'>
                              Conversion Rate
                            </div>
                            <div className='font-medium'>
                              {video.conversionRate}%
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
