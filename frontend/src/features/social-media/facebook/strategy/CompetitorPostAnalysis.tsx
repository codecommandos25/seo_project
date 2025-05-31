// filepath: src\features\social-media\facebook\strategy\CompetitorPostAnalysis.tsx
import { useState } from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { ThumbsUp, MessageSquare, Share2, ExternalLink, ArrowRight, TrendingUp } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from '@/components/ui/skeleton'

interface CompetitorPost {
    id: string
    competitorName: string
    competitorHandle: string
    competitorAvatar: string
    content: string
    imageUrl: string | null
    likes: number
    comments: number
    shares: number
    engagement: number
    publishedAt: string
    insights: string[]
}

// Mock function to fetch competitor posts
const fetchCompetitorPosts = async (): Promise<CompetitorPost[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    return [
        {
            id: '1',
            competitorName: 'Digital Marketing Pro',
            competitorHandle: 'digitalmarketingpro',
            competitorAvatar: 'https://ui-avatars.com/api/?name=Digital+Marketing+Pro&background=0D8ABC&color=fff',
            content: 'Want to improve your Facebook marketing strategy? Our new guide covers everything from organic posting to advanced ad targeting. Download it for free today!',
            imageUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1000',
            likes: 543,
            comments: 47,
            shares: 126,
            engagement: 4.2,
            publishedAt: '2025-05-15T14:23:00Z',
            insights: [
                'Lead generation post with free resource',
                'Strong call-to-action',
                'Professional visuals with branded elements'
            ]
        },
        {
            id: '2',
            competitorName: 'SEO Masters',
            competitorHandle: 'seomasters',
            competitorAvatar: 'https://ui-avatars.com/api/?name=SEO+Masters&background=4CAF50&color=fff',
            content: 'Breaking News: Major Google algorithm update rolling out now! Here is what we are seeing so far and how it might impact your rankings. #SEO #GoogleUpdate',
            imageUrl: null,
            likes: 328,
            comments: 94,
            shares: 215,
            engagement: 5.7,
            publishedAt: '2025-05-17T09:15:00Z',
            insights: [
                'Timely industry news',
                'Positions brand as industry authority',
                'Creates urgency'
            ]
        },
        {
            id: '3',
            competitorName: 'Growth Hackers',
            competitorHandle: 'growthhackers',
            competitorAvatar: 'https://ui-avatars.com/api/?name=Growth+Hackers&background=FF5722&color=fff',
            content: 'We helped this SaaS startup increase conversions by 136% in just 45 days. Swipe to see the exact strategies we used! #GrowthHacking #CaseStudy',
            imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000',
            likes: 612,
            comments: 73,
            shares: 189,
            engagement: 6.5,
            publishedAt: '2025-05-19T16:40:00Z',
            insights: [
                'Case study with specific results',
                'Carousel format for detailed storytelling',
                'Industry-specific hashtags'
            ]
        }
    ]
}

export default function CompetitorPostAnalysis() {
    const { data: posts, isLoading } = useQuery({
        queryKey: ['competitorPosts'],
        queryFn: fetchCompetitorPosts,
        staleTime: 1000 * 60 * 15, // 15 minutes
    })

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle><Skeleton className="h-6 w-3/4" /></CardTitle>
                    <CardDescription><Skeleton className="h-4 w-full" /></CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {Array.from({ length: 2 }).map((_, i) => (
                        <div key={i} className="border rounded-md p-4 space-y-4">
                            <div className="flex items-center gap-3">
                                <Skeleton className="h-10 w-10 rounded-full" />
                                <div>
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-3 w-24 mt-1" />
                                </div>
                            </div>
                            <Skeleton className="h-20 w-full" />
                            <div className="flex justify-between">
                                <Skeleton className="h-8 w-24" />
                                <Skeleton className="h-8 w-24" />
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Top Performing Competitor Posts</CardTitle>
                <CardDescription>
                    Analyze high-engagement content from your competitors to inform your strategy
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {posts?.map((post) => (
                    <div key={post.id} className="border rounded-md p-4 space-y-4">
                        {/* Competitor info */}
                        <div className="flex items-center gap-3">
                            <Avatar>
                                <AvatarImage src={post.competitorAvatar} />
                                <AvatarFallback>{post.competitorName.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="font-medium">{post.competitorName}</div>
                                <div className="text-xs text-muted-foreground">@{post.competitorHandle}</div>
                            </div>
                            <Badge variant="outline" className="ml-auto">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                {post.engagement}% Engagement
                            </Badge>
                        </div>

                        {/* Post content */}
                        <p className="text-sm">{post.content}</p>

                        {/* Post image if available */}
                        {post.imageUrl && (
                            <div className="relative rounded-md overflow-hidden h-40">
                                <img
                                    src={post.imageUrl}
                                    alt="Post media"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        )}

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

                        {/* Key insights */}
                        <div className="bg-muted/50 p-3 rounded-md">
                            <div className="font-medium text-xs mb-2">Why this works:</div>
                            <ul className="text-xs space-y-1">
                                {post.insights.map((insight, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <ArrowRight className="h-3 w-3 mt-0.5 text-blue-500" />
                                        {insight}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </CardContent>
            <CardFooter className="flex justify-center">
                <Button variant="outline">
                    View More <ExternalLink className="ml-1 h-4 w-4" />
                </Button>
            </CardFooter>
        </Card>
    )
}
