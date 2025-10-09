import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export function DomainOverview() {
  const benefitsOne: string[] = [
    'In-depth keyword analysis and optimization',
    'Technical SEO audit and recommendations',
    'Competitor analysis and benchmarking',
    'Content quality assessment',
    'Backlink profile evaluation',
  ]

  const benefitsTwo: string[] = [
    'Identify regional ranking differences',
    'Discover country-specific SEO opportunities',
    'Compare mobile vs desktop performance by region',
    'Analyze local competition in target markets',
    'Optimize content for international audiences',
  ]

  const benefitsThree: string[] = [
    'Traffic trend analysis with growth predictions',
    'Performance bottleneck identification',
    'Conversion optimization suggestions',
    'Content gap analysis for new opportunities',
    'Competitor growth comparison',
  ]

  return (
    <>
      <div className='grid grid-cols-1 gap-4 rounded-xl bg-white p-4'>
        <Card className='w-full'>
          <CardHeader>
            <CardTitle>Domain SEO Analysis</CardTitle>
            <CardDescription>
              Enter a domain name to analyze its SEO performance and get
              insights on how to improve it.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='flex flex-col gap-3 md:flex-row'>
              <div className='relative flex-grow'>
                <Input
                  type='text'
                  placeholder='Enter domain (e.g., example.com)'
                  className='w-full'
                />
              </div>
              <Button>Analyze SEO</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className='grid grid-cols-1 gap-4 rounded-xl bg-white p-4'>
        <Card className='overflow-hidden'>
          <div className='flex flex-col md:flex-row'>
            <div className='flex w-full items-center justify-center bg-gray-100 p-6 md:w-2/5'>
              <img
                src='/placeholder-image.svg'
                alt='SEO Analysis'
                className='h-auto max-w-full rounded-md shadow-md'
              />
            </div>
            <div className='w-full p-6 md:w-3/5'>
              <CardHeader className='px-0 pt-0'>
                <CardTitle className='text-2xl font-bold'>
                  Optimize Your SEO Strategy
                </CardTitle>
                <CardDescription>
                  Our comprehensive analysis provides actionable insights to
                  improve your website ranking
                </CardDescription>
              </CardHeader>
              <CardContent className='px-0 py-4'>
                <h3 className='mb-3 font-semibold'>Key Benefits:</h3>
                <ul className='space-y-2'>
                  {benefitsOne.map((item, index) => (
                    <li key={index} className='flex items-start gap-2'>
                      <svg
                        className='mt-0.5 h-5 w-5 flex-shrink-0 text-green-500'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path
                          fillRule='evenodd'
                          d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                          clipRule='evenodd'
                        />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className='px-0 pt-2'>
                <Button variant='outline'>Learn More</Button>
              </CardFooter>
            </div>
          </div>
        </Card>
      </div>

      <div className='grid grid-cols-1 gap-4 rounded-xl bg-white p-4'>
        <Card className='overflow-hidden'>
          <div className='flex flex-col md:flex-row'>
            <div className='w-full p-6 md:w-3/5'>
              <CardHeader className='px-0 pt-0'>
                <CardTitle className='text-2xl font-bold'>
                  Compare SEO Performance by Countries
                </CardTitle>
                <CardDescription>
                  Analyze how your website performs across different geographic
                  regions and optimize for global reach
                </CardDescription>
              </CardHeader>
              <CardContent className='px-0 py-4'>
                <h3 className='mb-3 font-semibold'>
                  Country Comparison Benefits:
                </h3>
                <ul className='space-y-2'>
                  {benefitsTwo.map((item, index) => (
                    <li key={index} className='flex items-start gap-2'>
                      <svg
                        className='mt-0.5 h-5 w-5 flex-shrink-0 text-blue-500'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path
                          fillRule='evenodd'
                          d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                          clipRule='evenodd'
                        />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className='px-0 pt-2'>
                <Button className='mr-2'>Compare Countries</Button>
                <Button variant='outline'>View Reports</Button>
              </CardFooter>
            </div>
            <div className='flex w-full items-center justify-center bg-gray-50 p-6 md:w-2/5'>
              <img
                src='/world-map-chart.svg'
                alt='Global SEO Performance'
                className='h-auto max-w-full rounded-md shadow-md'
              />
            </div>
          </div>
        </Card>
      </div>

      <div className='grid grid-cols-1 gap-4 rounded-xl bg-white p-4'>
        <Card className='overflow-hidden'>
          <div className='flex flex-col md:flex-row'>
            <div className='flex w-full items-center justify-center bg-gray-100 p-6 md:w-2/5'>
              <img
                src='/growth-chart.svg'
                alt='Growth Analytics'
                className='h-auto max-w-full rounded-md shadow-md'
              />
            </div>
            <div className='w-full p-6 md:w-3/5'>
              <CardHeader className='px-0 pt-0'>
                <CardTitle className='text-2xl font-bold'>
                  Growth Report & Recommendations
                </CardTitle>
                <CardDescription>
                  Get personalized recommendations to accelerate your website's
                  growth and improve overall performance
                </CardDescription>
              </CardHeader>
              <CardContent className='px-0 py-4'>
                <h3 className='mb-3 font-semibold'>Growth Opportunities:</h3>
                <ul className='space-y-2'>
                  {benefitsThree.map((item, index) => (
                    <li key={index} className='flex items-start gap-2'>
                      <svg
                        className='mt-0.5 h-5 w-5 flex-shrink-0 text-purple-500'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path
                          fillRule='evenodd'
                          d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                          clipRule='evenodd'
                        />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className='px-0 pt-2'>
                <Button className='mr-2'>Generate Report</Button>
                <Button variant='outline'>View Past Reports</Button>
              </CardFooter>
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}
