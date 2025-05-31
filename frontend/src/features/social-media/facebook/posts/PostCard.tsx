import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ThumbsUp, MessageSquare, Share2, Rocket, ExternalLink } from "lucide-react"
import { FacebookPost } from "./useFacebookPosts"
import { formatDistanceToNow } from "date-fns"

interface PostCardProps {
    post: FacebookPost
}

export default function PostCard({ post }: PostCardProps) {
    return (
        <Card className="w-full">
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <Badge variant={getPostTypeBadgeVariant(post.type)}>
                            {getPostTypeLabel(post.type)}
                        </Badge>
                        <div className="text-xs text-muted-foreground">
                            Posted {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-3">
                {/* Post text */}
                <p className="text-sm line-clamp-3">{post.text}</p>

                {/* Post media */}
                {renderPostMedia(post)}

                {/* Post link preview */}
                {post.type === 'link' && renderLinkPreview(post)}

                {/* Post metrics */}
                <div className="flex gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <ThumbsUp className="h-4 w-4" />
                        <span>{post.likes.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{post.comments.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Share2 className="h-4 w-4" />
                        <span>{post.shares.toLocaleString()}</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="pt-1 flex gap-2">
                <Button variant="outline" className="w-full sm:w-auto">
                    View Details
                </Button>
                <Button variant="default" className="w-full sm:w-auto">
                    <Rocket className="h-4 w-4 mr-2" /> Boost Post
                </Button>
            </CardFooter>
        </Card>
    )
}

// Helper functions
function getPostTypeLabel(type: FacebookPost['type']): string {
    switch (type) {
        case 'text': return 'Text Post';
        case 'image': return 'Image Post';
        case 'video': return 'Video Post';
        case 'link': return 'Link Post';
        default: return 'Post';
    }
}

function getPostTypeBadgeVariant(type: FacebookPost['type']): "default" | "secondary" | "destructive" | "outline" {
    switch (type) {
        case 'text': return 'outline';
        case 'image': return 'default';
        case 'video': return 'secondary';
        case 'link': return 'outline';
        default: return 'outline';
    }
}

function renderPostMedia(post: FacebookPost) {
    if (post.imageUrl) {
        return (
            <div className="relative w-full rounded-md overflow-hidden aspect-[1200/630]">
                <img
                    src={post.imageUrl}
                    alt="Post media"
                    className="object-cover w-full h-full"
                />
            </div>
        );
    }

    if (post.videoUrl) {
        return (
            <div className="relative w-full rounded-md overflow-hidden aspect-video bg-muted flex items-center justify-center">
                <div className="text-sm text-muted-foreground">[Video Placeholder]</div>
            </div>
        );
    }

    return null;
}

function renderLinkPreview(post: FacebookPost) {
    if (!post.link) return null;

    return (
        <div className="border rounded-md overflow-hidden">
            {post.imageUrl && (
                <div className="w-full aspect-[1200/630]">
                    <img
                        src={post.imageUrl}
                        alt={post.linkTitle}
                        className="object-cover w-full h-full"
                    />
                </div>
            )}
            <div className="p-3 space-y-1">
                <div className="text-xs text-muted-foreground">{new URL(post.link).hostname}</div>
                <div className="font-medium">{post.linkTitle}</div>
                <div className="text-xs line-clamp-2">{post.linkDescription}</div>
            </div>
        </div>
    );
}
