import React from 'react'
import { TrendingDownIcon, TrendingUpIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function Overview() {
  interface SeoMetric {
    label: string
    value: string
    icon: React.ReactNode
    change: string
    positive: boolean
  }

  const seoMetrics: SeoMetric[] = [
    {
      label: 'Organic Search Traffic',
      value: '1,500',
      icon: <TrendingUpIcon className='size-4' />,
      change: '+10%',
      positive: true,
    },
    {
      label: 'Backlinks',
      value: '2,300',
      icon: <TrendingUpIcon className='size-4' />,
      change: '+15%',
      positive: true,
    },
    {
      label: 'Page Score',
      value: '8 / 10',
      icon: <TrendingUpIcon className='size-4' />,
      change: '+1',
      positive: true,
    },
    {
      label: 'Social Media Score',
      value: '7 / 10',
      icon: <TrendingDownIcon className='size-4' />,
      change: '-1',
      positive: false,
    },
  ]

  return (
    <div className='grid gap-4 md:grid-cols-2 md:gap-4 lg:grid-cols-4'>
      {seoMetrics.map((metric, index) => (
        <Card key={index} className='@container/card'>
          <CardHeader className='relative pb-2'>
            <CardDescription>{metric.label}</CardDescription>
            <CardTitle className='@[250px]/card:text-3xl text-3xl font-bold tabular-nums'>
              {metric.value}
            </CardTitle>
            <div className='absolute right-4 top-4'>
              <Badge
                variant='outline'
                className='flex gap-1 rounded-lg text-xs'
              >
                {metric.icon}
                {metric.change}
              </Badge>
            </div>
          </CardHeader>
          <CardFooter className='flex-col items-start gap-1 text-sm'>
            <div className='line-clamp-1 flex gap-2 font-medium'>
              {metric.positive ? 'Positive trend' : 'Needs improvement'}{' '}
              {metric.icon}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
