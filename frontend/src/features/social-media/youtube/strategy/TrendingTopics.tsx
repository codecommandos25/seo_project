// filepath: src\features\social-media\youtube\strategy\TrendingTopics.tsx
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import {
    AreaChart,
    Area,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    TrendingUp,
    ExternalLink,
    Save,
    List,
    BarChart2,
    PlusCircle,
    Calendar,
    Search,
    Loader2,
    Sparkles,
    AlertCircle
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { faker } from "@faker-js/faker";

// Interfaces
interface TrendingTopic {
    topic: string;
    growthRate: number; // percentage increase in last 7 days
    volumeScore: number; // 0-100 representing search volume
    competition: number; // 0-100 representing competition level
    relevanceScore: number; // 0-100
    recommendedFormat: "short" | "long" | "both";
    category: string[];
}

interface TrendingVideo {
    id: string;
    title: string;
    channel: string;
    views: number;
    publishedAt: string;
    engagement: number; // engagement percentage
    tags: string[];
}

// Mock data fetching functions
const fetchTrendingTopics = async (category: string = "all", timeFrame: string = "week"): Promise<TrendingTopic[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Generate mock trending topics
    const topics: TrendingTopic[] = generateTrendingTopics();

    // Filter by category if not "all"
    const filteredTopics = category === "all"
        ? topics
        : topics.filter(topic => topic.category.includes(category));

    return filteredTopics;
};

const fetchTrendingVideos = async (category: string = "all"): Promise<TrendingVideo[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Generate mock trending videos
    return generateTrendingVideos(category);
};

export default function TrendingTopics() {
    const [category, setCategory] = useState<string>("all");
    const [timeFrame, setTimeFrame] = useState<string>("week");
    const [activeTab, setActiveTab] = useState<string>("topics");

    const {
        data: trendingTopics,
        isLoading: isTopicsLoading,
        error: topicsError
    } = useQuery({
        queryKey: ["trendingTopics", category, timeFrame],
        queryFn: () => fetchTrendingTopics(category, timeFrame),
    });

    const {
        data: trendingVideos,
        isLoading: isVideosLoading,
        error: videosError
    } = useQuery({
        queryKey: ["trendingVideos", category],
        queryFn: () => fetchTrendingVideos(category),
    });

    // Color scales for charts
    const COLORS = ['#4f46e5', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899'];

    // Group topics by category for category distribution chart
    const topicsByCategory = trendingTopics
        ? trendingTopics.reduce((acc, topic) => {
            topic.category.forEach(cat => {
                if (!acc[cat]) acc[cat] = 0;
                acc[cat] += 1;
            });
            return acc;
        }, {} as Record<string, number>)
        : {};

    const categoryChartData = Object.entries(topicsByCategory).map(([name, value]) => ({
        name,
        value,
    })).sort((a, b) => b.value - a.value);

    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div>
                        <CardTitle>Trending Topics</CardTitle>
                        <CardDescription>
                            Discover trending topics and content ideas for YouTube
                        </CardDescription>
                    </div>
                    <div className="flex gap-2">
                        <Select defaultValue={timeFrame} onValueChange={setTimeFrame}>
                            <SelectTrigger className="w-[150px]">
                                <SelectValue placeholder="Time frame" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="week">This Week</SelectItem>
                                <SelectItem value="month">This Month</SelectItem>
                                <SelectItem value="quarter">This Quarter</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select defaultValue={category} onValueChange={setCategory}>
                            <SelectTrigger className="w-[150px]">
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Categories</SelectItem>
                                <SelectItem value="technology">Technology</SelectItem>
                                <SelectItem value="business">Business</SelectItem>
                                <SelectItem value="entertainment">Entertainment</SelectItem>
                                <SelectItem value="education">Education</SelectItem>
                                <SelectItem value="lifestyle">Lifestyle</SelectItem>
                                <SelectItem value="gaming">Gaming</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardHeader>

            <CardContent>
                <Tabs defaultValue="topics" value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="mb-4">
                        <TabsTrigger value="topics">
                            <TrendingUp className="h-4 w-4 mr-2" /> Trending Topics
                        </TabsTrigger>
                        <TabsTrigger value="videos">
                            <List className="h-4 w-4 mr-2" /> Trending Videos
                        </TabsTrigger>
                        <TabsTrigger value="insights">
                            <BarChart2 className="h-4 w-4 mr-2" /> Insights
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="topics" className="space-y-4">
                        {isTopicsLoading ? (
                            <div className="space-y-4">
                                <div className="flex items-center justify-center p-8">
                                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                                </div>
                            </div>
                        ) : topicsError ? (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>
                                    Failed to load trending topics. Please try again.
                                </AlertDescription>
                            </Alert>
                        ) : (
                            <>
                                <div className="border rounded-md overflow-hidden">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-[200px]">Topic</TableHead>
                                                <TableHead>Growth</TableHead>
                                                <TableHead>Volume</TableHead>
                                                <TableHead>Competition</TableHead>
                                                <TableHead>Recommended Format</TableHead>
                                                <TableHead>Category</TableHead>
                                                <TableHead className="text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {trendingTopics.map((topic) => (
                                                <TableRow key={topic.topic}>
                                                    <TableCell className="font-medium">{topic.topic}</TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center">
                                                            <div className={`mr-2 ${topic.growthRate > 0 ? "text-green-600" : "text-red-600"}`}>
                                                                {topic.growthRate > 0 ? "+" : ""}{topic.growthRate}%
                                                            </div>
                                                            <div
                                                                className={`w-16 h-1.5 rounded-full ${topic.growthRate > 75 ? "bg-green-500" :
                                                                        topic.growthRate > 30 ? "bg-emerald-400" :
                                                                            topic.growthRate > 10 ? "bg-amber-500" :
                                                                                topic.growthRate > 0 ? "bg-orange-500" : "bg-red-500"
                                                                    }`}
                                                                style={{ width: `${Math.min(64, Math.abs(topic.growthRate) / 2)}px` }}
                                                            />
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center">
                                                            <div className="w-16 bg-gray-200 h-1.5 rounded-full">
                                                                <div
                                                                    className="h-1.5 rounded-full bg-blue-600"
                                                                    style={{ width: `${topic.volumeScore}%` }}
                                                                />
                                                            </div>
                                                            <span className="ml-2 text-xs">{topic.volumeScore}/100</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center">
                                                            <div className="w-16 bg-gray-200 h-1.5 rounded-full">
                                                                <div
                                                                    className={`h-1.5 rounded-full ${topic.competition > 75 ? "bg-red-500" :
                                                                            topic.competition > 50 ? "bg-orange-500" :
                                                                                topic.competition > 25 ? "bg-yellow-500" : "bg-green-500"
                                                                        }`}
                                                                    style={{ width: `${topic.competition}%` }}
                                                                />
                                                            </div>
                                                            <span className="ml-2 text-xs">{topic.competition}/100</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge
                                                            variant={
                                                                topic.recommendedFormat === "short" ? "destructive" :
                                                                    topic.recommendedFormat === "long" ? "secondary" : "default"
                                                            }
                                                        >
                                                            {topic.recommendedFormat === "short" ? "Short" :
                                                                topic.recommendedFormat === "long" ? "Long-form" : "Both"}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex flex-wrap gap-1">
                                                            {topic.category.slice(0, 2).map((cat, i) => (
                                                                <Badge key={i} variant="outline" className="text-xs capitalize">
                                                                    {cat}
                                                                </Badge>
                                                            ))}
                                                            {topic.category.length > 2 && (
                                                                <Badge variant="outline" className="text-xs">
                                                                    +{topic.category.length - 2}
                                                                </Badge>
                                                            )}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <div className="flex justify-end gap-2">
                                                            <Button size="sm" variant="outline">
                                                                <PlusCircle className="h-4 w-4 mr-1" /> Add to Ideas
                                                            </Button>
                                                            <Button size="sm" variant="ghost">
                                                                <Calendar className="h-4 w-4" />
                                                            </Button>
                                                            <Button size="sm" variant="ghost">
                                                                <Search className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>

                                <div className="p-4 bg-muted rounded-md">
                                    <div className="flex items-center gap-2">
                                        <Sparkles className="h-4 w-4 text-amber-500" />
                                        <span className="text-sm font-medium">Topic Insights</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-2">
                                        {category === "all" ? "Overall trends show" : `${category} category trends show`} a {trendingTopics[0]?.growthRate > 50 ? "significant" : "moderate"} growth
                                        in topics related to {trendingTopics[0]?.topic.split(' ')[0]} and {trendingTopics[1]?.topic.split(' ')[0]}.
                                        Consider creating {trendingTopics.filter(t => t.recommendedFormat === "short").length > trendingTopics.length / 2 ? "more short-form" : "a mix of short and long-form"} content.
                                    </p>
                                </div>
                            </>
                        )}
                    </TabsContent>

                    <TabsContent value="videos" className="space-y-4">
                        {isVideosLoading ? (
                            <div className="space-y-4">
                                {Array.from({ length: 3 }).map((_, i) => (
                                    <div key={i} className="border rounded-md p-4">
                                        <div className="flex gap-3">
                                            <Skeleton className="w-36 h-20" />
                                            <div className="space-y-2 flex-1">
                                                <Skeleton className="h-4 w-full" />
                                                <Skeleton className="h-4 w-2/3" />
                                                <div className="flex gap-2 mt-1">
                                                    <Skeleton className="h-4 w-12" />
                                                    <Skeleton className="h-4 w-12" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : videosError ? (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>
                                    Failed to load trending videos. Please try again.
                                </AlertDescription>
                            </Alert>
                        ) : (
                            <>
                                <div className="space-y-4">
                                    {trendingVideos.map((video) => (
                                        <div key={video.id} className="border rounded-md p-4 hover:bg-muted/50 transition-colors">
                                            <div className="flex flex-col sm:flex-row gap-4">
                                                <div className="sm:w-48 w-full">
                                                    <div className="aspect-video bg-muted rounded-md overflow-hidden relative">
                                                        <img
                                                            src={`https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`}
                                                            alt={video.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
                                                            {formatViewsCompact(video.views)} views
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-medium line-clamp-2">{video.title}</h3>
                                                    <div className="flex items-center mt-1 text-sm text-muted-foreground">
                                                        <span>{video.channel}</span>
                                                        <span className="mx-2">•</span>
                                                        <span>{formatDate(video.publishedAt)}</span>
                                                    </div>
                                                    <div className="mt-2 flex flex-wrap gap-2">
                                                        <Badge variant="secondary">
                                                            {video.engagement}% engagement
                                                        </Badge>
                                                        {video.tags.slice(0, 3).map((tag, i) => (
                                                            <Badge key={i} variant="outline" className="text-xs">
                                                                {tag}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                    <div className="mt-3 flex gap-2">
                                                        <Button size="sm" variant="outline">
                                                            <ExternalLink className="h-4 w-4 mr-2" /> Watch
                                                        </Button>
                                                        <Button size="sm" variant="outline">
                                                            <Save className="h-4 w-4 mr-2" /> Save Idea
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="p-4 bg-muted rounded-md">
                                    <div className="flex items-center gap-2">
                                        <Sparkles className="h-4 w-4 text-amber-500" />
                                        <span className="text-sm font-medium">Video Insights</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-2">
                                        Trending videos in {category === "all" ? "all categories" : `the ${category} category`} average {formatNumber(trendingVideos.reduce((sum, v) => sum + v.views, 0) / trendingVideos.length)} views
                                        with {(trendingVideos.reduce((sum, v) => sum + v.engagement, 0) / trendingVideos.length).toFixed(1)}% engagement.
                                        The most common tags include: {getMostCommonTags(trendingVideos).join(", ")}.
                                    </p>
                                </div>
                            </>
                        )}
                    </TabsContent>

                    <TabsContent value="insights" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-sm font-medium mb-3">Topic Growth Rate</h3>
                                <div className="h-72 bg-white p-4 rounded-md border">
                                    {isTopicsLoading ? (
                                        <div className="h-full flex items-center justify-center">
                                            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                                        </div>
                                    ) : (
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart
                                                data={trendingTopics?.slice(0, 6).map(t => ({
                                                    name: t.topic.length > 15 ? t.topic.substring(0, 15) + "..." : t.topic,
                                                    growth: t.growthRate
                                                }))}
                                                layout="vertical"
                                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                            >
                                                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                                <XAxis type="number" />
                                                <YAxis
                                                    dataKey="name"
                                                    type="category"
                                                    tick={{ fontSize: 12 }}
                                                    width={130}
                                                />
                                                <Tooltip formatter={(value: any) => [`${value}%`, 'Growth']} />
                                                <Bar dataKey="growth" fill="#4f46e5" radius={[0, 3, 3, 0]}>
                                                    {trendingTopics?.slice(0, 6).map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Bar>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    )}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium mb-3">Category Distribution</h3>
                                <div className="h-72 bg-white p-4 rounded-md border">
                                    {isTopicsLoading ? (
                                        <div className="h-full flex items-center justify-center">
                                            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                                        </div>
                                    ) : (
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart
                                                data={categoryChartData}
                                                layout="vertical"
                                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                            >
                                                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                                <XAxis type="number" />
                                                <YAxis
                                                    dataKey="name"
                                                    type="category"
                                                    tick={{ fontSize: 12 }}
                                                    width={90}
                                                />
                                                <Tooltip formatter={(value: any) => [`${value} topics`, 'Count']} />
                                                <Bar dataKey="value" fill="#8884d8" radius={[0, 3, 3, 0]}>
                                                    {categoryChartData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Bar>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 bg-card border rounded-md">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-sm font-medium">Top Format</h3>
                                        <p className="text-2xl font-bold mt-1">
                                            {isTopicsLoading ? (
                                                <Skeleton className="h-8 w-24" />
                                            ) : (
                                                getTopFormat(trendingTopics || [])
                                            )}
                                        </p>
                                    </div>
                                    <Badge variant="outline">
                                        {isTopicsLoading ? (
                                            <Skeleton className="h-4 w-16" />
                                        ) : (
                                            `${getFormatPercentage(trendingTopics || [])}%`
                                        )}
                                    </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground mt-2">
                                    {isTopicsLoading ? (
                                        <Skeleton className="h-3 w-full" />
                                    ) : (
                                        getTopFormat(trendingTopics || []) === "Short-form"
                                            ? "Shorts are trending. Consider creating more vertical content."
                                            : "Long-form content is performing well. Focus on quality tutorials and guides."
                                    )}
                                </p>
                            </div>

                            <div className="p-4 bg-card border rounded-md">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-sm font-medium">Avg Competition</h3>
                                        <p className="text-2xl font-bold mt-1">
                                            {isTopicsLoading ? (
                                                <Skeleton className="h-8 w-24" />
                                            ) : (
                                                `${getAverageCompetition(trendingTopics || [])}/100`
                                            )}
                                        </p>
                                    </div>
                                    <Badge
                                        variant={
                                            getAverageCompetition(trendingTopics || []) > 75 ? "destructive" :
                                                getAverageCompetition(trendingTopics || []) > 50 ? "secondary" : "default"
                                        }
                                    >
                                        {isTopicsLoading ? (
                                            <Skeleton className="h-4 w-16" />
                                        ) : (
                                            getCompetitionLevel(getAverageCompetition(trendingTopics || []))
                                        )}
                                    </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground mt-2">
                                    {isTopicsLoading ? (
                                        <Skeleton className="h-3 w-full" />
                                    ) : (
                                        getAverageCompetition(trendingTopics || []) > 70
                                            ? "High competition. Focus on unique angles and quality."
                                            : getAverageCompetition(trendingTopics || []) > 40
                                                ? "Moderate competition. Balance trending with unique value."
                                                : "Low competition. Great opportunity to establish authority."
                                    )}
                                </p>
                            </div>

                            <div className="p-4 bg-card border rounded-md">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-sm font-medium">Growth Potential</h3>
                                        <p className="text-2xl font-bold mt-1">
                                            {isTopicsLoading ? (
                                                <Skeleton className="h-8 w-24" />
                                            ) : (
                                                `${getAverageGrowthRate(trendingTopics || []).toFixed(1)}%`
                                            )}
                                        </p>
                                    </div>
                                    <Badge
                                        variant={
                                            getAverageGrowthRate(trendingTopics || []) > 40 ? "default" :
                                                getAverageGrowthRate(trendingTopics || []) > 15 ? "secondary" : "outline"
                                        }
                                    >
                                        {isTopicsLoading ? (
                                            <Skeleton className="h-4 w-16" />
                                        ) : (
                                            getGrowthLevel(getAverageGrowthRate(trendingTopics || []))
                                        )}
                                    </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground mt-2">
                                    {isTopicsLoading ? (
                                        <Skeleton className="h-3 w-full" />
                                    ) : (
                                        getAverageGrowthRate(trendingTopics || []) > 40
                                            ? "Explosive growth. Act quickly to capitalize on these trends."
                                            : getAverageGrowthRate(trendingTopics || []) > 15
                                                ? "Strong growth. Good opportunity for content creation."
                                                : "Stable growth. Monitor these topics for future potential."
                                    )}
                                </p>
                            </div>
                        </div>

                        <div className="p-4 bg-muted rounded-md">
                            <h3 className="text-sm font-medium mb-2">Strategic Recommendations</h3>
                            {isTopicsLoading ? (
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-4/5" />
                                </div>
                            ) : (
                                <ul className="text-sm space-y-2">
                                    <li>• Focus on {getTopFormat(trendingTopics || []) === "Short-form" ? "creating short-form content" : "developing in-depth long-form videos"} to align with current trends.</li>
                                    <li>• Target keywords with moderate competition (40-60 score) for the best balance of opportunity and reach.</li>
                                    <li>• Consider creating content around "{trendingTopics?.[0]?.topic}" which shows the highest growth potential.</li>
                                    <li>• Use tags like {getMostCommonTags(trendingVideos || []).slice(0, 3).map(tag => `"${tag}"`).join(", ")} to improve discoverability.</li>
                                    <li>• The {getCategoryWithHighestGrowth(trendingTopics || [])} category shows the strongest growth. Consider pivoting more content in this direction.</li>
                                </ul>
                            )}
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>

            <CardFooter className="border-t px-6 py-4">
                <p className="text-xs text-muted-foreground">
                    Data updated {formatDate(new Date().toISOString())}
                </p>
                <Button variant="outline" className="ml-auto">
                    Export Report <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
            </CardFooter>
        </Card>
    );
}

// Helper functions
function formatViewsCompact(views: number): string {
    if (views >= 1000000) {
        return (views / 1000000).toFixed(1) + 'M';
    } else if (views >= 1000) {
        return (views / 1000).toFixed(1) + 'K';
    } else {
        return views.toString();
    }
}

function formatNumber(num: number): string {
    return new Intl.NumberFormat().format(num);
}

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 1) {
        return 'Today';
    } else if (diffDays <= 2) {
        return 'Yesterday';
    } else if (diffDays <= 7) {
        return `${diffDays} days ago`;
    } else {
        return date.toLocaleDateString();
    }
}

function getMostCommonTags(videos: TrendingVideo[]): string[] {
    const tagCounts: Record<string, number> = {};

    videos.forEach(video => {
        video.tags.forEach(tag => {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
    });

    return Object.entries(tagCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([tag]) => tag);
}

function getTopFormat(topics: TrendingTopic[]): string {
    const formatCounts = topics.reduce((acc, topic) => {
        const format = topic.recommendedFormat === "both"
            ? ["short", "long"]
            : [topic.recommendedFormat];

        format.forEach(f => {
            acc[f] = (acc[f] || 0) + 1;
        });

        return acc;
    }, {} as Record<string, number>);

    return formatCounts.short > formatCounts.long ? "Short-form" : "Long-form";
}

function getFormatPercentage(topics: TrendingTopic[]): number {
    const formatCounts = topics.reduce((acc, topic) => {
        const format = topic.recommendedFormat === "both"
            ? ["short", "long"]
            : [topic.recommendedFormat];

        format.forEach(f => {
            acc[f] = (acc[f] || 0) + 1;
        });

        return acc;
    }, {} as Record<string, number>);

    const total = (formatCounts.short || 0) + (formatCounts.long || 0);

    if (formatCounts.short >= formatCounts.long) {
        return Math.round((formatCounts.short / total) * 100);
    } else {
        return Math.round((formatCounts.long / total) * 100);
    }
}

function getAverageCompetition(topics: TrendingTopic[]): number {
    if (!topics.length) return 0;
    const sum = topics.reduce((acc, topic) => acc + topic.competition, 0);
    return Math.round(sum / topics.length);
}

function getCompetitionLevel(score: number): string {
    if (score > 75) return "High";
    if (score > 50) return "Moderate";
    if (score > 25) return "Low";
    return "Very Low";
}

function getAverageGrowthRate(topics: TrendingTopic[]): number {
    if (!topics.length) return 0;
    const sum = topics.reduce((acc, topic) => acc + topic.growthRate, 0);
    return sum / topics.length;
}

function getGrowthLevel(growth: number): string {
    if (growth > 50) return "Explosive";
    if (growth > 30) return "High";
    if (growth > 10) return "Moderate";
    return "Stable";
}

function getCategoryWithHighestGrowth(topics: TrendingTopic[]): string {
    if (!topics.length) return "technology";

    const categoryGrowth: Record<string, { total: number; count: number }> = {};

    topics.forEach(topic => {
        topic.category.forEach(cat => {
            if (!categoryGrowth[cat]) {
                categoryGrowth[cat] = { total: 0, count: 0 };
            }
            categoryGrowth[cat].total += topic.growthRate;
            categoryGrowth[cat].count += 1;
        });
    });

    let highestAvg = 0;
    let highestCategory = "technology";

    Object.entries(categoryGrowth).forEach(([category, { total, count }]) => {
        const avg = total / count;
        if (avg > highestAvg) {
            highestAvg = avg;
            highestCategory = category;
        }
    });

    return highestCategory;
}

// Functions to generate mock data
function generateTrendingTopics(): TrendingTopic[] {
    const categories = ["technology", "business", "entertainment", "education", "lifestyle", "gaming"];
    const topics = [
        "AI Content Creation",
        "Passive Income Strategies",
        "YouTube SEO Hacks",
        "Short-form Storytelling",
        "Video Editing Automation",
        "Algorithm Exploits",
        "Viral Marketing Techniques",
        "Monetization Strategies",
        "Thumbnail Psychology",
        "Creator Burnout Prevention",
        "Multi-platform Growth",
        "Content Repurposing",
        "Community Building",
        "Channel Analytics Mastery",
        "Brand Deals & Sponsorships"
    ];

    const recommendedFormats: ("short" | "long" | "both")[] = ["short", "long", "both"];

    return faker.helpers.shuffle(topics).map(topic => {
        const randomCategories = faker.helpers.arrayElements(
            categories,
            faker.number.int({ min: 1, max: 3 })
        );

        return {
            topic,
            growthRate: faker.number.int({ min: -5, max: 120 }),
            volumeScore: faker.number.int({ min: 20, max: 95 }),
            competition: faker.number.int({ min: 15, max: 90 }),
            relevanceScore: faker.number.int({ min: 50, max: 100 }),
            recommendedFormat: faker.helpers.arrayElement(recommendedFormats),
            category: randomCategories
        };
    }).sort((a, b) => b.growthRate - a.growthRate);
}

function generateTrendingVideos(category: string = "all"): TrendingVideo[] {
    const videoTypes = ["How I", "Why", "The Ultimate Guide to", "10 Ways to", "I Tried", "Review:"];
    const topics = [
        "Growing on YouTube",
        "Content Creation Strategy",
        "Passive Income",
        "Video Editing",
        "Algorithm Hacks",
        "Channel Growth",
        "Monetization Strategies",
        "Viral Marketing",
        "Creator Economy",
        "Social Media Growth"
    ];

    const channels = [
        "CreatorInsights",
        "TechTutorialsHQ",
        "MarketingMasters",
        "ViralContentLab",
        "DigitalNomadLife",
        "TheStrategyGuru",
        "CreativeEcosystem",
        "GrowthHackersTV",
        "StartupSuccess",
        "BusinessBuildersHQ"
    ];

    const tags = [
        "youtube growth",
        "content creation",
        "passive income",
        "algorithm",
        "monetization",
        "viral",
        "marketing",
        "creator economy",
        "shorts",
        "strategy",
        "tutorial",
        "howto",
        "growth hacking"
    ];

    const result: TrendingVideo[] = [];

    for (let i = 0; i < 10; i++) {
        const publishedDate = faker.date.recent({ days: 30 });
        const videoType = faker.helpers.arrayElement(videoTypes);
        const videoTopic = faker.helpers.arrayElement(topics);

        let videoTags = faker.helpers.arrayElements(
            tags,
            faker.number.int({ min: 3, max: 6 })
        );

        if (category !== "all") {
            videoTags = [category, ...videoTags].slice(0, 5);
        }

        result.push({
            id: faker.string.alphanumeric(11),
            title: `${videoType} ${videoTopic} in 2025 (${faker.helpers.arrayElement(["Game Changer", "Mind Blowing", "Revolutionary", "Must Watch"])})`,
            channel: faker.helpers.arrayElement(channels),
            views: faker.number.int({ min: 10000, max: 5000000 }),
            publishedAt: publishedDate.toISOString(),
            engagement: parseFloat(faker.number.float({ min: 2, max: 12, precision: 0.1 }).toFixed(1)),
            tags: videoTags
        });
    }

    return result.sort((a, b) => b.views - a.views);
}
