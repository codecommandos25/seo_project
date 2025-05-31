// filepath: src\features\social-media\facebook\strategy\AIContentIdeas.tsx
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
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Copy, Edit, Bookmark, RefreshCw, Loader2, Calendar, Video, Image, FileText } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ContentIdea {
    id: string
    title: string
    body: string
    type: 'text' | 'video' | 'image' | 'event'
    tags: string[]
}

// Mock function to generate Facebook content ideas
const fetchContentIdeas = async (): Promise<ContentIdea[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1200))

    return [
        {
            id: '1',
            type: 'text',
            title: 'Industry Trend Analysis',
            body: "2025 Digital Marketing Trends: What's Working Now\n\nThe digital landscape is constantly changing, and staying ahead of trends is crucial for success. Here's what we're seeing work right now:\n\n1️⃣ AI-powered customer segmentation\n2️⃣ Voice search optimization\n3️⃣ Interactive content experiences\n4️⃣ Privacy-first marketing approaches\n5️⃣ Community-based brand building\n\nWhich of these trends are you implementing in your business? Comment below!",
            tags: ['DigitalMarketing', 'MarketingTrends', 'MarketingStrategy']
        },
        {
            id: '2',
            type: 'video',
            title: 'Tutorial Video Series',
            body: "🎬 New Tutorial: How to Set Up Conversion Tracking in 2025\n\nTracking your marketing efforts correctly is more important than ever with the recent privacy changes.\n\nIn this step-by-step video, we walk you through:\n• Setting up Meta Pixel properly\n• Creating custom conversion events\n• Working with CAPI (Conversions API)\n• Navigating privacy restrictions\n\nSave this post for when you need to optimize your tracking!\n\n#MarketingTips #ConversionTracking #FacebookAds",
            tags: ['Tutorial', 'ConversionTracking', 'FacebookAds']
        },
        {
            id: '3',
            type: 'image',
            title: 'Client Success Story',
            body: "🏆 CLIENT SUCCESS SPOTLIGHT 🏆\n\nSwipe through to see how we helped @clientname increase their Facebook ad ROAS by 327%!\n\nThe challenge: Rising ad costs and declining conversion rates\n\nOur solution:\n• Custom audience segmentation\n• Creative testing framework implementation\n• Advanced bidding strategy\n\nThe results speak for themselves! Want similar results for your business? Let's chat - link in bio.\n\n#ClientSuccess #FacebookAds #ROASImprovement",
            tags: ['CaseStudy', 'ClientSuccess', 'ROAS', 'FacebookAds']
        },
        {
            id: '4',
            type: 'event',
            title: 'Live Workshop Event',
            body: "🔴 LIVE WORKSHOP: Master Facebook Ad Strategy for 2025\n\nJoin us for a FREE 60-minute workshop where our head of paid social will break down:\n\n• The ad formats driving the highest engagement right now\n• How to structure campaigns after the latest algorithm updates\n• Creative strategies that are cutting through the noise\n• Q&A session for your specific questions\n\nDate: June 5, 2025\nTime: 1PM EST\n\nRegister now (link in comments) - spots are limited!\n\n#FacebookAds #AdStrategy #LiveWorkshop",
            tags: ['Workshop', 'FacebookAds', 'LiveEvent', 'DigitalMarketing']
        },
        {
            id: '5',
            type: 'text',
            title: 'Facebook Algorithm Update',
            body: "⚠️ IMPORTANT: Facebook Just Updated Their Algorithm\n\nHere's what we know so far:\n\n• Increased focus on community-building content\n• Lower reach for posts with external links\n• Higher priority for video content (especially long-form)\n• More weight on meaningful interactions vs. passive engagement\n\nOur team is actively testing strategies to adapt to these changes. Stay tuned for our full analysis next week!\n\nHave you noticed any changes to your reach or engagement? Share your observations below.",
            tags: ['FacebookAlgorithm', 'SocialMediaStrategy', 'FacebookUpdate']
        }
    ]
}

export default function AIContentIdeas() {
    const [activeType, setActiveType] = useState<'text' | 'video' | 'image' | 'event'>('text')

    const { data: ideas, isLoading, refetch, isRefetching } = useQuery({
        queryKey: ['facebookContentIdeas'],
        queryFn: fetchContentIdeas,
        staleTime: 1000 * 60 * 30, // 30 minutes
    })

    const filteredIdeas = ideas?.filter(idea =>
        activeType === 'all' || idea.type === activeType
    ) || []

    const copyContent = (content: string) => {
        navigator.clipboard.writeText(content)
    }

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'text': return <FileText className="h-4 w-4" />;
            case 'video': return <Video className="h-4 w-4" />;
            case 'image': return <Image className="h-4 w-4" />;
            case 'event': return <Calendar className="h-4 w-4" />;
            default: return <FileText className="h-4 w-4" />;
        }
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle>AI Content Suggestions</CardTitle>
                        <CardDescription>
                            Get AI-generated content ideas for your Facebook page
                        </CardDescription>
                    </div>
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => refetch()}
                        disabled={isLoading || isRefetching}
                    >
                        {isRefetching ? (
                            <Loader2 className="h-4 w-4 animate-spin mr-1" />
                        ) : (
                            <RefreshCw className="h-4 w-4 mr-1" />
                        )}
                        Refresh Ideas
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <Tabs value={activeType} onValueChange={(value) => setActiveType(value as any)}>
                    <TabsList className="mb-4">
                        <TabsTrigger value="text" className="flex gap-1">
                            <FileText className="h-4 w-4" /> Text Posts
                        </TabsTrigger>
                        <TabsTrigger value="video" className="flex gap-1">
                            <Video className="h-4 w-4" /> Video
                        </TabsTrigger>
                        <TabsTrigger value="image" className="flex gap-1">
                            <Image className="h-4 w-4" /> Images
                        </TabsTrigger>
                        <TabsTrigger value="event" className="flex gap-1">
                            <Calendar className="h-4 w-4" /> Events
                        </TabsTrigger>
                    </TabsList>

                    {isLoading ? (
                        <div className="flex items-center justify-center py-8">
                            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                        </div>
                    ) : (
                        <>
                            <TabsContent value={activeType} className="mt-0">
                                <div className="space-y-6">
                                    {filteredIdeas.map(idea => (
                                        <div key={idea.id} className="rounded-md border p-4 space-y-3">
                                            <div className="flex items-center gap-2">
                                                <div className="bg-primary/10 rounded-full p-1">
                                                    {getTypeIcon(idea.type)}
                                                </div>
                                                <h3 className="font-medium">{idea.title}</h3>
                                            </div>

                                            <div className="text-sm whitespace-pre-line">
                                                {idea.body}
                                            </div>

                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {idea.tags.map(tag => (
                                                    <Badge key={tag} variant="secondary" className="text-xs">
                                                        #{tag}
                                                    </Badge>
                                                ))}
                                            </div>

                                            <div className="flex justify-end gap-2 pt-2">
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Button size="sm" variant="ghost" onClick={() => copyContent(idea.body)}>
                                                                <Copy className="h-4 w-4" />
                                                            </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Copy to clipboard</p>
                                                        </TooltipContent>
                                                    </Tooltip>

                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Button size="sm" variant="ghost">
                                                                <Edit className="h-4 w-4" />
                                                            </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Edit content</p>
                                                        </TooltipContent>
                                                    </Tooltip>

                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Button size="sm" variant="ghost">
                                                                <Bookmark className="h-4 w-4" />
                                                            </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Save for later</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </div>
                                        </div>
                                    ))}

                                    {filteredIdeas.length === 0 && (
                                        <div className="text-center py-8 text-muted-foreground">
                                            No {activeType} ideas available. Try another content type.
                                        </div>
                                    )}
                                </div>
                            </TabsContent>
                        </>
                    )}
                </Tabs>
            </CardContent>
            <CardFooter>
                <Button className="w-full">
                    Generate More Ideas
                </Button>
            </CardFooter>
        </Card>
    )
}
