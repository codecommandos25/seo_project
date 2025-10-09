import * as React from 'react'
import { useSEOKeywords } from '@/service/seo'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export const description = 'An interactive area chart and keyword table'

const chartData = [
  {
    date: '2025-04-05',
    keyword_positions: {
      top_3: 8,
      position_4_10: 67,
      position_11_20: 893,
      position_21_50: 1237,
      position_51_100: 1449,
    },
    total_keywords: 8654,
  },
  {
    date: '2025-04-06',
    keyword_positions: {
      top_3: 110,
      position_4_10: 175,
      position_11_20: 910,
      position_21_50: 1201,
      position_51_100: 1400,
    },
    total_keywords: 8596,
  },
  {
    date: '2025-04-07',
    keyword_positions: {
      top_3: 112,
      position_4_10: 180,
      position_11_20: 925,
      position_21_50: 1150,
      position_51_100: 1350,
    },
    total_keywords: 8550,
  },
  {
    date: '2025-04-08',
    keyword_positions: {
      top_3: 135,
      position_4_10: 85,
      position_11_20: 440,
      position_21_50: 1100,
      position_51_100: 1300,
    },
    total_keywords: 8500,
  },
  {
    date: '2025-04-09',
    keyword_positions: {
      top_3: 218,
      position_4_10: 590,
      position_11_20: 955,
      position_21_50: 1050,
      position_51_100: 250,
    },
    total_keywords: 8450,
  },
  {
    date: '2025-04-10',
    keyword_positions: {
      top_3: 420,
      position_4_10: 95,
      position_11_20: 570,
      position_21_50: 400,
      position_51_100: 600,
    },
    total_keywords: 8400,
  },
  {
    date: '2025-04-11',
    keyword_positions: {
      top_3: 520,
      position_4_10: 90,
      position_11_20: 600,
      position_21_50: 300,
      position_51_100: 500,
    },
    total_keywords: 8350,
  },
  {
    date: '2025-04-12',
    keyword_positions: {
      top_3: 620,
      position_4_10: 80,
      position_11_20: 700,
      position_21_50: 200,
      position_51_100: 400,
    },
    total_keywords: 8300,
  },
]

const tableData = [
  {
    keyword: 'best digital marketing agency',
    intent: 'Commercial',
    searchVolume: 1500,
    competition: 'High',
    rankingPosition: 3,
    cpc: '$2.50',
    traffic: 500,
  },
  {
    keyword: 'digital marketing services',
    intent: 'Commercial',
    searchVolume: 1200,
    competition: 'Medium',
    rankingPosition: 5,
    cpc: '$1.80',
    traffic: 400,
  },
  {
    keyword: 'SEO strategies',
    intent: 'Informational',
    searchVolume: 800,
    competition: 'Low',
    rankingPosition: 8,
    cpc: '$1.20',
    traffic: 300,
  },
  {
    keyword: 'content marketing tips',
    intent: 'Informational',
    searchVolume: 600,
    competition: 'Medium',
    rankingPosition: 12,
    cpc: '$1.50',
    traffic: 250,
  },
  {
    keyword: 'PPC advertising strategies',
    intent: 'Commercial',
    searchVolume: 700,
    competition: 'High',
    rankingPosition: 10,
    cpc: '$2.00',
    traffic: 350,
  },
]

export function KeywordSection() {
  const [timeRange, setTimeRange] = React.useState<'1y' | '6m' | '30d'>('30d')
  const [keywordsData, setKeyowrdsData] = React.useState([])
  const { mutate } = useSEOKeywords({
    onSuccess(data: any, variables, context) {
      console.log('data', data.data?.tasks[0].result[0].items)
      setKeyowrdsData(data.data?.tasks[0].result[0].items)
    },
  })
  const filteredData = React.useMemo(() => {
    const now = new Date()
    let cutoffDate: Date

    if (timeRange === '1y') {
      cutoffDate = new Date(
        now.getFullYear() - 1,
        now.getMonth(),
        now.getDate()
      )
    } else if (timeRange === '6m') {
      cutoffDate = new Date(
        now.getFullYear(),
        now.getMonth() - 6,
        now.getDate()
      )
    } else {
      cutoffDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - 30
      )
    }

    return chartData.filter((data) => new Date(data.date) >= cutoffDate)
  }, [timeRange])

  React.useEffect(() => {
    mutate([
      {
        target: 'dataforseo.com',
        language_name: 'English',
        location_name: 'United States',
        include_serp_info: true,
        load_rank_absolute: true,
        limit: 3,
      },
    ])
  }, [])

  return (
    <Card>
      <CardHeader className='flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row'>
        <div className='flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6'>
          <CardTitle>Website Keywords</CardTitle>
          <CardDescription>
            Explore keyword positions and details
          </CardDescription>
        </div>
        <div className='flex items-center justify-end gap-2 px-6 py-5 sm:py-6'>
          <Select
            value={timeRange}
            onValueChange={(value) =>
              setTimeRange(value as '1y' | '6m' | '30d')
            }
          >
            <SelectTrigger className='w-[200px]'>
              <SelectValue placeholder='Select Time Range' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='1y'>Last 1 Year</SelectItem>
              <SelectItem value='6m'>Last 6 Months</SelectItem>
              <SelectItem value='30d'>Last 30 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <Tabs defaultValue='chart'>
        <div className='w-full overflow-x-auto px-6 py-5 sm:pt-6'>
          <TabsList>
            <TabsTrigger value='chart'>Keywords Position</TabsTrigger>
            <TabsTrigger value='table'>Keywords Table</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value='chart'>
          <CardContent className='px-2 sm:p-6'>
            <ChartContainer
              className='aspect-auto h-[250px] w-full'
              config={{
                primaryAxis: {
                  label: 'Time',
                  color: '#64748b',
                },
                secondaryAxis: {
                  label: 'Keywords',
                  color: '#4ade80',
                },
              }}
            >
              <AreaChart data={filteredData}>
                <defs>
                  <linearGradient id='fillTop3' x1='0' y1='0' x2='0' y2='1'>
                    <stop offset='5%' stopColor='#4ade80' stopOpacity={0.8} />
                    <stop offset='95%' stopColor='#4ade80' stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id='fill4_10' x1='0' y1='0' x2='0' y2='1'>
                    <stop offset='5%' stopColor='#60a5fa' stopOpacity={0.8} />
                    <stop offset='95%' stopColor='#60a5fa' stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id='fill11_20' x1='0' y1='0' x2='0' y2='1'>
                    <stop offset='5%' stopColor='#c084fc' stopOpacity={0.8} />
                    <stop offset='95%' stopColor='#c084fc' stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey='date'
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={32}
                  tickFormatter={(value) => {
                    const date = new Date(value)
                    return date.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })
                  }}
                />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      labelFormatter={(value) => {
                        return new Date(value).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })
                      }}
                      indicator='dot'
                    />
                  }
                />
                <Area
                  name='Top 3'
                  dataKey='keyword_positions.top_3'
                  type='monotone'
                  fill='url(#fillTop3)'
                  stroke='#4ade80'
                  stackId='1'
                />
                <Area
                  name='Positions 4-10'
                  dataKey='keyword_positions.position_4_10'
                  type='monotone'
                  fill='url(#fill4_10)'
                  stroke='#60a5fa'
                  stackId='1'
                />
                <Area
                  name='Positions 11-20'
                  dataKey='keyword_positions.position_11_20'
                  type='monotone'
                  fill='url(#fill11_20)'
                  stroke='#c084fc'
                  stackId='1'
                />
                <Area
                  name='Positions 21-50'
                  dataKey='keyword_positions.position_21_50'
                  type='monotone'
                  fill='#cbd5e1'
                  stroke='#cbd5e1'
                  stackId='1'
                />
                <Area
                  name='Positions 51-100'
                  dataKey='keyword_positions.position_51_100'
                  type='monotone'
                  fill='#f3f4f6'
                  stroke='#f3f4f6'
                  stackId='1'
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </TabsContent>

        <TabsContent value='table'>
          <CardContent className='px-2 sm:p-6'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Keyword</TableHead>
                  <TableHead>Intent</TableHead>
                  <TableHead>Search Volume</TableHead>
                  <TableHead>Competition</TableHead>
                  <TableHead>Ranking Position</TableHead>
                  <TableHead>CPC</TableHead>
                  <TableHead>Traffic</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {keywordsData &&
                  keywordsData.map((row: any, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.keyword_data.keyword}</TableCell>
                      <TableCell>
                        {row.keyword_data.search_intent_info.main_intent}
                      </TableCell>
                      <TableCell>
                        {row.keyword_data.keyword_info.search_volume}
                      </TableCell>
                      <TableCell>
                        {row.keyword_data.keyword_info.competition}
                      </TableCell>
                      <TableCell>
                        {row.ranked_serp_element.serp_item.rank_absolute}
                      </TableCell>
                      <TableCell>{row.keyword_data.keyword_info.cpc}</TableCell>
                      <TableCell>
                        {row.ranked_serp_element.serp_item.etv}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
