// filepath: src\features\social-media\linkedin\analytics\useLinkedInAnalytics.ts
import { useQuery } from '@tanstack/react-query'
import { faker } from '@faker-js/faker'
import { subDays, subMonths } from 'date-fns'

// LinkedIn personal analytics data
export interface LinkedInPersonalAnalytics {
    followers: number
    profileViews: number
    searchAppearances: number
    postImpressions: number
    monthlyGrowth: number
    viewsByCompany: {
        name: string
        percentage: number
    }[]
    skillEndorsements: {
        skill: string
        count: number
    }[]
    dailyProfileViews: {
        date: string
        count: number
    }[]
}

// LinkedIn company analytics data
export interface LinkedInCompanyAnalytics {
    followers: number
    pageViews: number
    uniqueVisitors: number
    postEngagementRate: number
    followerGrowth: number
    clicksToWebsite: number
    ctaClicks: number
    followerDemographics: {
        category: string
        percentage: number
    }[]
    followerGrowthHistory: {
        date: string
        followers: number
    }[]
}

// Generate mock personal analytics data
const generateMockPersonalAnalytics = (): LinkedInPersonalAnalytics => {
    // Generate daily profile views for the last 30 days
    const dailyProfileViews = Array.from({ length: 30 }).map((_, index) => {
        const date = subDays(new Date(), 30 - index - 1)
        return {
            date: date.toISOString().split('T')[0],
            count: faker.number.int({ min: 3, max: 30 })
        }
    })

    // Calculate total profile views
    const totalProfileViews = dailyProfileViews.reduce((sum, day) => sum + day.count, 0)

    // Generate company view distribution
    const companies = [
        "Tech Innovations Inc",
        "Global Marketing Group",
        "Data Solutions Corp",
        "Finance Partners",
        "Healthcare Systems"
    ]

    const viewsByCompany = companies.map(name => ({
        name,
        percentage: faker.number.int({ min: 5, max: 25 })
    }))

    // Normalize percentages to total 100%
    const totalPercentage = viewsByCompany.reduce((sum, company) => sum + company.percentage, 0)
    viewsByCompany.forEach(company => {
        company.percentage = Math.round((company.percentage / totalPercentage) * 100)
    })

    // Adjust to ensure total is 100%
    const diff = 100 - viewsByCompany.reduce((sum, company) => sum + company.percentage, 0)
    viewsByCompany[0].percentage += diff

    // Generate skill endorsements
    const skills = [
        "Digital Marketing",
        "Content Strategy",
        "SEO",
        "Data Analysis",
        "Project Management"
    ]

    const skillEndorsements = skills.map(skill => ({
        skill,
        count: faker.number.int({ min: 5, max: 50 })
    }))

    return {
        followers: faker.number.int({ min: 500, max: 5000 }),
        profileViews: totalProfileViews,
        searchAppearances: faker.number.int({ min: 50, max: 500 }),
        postImpressions: faker.number.int({ min: 1000, max: 10000 }),
        monthlyGrowth: faker.number.float({ min: -2, max: 15, precision: 0.1 }),
        viewsByCompany,
        skillEndorsements,
        dailyProfileViews
    }
}

// Generate mock company analytics data
const generateMockCompanyAnalytics = (): LinkedInCompanyAnalytics => {
    // Generate follower growth history for the last 6 months
    const followerGrowthHistory = Array.from({ length: 6 }).map((_, index) => {
        const date = subMonths(new Date(), 6 - index - 1)
        const baseFollowers = 5000
        const growthRate = 1 + (faker.number.float({ min: 0.01, max: 0.08 }) * (index + 1))

        return {
            date: date.toISOString().split('T')[0],
            followers: Math.round(baseFollowers * growthRate)
        }
    })

    // Generate demographic data
    const industries = [
        "Technology",
        "Marketing & Advertising",
        "Financial Services",
        "Healthcare",
        "Education"
    ]

    const followerDemographics = industries.map(category => ({
        category,
        percentage: faker.number.int({ min: 5, max: 35 })
    }))

    // Normalize percentages to total 100%
    const totalPercentage = followerDemographics.reduce((sum, demo) => sum + demo.percentage, 0)
    followerDemographics.forEach(demo => {
        demo.percentage = Math.round((demo.percentage / totalPercentage) * 100)
    })

    // Adjust to ensure total is 100%
    const diff = 100 - followerDemographics.reduce((sum, demo) => sum + demo.percentage, 0)
    followerDemographics[0].percentage += diff

    // Calculate current followers (last month's value)
    const currentFollowers = followerGrowthHistory[followerGrowthHistory.length - 1].followers

    // Calculate growth percentage based on last two months
    const previousFollowers = followerGrowthHistory[followerGrowthHistory.length - 2]?.followers || currentFollowers
    const followerGrowth = ((currentFollowers - previousFollowers) / previousFollowers) * 100

    return {
        followers: currentFollowers,
        pageViews: faker.number.int({ min: 500, max: 3000 }),
        uniqueVisitors: faker.number.int({ min: 300, max: 1500 }),
        postEngagementRate: faker.number.float({ min: 2, max: 8, precision: 0.1 }),
        followerGrowth: parseFloat(followerGrowth.toFixed(1)),
        clicksToWebsite: faker.number.int({ min: 50, max: 500 }),
        ctaClicks: faker.number.int({ min: 20, max: 200 }),
        followerDemographics,
        followerGrowthHistory
    }
}

// Mock API function to fetch LinkedIn analytics
const fetchLinkedInAnalytics = async (): Promise<{
    personal: LinkedInPersonalAnalytics;
    company: LinkedInCompanyAnalytics;
}> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    return {
        personal: generateMockPersonalAnalytics(),
        company: generateMockCompanyAnalytics()
    }
}

// Custom hook for fetching LinkedIn analytics
export const useLinkedInAnalytics = () => {
    return useQuery({
        queryKey: ['linkedinAnalytics'],
        queryFn: fetchLinkedInAnalytics,
        staleTime: 1000 * 60 * 15, // 15 minutes
    })
}
