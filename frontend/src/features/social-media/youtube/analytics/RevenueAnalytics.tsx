// filepath: src\features\social-media\youtube\analytics\RevenueAnalytics.tsx
import { useState } from 'react'
import { format } from 'date-fns'
import {
  AlertCircle,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  BarChart2,
  RefreshCw,
  Loader2,
  ArrowUpRight,
  ArrowDownRight,
  Camera,
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
  ComposedChart,
} from 'recharts'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
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
import { useRevenueAnalytics } from './useRevenueAnalytics'

export default function RevenueAnalytics() {
  const { data, isLoading, error, refetch, isRefetching } =
    useRevenueAnalytics()
  const [timeRange, setTimeRange] = useState<string>('30days')

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className='h-8 w-64' />
          <Skeleton className='mt-1 h-4 w-48' />
        </CardHeader>
        <CardContent>
          <div className='mb-6 grid grid-cols-1 gap-4 md:grid-cols-4'>
            {Array.from({ length: 4 }).map((_, i) => (
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
          Failed to load revenue analytics. Please try again later.
        </AlertDescription>
      </Alert>
    )
  }
  // Chart colors
  const COLORS = [
    '#4f46e5',
    '#6366f1',
    '#8b5cf6',
    '#d946ef',
    '#f43f5e',
    '#ec4899',
    '#10b981',
    '#0ea5e9',
  ]
  const REVENUE_COLOR = '#4f46e5'
  const SECONDARY_COLOR = '#6366f1'
  const AD_COLOR = '#0ea5e9'
  const SPONSORSHIP_COLOR = '#10b981'
  const MEMBERSHIP_COLOR = '#f43f5e'
  const SUPERCHAT_COLOR = '#ec4899'
  const MERCHANDISE_COLOR = '#8b5cf6'

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <Card className='w-full'>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle className='text-xl font-bold'>
              Revenue Analytics
            </CardTitle>
            <CardDescription>
              Track earnings and monetization performance on your YouTube
              channel
            </CardDescription>
          </div>
          <div className='flex items-center gap-2'>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className='w-[150px]'>
                <SelectValue placeholder='Time Range' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='30days'>Last 30 Days</SelectItem>
                <SelectItem value='90days'>Last 90 Days</SelectItem>
                <SelectItem value='year'>This Year</SelectItem>
                <SelectItem value='alltime'>All Time</SelectItem>
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
        {/* Summary Cards */}
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          <Card>
            <CardContent className='flex flex-col p-4'>
              <div className='mb-2 flex items-center justify-between'>
                <span className='text-sm font-medium text-muted-foreground'>
                  Total Revenue
                </span>
                <DollarSign className='h-4 w-4 text-muted-foreground' />
              </div>
              <div className='flex items-baseline gap-2'>
                <span className='text-2xl font-bold'>
                  {formatCurrency(data.summary.totalRevenue)}
                </span>
                <div
                  className={`flex items-center text-xs ${data.summary.changePercentage > 0 ? 'text-green-500' : 'text-red-500'}`}
                >
                  {data.summary.changePercentage > 0 ? (
                    <TrendingUp className='mr-1 h-3 w-3' />
                  ) : (
                    <TrendingDown className='mr-1 h-3 w-3' />
                  )}
                  {Math.abs(data.summary.changePercentage).toFixed(1)}%
                </div>
              </div>
              <div className='text-xs text-muted-foreground'>
                vs. previous period
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='flex flex-col p-4'>
              <div className='mb-2 flex items-center justify-between'>
                <span className='text-sm font-medium text-muted-foreground'>
                  Yearly Estimate
                </span>
                <Calendar className='h-4 w-4 text-muted-foreground' />
              </div>
              <div className='flex items-baseline gap-2'>
                <span className='text-2xl font-bold'>
                  {formatCurrency(data.summary.estimatedYearlyRevenue)}
                </span>
              </div>
              <div className='text-xs text-muted-foreground'>
                Based on current performance
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='flex flex-col p-4'>
              <div className='mb-2 flex items-center justify-between'>
                <span className='text-sm font-medium text-muted-foreground'>
                  RPM
                </span>
                <BarChart2 className='h-4 w-4 text-muted-foreground' />
              </div>
              <div className='flex items-baseline gap-2'>
                <span className='text-2xl font-bold'>
                  ${data.summary.revenuePerThousandViews.toFixed(2)}
                </span>
              </div>
              <div className='text-xs text-muted-foreground'>
                Revenue per 1000 views
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='flex flex-col p-4'>
              <div className='mb-2 flex items-center justify-between'>
                <span className='text-sm font-medium text-muted-foreground'>
                  Avg. CPM
                </span>
                <DollarSign className='h-4 w-4 text-muted-foreground' />
              </div>
              <div className='flex items-baseline gap-2'>
                <span className='text-2xl font-bold'>
                  ${data.adPerformance.averageCpm.toFixed(2)}
                </span>
              </div>
              <div className='text-xs text-muted-foreground'>
                {data.adPerformance.totalImpressions.toLocaleString()}{' '}
                impressions
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue by Month */}
        <Card>
          <CardHeader className='pb-2'>
            <CardTitle className='text-lg'>Monthly Revenue Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width='100%' height={350}>
              <ComposedChart
                data={data.revenueByMonth}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                stackOffset='sign'
              >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='month' />
                <YAxis tickFormatter={(value) => `$${value}`} />
                <Tooltip formatter={(value) => [`$${value}`, '']} />
                <Legend />
                <Bar
                  dataKey='adRevenue'
                  stackId='a'
                  name='Ad Revenue'
                  fill={AD_COLOR}
                  radius={[0, 0, 0, 0]}
                />
                <Bar
                  dataKey='sponsorshipRevenue'
                  stackId='a'
                  name='Sponsorships'
                  fill={SPONSORSHIP_COLOR}
                  radius={[0, 0, 0, 0]}
                />
                <Bar
                  dataKey='membershipRevenue'
                  stackId='a'
                  name='Memberships'
                  fill={MEMBERSHIP_COLOR}
                  radius={[0, 0, 0, 0]}
                />
                <Bar
                  dataKey='superChatsRevenue'
                  stackId='a'
                  name='Super Chats'
                  fill={SUPERCHAT_COLOR}
                  radius={[0, 0, 0, 0]}
                />
                <Bar
                  dataKey='merchandiseRevenue'
                  stackId='a'
                  name='Merchandise'
                  fill={MERCHANDISE_COLOR}
                  radius={[0, 0, 0, 0]}
                />
                <Line
                  type='monotone'
                  dataKey='total'
                  name='Total Revenue'
                  stroke='#000000'
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue Tabs */}
        <Tabs defaultValue='sources' className='w-full'>
          <TabsList className='grid w-full grid-cols-4 md:w-[500px]'>
            <TabsTrigger value='sources'>Revenue Sources</TabsTrigger>
            <TabsTrigger value='videos'>Top Earning</TabsTrigger>
            <TabsTrigger value='geography'>Geography</TabsTrigger>
            <TabsTrigger value='projections'>Projections</TabsTrigger>
          </TabsList>

          {/* Sources Tab */}
          <TabsContent value='sources' className='mt-6 space-y-6'>
            <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
              {/* Revenue by Source */}
              <Card>
                <CardHeader className='pb-2'>
                  <CardTitle className='text-lg'>Revenue by Source</CardTitle>
                </CardHeader>
                <CardContent className='flex flex-col gap-4'>
                  <div className='grid grid-cols-2 gap-4'>
                    <ResponsiveContainer width='100%' height={250}>
                      <PieChart>
                        <Pie
                          data={data.revenueBySource}
                          cx='50%'
                          cy='50%'
                          innerRadius={60}
                          outerRadius={90}
                          fill='#8884d8'
                          paddingAngle={2}
                          dataKey='percentage'
                          nameKey='source'
                          label={({ source, percentage }) =>
                            `${source}: ${percentage}%`
                          }
                        >
                          {' '}
                          {data.revenueBySource.map((_, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value, name) => [`${value}%`, name]}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className='space-y-3'>
                      {data.revenueBySource.map((item, index) => (
                        <div key={index} className='flex flex-col'>
                          <div className='mb-1 flex items-center justify-between'>
                            <div className='flex items-center gap-2'>
                              <div
                                className='h-3 w-3 rounded-full'
                                style={{
                                  backgroundColor:
                                    COLORS[index % COLORS.length],
                                }}
                              />
                              <span className='text-sm'>{item.source}</span>
                            </div>
                            <span className='text-sm font-medium'>
                              ${item.amount.toLocaleString()}
                            </span>
                          </div>
                          <Progress value={item.percentage} className='h-1.5' />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Revenue by Format */}
              <Card>
                <CardHeader className='pb-2'>
                  <CardTitle className='text-lg'>Revenue by Format</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='flex flex-col gap-6 md:flex-row md:items-center'>
                    <ResponsiveContainer width='100%' height={250}>
                      <PieChart>
                        <Pie
                          data={data.revenueByFormat}
                          cx='50%'
                          cy='50%'
                          innerRadius={60}
                          outerRadius={80}
                          fill='#8884d8'
                          paddingAngle={2}
                          dataKey='percentage'
                        >
                          {data.revenueByFormat.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={
                                entry.format === 'short'
                                  ? REVENUE_COLOR
                                  : SECONDARY_COLOR
                              }
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value, _, props) => {
                            const { format, amount } = props.payload
                            return [
                              `$${amount.toLocaleString()} (${value}%)`,
                              format === 'short' ? 'Shorts' : 'Long-form',
                            ]
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>

                    <div className='flex-1 space-y-6'>
                      {data.revenueByFormat.map((item, index) => (
                        <div key={index} className='space-y-1'>
                          <div className='flex justify-between'>
                            <div className='flex items-center'>
                              {item.format === 'short' ? (
                                <Camera className='mr-2 h-4 w-4' />
                              ) : (
                                <Camera className='mr-2 h-4 w-4' />
                              )}
                              <h4 className='font-medium capitalize'>
                                {item.format === 'short'
                                  ? 'Shorts'
                                  : 'Long-form Videos'}
                              </h4>
                            </div>
                            <Badge
                              variant={
                                item.format === 'short'
                                  ? 'secondary'
                                  : 'default'
                              }
                            >
                              {item.percentage}%
                            </Badge>
                          </div>
                          <Progress
                            value={item.percentage}
                            className='h-2'
                            color={
                              item.format === 'short'
                                ? REVENUE_COLOR
                                : SECONDARY_COLOR
                            }
                          />
                          <div className='flex justify-between text-sm'>
                            <span>${item.amount.toLocaleString()}</span>
                            <span className='text-muted-foreground'>
                              {item.format === 'short'
                                ? 'Shorts Monetization'
                                : 'Traditional Monetization'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* CPM Trends */}
            <Card>
              <CardHeader className='pb-2'>
                <CardTitle className='text-lg'>CPM Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width='100%' height={300}>
                  <LineChart
                    data={data.cpmTrends}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray='3 3' />
                    {/* <XAxis
                                            dataKey="date"
                                            tickFormatter={(value) => {
                                                const date = new Date(value);
                                                return format(date, "MMM d");
                                            }}
                                        /> */}
                    <YAxis tickFormatter={(value) => `$${value}`} />
                    <Tooltip
                      formatter={(value) => [`$${value}`, 'CPM']}
                      labelFormatter={(value) => {
                        const date = new Date(value)
                        return format(date, 'MMMM d, yyyy')
                      }}
                    />
                    <Legend />
                    <Line
                      type='monotone'
                      dataKey='value'
                      name='CPM (Cost Per Mille)'
                      stroke={REVENUE_COLOR}
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Top Earning Videos Tab */}
          <TabsContent value='videos' className='mt-6'>
            <Card>
              <CardHeader className='pb-2'>
                <CardTitle className='text-lg'>Top Earning Videos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-6'>
                  {data.topEarningVideos.map((video, index) => (
                    <div
                      key={index}
                      className='flex flex-col gap-4 border-b pb-4 last:border-0 sm:flex-row'
                    >
                      <div className='relative aspect-video w-full overflow-hidden rounded-md sm:w-48'>
                        <img
                          src={video.thumbnailUrl}
                          alt={video.title}
                          className='h-full w-full object-cover'
                        />
                        {video.format === 'short' && (
                          <Badge className='absolute right-1 top-1 bg-black/70 text-white'>
                            Short
                          </Badge>
                        )}
                      </div>
                      <div className='flex-1'>
                        <h4 className='line-clamp-2 font-medium'>
                          {video.title}
                        </h4>
                        <div className='mt-1 text-sm text-muted-foreground'>
                          Published{' '}
                          {format(
                            new Date(video.publishedDate),
                            'MMMM d, yyyy'
                          )}
                        </div>
                        <div className='mt-3 grid grid-cols-3 gap-2'>
                          <div>
                            <div className='text-xs text-muted-foreground'>
                              Revenue
                            </div>
                            <div className='font-medium text-green-600'>
                              ${video.revenue.toLocaleString()}
                            </div>
                          </div>
                          <div>
                            <div className='text-xs text-muted-foreground'>
                              Views
                            </div>
                            <div className='font-medium'>
                              {video.views.toLocaleString()}
                            </div>
                          </div>
                          <div>
                            <div className='text-xs text-muted-foreground'>
                              RPM
                            </div>
                            <div className='font-medium'>
                              ${video.revenuePerThousand.toFixed(2)}
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

          {/* Geography Tab */}
          <TabsContent value='geography' className='mt-6'>
            <Card>
              <CardHeader className='pb-2'>
                <CardTitle className='text-lg'>Revenue by Country</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width='100%' height={350}>
                  <BarChart
                    data={data.revenueByCountry.slice(0, 10)}
                    layout='vertical'
                    margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis
                      type='number'
                      tickFormatter={(value) => `$${value}`}
                    />
                    <YAxis type='category' dataKey='country' width={100} />
                    <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                    <Bar
                      dataKey='revenue'
                      fill={REVENUE_COLOR}
                      radius={[0, 4, 4, 0]}
                    >
                      {data.revenueByCountry.map((_, index) => (
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
          </TabsContent>

          {/* Projections Tab */}
          <TabsContent value='projections' className='mt-6 space-y-6'>
            {/* Revenue Projection */}
            <Card>
              <CardHeader className='pb-2'>
                <CardTitle className='text-lg'>Revenue Projections</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='mb-6 grid grid-cols-1 gap-4 lg:grid-cols-4'>
                  <Card>
                    <CardContent className='flex flex-col p-4'>
                      <div className='mb-1 text-sm font-medium text-muted-foreground'>
                        Next Month
                      </div>
                      <div className='text-xl font-bold'>
                        {formatCurrency(data.revenueProjection.nextMonth)}
                      </div>
                      <div
                        className={`mt-1 flex items-center text-xs ${data.revenueProjection.growthRate > 0 ? 'text-green-500' : 'text-red-500'}`}
                      >
                        {data.revenueProjection.growthRate > 0 ? (
                          <ArrowUpRight className='mr-1 h-3 w-3' />
                        ) : (
                          <ArrowDownRight className='mr-1 h-3 w-3' />
                        )}
                        {Math.abs(data.revenueProjection.growthRate).toFixed(1)}
                        % expected growth
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className='flex flex-col p-4'>
                      <div className='mb-1 text-sm font-medium text-muted-foreground'>
                        Next Quarter
                      </div>
                      <div className='text-xl font-bold'>
                        {formatCurrency(data.revenueProjection.nextQuarter)}
                      </div>
                      <div
                        className={`mt-1 flex items-center text-xs ${data.revenueProjection.growthRate > 0 ? 'text-green-500' : 'text-red-500'}`}
                      >
                        {data.revenueProjection.growthRate > 0 ? (
                          <ArrowUpRight className='mr-1 h-3 w-3' />
                        ) : (
                          <ArrowDownRight className='mr-1 h-3 w-3' />
                        )}
                        Based on current trends
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className='flex flex-col p-4'>
                      <div className='mb-1 text-sm font-medium text-muted-foreground'>
                        Next Year
                      </div>
                      <div className='text-xl font-bold'>
                        {formatCurrency(data.revenueProjection.nextYear)}
                      </div>
                      <div className='mt-1 text-xs text-muted-foreground'>
                        Annual projection
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className='flex flex-col p-4'>
                      <div className='mb-1 text-sm font-medium text-muted-foreground'>
                        Growth Rate
                      </div>
                      <div className='text-xl font-bold'>
                        {data.revenueProjection.growthRate > 0 ? '+' : ''}
                        {data.revenueProjection.growthRate.toFixed(1)}%
                      </div>
                      <div className='mt-1 text-xs text-muted-foreground'>
                        Month-over-month
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            {/* Year over Year Comparison */}
            <Card>
              <CardHeader className='pb-2'>
                <CardTitle className='text-lg'>
                  Year-over-Year Comparison
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width='100%' height={300}>
                  <BarChart
                    data={data.yearlyComparisonData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='month' />
                    <YAxis tickFormatter={(value) => `$${value}`} />
                    <Tooltip formatter={(value) => [`$${value}`, '']} />
                    <Legend />
                    <Bar
                      dataKey='lastYear'
                      name='Last Year'
                      fill={SECONDARY_COLOR}
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey='thisYear'
                      name='This Year'
                      fill={REVENUE_COLOR}
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Additional Revenue Metrics */}
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
          {/* Ad Performance */}
          <Card>
            <CardHeader className='pb-2'>
              <CardTitle className='text-lg'>Ad Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div className='grid grid-cols-3 gap-4'>
                  <div className='flex flex-col'>
                    <div className='text-sm text-muted-foreground'>
                      Impressions
                    </div>
                    <div className='font-medium'>
                      {data.adPerformance.totalImpressions.toLocaleString()}
                    </div>
                  </div>
                  <div className='flex flex-col'>
                    <div className='text-sm text-muted-foreground'>
                      Click Rate
                    </div>
                    <div className='font-medium'>
                      {data.adPerformance.ctr.toFixed(2)}%
                    </div>
                  </div>
                  <div className='flex flex-col'>
                    <div className='text-sm text-muted-foreground'>
                      Average CPM
                    </div>
                    <div className='font-medium'>
                      ${data.adPerformance.averageCpm.toFixed(2)}
                    </div>
                  </div>
                </div>

                <h4 className='mt-4 text-sm font-medium'>
                  Top Performing Ad Types
                </h4>
                <div className='space-y-3'>
                  {data.adPerformance.topPerformingAdTypes.map(
                    (adType, index) => (
                      <div
                        key={index}
                        className='flex items-center justify-between rounded-md border p-2'
                      >
                        <span className='text-sm'>{adType.type}</span>
                        <div className='flex items-center space-x-4'>
                          <div className='flex flex-col items-end'>
                            <span className='text-xs text-muted-foreground'>
                              CPM
                            </span>
                            <span className='font-medium'>
                              ${adType.cpm.toFixed(2)}
                            </span>
                          </div>
                          <div className='flex flex-col items-end'>
                            <span className='text-xs text-muted-foreground'>
                              Revenue
                            </span>
                            <span className='font-medium text-green-600'>
                              ${adType.revenue.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sponsorship Performance */}
          <Card>
            <CardHeader className='pb-2'>
              <CardTitle className='text-lg'>Sponsorship Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {data.sponsorshipPerformance.map((sponsorship, index) => (
                  <div key={index} className='rounded-md border p-3'>
                    <div className='flex justify-between'>
                      <h4 className='font-medium'>
                        {sponsorship.campaignName}
                      </h4>
                      <Badge>{sponsorship.status}</Badge>
                    </div>
                    <div className='mt-2 text-sm'>
                      {`${
                        sponsorship.status === 'active'
                          ? 'Currently running'
                          : sponsorship.status === 'completed'
                            ? 'Campaign finished'
                            : 'Scheduled'
                      } sponsorship campaign`}
                    </div>
                    <div className='mt-3 grid grid-cols-4 gap-2 text-sm'>
                      <div>
                        <div className='text-xs text-muted-foreground'>
                          Amount
                        </div>
                        <div className='font-medium'>
                          ${sponsorship.revenue.toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <div className='text-xs text-muted-foreground'>
                          Views
                        </div>
                        <div className='font-medium'>
                          {sponsorship.viewCount.toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <div className='text-xs text-muted-foreground'>CPV</div>
                        <div className='font-medium'>
                          ${sponsorship.costPerView.toFixed(4)}
                        </div>
                      </div>
                      <div>
                        <div className='text-xs text-muted-foreground'>
                          Engagement
                        </div>
                        <div className='font-medium'>
                          {sponsorship.engagementRate}%
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}
