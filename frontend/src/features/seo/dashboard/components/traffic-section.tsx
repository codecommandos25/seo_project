import * as React from "react"
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useSEOGraph } from "@/service/seo"

export const description = "An interactive bar chart"

const chartData = [
    { date: "2025-01-01", organic: 222, paid: 150 },
    { date: "2025-02-02", organic: 97, paid: 180 },
    { date: "2025-03-03", organic: 167, paid: 120 },
    { date: "2025-04-04", organic: 242, paid: 260 },
    { date: "2025-05-05", organic: 373, paid: 290 },
    { date: "2025-06-06", organic: 301, paid: 340 },
    { date: "2025-07-07", organic: 245, paid: 180 },
    { date: "2025-08-08", organic: 409, paid: 320 },
    { date: "2025-09-09", organic: 59, paid: 110 },
    { date: "2025-10-10", organic: 261, paid: 190 },
    { date: "2025-11-11", organic: 327, paid: 350 },
    { date: "2025-12-12", organic: 292, paid: 210 },
    // { date: "2025-04-13", organic: 342, paid: 380 },
    // { date: "2025-04-14", organic: 137, paid: 220 },
    // { date: "2025-04-15", organic: 120, paid: 170 },
    // { date: "2025-04-16", organic: 138, paid: 190 },
    // { date: "2025-04-17", organic: 446, paid: 360 },
    // { date: "2025-04-18", organic: 364, paid: 410 },
    // { date: "2025-04-19", organic: 243, paid: 180 },
    // { date: "2025-04-20", organic: 89, paid: 150 },
    // { date: "2025-04-21", organic: 137, paid: 200 },
    // { date: "2025-04-22", organic: 224, paid: 170 },
    // { date: "2025-04-23", organic: 138, paid: 230 },
    // { date: "2025-04-24", organic: 387, paid: 290 },
    // { date: "2025-04-25", organic: 215, paid: 250 },
    // { date: "2025-04-26", organic: 75, paid: 130 },
    // { date: "2025-04-27", organic: 383, paid: 420 },
    // { date: "2025-04-28", organic: 122, paid: 180 },
    // { date: "2025-04-29", organic: 315, paid: 240 },
    // { date: "2025-04-30", organic: 454, paid: 380 },
    // { date: "2025-05-01", organic: 292, paid: 210 },
    // { date: "2025-05-02", organic: 342, paid: 380 },
    // { date: "2025-05-03", organic: 137, paid: 220 },
    // { date: "2025-05-04", organic: 120, paid: 170 },
    // { date: "2025-05-05", organic: 138, paid: 190 },
    // { date: "2025-05-06", organic: 446, paid: 360 },
    // { date: "2025-05-07", organic: 364, paid: 410 },
]

const chartConfig = {
    views: {
        label: "Count",
    },
    organic: {
        label: "Organic",
        color: "hsl(var(--chart-1))",
    },
    paid: {
        label: "Paid",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

const chartDataNew = [
  {
    year: 2025,
    month: 5,
    // etv: 14659.099714577198,
    count: 2661
  },
  {
    year: 2025,
    month: 4,
    // etv: 13506.201113395393,
    count: 3526
  }
];

export function TrafficSection() {
    const [graphData,setGraphData]=React.useState<any>()
    const [chartData, setChartData] = React.useState([]);
    const [activeChart, setActiveChart] =
        React.useState<keyof typeof chartConfig>("organic")
    const [timeRange, setTimeRange] = React.useState<"1y" | "6m">("6m")
    const {mutate}=useSEOGraph({
        onSuccess(data:any, variables, context) {
        console.log("graph data",data.data)
        setGraphData(data.data)
    },})

    const filteredData: any[] = React.useMemo(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1; // Months are 1-12 in your data

    return chartData.filter((data: any) => {
        if (timeRange === "1y") {
            // Filter for last 12 months
            if (data.year === currentYear) {
                return data.month >= currentMonth - 11 || currentMonth <= 11;
            } else if (data.year === currentYear - 1) {
                return data.month >= currentMonth + 1;
            }
            return false;
        } else if (timeRange === "6m") {
            // Filter for last 6 months
            if (data.year === currentYear) {
                return data.month >= currentMonth - 5 || currentMonth <= 5;
            } else if (data.year === currentYear - 1) {
                return data.month >= currentMonth + 7;
            }
            return false;
        }
        return true; // Return all data if no timeRange specified
    });
}, [timeRange, chartData]);

    // const filteredData:any[] = React.useMemo(() => {
    //     const now = new Date()
    //     let cutoffDate: Date

    //     if (timeRange === "1y") {
    //         cutoffDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())
    //     } else  {
    //         cutoffDate = new Date(now.getFullYear(), Math.abs(now.getMonth() - 6), now.getDate())
    //     } 
    //     console.log("time",cutoffDate.getMonth())
    //     return chartData.filter((data:any) => data.month >= cutoffDate.getMonth())
    // }, [timeRange,chartData])

    const total = React.useMemo(
        () => ({
            organic: filteredData.reduce((acc, curr:any) => acc + curr.organic, 0),
            paid: filteredData.reduce((acc, curr:any) => acc + curr.paid, 0),
        }),
        [filteredData]
    )

    React.useEffect(()=>{
        mutate([
    {
        targets: [
            "dataforseo.com"
        ],
        location_code: 2840,
        language_code: "en",
        item_types: [
            "organic",
            "paid"
        ],
        date_from: "2022-01-01",
        date_to: "2022-05-01"
    }
])
    },[])

    React.useEffect(() => {
    if(graphData){
        // Combine the data
    const combinedData = graphData?.tasks[0].result[0].items[0].metrics.organic.map((organicItem:any) => {
      // Find matching paid item
      const paidItem = graphData?.tasks[0].result[0].items[0].metrics.paid.find(
        (item:any) => item.year === organicItem.year && item.month === organicItem.month
      );

      return {
        month: organicItem.month,
        year: organicItem.year,
        organic: organicItem.count,
        paid: paidItem ? paidItem.count : 0,
        organicETV: organicItem.etv,
        paidETV: paidItem ? paidItem.etv : 0
      };
    })
    

    setChartData(combinedData);
  }}, [graphData]);

    console.log("graph organic",graphData?.tasks[0].result[0].items[0].metrics.organic)
    console.log("graph paid",graphData?.tasks[0].result[0].items[0].metrics.paid)
  console.log("graph combine",chartData)
  console.log("graph filter",filteredData)
  console.log("graph total",total)
    return (
        <Card>
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                    <CardTitle>
                        Website Traffic
                    </CardTitle>
                    <CardDescription>
                        Showing total visitors for the selected time range
                    </CardDescription>
                </div>
                <div className="flex">
                    {["organic", "paid"].map((key) => {
                        const chart = key as keyof typeof chartConfig
                        return (
                            <button
                                key={chart}
                                data-active={activeChart === chart}
                                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                                onClick={() => setActiveChart(chart)}
                            >
                                <span className="text-xs text-muted-foreground">
                                    {chartConfig[chart].label}
                                </span>
                                <span className="text-lg font-bold leading-none sm:text-3xl">
                                    {/* {total.organic.toLocaleString()} */}
                                    {total[key as keyof typeof total].toLocaleString()}
                                </span>
                            </button>
                        )
                    })}
                </div>
            </CardHeader>
            <div className="flex justify-end px-6 py-4">
                <Select value={timeRange} onValueChange={(value) => setTimeRange(value as "1y" | "6m" )}>
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select Time Range" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1y">Last 1 Year</SelectItem>
                        <SelectItem value="6m">Last 6 Months</SelectItem>
                        {/* <SelectItem value="30d">Last 30 Days</SelectItem> */}
                    </SelectContent>
                </Select>
            </div>
            {filteredData && (
                <CardContent className="px-2 sm:p-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <BarChart
                        accessibilityLayer
                        data={filteredData}
                        // data={graphData?.tasks[0].result[0].items[0].metrics.organic}
                        // data={graphData?.tasks[0].result[0].items[0].metrics.organic}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >

                      
                        <CartesianGrid vertical={false} />
                        {/* <XAxis
      dataKey="month"
      tickLine={false}
      tickMargin={10}
      axisLine={false}
      tickFormatter={(value, index) => {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                           "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const year = chartDataNew[index].year;
        return `${monthNames[value - 1]} ${year}`;
      }}
    /> */}
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                           tickFormatter={(value, index) => {
                            // console.log("val",value)
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                           "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        // const year = filteredData[index].year;
        return `${monthNames[value-1]} `;
      }}
                        />
                        {/* <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    className="w-[150px]"
                                    nameKey="views"
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("en-US", {
                                            month: "numeric",
                                            // day: "numeric",
                                            // year: "numeric",
                                        })
                                    }}
                                />
                            }
                        /> */}

                        <Tooltip 
              formatter={(value) => [`${value}`, "Count"]}
              labelFormatter={(label) => `Month: ${label}`}
            />
            <ChartLegend content={<ChartLegendContent />} />

                          <YAxis 
      dataKey={`${activeChart}`}
      tickLine={false}
      axisLine={false}
    />
    
                        <Bar dataKey={`${activeChart}`} fill={`${activeChart=="organic"?chartConfig.organic.color:chartConfig.paid.color}`} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            )}
            
        </Card>
    )
}
