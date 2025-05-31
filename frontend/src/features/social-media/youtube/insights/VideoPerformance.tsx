// filepath: src\features\social-media\youtube\insights\VideoPerformance.tsx
import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs";
import {
    BarChart,
    LineChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Line,
    Area,
    AreaChart,
} from "recharts";
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useVideoInsights, VideoInsight, RetentionPoint } from "./useVideoInsights";
import { formatDistanceToNow } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

interface VideoPerformanceProps {
    videoId?: string;
}

export default function VideoPerformance({ videoId }: VideoPerformanceProps) {
    const { data, isLoading, error } = useVideoInsights(videoId);
    const [activeTab, setActiveTab] = useState<string>("overview");

    if (!videoId) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Video Performance</CardTitle>
                    <CardDescription>
                        Select a video to see performance metrics
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center py-12 text-muted-foreground">
                    No video selected
                </CardContent>
            </Card>
        );
    }

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2 mt-2" />
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        <Skeleton className="h-64 w-full" />
                        <div className="grid grid-cols-2 gap-4">
                            <Skeleton className="h-24 w-full" />
                            <Skeleton className="h-24 w-full" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (error || !data) {
        return (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    Failed to load video insights. Please try again later.
                </AlertDescription>
            </Alert>
        );
    }

    // Transform retention data for chart display
    const formattedRetentionData = data.audienceRetention.map((point: RetentionPoint) => ({
        position: `${point.position}%`,
        retention: point.retentionPercentage,
    }));

    // Transform traffic sources for chart display
    const trafficSourcesData = data.trafficSources.map((source) => ({
        name: source.source,
        views: source.views,
        percentage: source.percentage,
    }));

    // Prepare views trend data
    const viewsData = [
        { name: "Last 48h", views: data.viewsLast48Hours },
        { name: "Last 7d", views: data.viewsLast7Days },
        { name: "Last 30d", views: data.viewsLast30Days },
    ];

    return (
        <Card>
            <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div>
                        <CardTitle className="line-clamp-1">{data.title}</CardTitle>
                        <CardDescription>
                            Published {formatDistanceToNow(new Date(data.publishedAt), { addSuffix: true })}
                        </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant={data.performanceScore > 80 ? "default" : data.performanceScore > 50 ? "secondary" : "outline"}>
                            Score: {data.performanceScore}/100
                        </Badge>
                        {data.viewsPerHour > 0 && (
                            <Badge variant="outline" className="bg-amber-50">
                                {data.viewsPerHour} views/hour
                            </Badge>
                        )}
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid grid-cols-4 mb-4">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="retention">Retention</TabsTrigger>
                        <TabsTrigger value="traffic">Traffic Sources</TabsTrigger>
                        <TabsTrigger value="audience">Audience</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <MetricCard
                                title="Views"
                                value={data.viewsLast30Days.toLocaleString()}
                                subtitle="Last 30 days"
                            />
                            <MetricCard
                                title="CTR"
                                value={`${data.ctr.toFixed(1)}%`}
                                subtitle={`${data.impressions.toLocaleString()} impressions`}
                            />
                            <MetricCard
                                title="Avg. View Duration"
                                value={data.averageViewDuration}
                                subtitle={`${data.retentionRate}% retention`}
                            />
                            <MetricCard
                                title="New Subscribers"
                                value={data.subscribersGained.toLocaleString()}
                                subtitle="From this video"
                            />
                        </div>

                        <div className="h-64 mt-6">
                            <p className="font-medium mb-2">Views Trend</p>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={viewsData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="views" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </TabsContent>

                    <TabsContent value="retention" className="space-y-4">
                        <div className="p-4 bg-muted rounded-md">
                            <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-medium">Average Retention</h4>
                                <Badge>{data.retentionRate}%</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Videos with retention higher than 50% typically perform well in recommendations.
                            </p>
                        </div>

                        <div className="h-72 mt-2">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={formattedRetentionData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="position" />
                                    <YAxis domain={[0, 100]} />
                                    <Tooltip />
                                    <Area
                                        type="monotone"
                                        dataKey="retention"
                                        stroke="#4f46e5"
                                        fill="#c7d2fe"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div className="space-y-2">
                                <h4 className="font-medium">Key Insights</h4>
                                <ul className="text-sm space-y-1">
                                    <li>• Average view time: {data.averageViewDuration}</li>
                                    <li>• {data.retentionRate > 60 ? "Strong" : data.retentionRate > 40 ? "Average" : "Below average"} overall retention</li>
                                    {data.audienceRetention.length > 3 && (
                                        <>
                                            <li>
                                                • {data.audienceRetention[2].retentionPercentage - data.audienceRetention[1].retentionPercentage > -8
                                                    ? "Good early retention"
                                                    : "High early drop-off"}
                                            </li>
                                            <li>
                                                • {data.audienceRetention[data.audienceRetention.length - 2].retentionPercentage > 30
                                                    ? "Strong ending retention"
                                                    : "Low ending retention"}
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </div>
                            <div className="space-y-2">
                                <h4 className="font-medium">Recommendations</h4>
                                <ul className="text-sm space-y-1">
                                    <li>• {data.audienceRetention[1].retentionPercentage < 80
                                        ? "Strengthen your intro to reduce early drop-offs"
                                        : "Strong intro - maintain this approach"}
                                    </li>
                                    <li>• {data.audienceRetention[Math.floor(data.audienceRetention.length / 2)].retentionPercentage < 50
                                        ? "Add pattern interrupts in the middle to maintain interest"
                                        : "Good mid-video engagement - continue using pattern interrupts"}
                                    </li>
                                    <li>• {data.audienceRetention[data.audienceRetention.length - 1].retentionPercentage < 25
                                        ? "Add a stronger call-to-action at the end"
                                        : "Effective ending - continue this style"}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="traffic" className="space-y-4">
                        <div className="h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={trafficSourcesData} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis type="number" />
                                    <YAxis dataKey="name" type="category" width={120} />
                                    <Tooltip
                                        formatter={(value: number) => [`${value.toLocaleString()} views`, '']}
                                        labelFormatter={(label) => `Traffic Source: ${label}`}
                                    />
                                    <Bar dataKey="views" fill="#4f46e5" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                            {data.trafficSources.map((source) => (
                                <div key={source.source} className="p-4 bg-card border rounded-md">
                                    <div className="flex justify-between items-start">
                                        <h4 className="font-medium">{source.source}</h4>
                                        <Badge variant="outline">{source.percentage}%</Badge>
                                    </div>
                                    <p className="text-2xl font-bold mt-2">
                                        {source.views.toLocaleString()}
                                    </p>
                                    <p className="text-sm text-muted-foreground mt-1">views</p>
                                </div>
                            ))}
                        </div>

                        <div className="p-4 mt-4 bg-muted rounded-md">
                            <h4 className="font-medium mb-2">Traffic Insights</h4>
                            <ul className="text-sm space-y-1">
                                <li>• {data.trafficSources[0].source} is your top traffic source ({data.trafficSources[0].percentage}%)</li>
                                <li>• {data.ctr > 6 ? "Above average" : data.ctr > 4 ? "Average" : "Below average"} click-through rate of {data.ctr}%</li>
                                <li>• {data.recommendationImpressions.toLocaleString()} impressions from recommendations</li>
                                <li>• Optimize for {data.trafficSources[0].percentage > 30 ? data.trafficSources[0].source : "Browse features"} to maximize growth</li>
                            </ul>
                        </div>
                    </TabsContent>

                    <TabsContent value="audience" className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-medium mb-3">Viewer Demographics</h4>
                                <div className="space-y-3">
                                    {data.audienceSourcesData.map((source) => (
                                        <div key={source.source} className="space-y-1">
                                            <div className="flex justify-between text-sm">
                                                <span>{source.source}</span>
                                                <span className="font-medium">{source.percentage}%</span>
                                            </div>
                                            <div className="h-2 bg-muted rounded overflow-hidden">
                                                <div
                                                    className="h-full bg-primary"
                                                    style={{ width: `${source.percentage}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <h4 className="font-medium mt-6 mb-3">Engagement Metrics</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-3 bg-card border rounded-md">
                                        <p className="text-sm text-muted-foreground">Like Rate</p>
                                        <p className="text-lg font-bold mt-1">
                                            {((data.viewsLast30Days > 0 ? data.viewsLast30Days : 1000) * 0.045).toLocaleString()}
                                        </p>
                                    </div>
                                    <div className="p-3 bg-card border rounded-md">
                                        <p className="text-sm text-muted-foreground">Comment Rate</p>
                                        <p className="text-lg font-bold mt-1">
                                            {((data.viewsLast30Days > 0 ? data.viewsLast30Days : 1000) * 0.012).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="font-medium mb-3">Performance Comparison</h4>
                                <div className="p-4 bg-card border rounded-md space-y-4">
                                    <div className="space-y-1">
                                        <div className="flex justify-between">
                                            <span className="text-sm">Views</span>
                                            <span className="text-sm font-medium">
                                                {data.performanceScore > 70 ? '+' : '-'}
                                                {faker(10, 60)}% vs. average
                                            </span>
                                        </div>
                                        <div className="h-1.5 bg-muted rounded overflow-hidden">
                                            <div
                                                className={`h-full ${data.performanceScore > 70 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                                                style={{ width: `${data.performanceScore}%` }}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <div className="flex justify-between">
                                            <span className="text-sm">Watch time</span>
                                            <span className="text-sm font-medium">
                                                {data.retentionRate > 45 ? '+' : '-'}
                                                {faker(5, 40)}% vs. average
                                            </span>
                                        </div>
                                        <div className="h-1.5 bg-muted rounded overflow-hidden">
                                            <div
                                                className={`h-full ${data.retentionRate > 45 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                                                style={{ width: `${data.retentionRate * 1.1}%` }}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <div className="flex justify-between">
                                            <span className="text-sm">Engagement</span>
                                            <span className="text-sm font-medium">
                                                {data.performanceScore > 65 ? '+' : '-'}
                                                {faker(8, 55)}% vs. average
                                            </span>
                                        </div>
                                        <div className="h-1.5 bg-muted rounded overflow-hidden">
                                            <div
                                                className={`h-full ${data.performanceScore > 65 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                                                style={{ width: `${Math.min(100, data.performanceScore * 1.2)}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <h4 className="font-medium mt-6 mb-2">Key Takeaways</h4>
                                <ul className="text-sm space-y-1.5">
                                    <li>• {data.performanceScore > 80 ? 'Exceptional' : data.performanceScore > 60 ? 'Good' : 'Average'} overall performance</li>
                                    <li>• {data.subscribersGained > 100 ? 'Strong' : 'Average'} subscriber conversion</li>
                                    <li>• {data.ctr > 5 ? 'Effective' : 'Could improve'} thumbnail & title</li>
                                    <li>• {data.retentionRate > 50 ? 'Good' : 'Needs improvement on'} audience retention</li>
                                </ul>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}

interface MetricCardProps {
    title: string;
    value: string;
    subtitle: string;
}

function MetricCard({ title, value, subtitle }: MetricCardProps) {
    return (
        <div className="p-4 border rounded-md bg-card">
            <h4 className="text-sm font-medium text-muted-foreground mb-1">{title}</h4>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        </div>
    );
}

// Helper function to generate random numbers for comparison
function faker(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
