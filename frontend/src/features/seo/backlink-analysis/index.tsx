import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from './components/backlinks-columns'
import { BacklinksTable } from './components/backlinks-table'
import BacklinksProvider from './context/backlink-context'
import { backlinkListSchema } from './data/schema'
import { backlinks } from './data/backlinks'

export default function BacklinkAnaysis() {
  // Parse backlink list
  const backlinkList = backlinkListSchema.parse(backlinks)

  return (
    <BacklinksProvider>

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
            <h2 className='text-2xl font-bold tracking-tight'>Backlink List</h2>
            <p className='text-muted-foreground'>
              All the backlinks that are pointing to your website. You can filter, sort, and search for specific backlinks.
            </p>
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <BacklinksTable data={backlinkList} columns={columns} />
        </div>
      </Main>
    </BacklinksProvider>


  )
}
