// filepath: src\features\social-media\linkedin\insights\useLinkedInInsights.ts
import { subDays } from 'date-fns'
import { useQuery } from '@tanstack/react-query'
import { faker } from '@faker-js/faker'

// LinkedIn insights data type
export interface InsightData {
  date: string
  reactions: number
  comments: number
  impressions: number
}

// Generate mock insights data for the given number of days
const generateMockInsightsData = (days: number): InsightData[] => {
  const endDate = new Date()

  return Array.from({ length: days }).map((_, index) => {
    const date = subDays(endDate, days - index - 1)
    return {
      date: date.toISOString().split('T')[0],
      reactions: faker.number.int({ min: 20, max: 200 }),
      comments: faker.number.int({ min: 2, max: 50 }),
      impressions: faker.number.int({ min: 200, max: 2000 }),
    }
  })
}

// Mock API function to fetch LinkedIn insights
const fetchLinkedInInsights = async (
  timeRange: '7d' | '30d' | '90d'
): Promise<InsightData[]> => {
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

// Custom hook for fetching LinkedIn insights
export const useLinkedInInsights = (
  timeRange: '7d' | '30d' | '90d' = '30d'
) => {
  return useQuery({
    queryKey: ['linkedinInsights', timeRange],
    queryFn: () => fetchLinkedInInsights(timeRange),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
