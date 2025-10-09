import { subDays, format } from 'date-fns'
import { useQuery } from '@tanstack/react-query'
import { faker } from '@faker-js/faker'

// Instagram analytics data type definition
export interface AnalyticsData {
  date: string
  followers: number
  reach: number
  impressions: number
}

// Mock analytics data generation
const generateMockAnalyticsData = (days: number): AnalyticsData[] => {
  const endDate = new Date()
  let currentFollowers = faker.number.int({ min: 5000, max: 10000 })

  return Array.from({ length: days }).map((_, index) => {
    const date = subDays(endDate, days - index - 1)

    // Create small variations in follower counts (generally increasing)
    const followerChange = faker.number.int({ min: -10, max: 100 })
    currentFollowers += followerChange

    return {
      date: format(date, 'yyyy-MM-dd'),
      followers: currentFollowers,
      reach: faker.number.int({ min: 1000, max: 5000 }),
      impressions: faker.number.int({ min: 2000, max: 8000 }),
    }
  })
}

// Mock API function to fetch Instagram analytics data
const fetchAnalyticsData = async (
  days: number = 30
): Promise<AnalyticsData[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))
  return generateMockAnalyticsData(days)
}

// Custom hook for fetching Instagram analytics
export const useInstagramAnalytics = (days: number = 30) => {
  return useQuery({
    queryKey: ['instagramAnalytics', days],
    queryFn: () => fetchAnalyticsData(days),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
