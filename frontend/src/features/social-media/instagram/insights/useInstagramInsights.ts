import { subDays } from 'date-fns'
import { useQuery } from '@tanstack/react-query'
import { faker } from '@faker-js/faker'

// Instagram insights data type
export interface InsightData {
  date: string
  likes: number
  comments: number
}

// Generate mock insights data for the given number of days
const generateMockInsightsData = (days: number): InsightData[] => {
  const endDate = new Date()

  return Array.from({ length: days }).map((_, index) => {
    const date = subDays(endDate, days - index - 1)
    return {
      date: date.toISOString().split('T')[0],
      likes: faker.number.int({ min: 50, max: 500 }),
      comments: faker.number.int({ min: 5, max: 100 }),
    }
  })
}

// Mock API function to fetch Instagram insights
const fetchInstagramInsights = async (
  timeRange: '7d' | '30d' | 'all'
): Promise<InsightData[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 700))

  // Return data based on time range
  switch (timeRange) {
    case '7d':
      return generateMockInsightsData(7)
    case '30d':
      return generateMockInsightsData(30)
    case 'all':
      return generateMockInsightsData(90)
    default:
      return generateMockInsightsData(30)
  }
}

// Custom hook for fetching Instagram insights
export const useInstagramInsights = (
  timeRange: '7d' | '30d' | 'all' = '30d'
) => {
  return useQuery({
    queryKey: ['instagramInsights', timeRange],
    queryFn: () => fetchInstagramInsights(timeRange),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
