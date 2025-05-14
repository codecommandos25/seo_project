import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from './components/crawled-pages-columns'
import { CrawledPagesTable } from './components/crawled-pages-table'
import CrawledPagesProvider from './context/crawled-page-context'
import { crawledPageListSchema } from './data/schema'
import { crawledPages } from './data/crawled-pages'

export default function CrawledPages() {
  // Parse crawledPage list
  const crawledPageList = crawledPageListSchema.parse(crawledPages)


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
            <h2 className='text-2xl font-bold tracking-tight'>CrawledPage List</h2>
            <p className='text-muted-foreground'>
              All the crawled pages from the website are listed here.
            </p>
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <CrawledPagesTable data={crawledPageList} columns={columns} />
        </div>
      </Main>
    </CrawledPagesProvider>
  )
}
