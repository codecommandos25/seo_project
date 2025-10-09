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
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import PostCard from './PostCard'
import { FacebookPost, useFacebookPosts } from './useFacebookPosts'

export default function PostList() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const {
    data: posts,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useFacebookPosts()

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Facebook Posts</CardTitle>
          <CardDescription>
            Loading your recent Facebook posts and their performance...
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
          Failed to load Facebook posts. Please try again later.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <Card>
      <CardHeader className='pb-3'>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle>Recent Facebook Posts</CardTitle>
            <CardDescription>
              View and analyze your recent Facebook page posts
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
        <Tabs defaultValue='all' className='mb-4'>
          <TabsList>
            <TabsTrigger value='all'>All Posts</TabsTrigger>
            <TabsTrigger value='image'>Images</TabsTrigger>
            <TabsTrigger value='video'>Videos</TabsTrigger>
            <TabsTrigger value='text'>Text Only</TabsTrigger>
            <TabsTrigger value='link'>Links</TabsTrigger>
          </TabsList>

          <TabsContent value='all' className='mt-4'>
            <div
              className={`${viewMode === 'grid' ? 'grid grid-cols-1 gap-4 md:grid-cols-2' : 'space-y-4'}`}
            >
              {posts?.map((post) => <PostCard key={post.id} post={post} />)}
            </div>
          </TabsContent>

          {['image', 'video', 'text', 'link'].map((type) => (
            <TabsContent key={type} value={type} className='mt-4'>
              <div
                className={`${viewMode === 'grid' ? 'grid grid-cols-1 gap-4 md:grid-cols-2' : 'space-y-4'}`}
              >
                {posts
                  ?.filter((post) => post.type === type)
                  .map((post) => <PostCard key={post.id} post={post} />)}

                {posts?.filter((post) => post.type === type).length === 0 && (
                  <div className='col-span-full py-8 text-center text-muted-foreground'>
                    No {type} posts found.
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
