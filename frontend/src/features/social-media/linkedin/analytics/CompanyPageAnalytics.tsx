// filepath: src\features\social-media\linkedin\analytics\CompanyPageAnalytics.tsx
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { useLinkedInAnalytics } from "./useLinkedInAnalytics"
import { ArrowUp, ArrowDown, Loader2, MousePointerClick, Users, Building, BarChart2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend
} from 'recharts'

export default function CompanyPageAnalytics() {
    const { data, isLoading, error } = useLinkedInAnalytics()

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        )
    }

    if (error) {
        return (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    Failed to load LinkedIn company page analytics. Please try again later.
                </AlertDescription>
            </Alert>
        )
    }

    const company = data?.company

    if (!company) {
        return null
    }

    // Format for growth indicator
    const formatGrowth = (value: number) => {
        const isPositive = value > 0
        return (
            <div className={`flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {isPositive ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
                <span>{Math.abs(value)}%</span>
            </div>
        )
    }

    const COLORS = ['#0077B5', '#0088CC', '#00A0DC', '#33B5E5', '#66C9EF']

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Company Page Performance</CardTitle>
                    <CardDescription>
                        Key metrics and insights for your LinkedIn company page
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Key metrics */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <p className="text-sm text-muted-foreground">Page Followers</p>
                                        <h3 className="font-bold text-2xl">{company.followers.toLocaleString()}</h3>
                                        <div className="text-sm">
                                            {formatGrowth(company.followerGrowth)} this month
                                        </div>
                                    </div>
                                    <div className="bg-blue-100 rounded-full p-2">
                                        <Users className="h-5 w-5 text-blue-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <p className="text-sm text-muted-foreground">Page Views</p>
                                        <h3 className="font-bold text-2xl">{company.pageViews.toLocaleString()}</h3>
                                        <div className="text-sm text-muted-foreground">
                                            {company.uniqueVisitors.toLocaleString()} unique visitors
                                        </div>
                                    </div>
                                    <div className="bg-purple-100 rounded-full p-2">
                                        <Building className="h-5 w-5 text-purple-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <p className="text-sm text-muted-foreground">Engagement Rate</p>
                                        <h3 className="font-bold text-2xl">{company.postEngagementRate.toFixed(2)}%</h3>
                                        <div className="text-sm text-muted-foreground">
                                            Avg. for company pages
                                        </div>
                                    </div>
                                    <div className="bg-green-100 rounded-full p-2">
                                        <BarChart2 className="h-5 w-5 text-green-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <p className="text-sm text-muted-foreground">CTA Clicks</p>
                                        <h3 className="font-bold text-2xl">{company.ctaClicks.toLocaleString()}</h3>
                                        <div className="text-sm text-muted-foreground">
                                            {company.clicksToWebsite.toLocaleString()} website clicks
                                        </div>
                                    </div>
                                    <div className="bg-amber-100 rounded-full p-2">
                                        <MousePointerClick className="h-5 w-5 text-amber-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Follower Growth chart */}
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Follower Growth</CardTitle>
                            <CardDescription>Monthly follower count over the past 6 months</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[250px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart
                                        data={company.followerGrowthHistory}
                                        margin={{
                                            top: 5,
                                            right: 30,
                                            left: 20,
                                            bottom: 5,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
                                        <XAxis
                                            dataKey="date"
                                            tickFormatter={(value) => {
                                                const date = new Date(value)
                                                return `${date.toLocaleString('default', { month: 'short' })}`
                                            }}
                                            tick={{ fontSize: 12 }}
                                        />
                                        <YAxis
                                            tick={{ fontSize: 12 }}
                                            domain={['dataMin - 200', 'dataMax + 200']}
                                        />
                                        <Tooltip
                                            formatter={(value) => [`${value} followers`, 'Followers']}
                                            labelFormatter={(label) => {
                                                const date = new Date(label)
                                                return date.toLocaleString('default', { month: 'long', year: 'numeric' })
                                            }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="followers"
                                            stroke="#0077B5"
                                            strokeWidth={2}
                                            activeDot={{ r: 8 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Follower Demographics */}
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Follower Demographics</CardTitle>
                            <CardDescription>Industries your followers work in</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[250px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={company.followerDemographics}
                                            dataKey="percentage"
                                            nameKey="category"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={80}
                                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                        >
                                            {company.followerDemographics.map((entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={COLORS[index % COLORS.length]}
                                                />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value) => `${value}%`} />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* CTA Summary */}
                    <Card className="bg-slate-50 border-blue-200">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Performance Summary</CardTitle>
                            <CardDescription>Key insights based on your page data</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3 text-sm">
                                <div className="p-3 bg-white rounded-md border">
                                    <p className="font-medium">Follower Growth Insight</p>
                                    <p className="text-muted-foreground">
                                        {company.followerGrowth > 5
                                            ? `Your follower growth of ${company.followerGrowth}% this month is strong. Continue posting engaging content to maintain this growth.`
                                            : `Your follower growth is ${company.followerGrowth}%, which is below the average of 6% for your industry. Consider boosting key posts to reach a wider audience.`
                                        }
                                    </p>
                                </div>

                                <div className="p-3 bg-white rounded-md border">
                                    <p className="font-medium">Engagement Recommendation</p>
                                    <p className="text-muted-foreground">
                                        {company.postEngagementRate > 4
                                            ? `Your engagement rate of ${company.postEngagementRate}% is above industry average. Your content strategy is working well.`
                                            : `Your engagement rate could be improved. Try asking questions in your posts and responding to comments to boost engagement.`
                                        }
                                    </p>
                                </div>

                                <div className="p-3 bg-white rounded-md border">
                                    <p className="font-medium">CTA Performance</p>
                                    <p className="text-muted-foreground">
                                        {company.ctaClicks > 100
                                            ? `Your CTA buttons are getting good traction with ${company.ctaClicks} clicks. Continue using clear call-to-actions.`
                                            : `Consider updating your CTA buttons or their placement to improve the current ${company.ctaClicks} clicks.`
                                        }
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>
        </div>
    )
}
