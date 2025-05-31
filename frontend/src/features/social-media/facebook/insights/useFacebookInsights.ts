// filepath: src\features\social-media\facebook\insights\useFacebookInsights.ts
import { useQuery } from '@tanstack/react-query'
import { faker } from '@faker-js/faker'
import { subDays } from 'date-fns'

// Facebook insights data type
export interface FacebookInsightData {
    date: string
    pageViews: number
    engagement: number
    reach: number
}

// Generate mock insights data for the given number of days
const generateMockInsightsData = (days: number): FacebookInsightData[] => {
    const endDate = new Date()

    return Array.from({ length: days }).map((_, index) => {
        const date = subDays(endDate, days - index - 1)
        return {
            date: date.toISOString().split('T')[0],
            pageViews: faker.number.int({ min: 100, max: 1500 }),
            engagement: faker.number.int({ min: 20, max: 500 }),
            reach: faker.number.int({ min: 500, max: 5000 })
        }
    })
}

// Mock API function to fetch Facebook insights
const fetchFacebookInsights = async (timeRange: '7d' | '30d' | '90d'): Promise<FacebookInsightData[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Return data based on time range
    switch (timeRange) {
        case '7d':
            return generateMockInsightsData(7)
        case '30d':
            return generateMockInsightsData(30)
        case '90d':
            return generateMockInsightsData(90)
        default:
            return generateMockInsightsData(30)
    }
}

// Custom hook for fetching Facebook insights
export const useFacebookInsights = (timeRange: '7d' | '30d' | '90d' = '30d') => {
    return useQuery({
        queryKey: ['facebookInsights', timeRange],
        queryFn: () => fetchFacebookInsights(timeRange),
        staleTime: 1000 * 60 * 5, // 5 minutes
    })
}
