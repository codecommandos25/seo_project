import { useEffect } from 'react'
import { useSEODetails } from '@/service/seo'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { BacklinksSection } from './components/backlinks-section'
import { CompetitorsSection } from './components/competitors-section'
import { KeywordSection } from './components/keyword-section'
import { Overview } from './components/overview'
import { SpeedSection } from './components/speed-section'
import { TrafficDistribution } from './components/traffic-distribution'
import { TrafficSection } from './components/traffic-section'

export default function Dashboard() {
  const { mutate } = useSEODetails({
    onSuccess(data, variables, context) {
      console.log('data', data)
    },
  })

  useEffect(() => {
    mutate([{
      limit: 2,
      filters: [['registrar', '=', 'geeksforgeeks.org']],
    }])
  }, [])
  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header>
        <div className='flex flex-1 items-center space-x-4'>
          <Search />
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      {/* ===== Main ===== */}
      <Main className='space-y-4 px-4 py-4'>
        <Overview />
        <SpeedSection />
        <TrafficSection />
        <KeywordSection />
        <CompetitorsSection />
        <BacklinksSection />
        <TrafficDistribution />

        {/* ===== Tabs ===== */}
        {/* <Tabs
          defaultValue='overview'
          className='space-y-4'


        {/* ===== Tabs ===== */}

        {/* <Tabs
          orientation='vertical'
          defaultValue='overview'
          className='space-y-4'
        >
          <div className='w-full overflow-x-auto pb-2'>
            <TabsList>
              <TabsTrigger value='overview'>Overview</TabsTrigger>
              <TabsTrigger value='analytics' disabled>
                Analytics
              </TabsTrigger>
              <TabsTrigger value='reports' disabled>
                Reports
              </TabsTrigger>
              <TabsTrigger value='notifications' disabled>
                Notifications
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value='overview' className='space-y-4'>
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
            </div>
          </TabsContent>
        </Tabs> */}
      </Main>
    </>
  )
}
