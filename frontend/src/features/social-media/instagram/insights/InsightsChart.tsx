import { useState } from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useInstagramInsights } from './useInstagramInsights'
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts'
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function InsightsChart() {
    const [timeRange, setTimeRange] = useState<'7d' | '30d' | 'all'>('7d')
    const { data, isLoading, error } = useInstagramInsights(timeRange)

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="w-full h-[300px] flex items-center justify-center">
                    <Skeleton className="h-[300px] w-full" />
                </div>
            )
        }

        if (error) {
            return (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        Failed to load Instagram insights. Please try again later.
                    </AlertDescription>
                </Alert>
            )
        }

        if (!data?.length) {
            return (
                <div className="w-full h-[300px] flex items-center justify-center text-muted-foreground">
                    No data available for the selected time range.
                </div>
            )
        }

        return (
            <ResponsiveContainer width="100%" height={300}>
                <LineChart
                    data={data}
                    margin={{
                        top: 5,
                        right: 20,
                        left: 20,
                        bottom: 5
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
                    <XAxis
                        dataKey="date"
                        tick={{ fontSize: 12 }}
                        tickFormatter={(value) => {
                            const date = new Date(value)
                            return `${date.getMonth() + 1}/${date.getDate()}`
                        }}
                    />
                    <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
                    <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
                    <Tooltip
                        formatter={(value, name) => [value, name === 'likes' ? 'Likes' : 'Comments']}
                        labelFormatter={(label) => {
                            const date = new Date(label)
                            return date.toLocaleDateString()
                        }}
                    />
                    <Legend />
                    <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="likes"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                        name="Likes"
                    />
                    <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="comments"
                        stroke="#82ca9d"
                        name="Comments"
                    />
                </LineChart>
            </ResponsiveContainer>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Engagement Insights</CardTitle>
                <CardDescription>
                    Analyze likes and comments metrics for your Instagram content
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs
                    value={timeRange}
                    onValueChange={(value) => setTimeRange(value as '7d' | '30d' | 'all')}
                >
                    <TabsList className="mb-4">
                        <TabsTrigger value="7d">Last 7 days</TabsTrigger>
                        <TabsTrigger value="30d">30 days</TabsTrigger>
                        <TabsTrigger value="all">All time</TabsTrigger>
                    </TabsList>
                    <TabsContent value={timeRange} forceMount>
                        {renderContent()}
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    )
}
