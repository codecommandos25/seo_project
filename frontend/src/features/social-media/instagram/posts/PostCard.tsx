import { formatDistanceToNow } from 'date-fns'
import { Heart, MessageCircle, BarChart3, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { InstagramPost } from './useInstagramPosts'

interface PostCardProps {
  post: InstagramPost
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Card className='overflow-hidden'>
      <CardHeader className='p-0'>
        <div className='relative aspect-square overflow-hidden'>
          <img
            src={post.imageUrl}
            alt={`Instagram post ${post.id}`}
            className='h-full w-full object-cover'
          />
        </div>
      </CardHeader>
      <CardContent className='p-4'>
        <div className='mb-2 flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Heart className='h-5 w-5 text-muted-foreground' />
            <span className='text-sm font-medium'>
              {post.likes.toLocaleString()}
            </span>
            <MessageCircle className='ml-2 h-5 w-5 text-muted-foreground' />
            <span className='text-sm font-medium'>
              {post.comments.toLocaleString()}
            </span>
          </div>
          <div className='text-xs text-muted-foreground'>
            {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
          </div>
        </div>
        <p className='line-clamp-2 text-sm'>{post.caption}</p>
      </CardContent>
      <CardFooter className='flex gap-2 px-4 pb-4 pt-0'>
        <Button variant='outline' size='sm' className='flex-1'>
          <BarChart3 className='mr-2 h-4 w-4' />
          View
        </Button>
        <Button variant='outline' size='sm' className='flex-1'>
          <Zap className='mr-2 h-4 w-4' />
          Boost
        </Button>
        <Button variant='default' size='sm' className='flex-1'>
          Analyze
        </Button>
      </CardFooter>
    </Card>
  )
}
