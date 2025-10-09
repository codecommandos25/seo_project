// filepath: src\features\social-media\youtube\index.tsx
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from '@tanstack/react-router'
import {
  useGetYoutubeUpdateAccessToken,
  useGetYoutubeVideos,
  useGetYoutubeVideosInsight,
} from '@/service/youtube'
import { YoutubeVideoType } from '@/service/youtube/api'
import {
  Clapperboard,
  BarChart2,
  LineChart,
  Calendar,
  Users,
  DollarSign,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import AudienceAnalytics from './analytics/AudienceAnalytics'
import RevenueAnalytics from './analytics/RevenueAnalytics'
import ChannelInsights from './insights/ChannelInsights'
import VideoPerformance from './insights/VideoPerformance'
import ContentPlanner from './strategy/ContentPlanner'
import TrendingTopics from './strategy/TrendingTopics'
import VideoList from './videos/VideoList'
import { YouTubeVideo } from './videos/useYouTubeVideos'
import { isTokenExpired } from '@/utils/handle-server-error'

export default function YouTubeAnalytics() {
  const [activeTab, setActiveTab] = useState<string>('videos')
  const [selectedVideo, setSelectedVideo] = useState<YoutubeVideoType | null>(
    null
  )
  const [channelId,setChannelId]=useState("")
  const accessToken =
    typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null

  // const {data:insights}=useGetYoutubeVideosInsight( accessToken ? {
  //           accessToken,
  //           maxResults: 10,
  //           type: 'Short',
  //         }:{})
  const { data, refetch:updateAccessToken } = useGetYoutubeUpdateAccessToken(
    {
      refreshToken: localStorage.getItem('refreshToken') as string,
    },
    {
      enabled: false,
    }
  )

  
      const expired = isTokenExpired(accessToken as string)
  
      console.log("access",accessToken)
      console.log("ref",expired)
  
    // ✅ Don’t call hook if no accessToken
    const { data: YoutubeData, isLoading, isRefetching, refetch, error } =
      useGetYoutubeVideos(
        accessToken
          ? {
              accessToken,
              maxResults: 10,
              type: 'Short',
            }
          : { accessToken: '', maxResults: 0, type: '' }, // noop
        {
          enabled: !!accessToken && !expired,
          onSuccess(data) {
            setChannelId(data?.videos[0].snippet.channelId)
          },
        }
      )
  
      useEffect(()=>{
        if(accessToken){
          refetch()
          // setChannelId(YoutubeData?.videos[0].snippet.channelId as string)
        }
      },[accessToken])

  const handleVideoSelect = (video: YoutubeVideoType) => {
    setSelectedVideo(video)
    setActiveTab('insights')
  }

  // const navigate = useNavigate();
  const location = useLocation()

  useEffect(() => {
    const refreshToken = localStorage.getItem('refreshToken')
    const accessToken = localStorage.getItem('accessToken')

    // Check if we have a refresh token AND if access token is expired or missing
    if (refreshToken && (!accessToken || isAccessTokenExpired(accessToken))) {
      updateAccessToken()
        .then((response) => {
          if (response.data?.access_token) {
            localStorage.setItem('accessToken', response.data.access_token)
            console.log('Access token refreshed successfully')
          }
        })
        .catch((error) => {
          console.error('Failed to refresh access token:', error)
          // Handle token refresh failure (e.g., redirect to login)
        })
    }
  }, [location.pathname]) // Use a more appropriate dependency

  const isAccessTokenExpired = (token: string): boolean => {
    try {
      const parts = token.split('.')
      if (parts.length < 2) return true // not a JWT
      const payload = JSON.parse(atob(parts[1]))
      const expirationTime = payload.exp * 1000
      return Date.now() >= expirationTime
    } catch (error) {
      console.error('Error checking token expiration:', error)
      return true
    }
  }

  const YoutubeOAuth = async () => {
    try {
      window.location.href =
        'https://accounts.google.com/o/oauth2/v2/auth?client_id=850335973915-eaf0q12k9i8obkikv4fu3se5q90901e2.apps.googleusercontent.com&redirect_uri=http://localhost:5173/oauth2callback&response_type=code&scope=https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/yt-analytics.readonly&access_type=offline&prompt=consent&service=lso&o2v=2&flowName=GeneralOAuthFlow'
      const params = new URLSearchParams(location.search)
      //   const code = params.get("code");
      console.log('client_id', params.get('client_id'))
    } catch (error) {
      console.error('Error fetching YouTube auth URL:', error)
    }
  }
  console.log("youtubeData",YoutubeData)
  console.log("channel id",channelId)
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
        <div className='flex flex-col items-start justify-between gap-4 md:flex-row md:items-center'>
          <div>
            <h1 className='text-3xl font-bold tracking-tight'>
              YouTube Analytics
            </h1>
            <p className='text-muted-foreground'>
              Monitor performance, optimize content, and grow your YouTube
              channel
            </p>
          </div>
          <div className='flex gap-2'>
            <Button variant='outline'>
              <Calendar className='mr-2 h-4 w-4' />
              Last 30 Days
            </Button>
            <Button variant='default' onClick={YoutubeOAuth}>
              Connect Channel
            </Button>
            {/* <Button variant="default" onClick={YoutubeOAuth} disabled={isFetching}>
      {isFetching ? "Connecting..." : "Connect Channel"}
    </Button> */}
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
          <TabsList>
            <TabsTrigger value='videos' className='flex items-center'>
              <Clapperboard className='mr-2 h-4 w-4' />
              <span>Videos</span>
            </TabsTrigger>
            <TabsTrigger value='insights' className='flex items-center'>
              <BarChart2 className='mr-2 h-4 w-4' />
              <span>Insights</span>
            </TabsTrigger>
            <TabsTrigger value='strategy' className='flex items-center'>
              <Calendar className='mr-2 h-4 w-4' />
              <span>Strategy</span>
            </TabsTrigger>
            <TabsTrigger value='analytics' className='flex items-center'>
              <LineChart className='mr-2 h-4 w-4' />
              <span>Analytics</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value='videos' className='space-y-6'>
            <VideoList onVideoSelect={handleVideoSelect} YoutubeData={YoutubeData?.videos} refetch={refetch} isLoading={isLoading} isRefetching={isRefetching} error={error} />
          </TabsContent>

          <TabsContent value='insights' className='space-y-6'>
            <div className='grid grid-cols-1 gap-6'>
              {selectedVideo ? (
                <VideoPerformance videoId={selectedVideo.id} />
              ) : (
                <ChannelInsights />
              )}
            </div>
          </TabsContent>

          <TabsContent value='strategy' className='space-y-6'>
            <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
              <ContentPlanner />
              <TrendingTopics />
            </div>
          </TabsContent>

          <TabsContent value='analytics' className='space-y-6'>
            <div className='flex flex-col space-y-6'>
              {/* Analytics Menu */}
              <Card className='w-full'>
                <CardContent className='p-4'>
                  <div className='flex flex-wrap gap-4'>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() =>
                        document
                          .getElementById('audience')
                          ?.scrollIntoView({ behavior: 'smooth' })
                      }
                      className='flex items-center'
                    >
                      <Users className='mr-2 h-4 w-4' />
                      Audience
                    </Button>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() =>
                        document
                          .getElementById('revenue')
                          ?.scrollIntoView({ behavior: 'smooth' })
                      }
                      className='flex items-center'
                    >
                      <DollarSign className='mr-2 h-4 w-4' />
                      Revenue
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Audience Analytics */}
              <div id='audience'>
                <AudienceAnalytics />
              </div>

              {/* Revenue Analytics */}
              <div id='revenue' className='pt-4'>
                <RevenueAnalytics />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Main>
    </>
    // <div className="container mx-auto px-4 py-6 space-y-6">
    //     <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
    //         <div>
    //             <h1 className="text-3xl font-bold tracking-tight">YouTube Analytics</h1>
    //             <p className="text-muted-foreground">
    //                 Monitor performance, optimize content, and grow your YouTube channel
    //             </p>
    //         </div>
    //         <div className="flex gap-2">
    //             <Button variant="outline">
    //                 <Calendar className="mr-2 h-4 w-4" />
    //                 Last 30 Days
    //             </Button>
    //             <Button variant="default">
    //                 Connect Channel
    //             </Button>
    //         </div>
    //     </div>

    //     <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
    //         <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full mb-6">
    //             <TabsTrigger value="videos" className="flex items-center">
    //                 <Clapperboard className="mr-2 h-4 w-4" />
    //                 <span>Videos</span>
    //             </TabsTrigger>
    //             <TabsTrigger value="insights" className="flex items-center">
    //                 <BarChart2 className="mr-2 h-4 w-4" />
    //                 <span>Insights</span>
    //             </TabsTrigger>
    //             <TabsTrigger value="strategy" className="flex items-center">
    //                 <Calendar className="mr-2 h-4 w-4" />
    //                 <span>Strategy</span>
    //             </TabsTrigger>
    //             <TabsTrigger value="analytics" className="flex items-center">
    //                 <LineChart className="mr-2 h-4 w-4" />
    //                 <span>Analytics</span>
    //             </TabsTrigger>
    //         </TabsList>

    //         <TabsContent value="videos" className="space-y-6">
    //             <VideoList onVideoSelect={handleVideoSelect} />
    //         </TabsContent>

    //         <TabsContent value="insights" className="space-y-6">
    //             <div className="grid grid-cols-1 gap-6">
    //                 {selectedVideo ? (
    //                     <VideoPerformance videoId={selectedVideo.id} />
    //                 ) : (
    //                     <ChannelInsights />
    //                 )}
    //             </div>
    //         </TabsContent>

    //         <TabsContent value="strategy" className="space-y-6">
    //             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    //                 <ContentPlanner />
    //                 <TrendingTopics />
    //             </div>
    //         </TabsContent>

    //         <TabsContent value="analytics" className="space-y-6">
    //             <div className="flex flex-col space-y-6">
    //                 {/* Analytics Menu */}
    //                 <Card className="w-full">
    //                     <CardContent className="p-4">
    //                         <div className="flex flex-wrap gap-4">
    //                             <Button
    //                                 variant="outline"
    //                                 size="sm"
    //                                 onClick={() => document.getElementById('audience')?.scrollIntoView({ behavior: 'smooth' })}
    //                                 className="flex items-center"
    //                             >
    //                                 <Users className="mr-2 h-4 w-4" />
    //                                 Audience
    //                             </Button>
    //                             <Button
    //                                 variant="outline"
    //                                 size="sm"
    //                                 onClick={() => document.getElementById('revenue')?.scrollIntoView({ behavior: 'smooth' })}
    //                                 className="flex items-center"
    //                             >
    //                                 <DollarSign className="mr-2 h-4 w-4" />
    //                                 Revenue
    //                             </Button>
    //                         </div>
    //                     </CardContent>
    //                 </Card>

    //                 {/* Audience Analytics */}
    //                 <div id="audience">
    //                     <AudienceAnalytics />
    //                 </div>

    //                 {/* Revenue Analytics */}
    //                 <div id="revenue" className="pt-4">
    //                     <RevenueAnalytics />
    //                 </div>
    //             </div>
    //         </TabsContent>
    //     </Tabs>
    // </div>
  )
}
