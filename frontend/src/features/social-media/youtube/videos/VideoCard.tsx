// filepath: src\features\social-media\youtube\videos\VideoCard.tsx
import {
    Card,
    CardContent,
    CardFooter
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { YouTubeVideo } from "./useYouTubeVideos"
import { formatDistanceToNow } from "date-fns"
import {
    Eye,
    ThumbsUp,
    MessageSquare,
    BarChart2,
    Rocket,
    Download,
    Clock
} from "lucide-react"

interface VideoCardProps {
    video: YouTubeVideo
    onAnalyze?: (video: YouTubeVideo) => void
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
        <Card className="overflow-hidden">
            <div className="relative">
                <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full aspect-video object-cover"
                />

                {/* Duration badge */}
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
                    {video.duration}
                </div>

                {/* Video type badge */}
                <Badge
                    variant={video.type === 'short' ? 'destructive' : 'secondary'}
                    className="absolute top-2 left-2"
                >
                    {video.type === 'short' ? 'SHORT' : 'VIDEO'}
                </Badge>
            </div>

            <CardContent className="p-4">
                <h3 className="font-medium line-clamp-2 mb-2" title={video.title}>
                    {video.title}
                </h3>

                <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    <span>
                        Posted {formatDistanceToNow(new Date(video.publishedAt), { addSuffix: true })}
                    </span>
                </div>

                {/* Video metrics */}
                <div className="flex gap-4 text-sm">
                    <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4 text-muted-foreground" />
                        <span>{formatNumber(video.views)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                        <span>{formatNumber(video.likes)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        <span>{formatNumber(video.comments)}</span>
                    </div>
                </div>

                {/* Calculate engagement rate */}
                {(() => {
                    const engagementRate = ((video.likes + video.comments) / video.views * 100).toFixed(1)
                    return (
                        <div className="mt-2 flex items-center text-xs">
                            <span className="text-muted-foreground mr-1">Engagement:</span>
                            <Badge variant={
                                parseFloat(engagementRate) > 5 ? 'default' :
                                    parseFloat(engagementRate) > 2 ? 'secondary' : 'outline'
                            }>
                                {engagementRate}%
                            </Badge>
                        </div>
                    )
                })()}
            </CardContent>

            <CardFooter className="px-4 pb-4 pt-0 flex gap-2">
                <Button
                    variant="default"
                    size="sm"
                    className="flex-1"
                    onClick={() => onAnalyze?.(video)}
                >
                    <BarChart2 className="h-4 w-4 mr-2" /> Analyze
                </Button>
                <Button variant="secondary" size="sm" className="flex-1">
                    <Rocket className="h-4 w-4 mr-2" /> Boost
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                    <Download className="h-4 w-4 mr-2" /> Report
                </Button>
            </CardFooter>
        </Card>
    )
}
