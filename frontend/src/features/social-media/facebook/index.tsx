// filepath: src\features\social-media\facebook\index.tsx
import { Facebook } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import PageOverview from './analytics/PageOverview'
import InsightsChart from './insights/InsightsChart'
import PostList from './posts/PostList'
import AIContentIdeas from './strategy/AIContentIdeas'
import CompetitorPostAnalysis from './strategy/CompetitorPostAnalysis'

export default function FacebookAnalytics() {
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
            Facebook Analytics
          </h1>
          <p className='mt-1 text-muted-foreground'>
            Track performance, analyze trends, and optimize your facebook
            strategy
          </p>
        </div>

        <Tabs defaultValue='overview' className='space-y-4'>
          <TabsList>
            <TabsTrigger value='overview'>Overview</TabsTrigger>
            <TabsTrigger value='posts'>Posts</TabsTrigger>
            <TabsTrigger value='insights'>Insights</TabsTrigger>
            <TabsTrigger value='strategy'>Strategy</TabsTrigger>
          </TabsList>

          <TabsContent value='overview' className='space-y-6'>
            <PageOverview />
          </TabsContent>

          <TabsContent value='posts' className='space-y-6'>
            <PostList />
          </TabsContent>

          <TabsContent value='insights' className='space-y-6'>
            <InsightsChart />
          </TabsContent>

          <TabsContent value='strategy' className='space-y-6'>
            <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
              <CompetitorPostAnalysis />
              <AIContentIdeas />
            </div>
          </TabsContent>
        </Tabs>
      </Main>
    </>
  )
}
