import { useEffect, useState } from 'react'
import { useOnPageSEOTable } from '@/service/seo'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from './components/on-pages-columns'
import { OnPageAnalysisTable } from './components/on-pages-table'
import CrawledPagesProvider from './context/on-page-context'
import { onPagesAnalysis } from './data/on-pages'
import { onPageAnalysisListSchema } from './data/schema'

export default function OnPage() {
  // Parse crawledPage list
  // const crawledPageList = onPageAnalysisListSchema.parse(onPagesAnalysis)
  const [onPageData, setOnPageData] = useState([])
  const { mutate } = useOnPageSEOTable({
    onSuccess(data: any, variables, context) {
      console.log('data', data.data)
      setOnPageData(data.data)
    },
  })

  useEffect(() => {
    mutate({
      target: 'geeksforgeeks.org',
      limit: 10,
      offset: 2,
    })
  }, [])

  return (
    <CrawledPagesProvider>
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
            <h2 className='text-2xl font-bold tracking-tight'>
              {' '}
              On-Page Analysis
            </h2>
            <p className='text-muted-foreground'>
              Analyze the on-page SEO elements of your website.
            </p>
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <OnPageAnalysisTable data={onPageData} columns={columns} />
        </div>
      </Main>
    </CrawledPagesProvider>
  )
}
