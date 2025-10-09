import * as React from 'react'
import { Cell, Label, Pie, PieChart } from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

type TrafficByCountry = {
  country: string
  trafficShare: string
  traffic: number
  keywords: number
  value: number
  color: string
}

const trafficByCountry: TrafficByCountry[] = [
  {
    country: 'United States',
    trafficShare: '35%',
    traffic: 35000,
    keywords: 5000,
    value: 35,
    color: '#0088FE',
  },
  {
    country: 'India',
    trafficShare: '20%',
    traffic: 20000,
    keywords: 4200,
    value: 20,
    color: '#00C49F',
  },
  {
    country: 'United Kingdom',
    trafficShare: '12%',
    traffic: 12000,
    keywords: 3200,
    value: 12,
    color: '#FFBB28',
  },
  {
    country: 'Germany',
    trafficShare: '10%',
    traffic: 10000,
    keywords: 2800,
    value: 10,
    color: '#FF8042',
  },
  {
    country: 'Canada',
    trafficShare: '8%',
    traffic: 8000,
    keywords: 2500,
    value: 8,
    color: '#8884D8',
  },
  {
    country: 'Australia',
    trafficShare: '7%',
    traffic: 7000,
    keywords: 2200,
    value: 7,
    color: '#6B8E23',
  },
  {
    country: 'France',
    trafficShare: '5%',
    traffic: 5000,
    keywords: 1800,
    value: 5,
    color: '#B22222',
  },
  {
    country: 'Brazil',
    trafficShare: '3%',
    traffic: 3000,
    keywords: 1400,
    value: 3,
    color: '#4682B4',
  },
]

type TrafficByDevice = {
  device: string
  trafficShare: string
  traffic: number
  value: number
  color: string
}

const trafficByDevice: TrafficByDevice[] = [
  {
    device: 'Desktop',
    trafficShare: '55%',
    traffic: 55000,
    value: 55,
    color: '#0088FE',
  },
  {
    device: 'Mobile',
    trafficShare: '40%',
    traffic: 40000,
    value: 40,
    color: '#00C49F',
  },
  {
    device: 'Tablet',
    trafficShare: '5%',
    traffic: 5000,
    value: 5,
    color: '#FFBB28',
  },
]

const countryChartConfig: ChartConfig = {
  value: {
    label: 'Traffic',
  },
  'United States': {
    label: 'United States',
    color: '#0088FE',
  },
  India: {
    label: 'India',
    color: '#00C49F',
  },
  'United Kingdom': {
    label: 'United Kingdom',
    color: '#FFBB28',
  },
  Germany: {
    label: 'Germany',
    color: '#FF8042',
  },
  Canada: {
    label: 'Canada',
    color: '#8884D8',
  },
  Australia: {
    label: 'Australia',
    color: '#6B8E23',
  },
  France: {
    label: 'France',
    color: '#B22222',
  },
  Brazil: {
    label: 'Brazil',
    color: '#4682B4',
  },
}

const deviceChartConfig: ChartConfig = {
  value: {
    label: 'Traffic',
  },
  Desktop: {
    label: 'Desktop',
    color: '#0088FE',
  },
  Mobile: {
    label: 'Mobile',
    color: '#00C49F',
  },
  Tablet: {
    label: 'Tablet',
    color: '#FFBB28',
  },
}

export function TrafficDistribution() {
  const totalCountryTraffic = React.useMemo(() => {
    return trafficByCountry.reduce((acc, curr) => acc + curr.traffic, 0)
  }, [])

  const totalDeviceTraffic = React.useMemo(() => {
    return trafficByDevice.reduce((acc, curr) => acc + curr.traffic, 0)
  }, [])

  return (
    <Card>
      <CardHeader className='flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row'>
        <div className='flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6'>
          <CardTitle>Traffic Distribution</CardTitle>
          <CardDescription>
            Analyze the traffic distribution of your website and competitors.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className='px-2 sm:p-6'>
        <Tabs defaultValue='country'>
          <div className='w-full overflow-x-auto py-4 sm:py-0'>
            <TabsList>
              <TabsTrigger value='country'>By Country</TabsTrigger>
              <TabsTrigger value='device'>By Device</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value='country'>
            <div className='flex flex-col gap-4 md:flex-row'>
              {/* Chart section - will be at top on mobile, left on desktop */}
              <div className='flex w-full items-center justify-center md:w-1/3'>
                <ChartContainer
                  config={countryChartConfig}
                  className='mx-auto aspect-square h-[300px] w-[300px]'
                >
                  <PieChart width={300} height={300}>
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                    />
                    <Pie
                      data={trafficByCountry}
                      dataKey='value'
                      nameKey='country'
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      fill='#8884d8'
                    >
                      {trafficByCountry.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                      <Label
                        content={({ viewBox }) => {
                          if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                            return (
                              <text
                                x={viewBox.cx}
                                y={viewBox.cy}
                                textAnchor='middle'
                                dominantBaseline='middle'
                              >
                                <tspan
                                  x={viewBox.cx}
                                  y={viewBox.cy}
                                  className='fill-foreground text-3xl font-bold'
                                >
                                  {totalCountryTraffic.toLocaleString()}
                                </tspan>
                                <tspan
                                  x={viewBox.cx}
                                  y={(viewBox.cy || 0) + 24}
                                  className='fill-muted-foreground'
                                >
                                  Total Visits
                                </tspan>
                              </text>
                            )
                          }
                        }}
                      />
                    </Pie>
                  </PieChart>
                </ChartContainer>
              </div>

              {/* Table section - will be at bottom on mobile, right on desktop */}
              <div className='w-full overflow-x-auto md:w-2/3'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Country</TableHead>
                      <TableHead>Traffic Share</TableHead>
                      <TableHead>Traffic</TableHead>
                      <TableHead>Keywords</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {trafficByCountry.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className='font-medium'>
                          <div className='flex items-center'>
                            <div
                              className='mr-2 h-3 w-3 rounded-full'
                              style={{ backgroundColor: item.color }}
                            ></div>
                            {item.country}
                          </div>
                        </TableCell>
                        <TableCell>{item.trafficShare}</TableCell>
                        <TableCell>{item.traffic}</TableCell>
                        <TableCell>{item.keywords}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value='device'>
            <div className='flex flex-col gap-4 md:flex-row'>
              {/* Chart section */}
              <div className='flex w-full items-center justify-center md:w-1/3'>
                <ChartContainer
                  config={deviceChartConfig}
                  className='mx-auto aspect-square h-[300px] w-[300px]'
                >
                  <PieChart width={300} height={300}>
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                    />
                    <Pie
                      data={trafficByDevice}
                      dataKey='value'
                      nameKey='device'
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      fill='#8884d8'
                    >
                      {trafficByDevice.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                      <Label
                        content={({ viewBox }) => {
                          if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                            return (
                              <text
                                x={viewBox.cx}
                                y={viewBox.cy}
                                textAnchor='middle'
                                dominantBaseline='middle'
                              >
                                <tspan
                                  x={viewBox.cx}
                                  y={viewBox.cy}
                                  className='fill-foreground text-3xl font-bold'
                                >
                                  {totalDeviceTraffic.toLocaleString()}
                                </tspan>
                                <tspan
                                  x={viewBox.cx}
                                  y={(viewBox.cy || 0) + 24}
                                  className='fill-muted-foreground'
                                >
                                  Total Visits
                                </tspan>
                              </text>
                            )
                          }
                        }}
                      />
                    </Pie>
                  </PieChart>
                </ChartContainer>
              </div>

              {/* Table section */}
              <div className='w-full overflow-x-auto md:w-2/3'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Device</TableHead>
                      <TableHead>Traffic Share</TableHead>
                      <TableHead>Traffic</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {trafficByDevice.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className='font-medium'>
                          <div className='flex items-center'>
                            <div
                              className='mr-2 h-3 w-3 rounded-full'
                              style={{ backgroundColor: item.color }}
                            ></div>
                            {item.device}
                          </div>
                        </TableCell>
                        <TableCell>{item.trafficShare}</TableCell>
                        <TableCell>{item.traffic}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
