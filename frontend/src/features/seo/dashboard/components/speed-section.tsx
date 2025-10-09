import { useGetPageInsights } from '@/service/seo'
import { AlertCircle, FileType, Clock, Database } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// This is a simple radial progress component
function RadialProgress({
  value,
  label,
  icon,
  color,
}: {
  value: number
  label: string
  icon: React.ReactNode
  color: string
}) {
  return (
    <div className='flex flex-col items-center justify-center p-4'>
      <div className='relative h-32 w-32'>
        <svg className='h-full w-full' viewBox='0 0 100 100'>
          {/* Background circle */}
          <circle
            className='stroke-muted-foreground/20'
            cx='50'
            cy='50'
            r='40'
            strokeWidth='8'
            fill='transparent'
          />
          {/* Foreground circle */}
          <circle
            className={color}
            cx='50'
            cy='50'
            r='40'
            strokeWidth='8'
            fill='transparent'
            strokeDasharray='251.2'
            strokeDashoffset={251.2 - (251.2 * value) / 100}
            transform='rotate(-90 50 50)'
          />
        </svg>
        <div className='absolute inset-0 flex flex-col items-center justify-center'>
          <div className='mb-1'>{icon}</div>
          <div className='text-2xl font-bold'>{value}</div>
          <div className='text-xs text-muted-foreground'>
            {value === 100
              ? 'Perfect'
              : value > 80
                ? 'Good'
                : value > 50
                  ? 'Average'
                  : 'Poor'}
          </div>
        </div>
      </div>
      <div className='mt-2 text-center font-medium'>{label}</div>
    </div>
  )
}

export function SpeedSection() {
  // Sample data - replace with actual data
  const { data, isSuccess, isLoading } = useGetPageInsights(
    { url: 'https://google.com' },
    {
      onSuccess(data) {
        console.log('web data', data)
      },
    }
  )
  const performanceData = {
    performanceScore: 76,
    loadTime: 2.4, // seconds
    pageSize: 1.2, // MB
    requests: 45,
  }
  if (isSuccess) {
    console.log('web data', data)
  }

  const issues = [
    {
      title: 'Optimize Images',
      description:
        'Images are not properly compressed and optimized. Consider using WebP format and image compression.',
      solution:
        'Use a tool like ImageOptim or compress images before uploading to your server.',
    },
    {
      title: 'Render-Blocking Resources',
      description:
        'Several CSS and JavaScript files are blocking the first paint of your page.',
      solution:
        'Consider inlining critical CSS and deferring non-critical JavaScript.',
    },
    {
      title: 'Server Response Time',
      description: 'Your server takes too long to respond (TTFB: 620ms).',
      solution:
        'Consider using a CDN, optimizing your database queries, and implementing server-side caching.',
    },
  ]

  function convertPageSizeToMB(pageSizeString: string): string {
    // Extract the numeric value from the string
    const sizeMatch = pageSizeString.match(/\d+/)
    if (!sizeMatch) return '0 MB'

    // Convert KiB to MB (1 KiB = 0.0009765625 MB)
    const sizeInKiB = parseFloat(sizeMatch[0])
    const sizeInMB = sizeInKiB * 0.0009765625

    // Format to 2 decimal places
    return `Size was ${sizeInMB.toFixed(2)} MB`
  }

  return (
    <Card>
      <CardHeader className='flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row'>
        <div className='flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6'>
          <CardTitle>Website Speed</CardTitle>
          <CardDescription>
            Performance metrics for your website
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className='p-0'>
        <Tabs defaultValue='overview' className='w-full'>
          <div className='w-full overflow-x-auto px-6 pt-5 sm:pt-6'>
            <TabsList>
              <TabsTrigger value='overview'>Speed Overview</TabsTrigger>
              <TabsTrigger value='issues'>Top Issues</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value='overview' className='p-6'>
            {isLoading ? (
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                <Skeleton className='h-[150px]' />
                <Skeleton className='h-[150px]' />
                <Skeleton className='h-[150px]' />
                <Skeleton className='h-[150px]' />
              </div>
            ) : (
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                <RadialProgress
                  value={data?.seoScore ? data?.seoScore : 0}
                  label='SEO Score'
                  icon={
                    <AlertCircle className='h-5 w-5 text-[hsl(var(--chart-1))]' />
                  }
                  color='stroke-[hsl(var(--chart-1))]'
                />

                <RadialProgress
                  // value={Math.min(100, Math.max(0, 100 - (performanceData.loadTime * 20)))}
                  value={data?.performanceScore ? data?.performanceScore : 0}
                  label={`Load Time (${data?.tti}s)`}
                  icon={
                    <Clock className='h-5 w-5 text-[hsl(var(--chart-2))]' />
                  }
                  color='stroke-[hsl(var(--chart-2))]'
                />

                <RadialProgress
                  value={Math.min(
                    100,
                    Math.max(0, 100 - performanceData.pageSize * 30)
                  )}
                  label={
                    data?.pageSize
                      ? convertPageSizeToMB(data?.pageSize as string)
                      : ''
                  }
                  icon={
                    <FileType className='h-5 w-5 text-[hsl(var(--chart-3))]' />
                  }
                  color='stroke-[hsl(var(--chart-3))]'
                />

                <RadialProgress
                  value={
                    data?.numberOfRequests
                      ? Math.min(100, Math.max(0, 100 - data?.numberOfRequests))
                      : 0
                  }
                  label={`Issues (${data?.numberOfRequests})`}
                  icon={
                    <Database className='h-5 w-5 text-[hsl(var(--chart-4))]' />
                  }
                  color='stroke-[hsl(var(--chart-4))]'
                />
              </div>
            )}
          </TabsContent>

          <TabsContent value='issues' className='p-6'>
            <Accordion type='single' collapsible className='w-full'>
              {isLoading ? (
                <div className='flex flex-col gap-2'>
                  <Skeleton className='h-[30px]' />
                  <Skeleton className='h-[30px]' />
                  <Skeleton className='h-[30px]' />
                  <Skeleton className='h-[30px]' />
                  <Skeleton className='h-[30px]' />
                  <Skeleton className='h-[30px]' />
                </div>
              ) : (
                <>
                  {data?.issues.map((issue, index) => (
                    <AccordionItem key={index} value={`issue-${index}`}>
                      <AccordionTrigger className='hover:no-underline'>
                        <div className='flex items-center gap-2'>
                          <AlertCircle className='h-4 w-4 text-[hsl(var(--chart-5))]' />
                          <span className='font-semibold'>{issue.title}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className='pl-6'>
                          <p className='mb-2 text-sm text-muted-foreground'>
                            {issue.description}
                          </p>
                          {/* <div className="mt-2">
                                                <strong className="text-sm">Solution:</strong>
                                                <p className="text-sm text-muted-foreground">{issue.description}</p>
                                            </div> */}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </>
              )}
            </Accordion>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
