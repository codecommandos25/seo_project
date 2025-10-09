import { useState } from 'react'
import { AlertCircle, TrendingUp, Eye, BarChart } from 'lucide-react'
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useInstagramAnalytics } from './useInstagramAnalytics'

export default function AccountGrowth() {
  const [timeRange, setTimeRange] = useState<30 | 60 | 90>(30)
  const { data, isLoading, error } = useInstagramAnalytics(timeRange)

  // Calculate metrics
  const metrics = {
    totalFollowers: data ? data[data.length - 1]?.followers : 0,
    growthPercentage:
      data && data.length > 1
        ? (
            ((data[data.length - 1]?.followers - data[0]?.followers) /
              data[0]?.followers) *
            100
          ).toFixed(1)
        : '0',
    totalReach: data ? data.reduce((sum, item) => sum + item.reach, 0) : 0,
    avgImpressions:
      data && data.length
        ? Math.round(
            data.reduce((sum, item) => sum + item.impressions, 0) / data.length
          )
        : 0,
  }

  const renderMetricCard = (
    title: string,
    value: string | number,
    icon: React.ReactNode,
    description: string
  ) => {
    return (
      <Card>
        <CardContent className='p-6'>
          <div className='flex items-start justify-between'>
            <div>
              <p className='text-sm text-muted-foreground'>{title}</p>
              <div className='mt-1 text-2xl font-bold'>
                {isLoading ? <Skeleton className='h-8 w-24' /> : value}
              </div>
              <p className='mt-1 text-xs text-muted-foreground'>
                {description}
              </p>
            </div>
            <div className='rounded-full bg-primary/10 p-2'>{icon}</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const renderContent = () => {
    if (isLoading) {
      return <Skeleton className='h-[300px] w-full' />
    }

    if (error) {
      return (
        <Alert variant='destructive'>
          <AlertCircle className='h-4 w-4' />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load analytics data. Please try again later.
          </AlertDescription>
        </Alert>
      )
    }

    return (
      <ResponsiveContainer width='100%' height={300}>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' vertical={false} />
          <XAxis
            dataKey='date'
            tickFormatter={(value) => {
              const date = new Date(value)
              return `${date.getMonth() + 1}/${date.getDate()}`
            }}
          />
          <YAxis />
          <Tooltip
            formatter={(value: number) => [value.toLocaleString(), 'Followers']}
            labelFormatter={(label) => {
              const date = new Date(label)
              return date.toLocaleDateString()
            }}
          />
          <defs>
            <linearGradient id='colorFollowers' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#8884d8' stopOpacity={0.8} />
              <stop offset='95%' stopColor='#8884d8' stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <Area
            type='monotone'
            dataKey='followers'
            stroke='#8884d8'
            fillOpacity={1}
            fill='url(#colorFollowers)'
          />
        </AreaChart>
      </ResponsiveContainer>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Growth</CardTitle>
        <CardDescription>
          Track your Instagram audience growth and reach metrics
        </CardDescription>
        <Tabs
          value={timeRange.toString()}
          onValueChange={(value) =>
            setTimeRange(parseInt(value) as 30 | 60 | 90)
          }
          className='mt-2'
        >
          <TabsList>
            <TabsTrigger value='30'>30 Days</TabsTrigger>
            <TabsTrigger value='60'>60 Days</TabsTrigger>
            <TabsTrigger value='90'>90 Days</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className='mb-6 grid grid-cols-1 gap-4 md:grid-cols-3'>
          {renderMetricCard(
            'Total Followers',
            metrics.totalFollowers.toLocaleString(),
            <TrendingUp className='h-4 w-4 text-primary' />,
            'Current follower count'
          )}

          {renderMetricCard(
            'Growth Rate',
            `${metrics.growthPercentage}%`,
            <BarChart className='h-4 w-4 text-primary' />,
            `Over the last ${timeRange} days`
          )}

          {renderMetricCard(
            'Average Reach',
            metrics.avgImpressions.toLocaleString(),
            <Eye className='h-4 w-4 text-primary' />,
            'Per post'
          )}
        </div>

        <div className='mt-6'>
          <h3 className='mb-3 text-sm font-medium'>Follower Growth Trend</h3>
          {renderContent()}
        </div>
      </CardContent>
    </Card>
  )
}
