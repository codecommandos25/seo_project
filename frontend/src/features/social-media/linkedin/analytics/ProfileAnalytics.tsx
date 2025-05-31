// filepath: src\features\social-media\linkedin\analytics\ProfileAnalytics.tsx
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { useLinkedInAnalytics } from "./useLinkedInAnalytics"
import { ArrowUp, ArrowDown, Loader2, Search, Eye, Users, BarChart2 } from "lucide-react"
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
    BarChart,
    Bar,
    Cell,
    PieChart,
    Pie,
    Legend
} from 'recharts'
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function ProfileAnalytics() {
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
                    Failed to load LinkedIn profile analytics. Please try again later.
                </AlertDescription>
            </Alert>
        )
    }

    const personal = data?.personal

    if (!personal) {
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
                    <CardTitle>Profile Performance</CardTitle>
                    <CardDescription>
                        Key metrics and insights for your LinkedIn personal profile
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Key metrics */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <p className="text-sm text-muted-foreground">Followers</p>
                                        <h3 className="font-bold text-2xl">{personal.followers.toLocaleString()}</h3>
                                        <div className="text-sm">
                                            {formatGrowth(personal.monthlyGrowth.toFixed(2))} this month
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
                                        <p className="text-sm text-muted-foreground">Profile Views</p>
                                        <h3 className="font-bold text-2xl">{personal.profileViews.toLocaleString()}</h3>
                                        <div className="text-sm text-muted-foreground">
                                            Last 30 days
                                        </div>
                                    </div>
                                    <div className="bg-purple-100 rounded-full p-2">
                                        <Eye className="h-5 w-5 text-purple-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <p className="text-sm text-muted-foreground">Search Appearances</p>
                                        <h3 className="font-bold text-2xl">{personal.searchAppearances.toLocaleString()}</h3>
                                        <div className="text-sm text-muted-foreground">
                                            Last 30 days
                                        </div>
                                    </div>
                                    <div className="bg-green-100 rounded-full p-2">
                                        <Search className="h-5 w-5 text-green-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <p className="text-sm text-muted-foreground">Post Impressions</p>
                                        <h3 className="font-bold text-2xl">{personal.postImpressions.toLocaleString()}</h3>
                                        <div className="text-sm text-muted-foreground">
                                            Last 30 days
                                        </div>
                                    </div>
                                    <div className="bg-amber-100 rounded-full p-2">
                                        <BarChart2 className="h-5 w-5 text-amber-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Profile views chart */}
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Profile Views Trend</CardTitle>
                            <CardDescription>Daily views over the past 30 days</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[250px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart
                                        data={personal.dailyProfileViews}
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
                                                return `${date.getMonth() + 1}/${date.getDate()}`
                                            }}
                                            tick={{ fontSize: 12 }}
                                        />
                                        <YAxis tick={{ fontSize: 12 }} />
                                        <Tooltip
                                            formatter={(value) => [`${value} views`, 'Views']}
                                            labelFormatter={(label) => {
                                                const date = new Date(label)
                                                return date.toLocaleDateString()
                                            }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="count"
                                            stroke="#0077B5"
                                            activeDot={{ r: 8 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Companies and Skills */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Who's viewing your profile */}
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg">Who's Viewing Your Profile</CardTitle>
                                <CardDescription>Top companies that viewed your profile</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[220px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={personal.viewsByCompany}
                                                dataKey="percentage"
                                                nameKey="name"
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={80}
                                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                            >
                                                {personal.viewsByCompany.map((entry, index) => (
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

                        {/* Skills & Endorsements */}
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg">Top Skills & Endorsements</CardTitle>
                                <CardDescription>Based on your profile endorsements</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {personal.skillEndorsements.map((skill, index) => (
                                        <div key={index} className="space-y-1">
                                            <div className="flex justify-between">
                                                <span className="text-sm font-medium">{skill.skill}</span>
                                                <Badge variant="outline" className="text-xs">
                                                    {skill.count} endorsements
                                                </Badge>
                                            </div>
                                            <Progress
                                                value={(skill.count / Math.max(...personal.skillEndorsements.map(s => s.count))) * 100}
                                                className="h-2"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
