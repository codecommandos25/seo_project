// filepath: src\features\social-media\linkedin\posts\PostList.tsx
import { useState } from 'react'
import { LayoutGrid, LayoutList, Loader2 } from 'lucide-react'
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
import PostCard from './PostCard'
import { LinkedInPost, useLinkedInPosts } from './useLinkedInPosts'

export default function PostList() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filter, setFilter] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const {
    data: posts,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useLinkedInPosts(filter)

  const postsPerPage = 6
  const totalPosts = posts?.length || 0
  const totalPages = Math.ceil(totalPosts / postsPerPage)

  const currentPosts = posts?.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  )

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent LinkedIn Posts</CardTitle>
          <CardDescription>
            Loading your recent LinkedIn posts and their performance...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className='space-y-2'>
                <Skeleton className='h-4 w-1/4' />
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-32 w-full' />
                <div className='flex gap-2'>
                  <Skeleton className='h-8 w-24' />
                  <Skeleton className='h-8 w-24' />
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
          Failed to load LinkedIn posts. Please try again later.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <Card>
      <CardHeader className='pb-3'>
        <div className='flex flex-wrap items-center justify-between gap-4'>
          <div>
            <CardTitle>Recent LinkedIn Posts</CardTitle>
            <CardDescription>
              View and analyze your recent LinkedIn posts performance
            </CardDescription>
          </div>
          <div className='flex items-center gap-2'>
            <div className='flex overflow-hidden rounded-md bg-muted'>
              <Button
                variant='ghost'
                size='sm'
                className={`h-8 rounded-none px-3 ${viewMode === 'grid' ? 'bg-primary text-primary-foreground' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <LayoutGrid className='h-4 w-4' />
              </Button>
              <Button
                variant='ghost'
                size='sm'
                className={`h-8 rounded-none px-3 ${viewMode === 'list' ? 'bg-primary text-primary-foreground' : ''}`}
                onClick={() => setViewMode('list')}
              >
                <LayoutList className='h-4 w-4' />
              </Button>
            </div>
            <Button
              variant='outline'
              size='sm'
              onClick={() => refetch()}
              disabled={isRefetching}
            >
              {isRefetching ? (
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              ) : null}
              Refresh
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue='all'
          value={filter}
          onValueChange={setFilter}
          className='mb-4'
        >
          <TabsList>
            <TabsTrigger value='all'>All Posts</TabsTrigger>
            <TabsTrigger value='text'>Text</TabsTrigger>
            <TabsTrigger value='image'>Images</TabsTrigger>
            <TabsTrigger value='article'>Articles</TabsTrigger>
          </TabsList>

          <TabsContent value={filter} className='mt-4'>
            <div
              className={`${viewMode === 'grid' ? 'grid grid-cols-1 gap-4 md:grid-cols-2' : 'space-y-4'}`}
            >
              {currentPosts?.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}

              {currentPosts?.length === 0 && (
                <div className='col-span-full py-8 text-center text-muted-foreground'>
                  No {filter !== 'all' ? filter : ''} posts found.
                </div>
              )}
            </div>

            {totalPages > 1 && (
              <div className='mt-6'>
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
                            : ''
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
                            : ''
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
