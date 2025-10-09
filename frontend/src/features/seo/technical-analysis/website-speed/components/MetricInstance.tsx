import { Card, CardContent } from '@/components/ui/card'

const statusColorMap: Record<string, string> = {
  best: 'var(--color-best)',
  good: 'var(--color-good)',
  average: 'var(--color-average)',
  worst: 'var(--color-worst)',
}

interface MetricProps {
  metric: {
    title: string
    description: string
    value: string
    status: 'best' | 'good' | 'average' | 'worst'
  }
}

export function MetricInstance({ metric }: MetricProps) {
  const barColor = statusColorMap[metric.status]

  return (
    <Card
      className='relative h-[130px] rounded-none rounded-r-lg border-none bg-[#f9f7ff] p-2'
      style={{
        borderLeft: `5px solid ${barColor}`,
      }}
    >
      <CardContent className='flex h-full flex-col justify-center pl-4'>
        <div>
          <div className='text-gray1 text-lg'>{metric.title}</div>
          <div className='text-muted-foreground'>{metric.description}</div>
        </div>
        <div className='mt-2 text-xl font-semibold' style={{ color: barColor }}>
          {metric.value}
        </div>
      </CardContent>
    </Card>
  )
}
