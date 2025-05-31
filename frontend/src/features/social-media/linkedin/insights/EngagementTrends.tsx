// filepath: src\features\social-media\linkedin\insights\EngagementTrends.tsx
import { useState } from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLinkedInInsights } from './useLinkedInInsights'
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts'
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle, BarChart as BarChartIcon, LineChart as LineChartIcon } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export default function EngagementTrends() {
    const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d')
    const [chartType, setChartType] = useState<'line' | 'bar'>('line')
    const { data, isLoading, error } = useLinkedInInsights(timeRange)

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
                        Failed to load LinkedIn engagement trends. Please try again later.
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

        if (chartType === 'line') {
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
                            formatter={(value, name) => {
                                if (name === 'reactions') return [value, 'Reactions']
                                if (name === 'comments') return [value, 'Comments']
                                if (name === 'impressions') return [value, 'Impressions']
                                return [value, name]
                            }}
                            labelFormatter={(label) => {
                                const date = new Date(label)
                                return date.toLocaleDateString()
                            }}
                        />
                        <Legend />
                        <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="reactions"
                            stroke="#0077B5" // LinkedIn blue
                            activeDot={{ r: 8 }}
                            name="Reactions"
                        />
                        <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="comments"
                            stroke="#00A0DC" // LinkedIn light blue
                            name="Comments"
                        />
                        <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="impressions"
                            stroke="#313335" // LinkedIn dark gray
                            name="Impressions"
                        />
                    </LineChart>
                </ResponsiveContainer>
            )
        } else {
            return (
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
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
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip
                            formatter={(value, name) => {
                                if (name === 'reactions') return [value, 'Reactions']
                                if (name === 'comments') return [value, 'Comments']
                                if (name === 'impressions') return [value, 'Impressions']
                                return [value, name]
                            }}
                            labelFormatter={(label) => {
                                const date = new Date(label)
                                return date.toLocaleDateString()
                            }}
                        />
                        <Legend />
                        <Bar dataKey="reactions" fill="#0077B5" name="Reactions" />
                        <Bar dataKey="comments" fill="#00A0DC" name="Comments" />
                        <Bar dataKey="impressions" fill="#313335" name="Impressions" />
                    </BarChart>
                </ResponsiveContainer>
            )
        }
    }

    return (
        <Card>
            <CardHeader className="pb-2">
                <div className="flex justify-between items-center flex-col sm:flex-row">
                    <div>
                        <CardTitle>Engagement Trends</CardTitle>
                        <CardDescription>
                            Track reactions, comments, and impressions over time
                        </CardDescription>
                    </div>
                    <ToggleGroup type="single" value={chartType} onValueChange={(value) => value && setChartType(value as 'line' | 'bar')} className="my-2">
                        <ToggleGroupItem value="line" aria-label="Toggle line chart">
                            <LineChartIcon className="h-4 w-4" />
                        </ToggleGroupItem>
                        <ToggleGroupItem value="bar" aria-label="Toggle bar chart">
                            <BarChartIcon className="h-4 w-4" />
                        </ToggleGroupItem>
                    </ToggleGroup>
                </div>
            </CardHeader>
            <CardContent>
                <Tabs
                    value={timeRange}
                    onValueChange={(value) => setTimeRange(value as '7d' | '30d' | '90d')}
                >
                    <TabsList className="mb-4">
                        <TabsTrigger value="7d">Last 7 days</TabsTrigger>
                        <TabsTrigger value="30d">30 days</TabsTrigger>
                        <TabsTrigger value="90d">90 days</TabsTrigger>
                    </TabsList>
                    <TabsContent value={timeRange} forceMount>
                        {renderContent()}
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    )
}
