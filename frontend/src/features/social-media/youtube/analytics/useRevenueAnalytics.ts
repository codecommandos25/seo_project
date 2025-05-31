// filepath: src\features\social-media\youtube\analytics\useRevenueAnalytics.ts
import { useQuery } from '@tanstack/react-query'
import { faker } from '@faker-js/faker'

export interface RevenueAnalytics {
    summary: RevenueSummary;
    revenueByMonth: MonthlyRevenue[];
    revenueBySource: RevenueSource[];
    revenueByFormat: RevenueFormat[];
    topEarningVideos: EarningVideo[];
    revenueProjection: RevenueProjection;
    revenueByCountry: CountryRevenue[];
    yearlyComparisonData: YearlyRevenueComparison[];
    adPerformance: AdPerformance;
    sponsorshipPerformance: SponsorshipPerformance[];
    membershipStats: MembershipStats;
    cpmTrends: CPMTrend[];
    revenueRetention: RevenueRetention;
}

export interface RevenueSummary {
    totalRevenue: number;
    changePercentage: number; // compared to previous period
    estimatedYearlyRevenue: number;
    revenuePerThousandViews: number;
}

export interface MonthlyRevenue {
    month: string;
    adRevenue: number;
    sponsorshipRevenue: number;
    membershipRevenue: number;
    merchandiseRevenue: number;
    superChatsRevenue: number;
    total: number;
}

export interface RevenueSource {
    source: string;
    amount: number;
    percentage: number;
}

export interface RevenueFormat {
    format: string; // "short" | "long"
    amount: number;
    percentage: number;
}

export interface EarningVideo {
    id: string;
    title: string;
    thumbnailUrl: string;
    revenue: number;
    views: number;
    revenuePerThousand: number;
    publishedDate: string;
    format: 'short' | 'long';
}

export interface RevenueProjection {
    nextMonth: number;
    nextQuarter: number;
    nextYear: number;
    growthRate: number;
}

export interface CountryRevenue {
    country: string;
    revenue: number;
    percentage: number;
}

export interface YearlyRevenueComparison {
    month: string;
    thisYear: number;
    lastYear: number;
}

export interface AdPerformance {
    totalImpressions: number;
    ctr: number;
    averageCpm: number;
    topPerformingAdTypes: AdType[];
    playbackBasedCpm: PlaybackCPM[];
}

export interface AdType {
    type: string;
    revenue: number;
    impressions: number;
    cpm: number;
}

export interface PlaybackCPM {
    playbackLocation: string;
    cpm: number;
    percentage: number;
}

export interface SponsorshipPerformance {
    campaignName: string;
    revenue: number;
    viewCount: number;
    engagementRate: number;
    costPerView: number;
    status: 'active' | 'completed' | 'upcoming';
}

export interface MembershipStats {
    totalMembers: number;
    memberGrowth: number;
    averageRevenuePer: number;
    retentionRate: number;
    tierDistribution: MembershipTier[];
}

export interface MembershipTier {
    tier: string;
    memberCount: number;
    percentage: number;
    revenue: number;
}

export interface CPMTrend {
    date: string;
    cpm: number;
}

export interface RevenueRetention {
    day7: number;
    day30: number;
    day90: number;
    viewsToRevenueRatio: number;
}

// Mock data generation function
const generateMockRevenueAnalytics = (): RevenueAnalytics => {
    // Generate monthly revenue data
    const generateMonthlyRevenue = (): MonthlyRevenue[] => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const result: MonthlyRevenue[] = [];

        // Base values that will grow over time
        let baseAdRevenue = faker.number.float({ min: 500, max: 1500 });
        let baseSponsorshipRevenue = faker.number.float({ min: 300, max: 1200 });
        let baseMembershipRevenue = faker.number.float({ min: 100, max: 600 });
        let baseMerchandiseRevenue = faker.number.float({ min: 50, max: 400 });
        let baseSuperChatsRevenue = faker.number.float({ min: 20, max: 200 });

        // Growth factors for each month (can be negative for seasonal dips)
        const adGrowth = 1 + (faker.number.float({ min: -0.05, max: 0.12 }) / 12);
        const sponsorshipGrowth = 1 + (faker.number.float({ min: -0.03, max: 0.15 }) / 12);
        const membershipGrowth = 1 + (faker.number.float({ min: 0.01, max: 0.08 }) / 12);
        const merchandiseGrowth = 1 + (faker.number.float({ min: -0.08, max: 0.20 }) / 12);
        const superChatsGrowth = 1 + (faker.number.float({ min: -0.02, max: 0.10 }) / 12);

        for (let i = 0; i < months.length; i++) {
            // Apply seasonal factors (Q4 boost, January dip, etc.)
            const seasonalFactor = i >= 9 ? 1.2 : // Q4 boost
                i === 0 ? 0.8 : // January dip
                    i >= 5 && i <= 7 ? 1.1 : // Summer boost
                        1.0; // Normal

            // Apply growth
            baseAdRevenue *= adGrowth * seasonalFactor;
            baseSponsorshipRevenue *= sponsorshipGrowth * seasonalFactor;
            baseMembershipRevenue *= membershipGrowth;
            baseMerchandiseRevenue *= merchandiseGrowth * seasonalFactor;
            baseSuperChatsRevenue *= superChatsGrowth;

            // Add some randomness
            const adRevenue = Math.round(baseAdRevenue * faker.number.float({ min: 0.9, max: 1.1 }));
            const sponsorshipRevenue = Math.round(baseSponsorshipRevenue * faker.number.float({ min: 0.85, max: 1.15 }));
            const membershipRevenue = Math.round(baseMembershipRevenue * faker.number.float({ min: 0.95, max: 1.05 }));
            const merchandiseRevenue = Math.round(baseMerchandiseRevenue * faker.number.float({ min: 0.8, max: 1.2 }));
            const superChatsRevenue = Math.round(baseSuperChatsRevenue * faker.number.float({ min: 0.85, max: 1.15 }));

            const total = adRevenue + sponsorshipRevenue + membershipRevenue + merchandiseRevenue + superChatsRevenue;

            result.push({
                month: months[i],
                adRevenue,
                sponsorshipRevenue,
                membershipRevenue,
                merchandiseRevenue,
                superChatsRevenue,
                total
            });
        }

        return result;
    };

    const monthlyRevenue = generateMonthlyRevenue();
    const totalRevenue = monthlyRevenue.reduce((sum, month) => sum + month.total, 0);

    // Calculate yearly total by summing all monthly revenue
    const yearlyTotal = totalRevenue;

    // Generate revenue by source
    const generateRevenueBySource = (): RevenueSource[] => {
        const totalAdRevenue = monthlyRevenue.reduce((sum, month) => sum + month.adRevenue, 0);
        const totalSponsorshipRevenue = monthlyRevenue.reduce((sum, month) => sum + month.sponsorshipRevenue, 0);
        const totalMembershipRevenue = monthlyRevenue.reduce((sum, month) => sum + month.membershipRevenue, 0);
        const totalMerchandiseRevenue = monthlyRevenue.reduce((sum, month) => sum + month.merchandiseRevenue, 0);
        const totalSuperChatsRevenue = monthlyRevenue.reduce((sum, month) => sum + month.superChatsRevenue, 0);

        const sources: RevenueSource[] = [
            { source: 'Ad Revenue', amount: totalAdRevenue, percentage: 0 },
            { source: 'Sponsorships', amount: totalSponsorshipRevenue, percentage: 0 },
            { source: 'Memberships', amount: totalMembershipRevenue, percentage: 0 },
            { source: 'Merchandise', amount: totalMerchandiseRevenue, percentage: 0 },
            { source: 'Super Chats', amount: totalSuperChatsRevenue, percentage: 0 }
        ];

        // Calculate percentages
        sources.forEach(source => {
            source.percentage = Math.round((source.amount / yearlyTotal) * 100);
        });

        return sources;
    };

    // Generate revenue by format (short vs. long)
    const shortPercentage = faker.number.int({ min: 20, max: 45 });
    const longPercentage = 100 - shortPercentage;

    const revenueByFormat: RevenueFormat[] = [
        {
            format: 'short',
            amount: Math.round((yearlyTotal * shortPercentage) / 100),
            percentage: shortPercentage
        },
        {
            format: 'long',
            amount: Math.round((yearlyTotal * longPercentage) / 100),
            percentage: longPercentage
        }
    ];

    // Generate top earning videos
    const generateTopEarningVideos = (): EarningVideo[] => {
        const videos: EarningVideo[] = [];

        const generateTitle = (format: 'short' | 'long'): string => {
            const shortTitles = [
                "I can't believe this happened! 😱",
                "You won't believe what I found 🔥",
                "This trick changed everything 🚀",
                "How to earn passive income fast",
                "The algorithm secret no one tells you"
            ];

            const longTitles = [
                "How I Made $10,000 from YouTube in 30 Days (Full Guide)",
                "The Ultimate Guide to YouTube SEO in 2025",
                "10 Things Successful YouTubers Do Differently",
                "How to Create Viral Content: Step by Step Tutorial",
                "Monetization Strategies That Actually Work in 2025"
            ];

            return format === 'short'
                ? faker.helpers.arrayElement(shortTitles)
                : faker.helpers.arrayElement(longTitles);
        };

        for (let i = 0; i < 5; i++) {
            const format = i < 3 ? 'long' : 'short'; // Top earners tend to be long-form
            const views = format === 'long'
                ? faker.number.int({ min: 50000, max: 500000 })
                : faker.number.int({ min: 100000, max: 2000000 });

            const revenue = format === 'long'
                ? views * faker.number.float({ min: 4, max: 12 }) / 1000
                : views * faker.number.float({ min: 1, max: 5 }) / 1000;

            videos.push({
                id: faker.string.alphanumeric(11),
                title: generateTitle(format),
                thumbnailUrl: faker.image.urlLoremFlickr({ width: 1280, height: 720, category: 'business' }),
                revenue: Math.round(revenue),
                views,
                revenuePerThousand: parseFloat((revenue / views * 1000).toFixed(2)),
                publishedDate: faker.date.recent({ days: 120 }).toISOString(),
                format
            });
        }

        return videos.sort((a, b) => b.revenue - a.revenue);
    };

    // Generate revenue projection
    const calculateRevenueProjection = (): RevenueProjection => {
        // Get the last few months for trend calculation
        const recentMonths = monthlyRevenue.slice(-3);
        const avgRecentRevenue = recentMonths.reduce((sum, month) => sum + month.total, 0) / recentMonths.length;
        const growthRate = faker.number.float({ min: 3, max: 15, precision: 0.1 });

        return {
            nextMonth: Math.round(avgRecentRevenue * (1 + (growthRate / 100))),
            nextQuarter: Math.round(avgRecentRevenue * 3 * (1 + (growthRate / 100) * 2)),
            nextYear: Math.round(yearlyTotal * (1 + (growthRate / 100))),
            growthRate
        };
    };

    // Generate revenue by country
    const generateRevenueByCountry = (): CountryRevenue[] => {
        const countries = ['United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'India', 'Brazil', 'Other'];
        const revenues: CountryRevenue[] = [];
        let remainingPercentage = 100;

        for (let i = 0; i < countries.length - 1; i++) {
            let percentage: number;

            if (countries[i] === 'United States') {
                percentage = faker.number.int({ min: 30, max: 50 });
            } else if (countries[i] === 'United Kingdom' || countries[i] === 'Canada' || countries[i] === 'Australia') {
                percentage = faker.number.int({ min: 5, max: 15 });
            } else if (countries[i] === 'India') {
                percentage = faker.number.int({ min: 3, max: 10 });
            } else {
                percentage = faker.number.int({ min: 2, max: 8 });
            }

            // Ensure we don't exceed 100%
            percentage = Math.min(percentage, remainingPercentage - 1);
            remainingPercentage -= percentage;

            revenues.push({
                country: countries[i],
                revenue: Math.round((percentage / 100) * yearlyTotal),
                percentage
            });
        }

        // Add the "Other" category with remaining percentage
        revenues.push({
            country: 'Other',
            revenue: Math.round((remainingPercentage / 100) * yearlyTotal),
            percentage: remainingPercentage
        });

        return revenues.sort((a, b) => b.revenue - a.revenue);
    };

    // Generate yearly comparison data
    const generateYearlyComparison = (): YearlyRevenueComparison[] => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const comparison: YearlyRevenueComparison[] = [];

        for (let i = 0; i < months.length; i++) {
            const thisYear = monthlyRevenue[i].total;
            const lastYearFactor = faker.number.float({ min: 0.4, max: 0.85 });
            const lastYear = Math.round(thisYear * lastYearFactor);

            comparison.push({
                month: months[i],
                thisYear,
                lastYear
            });
        }

        return comparison;
    };

    // Generate ad performance data
    const generateAdPerformance = (): AdPerformance => {
        const adTypes = [
            {
                type: 'Skippable in-stream ads',
                revenue: faker.number.float({ min: 2000, max: 8000 }),
                impressions: faker.number.int({ min: 500000, max: 2000000 }),
                cpm: 0
            },
            {
                type: 'Non-skippable in-stream ads',
                revenue: faker.number.float({ min: 1000, max: 5000 }),
                impressions: faker.number.int({ min: 100000, max: 500000 }),
                cpm: 0
            },
            {
                type: 'In-feed video ads',
                revenue: faker.number.float({ min: 500, max: 3000 }),
                impressions: faker.number.int({ min: 200000, max: 800000 }),
                cpm: 0
            },
            {
                type: 'Bumper ads',
                revenue: faker.number.float({ min: 200, max: 1500 }),
                impressions: faker.number.int({ min: 100000, max: 600000 }),
                cpm: 0
            }
        ];

        // Calculate CPM for each ad type
        adTypes.forEach(adType => {
            adType.cpm = parseFloat(((adType.revenue / adType.impressions) * 1000).toFixed(2));
        });

        // Sort by revenue
        adTypes.sort((a, b) => b.revenue - a.revenue);

        // Calculate totals
        const totalImpressions = adTypes.reduce((sum, adType) => sum + adType.impressions, 0);
        const totalRevenue = adTypes.reduce((sum, adType) => sum + adType.revenue, 0);
        const averageCpm = parseFloat(((totalRevenue / totalImpressions) * 1000).toFixed(2));

        // Generate playback-based CPM
        const playbackLocations = ['Watch page', 'Channel page', 'Embedded', 'Shorts feed'];
        const playbackBasedCpm: PlaybackCPM[] = [];
        let remainingPercentage = 100;

        for (let i = 0; i < playbackLocations.length; i++) {
            let percentage: number;
            let cpm: number;

            if (playbackLocations[i] === 'Watch page') {
                percentage = faker.number.int({ min: 50, max: 70 });
                cpm = faker.number.float({ min: 3, max: 8 });
            } else if (playbackLocations[i] === 'Shorts feed') {
                percentage = faker.number.int({ min: 10, max: 25 });
                cpm = faker.number.float({ min: 1, max: 3 });
            } else {
                percentage = faker.number.int({ min: 5, max: 15 });
                cpm = faker.number.float({ min: 2, max: 6 });
            }

            // Ensure percentages don't exceed 100%
            percentage = Math.min(percentage, remainingPercentage);
            remainingPercentage -= percentage;

            playbackBasedCpm.push({
                playbackLocation: playbackLocations[i],
                cpm: parseFloat(cpm.toFixed(2)),
                percentage
            });
        }

        return {
            totalImpressions,
            ctr: faker.number.float({ min: 0.8, max: 3.5, precision: 0.1 }),
            averageCpm,
            topPerformingAdTypes: adTypes,
            playbackBasedCpm
        };
    };

    // Generate sponsorship performance data
    const generateSponsorshipPerformance = (): SponsorshipPerformance[] => {
        const sponsorshipNames = [
            'SkillShare Campaign',
            'Audible Partnership',
            'NordVPN Promotion',
            'Hello Fresh Sponsorship',
            'Ridge Wallet Collaboration'
        ];

        return sponsorshipNames.map((name) => {
            const status = faker.helpers.arrayElement(['active', 'completed', 'upcoming']) as 'active' | 'completed' | 'upcoming';
            const viewCount = faker.number.int({ min: 50000, max: 500000 });
            const revenue = faker.number.int({ min: 1000, max: 10000 });
            const engagementRate = faker.number.float({ min: 3, max: 12, precision: 0.1 });

            return {
                campaignName: name,
                revenue,
                viewCount,
                engagementRate,
                costPerView: parseFloat((revenue / viewCount).toFixed(4)),
                status
            };
        }).sort((a, b) => b.revenue - a.revenue);
    };

    // Generate membership stats
    const generateMembershipStats = (): MembershipStats => {
        const totalMembers = faker.number.int({ min: 100, max: 3000 });
        const memberGrowth = faker.number.float({ min: 2, max: 25, precision: 0.1 });

        // Generate tier distribution
        const tierNames = ['Silver', 'Gold', 'Platinum'];
        const tierDistribution: MembershipTier[] = [];
        let remainingMembers = totalMembers;
        let remainingPercentage = 100;

        for (let i = 0; i < tierNames.length - 1; i++) {
            let percentage: number;

            // Silver tier is largest, Platinum is smallest
            if (tierNames[i] === 'Silver') {
                percentage = faker.number.int({ min: 50, max: 70 });
            } else {
                percentage = faker.number.int({ min: 15, max: 30 });
            }

            // Ensure percentages don't exceed 100%
            percentage = Math.min(percentage, remainingPercentage - 1);
            remainingPercentage -= percentage;

            const memberCount = Math.round((percentage / 100) * totalMembers);
            remainingMembers -= memberCount;

            const tierPrice = tierNames[i] === 'Silver' ? 4.99 : tierNames[i] === 'Gold' ? 9.99 : 19.99;

            tierDistribution.push({
                tier: tierNames[i],
                memberCount,
                percentage,
                revenue: Math.round(memberCount * tierPrice)
            });
        }

        // Add the last tier with remaining members
        const lastTierPrice = 19.99;
        tierDistribution.push({
            tier: tierNames[tierNames.length - 1],
            memberCount: remainingMembers,
            percentage: remainingPercentage,
            revenue: Math.round(remainingMembers * lastTierPrice)
        });

        // Calculate the average revenue per member
        const totalMembershipRevenue = tierDistribution.reduce((sum, tier) => sum + tier.revenue, 0);
        const averageRevenuePer = parseFloat((totalMembershipRevenue / totalMembers).toFixed(2));

        return {
            totalMembers,
            memberGrowth,
            averageRevenuePer,
            retentionRate: faker.number.float({ min: 75, max: 95, precision: 0.1 }),
            tierDistribution
        };
    };

    // Generate CPM trends
    const generateCPMTrends = (): CPMTrend[] => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const trends: CPMTrend[] = [];

        // Start with a base CPM
        let baseCPM = faker.number.float({ min: 2, max: 4, precision: 0.01 });

        for (let i = 0; i < months.length; i++) {
            // Seasonal factors
            let seasonalFactor = 1.0;
            if (i >= 9 && i <= 11) {
                // Q4 has higher CPM
                seasonalFactor = faker.number.float({ min: 1.2, max: 1.6, precision: 0.01 });
            } else if (i === 0 || i === 1) {
                // Q1 has lower CPM
                seasonalFactor = faker.number.float({ min: 0.7, max: 0.9, precision: 0.01 });
            }

            // Add some randomness
            const randomFactor = faker.number.float({ min: 0.9, max: 1.1, precision: 0.01 });

            const cpm = parseFloat((baseCPM * seasonalFactor * randomFactor).toFixed(2));
            trends.push({
                date: months[i],
                cpm
            });

            // Slightly adjust base CPM for next month (general upward trend)
            baseCPM *= faker.number.float({ min: 1, max: 1.03, precision: 0.001 });
        }

        return trends;
    };

    // Calculate revenue retention
    const revenueRetention = {
        day7: faker.number.float({ min: 10, max: 30, precision: 0.1 }),
        day30: faker.number.float({ min: 25, max: 60, precision: 0.1 }),
        day90: faker.number.float({ min: 50, max: 85, precision: 0.1 }),
        viewsToRevenueRatio: faker.number.float({ min: 1.5, max: 6, precision: 0.1 })
    };

    // Calculate change percentage
    const previousPeriodRevenue = totalRevenue / (1 + faker.number.float({ min: -0.1, max: 0.4, precision: 0.01 }));
    const changePercentage = parseFloat(((totalRevenue - previousPeriodRevenue) / previousPeriodRevenue * 100).toFixed(1));

    return {
        summary: {
            totalRevenue: Math.round(totalRevenue),
            changePercentage,
            estimatedYearlyRevenue: Math.round(yearlyTotal),
            revenuePerThousandViews: faker.number.float({ min: 2, max: 8, precision: 0.1 })
        },
        revenueByMonth: monthlyRevenue,
        revenueBySource: generateRevenueBySource(),
        revenueByFormat,
        topEarningVideos: generateTopEarningVideos(),
        revenueProjection: calculateRevenueProjection(),
        revenueByCountry: generateRevenueByCountry(),
        yearlyComparisonData: generateYearlyComparison(),
        adPerformance: generateAdPerformance(),
        sponsorshipPerformance: generateSponsorshipPerformance(),
        membershipStats: generateMembershipStats(),
        cpmTrends: generateCPMTrends(),
        revenueRetention
    };
};

// Mock API function to fetch revenue analytics
const fetchRevenueAnalytics = async (): Promise<RevenueAnalytics> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    return generateMockRevenueAnalytics();
};

// Custom hook for fetching revenue analytics
export const useRevenueAnalytics = () => {
    return useQuery({
        queryKey: ['revenueAnalytics'],
        queryFn: fetchRevenueAnalytics,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};
