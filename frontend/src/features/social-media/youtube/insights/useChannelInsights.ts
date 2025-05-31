// filepath: src\features\social-media\youtube\insights\useChannelInsights.ts
import { useQuery } from '@tanstack/react-query'
import { faker } from '@faker-js/faker'

export interface ChannelInsights {
    subscriberCount: number;
    totalViews: number;
    totalVideos: number;
    watchTimeHours: number;
    averageViewDuration: string; // formatted as MM:SS
    topPerformingVideos: TopPerformingVideo[];
    subscriberGrowth: DataPoint[];
    viewsGrowth: DataPoint[];
    impressionsGrowth: DataPoint[];
    ctrTrend: DataPoint[];
    audienceDemographics: DemographicData[];
    audienceCountries: CountryData[];
    channelHealthScore: number; // 0-100
    mostEngagingTopics: TopicData[];
    recommendedActions: RecommendedAction[];
}

export interface TopPerformingVideo {
    id: string;
    title: string;
    thumbnailUrl: string;
    viewCount: number;
    type: 'short' | 'long';
    performanceScore: number;
    publishedAt: string;
}

export interface DataPoint {
    date: string;
    value: number;
}

export interface DemographicData {
    ageRange: string;
    percentage: number;
    malePercentage: number;
    femalePercentage: number;
    otherPercentage: number;
}

export interface CountryData {
    country: string;
    percentage: number;
    viewsCount: number;
}

export interface TopicData {
    topic: string;
    engagementScore: number;
    viewsPercentage: number;
}

export interface RecommendedAction {
    id: string;
    title: string;
    description: string;
    impact: 'high' | 'medium' | 'low';
    category: 'content' | 'seo' | 'engagement' | 'monetization';
}

// Function to generate daily data points for the last 30 days
const generateDailyDataPoints = (
    min: number,
    max: number,
    trend: 'up' | 'down' | 'stable' = 'up',
    days: number = 30
): DataPoint[] => {
    const points: DataPoint[] = [];
    let lastValue = faker.number.int({ min, max });
    const today = new Date();

    for (let i = days; i >= 0; i--) {
        const date = new Date();
        date.setDate(today.getDate() - i);

        // Determine change direction and amount based on trend
        let changePercentage: number;

        if (trend === 'up') {
            // Upward trend with some variation
            changePercentage = faker.number.float({ min: -2, max: 5, precision: 0.1 });
        } else if (trend === 'down') {
            // Downward trend with some variation
            changePercentage = faker.number.float({ min: -5, max: 2, precision: 0.1 });
        } else {
            // Stable with minor fluctuations
            changePercentage = faker.number.float({ min: -2, max: 2, precision: 0.1 });
        }

        // Calculate new value with the change
        const change = lastValue * (changePercentage / 100);
        lastValue = Math.max(min, lastValue + change);

        points.push({
            date: date.toISOString().split('T')[0],
            value: Math.round(lastValue)
        });
    }

    return points;
};

// Generate mock top performing videos
const generateTopPerformingVideos = (count: number): TopPerformingVideo[] => {
    return Array.from({ length: count }, () => {
        const type = faker.helpers.arrayElement(['short', 'long']) as 'short' | 'long';
        const publishedDate = faker.date.recent({ days: 60 });

        return {
            id: faker.string.alphanumeric(11),
            title: generateVideoTitle(type),
            thumbnailUrl: faker.image.urlLoremFlickr({
                category: type === 'short' ? 'people' : 'technology',
                width: 1280,
                height: 720
            }),
            viewCount: faker.number.int({
                min: type === 'short' ? 5000 : 1000,
                max: type === 'short' ? 500000 : 100000
            }),
            type,
            performanceScore: faker.number.int({ min: 60, max: 98 }),
            publishedAt: publishedDate.toISOString()
        };
    }).sort((a, b) => b.performanceScore - a.performanceScore);
};

// Helper function to generate realistic YouTube titles
const generateVideoTitle = (type: 'short' | 'long'): string => {
    const titleTemplates = {
        short: [
            "I can't believe this happened! 😱",
            "You won't believe what I found 🔥",
            "This trick changed everything 🚀",
            "Watch this before it's too late 🔴",
            "How to {verb} in under 60 seconds",
            "{number} ways to {verb} your {noun}",
            "POV: When you {verb} but {situation}",
            "The REAL way to {verb} 🤯",
            "No one is talking about this {topic} trick"
        ],
        long: [
            "How I {verb} My {noun} in {number} Days (Complete Guide)",
            "The Ultimate Guide to {topic} in 2025",
            "{number} Things Nobody Tells You About {topic}",
            "I Tried {topic} For 30 Days - Here's What Happened",
            "{topic} Masterclass | From Beginner to Pro",
            "How to {verb} Like a Pro (Step-by-Step Tutorial)",
            "The Truth About {topic} That No One Tells You",
            "We Need to Talk About {topic}...",
            "{topic} Review: Is It Really Worth It in 2025?"
        ]
    };

    const templates = type === 'short' ? titleTemplates.short : titleTemplates.long;
    let template = faker.helpers.arrayElement(templates);

    // Replace placeholders
    if (template.includes('{verb}')) {
        template = template.replace('{verb}', faker.helpers.arrayElement([
            'master', 'optimize', 'improve', 'grow', 'build', 'learn', 'create', 'transform', 'boost'
        ]));
    }

    if (template.includes('{noun}')) {
        template = template.replace('{noun}', faker.helpers.arrayElement([
            'channel', 'business', 'skills', 'workflow', 'productivity', 'content', 'portfolio', 'strategy'
        ]));
    }

    if (template.includes('{topic}')) {
        template = template.replace('{topic}', faker.helpers.arrayElement([
            'YouTube Growth', 'Content Creation', 'Digital Marketing', 'SEO', 'Social Media Strategy',
            'Video Editing', 'Passive Income', 'Monetization', 'Algorithm Hacks'
        ]));
    }

    if (template.includes('{number}')) {
        template = template.replace('{number}', faker.helpers.arrayElement([
            '3', '5', '7', '10', '12'
        ]));
    }

    if (template.includes('{situation}')) {
        template = template.replace('{situation}', faker.helpers.arrayElement([
            'it fails', 'nobody cares', 'everyone laughs', 'it actually works', 'you\'re doing it wrong'
        ]));
    }

    return template;
};

// Generate demographic data
const generateDemographicData = (): DemographicData[] => {
    // Age ranges with realistic distribution
    const ageRanges = ['13-17', '18-24', '25-34', '35-44', '45-54', '55-64', '65+'];
    const demographics: DemographicData[] = [];

    // Generate baseline percentages that sum to 100
    let remainingPercentage = 100;
    for (let i = 0; i < ageRanges.length - 1; i++) {
        // For tech/marketing content, 18-34 typically dominates
        let percentage: number;

        if (ageRanges[i] === '18-24' || ageRanges[i] === '25-34') {
            percentage = faker.number.int({ min: 15, max: 30 });
        } else if (ageRanges[i] === '13-17') {
            percentage = faker.number.int({ min: 5, max: 12 });
        } else {
            percentage = faker.number.int({ min: 5, max: 15 });
        }

        percentage = Math.min(percentage, remainingPercentage - (ageRanges.length - i - 1));
        remainingPercentage -= percentage;

        // Gender distribution (varies by age range)
        let malePercentage: number;
        if (ageRanges[i] === '18-24' || ageRanges[i] === '25-34') {
            malePercentage = faker.number.int({ min: 55, max: 75 });
        } else {
            malePercentage = faker.number.int({ min: 45, max: 65 });
        }

        demographics.push({
            ageRange: ageRanges[i],
            percentage,
            malePercentage,
            femalePercentage: 100 - malePercentage - faker.number.int({ min: 0, max: 2 }),
            otherPercentage: faker.number.int({ min: 0, max: 2 })
        });
    }

    // Last age range gets the remaining percentage
    demographics.push({
        ageRange: ageRanges[ageRanges.length - 1],
        percentage: remainingPercentage,
        malePercentage: faker.number.int({ min: 40, max: 60 }),
        femalePercentage: faker.number.int({ min: 38, max: 58 }),
        otherPercentage: faker.number.int({ min: 0, max: 2 })
    });

    return demographics.sort((a, b) => b.percentage - a.percentage);
};

// Generate country data
const generateCountryData = (): CountryData[] => {
    const countries = ['United States', 'India', 'United Kingdom', 'Canada', 'Australia',
        'Germany', 'Brazil', 'Philippines', 'Nigeria', 'Other'];
    const totalViews = faker.number.int({ min: 500000, max: 5000000 });
    const countryData: CountryData[] = [];

    // Assign percentages that sum to 100%
    let remainingPercentage = 100;
    for (let i = 0; i < countries.length - 1; i++) {
        // Realistic country distribution with US and India dominating
        let percentage: number;
        if (countries[i] === 'United States') {
            percentage = faker.number.int({ min: 20, max: 35 });
        } else if (countries[i] === 'India') {
            percentage = faker.number.int({ min: 15, max: 30 });
        } else if (countries[i] === 'United Kingdom' || countries[i] === 'Canada') {
            percentage = faker.number.int({ min: 5, max: 15 });
        } else {
            percentage = faker.number.int({ min: 2, max: 8 });
        }

        percentage = Math.min(percentage, remainingPercentage - (countries.length - i - 1));
        remainingPercentage -= percentage;

        countryData.push({
            country: countries[i],
            percentage,
            viewsCount: Math.floor((percentage / 100) * totalViews)
        });
    }

    // "Other" category gets the remaining percentage
    countryData.push({
        country: 'Other',
        percentage: remainingPercentage,
        viewsCount: Math.floor((remainingPercentage / 100) * totalViews)
    });

    return countryData.sort((a, b) => b.percentage - a.percentage);
};

// Generate topic data
const generateTopicData = (): TopicData[] => {
    const topics = [
        'Tutorial', 'Review', 'How-to', 'Explanation', 'News', 'Comparison',
        'Case Study', 'Behind the Scenes', 'Q&A', 'Tips & Tricks'
    ];

    return faker.helpers.shuffle(topics).slice(0, 6).map((topic) => ({
        topic,
        engagementScore: faker.number.int({ min: 50, max: 98 }),
        viewsPercentage: faker.number.int({ min: 5, max: 25 })
    })).sort((a, b) => b.engagementScore - a.engagementScore);
};

// Generate recommended actions
const generateRecommendedActions = (): RecommendedAction[] => {
    const actionTemplates: RecommendedAction[] = [
        {
            id: 'upload-shorts',
            title: 'Upload more Shorts',
            description: 'Shorts are driving significant engagement. Try to publish 2-3 shorts weekly.',
            impact: 'high',
            category: 'content'
        },
        {
            id: 'keyword-optimization',
            title: 'Optimize keywords in top videos',
            description: 'Your top-performing videos could reach more viewers with better keyword optimization.',
            impact: 'medium',
            category: 'seo'
        },
        {
            id: 'thumbnail-redesign',
            title: 'Redesign thumbnails for low-CTR videos',
            description: 'Several videos have below-average click-through rates. Revamped thumbnails could improve performance.',
            impact: 'high',
            category: 'seo'
        },
        {
            id: 'community-posts',
            title: 'Increase community engagement',
            description: 'Posting more community posts can boost subscriber retention and video views.',
            impact: 'medium',
            category: 'engagement'
        },
        {
            id: 'video-length',
            title: 'Optimize video length',
            description: 'Your 7-12 minute videos have the highest retention. Consider this length for future content.',
            impact: 'medium',
            category: 'content'
        },
        {
            id: 'topic-clusters',
            title: 'Create topic clusters',
            description: 'Group related videos into playlists to increase watch time and session duration.',
            impact: 'medium',
            category: 'seo'
        },
        {
            id: 'monetization-review',
            title: 'Review monetization strategy',
            description: 'Your channel may benefit from diversifying revenue streams beyond AdSense.',
            impact: 'high',
            category: 'monetization'
        },
        {
            id: 'trend-alignment',
            title: 'Align with current trends',
            description: 'Create content related to trending topics in your niche to capture search traffic.',
            impact: 'high',
            category: 'content'
        }
    ];

    // Return a random selection of actions
    return faker.helpers.shuffle(actionTemplates).slice(0, 5);
};

// Mock API function to fetch channel insights
const fetchChannelInsights = async (): Promise<ChannelInsights> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const subscriberCount = faker.number.int({ min: 10000, max: 200000 });
    const totalViews = faker.number.int({ min: 1000000, max: 10000000 });
    const totalVideos = faker.number.int({ min: 80, max: 320 });
    const avgViewsPerVideo = Math.floor(totalViews / totalVideos);

    // Generate watch time (realistic based on view count)
    // Average view duration of 3-6 minutes
    const avgDurationMinutes = faker.number.float({ min: 3, max: 6, precision: 0.1 });
    const watchTimeHours = Math.floor((totalViews * avgDurationMinutes) / 60);

    return {
        subscriberCount,
        totalViews,
        totalVideos,
        watchTimeHours,
        averageViewDuration: `${Math.floor(avgDurationMinutes)}:${Math.floor((avgDurationMinutes % 1) * 60).toString().padStart(2, '0')}`,
        topPerformingVideos: generateTopPerformingVideos(5),
        subscriberGrowth: generateDailyDataPoints(
            subscriberCount * 0.95,
            subscriberCount,
            'up'
        ),
        viewsGrowth: generateDailyDataPoints(
            avgViewsPerVideo * 0.7,
            avgViewsPerVideo * 1.3,
            'up'
        ),
        impressionsGrowth: generateDailyDataPoints(
            avgViewsPerVideo * 5,
            avgViewsPerVideo * 15,
            'stable'
        ),
        ctrTrend: generateDailyDataPoints(3, 8, 'stable').map(point => ({
            date: point.value,
            value: parseFloat((point.value / 10).toFixed(1)) // Convert to percentage (3-8%)
        })),
        audienceDemographics: generateDemographicData(),
        audienceCountries: generateCountryData(),
        channelHealthScore: faker.number.int({ min: 65, max: 88 }),
        mostEngagingTopics: generateTopicData(),
        recommendedActions: generateRecommendedActions()
    };
};

// Custom hook for fetching channel insights
export const useChannelInsights = () => {
    return useQuery({
        queryKey: ['channelInsights'],
        queryFn: fetchChannelInsights,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};
