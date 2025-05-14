import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from './components/keywords-columns'
import { KeywordsTable } from './components/keywords-table'
import KeywordsProvider from './context/keyword-context'
import { keywordListSchema } from './data/schema'
import { keywords } from './data/keywords'

export default function KeywordAnaysis() {
  // Parse keyword list
  const keywordList = keywordListSchema.parse(keywords)

  return (
    <KeywordsProvider>

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
            <h2 className='text-2xl font-bold tracking-tight'>Keyword List</h2>
            <p className='text-muted-foreground'>
              All the keywords for your website is ranked in the search engine.
            </p>
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <KeywordsTable data={keywordList} columns={columns} />
        </div>
      </Main>
    </KeywordsProvider>


  )
}
