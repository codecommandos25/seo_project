import { formatDistanceToNow } from 'date-fns'
import {
  ThumbsUp,
  MessageSquare,
  Share2,
  Rocket,
  ExternalLink,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { FacebookPost } from './useFacebookPosts'

interface PostCardProps {
  post: FacebookPost
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Card className='w-full'>
      <CardHeader className='pb-2'>
        <div className='flex items-start justify-between'>
          <div className='space-y-1'>
            <Badge variant={getPostTypeBadgeVariant(post.type)}>
              {getPostTypeLabel(post.type)}
            </Badge>
            <div className='text-xs text-muted-foreground'>
              Posted{' '}
              {formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
              })}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className='space-y-3'>
        {/* Post text */}
        <p className='line-clamp-3 text-sm'>{post.text}</p>

        {/* Post media */}
        {renderPostMedia(post)}

        {/* Post link preview */}
        {post.type === 'link' && renderLinkPreview(post)}

        {/* Post metrics */}
        <div className='flex gap-4 text-sm text-muted-foreground'>
          <div className='flex items-center gap-1'>
            <ThumbsUp className='h-4 w-4' />
            <span>{post.likes.toLocaleString()}</span>
          </div>
          <div className='flex items-center gap-1'>
            <MessageSquare className='h-4 w-4' />
            <span>{post.comments.toLocaleString()}</span>
          </div>
          <div className='flex items-center gap-1'>
            <Share2 className='h-4 w-4' />
            <span>{post.shares.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex gap-2 pt-1'>
        <Button variant='outline' className='w-full sm:w-auto'>
          View Details
        </Button>
        <Button variant='default' className='w-full sm:w-auto'>
          <Rocket className='mr-2 h-4 w-4' /> Boost Post
        </Button>
      </CardFooter>
    </Card>
  )
}

// Helper functions
function getPostTypeLabel(type: FacebookPost['type']): string {
  switch (type) {
    case 'text':
      return 'Text Post'
    case 'image':
      return 'Image Post'
    case 'video':
      return 'Video Post'
    case 'link':
      return 'Link Post'
    default:
      return 'Post'
  }
}

function getPostTypeBadgeVariant(
  type: FacebookPost['type']
): 'default' | 'secondary' | 'destructive' | 'outline' {
  switch (type) {
    case 'text':
      return 'outline'
    case 'image':
      return 'default'
    case 'video':
      return 'secondary'
    case 'link':
      return 'outline'
    default:
      return 'outline'
  }
}

function renderPostMedia(post: FacebookPost) {
  if (post.imageUrl) {
    return (
      <div className='relative aspect-[1200/630] w-full overflow-hidden rounded-md'>
        <img
          src={post.imageUrl}
          alt='Post media'
          className='h-full w-full object-cover'
        />
      </div>
    )
  }

  if (post.videoUrl) {
    return (
      <div className='relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-md bg-muted'>
        <div className='text-sm text-muted-foreground'>[Video Placeholder]</div>
      </div>
    )
  }

  return null
}

function renderLinkPreview(post: FacebookPost) {
  if (!post.link) return null

  return (
    <div className='overflow-hidden rounded-md border'>
      {post.imageUrl && (
        <div className='aspect-[1200/630] w-full'>
          <img
            src={post.imageUrl}
            alt={post.linkTitle}
            className='h-full w-full object-cover'
          />
        </div>
      )}
      <div className='space-y-1 p-3'>
        <div className='text-xs text-muted-foreground'>
          {new URL(post.link).hostname}
        </div>
        <div className='font-medium'>{post.linkTitle}</div>
        <div className='line-clamp-2 text-xs'>{post.linkDescription}</div>
      </div>
    </div>
  )
}
