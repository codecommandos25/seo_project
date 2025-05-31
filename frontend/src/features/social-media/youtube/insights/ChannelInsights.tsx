// filepath: src\features\social-media\youtube\insights\ChannelInsights.tsx
import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
    TrendingUp,
    TrendingDown,
    AlertCircle,
    Users,
    Eye,
    Clock,
    BarChart2
} from "lucide-react";
import { useChannelInsights, CountryData, DemographicData, TopicData } from "./useChannelInsights";
import { formatDistanceToNow } from "date-fns";

export default function ChannelInsights() {
    const { data, isLoading, error } = useChannelInsights();
    const [activeTab, setActiveTab] = useState("overview");

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <Skeleton className="h-8 w-64" />
                    <Skeleton className="h-4 w-48 mt-1" />
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <Skeleton key={i} className="h-24 w-full" />
                        ))}
                    </div>
                    <Skeleton className="h-72 w-full mt-6" />
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
                    Failed to load channel insights. Please try again later.
                </AlertDescription>
            </Alert>
        );
    }

    // Prepare most recent data points for growth calculation
    const recentSubscribers = data.subscriberGrowth.slice(-2);
    const subscriberGrowthRate =
        recentSubscribers.length === 2
            ? ((recentSubscribers[1].value - recentSubscribers[0].value) / recentSubscribers[0].value) * 100
            : 0;

    const recentViews = data.viewsGrowth.slice(-2);
    const viewsGrowthRate =
        recentViews.length === 2
            ? ((recentViews[1].value - recentViews[0].value) / recentViews[0].value) * 100
            : 0;

    // Demographic colors for charts
    const COLORS = ['#4f46e5', '#7c3aed', '#0ea5e9', '#14b8a6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef'];
    const TOPIC_COLORS = ['#4f46e5', '#6366f1', '#8b5cf6', '#d946ef', '#ec4899', '#f43f5e'];

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Channel Insights</CardTitle>
                <CardDescription>
                    Analyze performance and growth metrics for your channel
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatsCard
                        title="Subscribers"
                        value={formatNumber(data.subscriberCount)}
                        icon={<Users className="h-4 w-4" />}
                        trend={subscriberGrowthRate}
                        subtitle={`${Math.abs(subscriberGrowthRate).toFixed(1)}% ${subscriberGrowthRate >= 0 ? 'increase' : 'decrease'}`}
                    />
                    <StatsCard
                        title="Total Views"
                        value={formatNumber(data.totalViews)}
                        icon={<Eye className="h-4 w-4" />}
                        trend={viewsGrowthRate}
                        subtitle={`${Math.abs(viewsGrowthRate).toFixed(1)}% ${viewsGrowthRate >= 0 ? 'increase' : 'decrease'}`}
                    />
                    <StatsCard
                        title="Watch Time"
                        value={`${formatNumber(data.watchTimeHours)} hrs`}
                        icon={<Clock className="h-4 w-4" />}
                        trend={undefined}
                        subtitle={`${data.totalVideos} videos`}
                    />
                    <StatsCard
                        title="Channel Health"
                        value={`${data.channelHealthScore}/100`}
                        icon={<BarChart2 className="h-4 w-4" />}
                        trend={undefined}
                        subtitle={getHealthLabel(data.channelHealthScore)}
                        scoreColor={getScoreColor(data.channelHealthScore)}
                    />
                </div>

                <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid grid-cols-5 mb-4">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="growth">Growth</TabsTrigger>
                        <TabsTrigger value="audience">Audience</TabsTrigger>
                        <TabsTrigger value="content">Content</TabsTrigger>
                        <TabsTrigger value="actions">Actions</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-6">
                        <div className="h-72">
                            <h3 className="font-medium mb-3">Subscriber Growth</h3>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={data.subscriberGrowth}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="date"
                                        tick={{ fontSize: 12 }}
                                        tickFormatter={(value) => {
                                            const date = new Date(value);
                                            return `${date.getDate()}/${date.getMonth() + 1}`;
                                        }}
                                    />
                                    <YAxis
                                        tick={{ fontSize: 12 }}
                                        tickFormatter={(value) => formatShortNumber(value)}
                                    />
                                    <Tooltip
                                        formatter={(value: number) => [formatNumber(value), 'Subscribers']}
                                        labelFormatter={(label) => new Date(label).toLocaleDateString()}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        name="Subscribers"
                                        stroke="#4f46e5"
                                        strokeWidth={2}
                                        dot={false}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-medium mb-3">Top Performing Videos</h3>
                                <div className="space-y-3">
                                    {data.topPerformingVideos.slice(0, 3).map((video) => (
                                        <div key={video.id} className="flex gap-3 items-start">
                                            <div className="relative w-24 h-14 shrink-0">
                                                <img
                                                    src={video.thumbnailUrl}
                                                    alt={video.title}
                                                    className="w-full h-full object-cover rounded-md"
                                                />
                                                {video.type === 'short' && (
                                                    <Badge className="absolute top-1 left-1 text-xs" variant="destructive">
                                                        SHORT
                                                    </Badge>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium line-clamp-2">{video.title}</p>
                                                <div className="flex justify-between mt-1">
                                                    <span className="text-xs text-muted-foreground">
                                                        {formatShortNumber(video.viewCount)} views
                                                    </span>
                                                    <Badge variant="outline" className="text-xs">
                                                        {video.performanceScore}/100
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <p className="text-xs text-muted-foreground text-center mt-2">
                                        Showing top 3 of {data.topPerformingVideos.length} videos
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-medium mb-3">Audience Demographics</h3>
                                <div className="h-64">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={data.audienceDemographics.slice(0, 5)}
                                                dataKey="percentage"
                                                nameKey="ageRange"
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={80}
                                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                            >
                                                {data.audienceDemographics.slice(0, 5).map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip
                                                formatter={(value: number) => [`${value}%`, 'Percentage']}
                                            />
                                            <Legend />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="growth" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <h3 className="font-medium">Views Growth</h3>
                                <p className="text-sm text-muted-foreground mb-2">
                                    Daily views over the last 30 days
                                </p>
                                <div className="h-64">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={data.viewsGrowth}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis
                                                dataKey="date"
                                                tick={{ fontSize: 12 }}
                                                tickFormatter={(value) => {
                                                    const date = new Date(value);
                                                    return `${date.getDate()}/${date.getMonth() + 1}`;
                                                }}
                                            />
                                            <YAxis
                                                tick={{ fontSize: 12 }}
                                                tickFormatter={(value) => formatShortNumber(value)}
                                            />
                                            <Tooltip
                                                formatter={(value: number) => [formatNumber(value), 'Views']}
                                                labelFormatter={(label) => new Date(label).toLocaleDateString()}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="value"
                                                name="Views"
                                                stroke="#0ea5e9"
                                                strokeWidth={2}
                                                dot={false}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <h3 className="font-medium">Impressions & CTR</h3>
                                <p className="text-sm text-muted-foreground mb-2">
                                    Impression volume and click-through rate
                                </p>
                                <div className="h-64">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={data.impressionsGrowth}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis
                                                dataKey="date"
                                                tick={{ fontSize: 12 }}
                                                tickFormatter={(value) => {
                                                    const date = new Date(value);
                                                    return `${date.getDate()}/${date.getMonth() + 1}`;
                                                }}
                                            />
                                            <YAxis
                                                yAxisId="left"
                                                tick={{ fontSize: 12 }}
                                                tickFormatter={(value) => formatShortNumber(value)}
                                            />
                                            <YAxis
                                                yAxisId="right"
                                                orientation="right"
                                                domain={[0, 10]}
                                                tickFormatter={(value) => `${value}%`}
                                            />
                                            <Tooltip
                                                formatter={(value: number, name: string) => [
                                                    name === "Impressions" ? formatNumber(value) : `${value}%`,
                                                    name
                                                ]}
                                                labelFormatter={(label) => new Date(label).toLocaleDateString()}
                                            />
                                            <Line
                                                yAxisId="left"
                                                type="monotone"
                                                dataKey="value"
                                                name="Impressions"
                                                stroke="#6366f1"
                                                strokeWidth={2}
                                                dot={false}
                                            />
                                            <Line
                                                yAxisId="right"
                                                type="monotone"
                                                dataKey="value"
                                                data={data.ctrTrend}
                                                name="CTR"
                                                stroke="#f43f5e"
                                                strokeWidth={2}
                                                dot={false}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-muted rounded-md">
                            <h3 className="font-medium mb-2">Growth Insights</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <p className="text-sm">Subscriber Growth Rate</p>
                                    <div className="flex items-center gap-2">
                                        <Progress
                                            value={Math.min(100, Math.max(0, subscriberGrowthRate * 10 + 50))}
                                            className="h-2"
                                        />
                                        <span className="text-sm font-medium">
                                            {subscriberGrowthRate > 0 ? '+' : ''}{subscriberGrowthRate.toFixed(1)}%
                                        </span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm">Average View Duration</p>
                                    <div className="flex items-center gap-2">
                                        <Progress
                                            value={parseInt(data.averageViewDuration.split(':')[0]) / 10 * 100}
                                            className="h-2"
                                        />
                                        <span className="text-sm font-medium">
                                            {data.averageViewDuration}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="audience" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-medium mb-3">Age & Gender</h3>
                                <div className="h-72">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart
                                            data={data.audienceDemographics.map(item => ({
                                                name: item.ageRange,
                                                Male: item.percentage * (item.malePercentage / 100),
                                                Female: item.percentage * (item.femalePercentage / 100),
                                                Other: item.percentage * (item.otherPercentage / 100)
                                            }))}
                                            layout="vertical"
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis type="number" tick={{ fontSize: 12 }} />
                                            <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={40} />
                                            <Tooltip
                                                formatter={(value: number) => [`${value.toFixed(1)}%`, '']}
                                            />
                                            <Legend />
                                            <Bar dataKey="Male" stackId="a" fill="#4f46e5" />
                                            <Bar dataKey="Female" stackId="a" fill="#8b5cf6" />
                                            <Bar dataKey="Other" stackId="a" fill="#d946ef" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-medium mb-3">Top Countries</h3>
                                <div className="h-72">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart
                                            data={data.audienceCountries.slice(0, 6)}
                                            layout="vertical"
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis type="number" tick={{ fontSize: 12 }} />
                                            <YAxis
                                                dataKey="country"
                                                type="category"
                                                tick={{ fontSize: 12 }}
                                                width={100}
                                            />
                                            <Tooltip
                                                formatter={(value: number, name: string, props: any) => {
                                                    const country = data.audienceCountries.find(c => c.country === props.payload.country);
                                                    return [`${value}% (${formatNumber(country?.viewsCount || 0)} views)`, 'Audience'];
                                                }}
                                            />
                                            <Bar
                                                dataKey="percentage"
                                                fill="#6366f1"
                                                radius={[0, 4, 4, 0]}
                                            >
                                                {data.audienceCountries.slice(0, 6).map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-card border rounded-md">
                                <h3 className="font-medium mb-2">Audience Acquisition</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm">Subscribers from videos</span>
                                        <span className="text-sm font-medium">68%</span>
                                    </div>
                                    <Progress value={68} className="h-2" />

                                    <div className="flex justify-between items-center">
                                        <span className="text-sm">Subscribers from channel page</span>
                                        <span className="text-sm font-medium">21%</span>
                                    </div>
                                    <Progress value={21} className="h-2" />

                                    <div className="flex justify-between items-center">
                                        <span className="text-sm">Subscribers from external sources</span>
                                        <span className="text-sm font-medium">11%</span>
                                    </div>
                                    <Progress value={11} className="h-2" />
                                </div>
                            </div>

                            <div className="p-4 bg-card border rounded-md">
                                <h3 className="font-medium mb-2">Audience Behavior</h3>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex gap-2">
                                        <span className="text-muted-foreground">• Peak viewing hours:</span>
                                        <span className="font-medium">18:00 - 22:00 UTC</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-muted-foreground">• Most active days:</span>
                                        <span className="font-medium">Weekends, Wednesday</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-muted-foreground">• Subscriber watch %:</span>
                                        <span className="font-medium">32% of total views</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-muted-foreground">• Notification click rate:</span>
                                        <span className="font-medium">5.8%</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="content" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-medium mb-3">Most Engaging Topics</h3>
                                <div className="h-72">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart
                                            data={data.mostEngagingTopics}
                                            layout="vertical"
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis
                                                type="number"
                                                domain={[0, 100]}
                                                tick={{ fontSize: 12 }}
                                            />
                                            <YAxis
                                                dataKey="topic"
                                                type="category"
                                                tick={{ fontSize: 12 }}
                                                width={100}
                                            />
                                            <Tooltip
                                                formatter={(value: number) => [`${value}/100`, 'Engagement Score']}
                                            />
                                            <Bar
                                                dataKey="engagementScore"
                                                name="Engagement Score"
                                                radius={[0, 4, 4, 0]}
                                            >
                                                {data.mostEngagingTopics.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={TOPIC_COLORS[index % TOPIC_COLORS.length]} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-medium mb-3">Content Performance</h3>
                                <div className="space-y-4">
                                    <div className="p-4 bg-card border rounded-md space-y-3">
                                        <div className="flex justify-between items-center">
                                            <h4 className="text-sm font-medium">Shorts vs Long-form</h4>
                                            <Badge variant="outline">Views ratio</Badge>
                                        </div>
                                        <div className="h-8 bg-muted rounded-full overflow-hidden flex">
                                            <div
                                                className="bg-red-500 flex items-center justify-center text-xs text-white font-medium"
                                                style={{ width: '62%' }}
                                            >
                                                Shorts 62%
                                            </div>
                                            <div
                                                className="bg-blue-500 flex items-center justify-center text-xs text-white font-medium"
                                                style={{ width: '38%' }}
                                            >
                                                Long-form 38%
                                            </div>
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            Shorts receive more views but long-form content has higher watch time
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-3 bg-card border rounded-md">
                                            <p className="text-sm text-muted-foreground">Total Videos</p>
                                            <p className="text-lg font-bold mt-1">{data.totalVideos}</p>
                                            <div className="flex items-center gap-1 mt-1">
                                                <Badge variant="outline" className="text-xs">
                                                    {Math.round(data.totalVideos * 0.35)} Shorts
                                                </Badge>
                                                <Badge variant="outline" className="text-xs">
                                                    {Math.round(data.totalVideos * 0.65)} Long-form
                                                </Badge>
                                            </div>
                                        </div>

                                        <div className="p-3 bg-card border rounded-md">
                                            <p className="text-sm text-muted-foreground">Avg. Performance</p>
                                            <div className="flex items-center gap-1 mt-1">
                                                <p className="text-lg font-bold">{data.channelHealthScore}</p>
                                                <p className="text-xs text-muted-foreground">/100</p>
                                            </div>
                                            <Badge
                                                variant={data.channelHealthScore > 75 ? "default" :
                                                    data.channelHealthScore > 60 ? "secondary" : "outline"}
                                                className="mt-1 text-xs"
                                            >
                                                {getHealthLabel(data.channelHealthScore)}
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-card border rounded-md">
                                        <h4 className="text-sm font-medium mb-2">Content Insights</h4>
                                        <ul className="text-xs space-y-1">
                                            <li>• Optimal video length: 8-12 minutes</li>
                                            <li>• Best posting days: Wednesday, Saturday</li>
                                            <li>• Tutorial content performs 2.3x better than other formats</li>
                                            <li>• End screen CTR: 4.8%</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="actions" className="space-y-6">
                        <h3 className="font-medium mb-2">Recommended Actions</h3>
                        <div className="space-y-4">
                            {data.recommendedActions.map((action) => (
                                <div key={action.id} className="p-4 bg-card border rounded-md">
                                    <div className="flex justify-between items-start">
                                        <h4 className="font-medium">{action.title}</h4>
                                        <Badge
                                            variant={
                                                action.impact === 'high' ? "default" :
                                                    action.impact === 'medium' ? "secondary" : "outline"
                                            }
                                        >
                                            {action.impact} impact
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-2">
                                        {action.description}
                                    </p>
                                    <div className="mt-2 flex items-center">
                                        <Badge variant="outline" className="mr-1">
                                            {action.category}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-4 bg-muted rounded-md mt-6">
                            <h4 className="font-medium mb-2">Channel Health Summary</h4>
                            <div className="space-y-2">
                                <div className="space-y-1">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm">Overall Health</span>
                                        <span className="text-sm font-medium">{data.channelHealthScore}%</span>
                                    </div>
                                    <Progress
                                        value={data.channelHealthScore}
                                        className="h-2"
                                    />
                                </div>
                                <p className="text-sm text-muted-foreground mt-2">
                                    Your channel health score is {data.channelHealthScore > 75 ? "good" : data.channelHealthScore > 60 ? "average" : "below average"}.
                                    Implementing the recommended actions could improve your score by 10-15%.
                                </p>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}

interface StatsCardProps {
    title: string;
    value: string;
    icon?: React.ReactNode;
    trend?: number;
    subtitle: string;
    scoreColor?: string;
}

function StatsCard({ title, value, icon, trend, subtitle, scoreColor }: StatsCardProps) {
    return (
        <div className="p-4 border rounded-md bg-card">
            <div className="flex justify-between items-start">
                <h4 className="text-sm font-medium text-muted-foreground">{title}</h4>
                {icon && <div className="text-muted-foreground">{icon}</div>}
            </div>
            <p
                className="text-2xl font-bold mt-2"
                style={scoreColor ? { color: scoreColor } : undefined}
            >
                {value}
            </p>
            <div className="flex items-center gap-1 mt-1">
                {trend !== undefined && (
                    <>
                        {trend >= 0 ? (
                            <TrendingUp className="h-3 w-3 text-green-500" />
                        ) : (
                            <TrendingDown className="h-3 w-3 text-red-500" />
                        )}
                    </>
                )}
                <p className="text-xs text-muted-foreground">{subtitle}</p>
            </div>
        </div>
    );
}

// Helper functions
const formatNumber = (num: number): string => {
    return new Intl.NumberFormat().format(num);
};

const formatShortNumber = (num: number): string => {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    } else {
        return num.toString();
    }
};

const getHealthLabel = (score: number): string => {
    if (score > 80) return 'Excellent';
    if (score > 70) return 'Very Good';
    if (score > 60) return 'Good';
    if (score > 50) return 'Average';
    return 'Needs Improvement';
};

const getScoreColor = (score: number): string => {
    if (score > 80) return '#10b981'; // green
    if (score > 70) return '#22c55e'; // green-light
    if (score > 60) return '#facc15'; // yellow
    if (score > 50) return '#f59e0b'; // amber
    return '#ef4444'; // red
};
