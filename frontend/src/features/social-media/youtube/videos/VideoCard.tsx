// filepath: src\features\social-media\youtube\videos\VideoCard.tsx
import { formatDistanceToNow } from 'date-fns'
import { YoutubeVideoType } from '@/service/youtube/api'
import {
  Eye,
  ThumbsUp,
  MessageSquare,
  BarChart2,
  Rocket,
  Download,
  Clock,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { YouTubeVideo } from './useYouTubeVideos'

interface VideoCardProps {
  video: YoutubeVideoType
  onAnalyze?: (video: YoutubeVideoType) => void
}

export default function VideoCard({ video, onAnalyze }: VideoCardProps) {
  // Format large numbers (e.g., 1.2K, 3.5M)
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    } else {
      return num.toString()
    }
  }

  return (
    <Card className='overflow-hidden'>
      <div className='relative'>
        <img
          src={video.snippet.thumbnails.medium.url}
          alt={video.snippet.channelTitle}
          className='aspect-video w-full object-cover'
        />

        {/* Duration badge */}
        <div className='absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-xs text-white'>
          {video.contentDetails.duration}
        </div>

        {/* Video type badge */}
        {/* <Badge
                    variant={video.type === 'short' ? 'destructive' : 'secondary'}
                    className="absolute top-2 left-2"
                >
                    {video.type === 'short' ? 'SHORT' : 'VIDEO'}
                </Badge> */}
      </div>

      <CardContent className='p-4'>
        <h3
          className='mb-2 line-clamp-2 font-medium'
          title={video.snippet.title}
        >
          {video.snippet.title}
        </h3>

        <div className='mb-3 flex items-center text-sm text-muted-foreground'>
          <Clock className='mr-1 h-3.5 w-3.5' />
          <span>
            Posted{' '}
            {formatDistanceToNow(new Date(video.snippet.publishedAt), {
              addSuffix: true,
            })}
          </span>
        </div>

        {/* Video metrics */}
        <div className='flex gap-4 text-sm'>
          <div className='flex items-center gap-1'>
            <Eye className='h-4 w-4 text-muted-foreground' />
            {/* <span>{formatNumber(video.statistics.viewCount)}</span> */}
            <span>{video.statistics.viewCount}</span>
          </div>
          <div className='flex items-center gap-1'>
            <ThumbsUp className='h-4 w-4 text-muted-foreground' />
            {/* <span>{formatNumber(video.likes)}</span> */}
            <span>{video.statistics.likeCount}</span>
          </div>
          <div className='flex items-center gap-1'>
            <MessageSquare className='h-4 w-4 text-muted-foreground' />
            {/* <span>{formatNumber(video.comments)}</span> */}
            <span>{video.statistics.commentCount}</span>
          </div>
        </div>

        {/* Calculate engagement rate */}
        {(() => {
          // const engagementRate = (( video.likes + video.comments) / video.views * 100).toFixed(1)
          const engagementRate = (
            Number(video.statistics.likeCount) +
            (Number(video.statistics.commentCount) /
              Number(video.statistics.viewCount)) *
              100
          ).toFixed(1)
          return (
            <div className='mt-2 flex items-center text-xs'>
              <span className='mr-1 text-muted-foreground'>Engagement:</span>
              <Badge
                variant={
                  parseFloat(engagementRate) > 5
                    ? 'default'
                    : parseFloat(engagementRate) > 2
                      ? 'secondary'
                      : 'outline'
                }
              >
                {engagementRate}%
              </Badge>
            </div>
          )
        })()}
      </CardContent>

      <CardFooter className='flex gap-2 px-4 pb-4 pt-0'>
        <Button
          variant='default'
          size='sm'
          className='flex-1'
          onClick={() => onAnalyze?.(video)}
        >
          <BarChart2 className='mr-2 h-4 w-4' /> Analyze
        </Button>
        <Button variant='secondary' size='sm' className='flex-1'>
          <Rocket className='mr-2 h-4 w-4' /> Boost
        </Button>
        <Button variant='outline' size='sm' className='flex-1'>
          <Download className='mr-2 h-4 w-4' /> Report
        </Button>
      </CardFooter>
    </Card>
  )
}
