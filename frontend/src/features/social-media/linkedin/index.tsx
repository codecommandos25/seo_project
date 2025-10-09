// filepath: src\features\social-media\linkedin\index.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Tabs as NestedTabs,
  TabsList as NestedTabsList,
  TabsTrigger as NestedTabsTrigger,
  TabsContent as NestedTabsContent,
} from '@/components/ui/tabs'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import CompanyPageAnalytics from './analytics/CompanyPageAnalytics'
import ProfileAnalytics from './analytics/ProfileAnalytics'
import EngagementTrends from './insights/EngagementTrends'
import PostList from './posts/PostList'
import ContentIdeas from './strategy/ContentIdeas'
import PostScheduler from './strategy/PostScheduler'

export default function LinkedInAnalytics() {
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
            LinkedIn Analytics
          </h1>
          <p className='mt-1 text-muted-foreground'>
            Track performance, analyze trends, and optimize your linkedin
            strategy
          </p>
        </div>

        <Tabs defaultValue='posts' className='space-y-4'>
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
            <EngagementTrends />
          </TabsContent>

          <TabsContent value='strategy' className='space-y-6'>
            <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
              <ContentIdeas />
              <PostScheduler />
            </div>
          </TabsContent>

          <TabsContent value='analytics' className='space-y-6'>
            <NestedTabs defaultValue='profile'>
              <NestedTabsList>
                <NestedTabsTrigger value='profile'>
                  Personal Profile
                </NestedTabsTrigger>
                <NestedTabsTrigger value='company'>
                  Company Page
                </NestedTabsTrigger>
              </NestedTabsList>
              <NestedTabsContent value='profile'>
                <div className='mt-6'>
                  <ProfileAnalytics />
                </div>
              </NestedTabsContent>
              <NestedTabsContent value='company'>
                <div className='mt-6'>
                  <CompanyPageAnalytics />
                </div>
              </NestedTabsContent>
            </NestedTabs>
          </TabsContent>
        </Tabs>
      </Main>
    </>
  )
}
