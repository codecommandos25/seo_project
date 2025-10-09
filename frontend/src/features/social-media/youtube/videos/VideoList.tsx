// filepath: src\features\social-media\youtube\videos\VideoList.tsx
import { useEffect, useState } from 'react'
import { useGetYoutubeVideos } from '@/service/youtube'
import { YoutubeVideoType } from '@/service/youtube/api'
import { Loader2, RefreshCw } from 'lucide-react'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import VideoCard from './VideoCard'
import { YouTubeVideo, useYouTubeVideos } from './useYouTubeVideos'
import { isTokenExpired } from '@/utils/handle-server-error'
import { UseQueryResult } from '@tanstack/react-query'

interface VideoListProps {
  onVideoSelect?: (video: YoutubeVideoType) => void,
  YoutubeData?:YoutubeVideoType[];
  isLoading:boolean;
  isRefetching:boolean;
  error: Error | null;
  refetch:any
  // refetch:() => Promise<UseQueryResult<YoutubeVideoType, Error>>;
}

export default function VideoList({ onVideoSelect,YoutubeData,isLoading,isRefetching,error,refetch }: VideoListProps) {
  const [videoType, setVideoType] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const videosPerPage = 9 // 3x3 grid

  // const { data, isLoading, error, refetch, isRefetching } = useYouTubeVideos(
  //   videoType,
  //   currentPage,
  //   videosPerPage
  // )

  // const totalPages = data ? Math.ceil(data.totalCount / videosPerPage) : 0

  const totalPages = YoutubeData ? Math.ceil(YoutubeData?.length / videosPerPage) : 0

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  console.log('youtubeData', YoutubeData)

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>YouTube Videos</CardTitle>
          <CardDescription>Loading your channel videos...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className='space-y-2'>
                <Skeleton className='aspect-video w-full' />
                <Skeleton className='h-4 w-4/5' />
                <Skeleton className='h-4 w-3/5' />
                <div className='flex gap-2'>
                  <Skeleton className='h-8 w-full' />
                  <Skeleton className='h-8 w-full' />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Alert variant='destructive'>
        <AlertCircle className='h-4 w-4' />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load YouTube videos. Please try again later.
        </AlertDescription>
      </Alert>
    )
  }
 console.log("error",error)
  return (
    <Card>
      <CardHeader className='pb-3'>
        <div className='flex flex-wrap items-center justify-between gap-4'>
          <div>
            <CardTitle>YouTube Videos</CardTitle>
            <CardDescription>
              Manage and analyze your YouTube channel videos
            </CardDescription>
          </div>
          <Button
            variant='outline'
            size='sm'
            onClick={() => refetch()}
            disabled={isRefetching}
          >
            {isRefetching ? (
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            ) : (
              <RefreshCw className='mr-2 h-4 w-4' />
            )}
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent className='space-y-6'>
        <Tabs
          defaultValue='all'
          value={videoType}
          onValueChange={setVideoType}
          className='mb-4'
        >
          <TabsList>
            <TabsTrigger value='all'>All Videos</TabsTrigger>
            <TabsTrigger value='short'>Shorts</TabsTrigger>
            <TabsTrigger value='long'>Long-form</TabsTrigger>
          </TabsList>

          <TabsContent value={videoType} className='mt-4'>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
              {YoutubeData?.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  onAnalyze={() => onVideoSelect?.(video)}
                />
              ))}

              {YoutubeData?.length === 0 && (
                <div className='col-span-full py-8 text-center text-muted-foreground'>
                  No {videoType !== 'all' ? videoType + ' ' : ''}videos found.
                </div>
              )}
            </div>

            {totalPages > 1 && (
              <div className='mt-6 flex justify-center'>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() =>
                          currentPage > 1 && handlePageChange(currentPage - 1)
                        }
                        className={
                          currentPage === 1
                            ? 'pointer-events-none opacity-50'
                            : 'cursor-pointer'
                        }
                      />
                    </PaginationItem>

                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                      let pageNumber: number

                      if (totalPages <= 5) {
                        // Show all pages if 5 or fewer
                        pageNumber = i + 1
                      } else if (currentPage <= 3) {
                        // Start: show 1,2,3...n
                        if (i < 4) {
                          pageNumber = i + 1
                        } else {
                          return (
                            <PaginationItem key='ellipsis-end'>
                              <PaginationEllipsis />
                            </PaginationItem>
                          )
                        }
                      } else if (currentPage >= totalPages - 2) {
                        // End: show 1...n-2,n-1,n
                        if (i === 0) {
                          return (
                            <>
                              <PaginationItem key='page-1'>
                                <PaginationLink
                                  onClick={() => handlePageChange(1)}
                                >
                                  1
                                </PaginationLink>
                              </PaginationItem>
                              <PaginationItem key='ellipsis-start'>
                                <PaginationEllipsis />
                              </PaginationItem>
                            </>
                          )
                        } else {
                          pageNumber = totalPages - (4 - i)
                        }
                      } else {
                        // Middle: show 1...c-1,c,c+1...n
                        if (i === 0) {
                          return (
                            <>
                              <PaginationItem key='page-1'>
                                <PaginationLink
                                  onClick={() => handlePageChange(1)}
                                >
                                  1
                                </PaginationLink>
                              </PaginationItem>
                              <PaginationItem key='ellipsis-start'>
                                <PaginationEllipsis />
                              </PaginationItem>
                            </>
                          )
                        } else if (i === 4) {
                          return (
                            <>
                              <PaginationItem key='ellipsis-end'>
                                <PaginationEllipsis />
                              </PaginationItem>
                              <PaginationItem key={`page-${totalPages}`}>
                                <PaginationLink
                                  onClick={() => handlePageChange(totalPages)}
                                >
                                  {totalPages}
                                </PaginationLink>
                              </PaginationItem>
                            </>
                          )
                        } else {
                          pageNumber = currentPage + (i - 2)
                        }
                      }

                      return pageNumber ? (
                        <PaginationItem key={`page-${pageNumber}`}>
                          <PaginationLink
                            onClick={() => handlePageChange(pageNumber)}
                            isActive={currentPage === pageNumber}
                          >
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>
                      ) : null
                    })}

                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          currentPage < totalPages &&
                          handlePageChange(currentPage + 1)
                        }
                        className={
                          currentPage === totalPages
                            ? 'pointer-events-none opacity-50'
                            : 'cursor-pointer'
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
