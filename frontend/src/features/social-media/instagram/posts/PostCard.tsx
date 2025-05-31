import {
    Card,
    CardContent,
    CardFooter,
    CardHeader
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, BarChart3, Zap } from "lucide-react"
import { InstagramPost } from "./useInstagramPosts"
import { formatDistanceToNow } from "date-fns"

interface PostCardProps {
    post: InstagramPost
}

export default function PostCard({ post }: PostCardProps) {
    return (
        <Card className="overflow-hidden">
            <CardHeader className="p-0">
                <div className="aspect-square relative overflow-hidden">
                    <img
                        src={post.imageUrl}
                        alt={`Instagram post ${post.id}`}
                        className="object-cover w-full h-full"
                    />
                </div>
            </CardHeader>
            <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <Heart className="h-5 w-5 text-muted-foreground" />
                        <span className="text-sm font-medium">{post.likes.toLocaleString()}</span>
                        <MessageCircle className="h-5 w-5 text-muted-foreground ml-2" />
                        <span className="text-sm font-medium">{post.comments.toLocaleString()}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                    </div>
                </div>
                <p className="text-sm line-clamp-2">{post.caption}</p>
            </CardContent>
            <CardFooter className="px-4 pb-4 pt-0 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                    <Zap className="h-4 w-4 mr-2" />
                    Boost
                </Button>
                <Button variant="default" size="sm" className="flex-1">
                    Analyze
                </Button>
            </CardFooter>
        </Card>
    )
}
