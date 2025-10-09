// filepath: src\features\social-media\facebook\insights\InsightsChart.tsx
import { useState } from 'react'
import {
  AlertCircle,
  BarChart as BarChartIcon,
  LineChart as LineChartIcon,
} from 'lucide-react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { useFacebookInsights } from './useFacebookInsights'

export default function InsightsChart() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d')
  const [chartType, setChartType] = useState<'line' | 'bar'>('line')
  const { data, isLoading, error } = useFacebookInsights(timeRange)

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className='flex h-[300px] w-full items-center justify-center'>
          <Skeleton className='h-[300px] w-full' />
        </div>
      )
    }

    if (error) {
      return (
        <Alert variant='destructive'>
          <AlertCircle className='h-4 w-4' />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load Facebook insights. Please try again later.
          </AlertDescription>
        </Alert>
      )
    }

    if (!data?.length) {
      return (
        <div className='flex h-[300px] w-full items-center justify-center text-muted-foreground'>
          No data available for the selected time range.
        </div>
      )
    }

    if (chartType === 'line') {
      return (
        <ResponsiveContainer width='100%' height={300}>
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 20,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray='3 3' stroke='#f1f1f1' />
            <XAxis
              dataKey='date'
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => {
                const date = new Date(value)
                return `${date.getMonth() + 1}/${date.getDate()}`
              }}
            />
            <YAxis yAxisId='left' tick={{ fontSize: 12 }} />
            <YAxis
              yAxisId='right'
              orientation='right'
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              formatter={(value, name) => {
                if (name === 'pageViews') return [value, 'Page Views']
                if (name === 'engagement') return [value, 'Engagement']
                if (name === 'reach') return [value, 'Reach']
                return [value, name]
              }}
              labelFormatter={(label) => {
                const date = new Date(label)
                return date.toLocaleDateString()
              }}
            />
            <Legend />
            <Line
              yAxisId='left'
              type='monotone'
              dataKey='pageViews'
              stroke='#4267B2' // Facebook blue
              activeDot={{ r: 8 }}
              name='Page Views'
            />
            <Line
              yAxisId='left'
              type='monotone'
              dataKey='engagement'
              stroke='#1ED760' // Green
              name='Engagement'
            />
            <Line
              yAxisId='right'
              type='monotone'
              dataKey='reach'
              stroke='#F58529' // Orange
              name='Reach'
            />
          </LineChart>
        </ResponsiveContainer>
      )
    } else {
      return (
        <ResponsiveContainer width='100%' height={300}>
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 20,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray='3 3' stroke='#f1f1f1' />
            <XAxis
              dataKey='date'
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => {
                const date = new Date(value)
                return `${date.getMonth() + 1}/${date.getDate()}`
              }}
            />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              formatter={(value, name) => {
                if (name === 'pageViews') return [value, 'Page Views']
                if (name === 'engagement') return [value, 'Engagement']
                if (name === 'reach') return [value, 'Reach']
                return [value, name]
              }}
              labelFormatter={(label) => {
                const date = new Date(label)
                return date.toLocaleDateString()
              }}
            />
            <Legend />
            <Bar dataKey='pageViews' fill='#4267B2' name='Page Views' />
            <Bar dataKey='engagement' fill='#1ED760' name='Engagement' />
            <Bar dataKey='reach' fill='#F58529' name='Reach' />
          </BarChart>
        </ResponsiveContainer>
      )
    }
  }

  return (
    <Card>
      <CardHeader className='pb-2'>
        <div className='flex flex-col items-center justify-between sm:flex-row'>
          <div>
            <CardTitle>Page Performance Insights</CardTitle>
            <CardDescription>
              Track your Facebook page's views, engagement, and reach over time
            </CardDescription>
          </div>
          <ToggleGroup
            type='single'
            value={chartType}
            onValueChange={(value) =>
              value && setChartType(value as 'line' | 'bar')
            }
            className='my-2'
          >
            <ToggleGroupItem value='line' aria-label='Toggle line chart'>
              <LineChartIcon className='h-4 w-4' />
            </ToggleGroupItem>
            <ToggleGroupItem value='bar' aria-label='Toggle bar chart'>
              <BarChartIcon className='h-4 w-4' />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs
          value={timeRange}
          onValueChange={(value) => setTimeRange(value as '7d' | '30d' | '90d')}
        >
          <TabsList className='mb-4'>
            <TabsTrigger value='7d'>Last 7 days</TabsTrigger>
            <TabsTrigger value='30d'>30 days</TabsTrigger>
            <TabsTrigger value='90d'>90 days</TabsTrigger>
          </TabsList>
          <TabsContent value={timeRange} forceMount>
            {renderContent()}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
