// filepath: src\features\social-media\linkedin\posts\PostCard.tsx
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LinkedInPost } from "./useLinkedInPosts"
import { formatDistanceToNow } from "date-fns"
import {
    ThumbsUp,
    MessageSquare,
    Eye,
    BarChart2,
    Rocket,
    Copy
} from "lucide-react"

interface PostCardProps {
    post: LinkedInPost
}

export default function PostCard({ post }: PostCardProps) {
    return (
        <Card className="w-full">
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <Badge variant={getPostTypeBadgeVariant(post.mediaType)}>
                            {getPostTypeLabel(post.mediaType)}
                        </Badge>
                        <div className="text-xs text-muted-foreground">
                            Posted {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-3">
                {/* Post content */}
                <p className="text-sm line-clamp-3">{post.content}</p>

                {/* Media content (image or article) */}
                {renderPostMedia(post)}

                {/* Post metrics */}
                <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground mt-4">
                    <div className="flex items-center gap-1">
                        <ThumbsUp className="h-4 w-4" />
                        <span>{post.reactions.toLocaleString()} reactions</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{post.comments.toLocaleString()} comments</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>{post.impressions.toLocaleString()} views</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex gap-2 pt-1">
                <Button variant="outline" size="sm" className="flex-1">
                    <BarChart2 className="h-4 w-4 mr-2" /> View Insights
                </Button>
                <Button variant="default" size="sm" className="flex-1">
                    <Rocket className="h-4 w-4 mr-2" /> Boost
                </Button>
                <Button variant="ghost" size="sm" className="flex-none">
                    <Copy className="h-4 w-4" />
                </Button>
            </CardFooter>
        </Card>
    )
}

// Helper functions
function getPostTypeLabel(type: LinkedInPost['mediaType']): string {
    switch (type) {
        case 'text': return 'Text Post';
        case 'image': return 'Image Post';
        case 'article': return 'Article';
        default: return 'Post';
    }
}

function getPostTypeBadgeVariant(type: LinkedInPost['mediaType']): "default" | "secondary" | "destructive" | "outline" {
    switch (type) {
        case 'text': return 'outline';
        case 'image': return 'default';
        case 'article': return 'secondary';
        default: return 'outline';
    }
}

function renderPostMedia(post: LinkedInPost) {
    if (post.mediaType === 'image' && post.mediaUrl) {
        return (
            <div className="relative w-full rounded-md overflow-hidden aspect-[1200/630]">
                <img
                    src={post.mediaUrl}
                    alt="Post media"
                    className="object-cover w-full h-full"
                />
            </div>
        );
    }

    if (post.mediaType === 'article' && post.articleTitle) {
        return (
            <div className="border rounded-md overflow-hidden">
                {post.mediaUrl && (
                    <div className="w-full aspect-[1200/630]">
                        <img
                            src={post.mediaUrl}
                            alt={post.articleTitle}
                            className="object-cover w-full h-full"
                        />
                    </div>
                )}
                <div className="p-3 space-y-1">
                    <div className="font-medium">{post.articleTitle}</div>
                    {post.articleSummary && (
                        <div className="text-xs line-clamp-2 text-muted-foreground">{post.articleSummary}</div>
                    )}
                </div>
            </div>
        );
    }

    return null;
}
