import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import ImageDiv from './components/ImageDiv'
import { MetricInstance } from './components/MetricInstance'
import RadialChart from './components/RadialChart'
import Subsection from './components/Subsection'
import { SuggestionAccordion } from './components/SuggestionAccordion'
import SummaryInstance from './components/SummaryInstance'

const chartData = [
  {
    value: 80,
    label: 'Performance Score',
    fill: 'var(--color-best)',
    percentage: 80,
  },
]

const PerformanceSummary = [
  { label: 'Performance Score', score: 80, color: 'best', unit: '' },
  { label: 'Load Time', score: 977, color: 'average', unit: 'ms' },
  { label: 'Page Size', score: 1.2, color: 'good', unit: 'MB' },
  { label: 'Requests', score: 20, color: 'black', unit: '' },
]

const performanceMetrics: {
  title: string
  description: string
  value: string
  status: 'best' | 'good' | 'average' | 'worst'
}[] = [
  {
    title: 'Full TTFB',
    description: 'When did the content start downloading?',
    value: '1.18s',
    status: 'best',
  },
  {
    title: 'First Contentful Paint',
    description: 'How soon did text and images start to appear?',
    value: '4.04s',
    status: 'worst',
  },
  {
    title: 'Largest Contentful Paint',
    description: 'When did the largest visible content finish loading?',
    value: '4.04s',
    status: 'average',
  },
  {
    title: 'Speed Index',
    description: 'How soon did the page look usable?',
    value: '4.45s',
    status: 'worst',
  },
  {
    title: 'Total Blocking Time',
    description: 'Was the main thread blocked?',
    value: '3.30s',
    status: 'best',
  },
  {
    title: 'Page Weight',
    description: 'How many bytes downloaded?',
    value: '1.1 MB',
    status: 'good',
  },
]

const seoSuggestions = [
  {
    grade: 'B',
    score: 82,
    title: 'Add Expires Headers',
    description:
      'Setting Expires headers allows the browser to cache content and reduce the number of HTTP requests made. This improves load speed for returning visitors.',
  },
  {
    grade: 'A',
    score: 94,
    title: 'Avoid empty src or href',
    description:
      'Empty `src` or `href` attributes can cause unnecessary HTTP requests or errors. Ensure that all attributes have valid values to avoid unexpected behavior.',
  },
  {
    grade: 'A',
    score: 100,
    title: 'Put JavaScript at bottom',
    description:
      'JavaScript scripts block parallel downloads; that is, when a script is downloading, the browser will not start any other downloads. To help the page load faster, move scripts to the bottom of the page if they are deferrable.',
  },
  {
    grade: 'C',
    score: 76,
    title: 'Reduce the number of DOM elements',
    description:
      'Too many DOM elements can slow down rendering and increase memory usage. Try simplifying the structure or removing unnecessary wrapper elements.',
  },
  {
    grade: 'D',
    score: 44,
    title: 'Avoid HTTP 404 (Not Found) error',
    description:
      'Broken links and missing assets negatively affect both user experience and search engine ranking. Make sure all resource URLs are correct and exist on the server.',
  },
]

export default function WebsiteSpeed() {
  return (
    // grid layout 3 rows, 3 columns
    <>
      <Header fixed>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Website Speed</h2>
            <p className='text-muted-foreground'>
              The website speed is a crucial factor for user experience and SEO.
            </p>
          </div>
        </div>

        <div className='bg-light-blue grid grid-cols-3 gap-2 p-2'>
          <ImageDiv />
          <Subsection
            sectionName='Performance Summary'
            className='col-span-2 max-h-[300px]'
          >
            <div className='flex h-[90%] items-center justify-evenly gap-4'>
              <RadialChart chartData={chartData} />
              <div className={`flex w-full max-w-[400px] flex-col gap-2`}>
                {PerformanceSummary.map((item, index) => (
                  <SummaryInstance key={index} PerformanceSummary={item} />
                ))}
              </div>
            </div>
          </Subsection>
          <Subsection sectionName='Analysis Results' className='col-span-3'>
            <div className='mt-4 grid grid-cols-3 gap-4'>
              {performanceMetrics.map((metric, index) => (
                <MetricInstance key={index} metric={metric} />
              ))}
            </div>
          </Subsection>
          <Subsection sectionName='Recommendations' className='col-span-3'>
            <div className='bg-light-blue mt-4 flex items-center gap-10 rounded-t-lg p-2 px-4'>
              <div className='text-gray-500'>Grade</div>
              <span className='text-gray-500'>Suggestions</span>
            </div>
            <SuggestionAccordion suggestions={seoSuggestions} />
          </Subsection>
        </div>
      </Main>
    </>
  )
}
