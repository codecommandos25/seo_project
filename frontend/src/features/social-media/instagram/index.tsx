import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import AccountGrowth from './analytics/AccountGrowth'
import InsightsChart from './insights/InsightsChart'
import PostList from './posts/PostList'
import AIContentIdeas from './strategy/AIContentIdeas'
import HashtagSuggestion from './strategy/HashtagSuggestion'

export default function InstagramAnalytics() {
  return (
    <>
      <Header>
        <div className='flex flex-1 items-center space-x-4'>
          <Search />
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main className='space-y-6 p-6'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>
            Instagram Analytics
          </h1>
          <p className='mt-1 text-muted-foreground'>
            Track performance, analyze trends, and optimize your Instagram
            strategy
          </p>
        </div>

        <Tabs defaultValue='posts' className='space-y-6'>
          <TabsList>
            <TabsTrigger value='posts'>Posts</TabsTrigger>
            <TabsTrigger value='insights'>Insights</TabsTrigger>
            <TabsTrigger value='strategy'>Strategy</TabsTrigger>
            <TabsTrigger value='analytics'>Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value='posts' className='space-y-6'>
            <PostList />
          </TabsContent>

          <TabsContent value='insights' className='space-y-6'>
            <InsightsChart />
          </TabsContent>

          <TabsContent value='strategy' className='space-y-6'>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <HashtagSuggestion />
              <AIContentIdeas />
            </div>
          </TabsContent>

          <TabsContent value='analytics' className='space-y-6'>
            <AccountGrowth />
          </TabsContent>
        </Tabs>
      </Main>
    </>
  )
}
