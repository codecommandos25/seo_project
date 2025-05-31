// filepath: src\features\social-media\youtube\index.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent
} from "@/components/ui/card";
import {
    Clapperboard,
    BarChart2,
    LineChart,
    Calendar,
    Users,
    DollarSign
} from "lucide-react";

import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'


import VideoList from "./videos/VideoList";
import { YouTubeVideo } from "./videos/useYouTubeVideos";
import VideoPerformance from "./insights/VideoPerformance";
import ChannelInsights from "./insights/ChannelInsights";
import ContentPlanner from "./strategy/ContentPlanner";
import TrendingTopics from "./strategy/TrendingTopics";
import AudienceAnalytics from "./analytics/AudienceAnalytics";
import RevenueAnalytics from "./analytics/RevenueAnalytics";

export default function YouTubeAnalytics() {
    const [activeTab, setActiveTab] = useState<string>("videos");
    const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);

    const handleVideoSelect = (video: YouTubeVideo) => {
        setSelectedVideo(video);
        setActiveTab("insights");
    };

    return (

        <>
            <Header>
                <div className="flex flex-1 items-center space-x-4">
                    <Search />
                    <ThemeSwitch />
                    <ProfileDropdown />
                </div>
            </Header>

            <Main className="space-y-6 p-6">

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">YouTube Analytics</h1>
                        <p className="text-muted-foreground">
                            Monitor performance, optimize content, and grow your YouTube channel
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline">
                            <Calendar className="mr-2 h-4 w-4" />
                            Last 30 Days
                        </Button>
                        <Button variant="default">
                            Connect Channel
                        </Button>
                    </div>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList>
                        <TabsTrigger value="videos" className="flex items-center">
                            <Clapperboard className="mr-2 h-4 w-4" />
                            <span>Videos</span>
                        </TabsTrigger>
                        <TabsTrigger value="insights" className="flex items-center">
                            <BarChart2 className="mr-2 h-4 w-4" />
                            <span>Insights</span>
                        </TabsTrigger>
                        <TabsTrigger value="strategy" className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4" />
                            <span>Strategy</span>
                        </TabsTrigger>
                        <TabsTrigger value="analytics" className="flex items-center">
                            <LineChart className="mr-2 h-4 w-4" />
                            <span>Analytics</span>
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="videos" className="space-y-6">
                        <VideoList onVideoSelect={handleVideoSelect} />
                    </TabsContent>

                    <TabsContent value="insights" className="space-y-6">
                        <div className="grid grid-cols-1 gap-6">
                            {selectedVideo ? (
                                <VideoPerformance videoId={selectedVideo.id} />
                            ) : (
                                <ChannelInsights />
                            )}
                        </div>
                    </TabsContent>

                    <TabsContent value="strategy" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <ContentPlanner />
                            <TrendingTopics />
                        </div>
                    </TabsContent>

                    <TabsContent value="analytics" className="space-y-6">
                        <div className="flex flex-col space-y-6">
                            {/* Analytics Menu */}
                            <Card className="w-full">
                                <CardContent className="p-4">
                                    <div className="flex flex-wrap gap-4">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => document.getElementById('audience')?.scrollIntoView({ behavior: 'smooth' })}
                                            className="flex items-center"
                                        >
                                            <Users className="mr-2 h-4 w-4" />
                                            Audience
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => document.getElementById('revenue')?.scrollIntoView({ behavior: 'smooth' })}
                                            className="flex items-center"
                                        >
                                            <DollarSign className="mr-2 h-4 w-4" />
                                            Revenue
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Audience Analytics */}
                            <div id="audience">
                                <AudienceAnalytics />
                            </div>

                            {/* Revenue Analytics */}
                            <div id="revenue" className="pt-4">
                                <RevenueAnalytics />
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>


            </Main>
        </>
        // <div className="container mx-auto px-4 py-6 space-y-6">
        //     <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        //         <div>
        //             <h1 className="text-3xl font-bold tracking-tight">YouTube Analytics</h1>
        //             <p className="text-muted-foreground">
        //                 Monitor performance, optimize content, and grow your YouTube channel
        //             </p>
        //         </div>
        //         <div className="flex gap-2">
        //             <Button variant="outline">
        //                 <Calendar className="mr-2 h-4 w-4" />
        //                 Last 30 Days
        //             </Button>
        //             <Button variant="default">
        //                 Connect Channel
        //             </Button>
        //         </div>
        //     </div>

        //     <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        //         <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full mb-6">
        //             <TabsTrigger value="videos" className="flex items-center">
        //                 <Clapperboard className="mr-2 h-4 w-4" />
        //                 <span>Videos</span>
        //             </TabsTrigger>
        //             <TabsTrigger value="insights" className="flex items-center">
        //                 <BarChart2 className="mr-2 h-4 w-4" />
        //                 <span>Insights</span>
        //             </TabsTrigger>
        //             <TabsTrigger value="strategy" className="flex items-center">
        //                 <Calendar className="mr-2 h-4 w-4" />
        //                 <span>Strategy</span>
        //             </TabsTrigger>
        //             <TabsTrigger value="analytics" className="flex items-center">
        //                 <LineChart className="mr-2 h-4 w-4" />
        //                 <span>Analytics</span>
        //             </TabsTrigger>
        //         </TabsList>

        //         <TabsContent value="videos" className="space-y-6">
        //             <VideoList onVideoSelect={handleVideoSelect} />
        //         </TabsContent>

        //         <TabsContent value="insights" className="space-y-6">
        //             <div className="grid grid-cols-1 gap-6">
        //                 {selectedVideo ? (
        //                     <VideoPerformance videoId={selectedVideo.id} />
        //                 ) : (
        //                     <ChannelInsights />
        //                 )}
        //             </div>
        //         </TabsContent>

        //         <TabsContent value="strategy" className="space-y-6">
        //             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        //                 <ContentPlanner />
        //                 <TrendingTopics />
        //             </div>
        //         </TabsContent>

        //         <TabsContent value="analytics" className="space-y-6">
        //             <div className="flex flex-col space-y-6">
        //                 {/* Analytics Menu */}
        //                 <Card className="w-full">
        //                     <CardContent className="p-4">
        //                         <div className="flex flex-wrap gap-4">
        //                             <Button
        //                                 variant="outline"
        //                                 size="sm"
        //                                 onClick={() => document.getElementById('audience')?.scrollIntoView({ behavior: 'smooth' })}
        //                                 className="flex items-center"
        //                             >
        //                                 <Users className="mr-2 h-4 w-4" />
        //                                 Audience
        //                             </Button>
        //                             <Button
        //                                 variant="outline"
        //                                 size="sm"
        //                                 onClick={() => document.getElementById('revenue')?.scrollIntoView({ behavior: 'smooth' })}
        //                                 className="flex items-center"
        //                             >
        //                                 <DollarSign className="mr-2 h-4 w-4" />
        //                                 Revenue
        //                             </Button>
        //                         </div>
        //                     </CardContent>
        //                 </Card>

        //                 {/* Audience Analytics */}
        //                 <div id="audience">
        //                     <AudienceAnalytics />
        //                 </div>

        //                 {/* Revenue Analytics */}
        //                 <div id="revenue" className="pt-4">
        //                     <RevenueAnalytics />
        //                 </div>
        //             </div>
        //         </TabsContent>
        //     </Tabs>
        // </div>
    );
}
