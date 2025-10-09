// filepath: src\features\social-media\facebook\analytics\useFacebookAnalytics.ts
import { subDays } from 'date-fns'
import { useQuery } from '@tanstack/react-query'
import { faker } from '@faker-js/faker'

// Facebook page metrics type
export interface FacebookPageMetrics {
  totalLikes: number
  totalFollowers: number
  newLikes: number
  newFollowers: number
  reachGrowth: number
  engagementRate: number
  responseRate: number
  averageResponseTime: number // in minutes
}

// Facebook demographic data
export interface DemographicData {
  ageGroup: string
  percentage: number
}

// Facebook location data
export interface LocationData {
  country: string
  percentage: number
}

// Facebook analytics data
export interface FacebookAnalyticsData {
  pageMetrics: FacebookPageMetrics
  demographics: DemographicData[]
  locations: LocationData[]
  topPosts: {
    id: string
    content: string
    engagement: number
    reach: number
    date: string
  }[]
}

// Generate mock Facebook analytics data
const generateMockAnalytics = (): FacebookAnalyticsData => {
  // Mock demographics data
  const demographics: DemographicData[] = [
    { ageGroup: '18-24', percentage: faker.number.int({ min: 5, max: 15 }) },
    { ageGroup: '25-34', percentage: faker.number.int({ min: 20, max: 35 }) },
    { ageGroup: '35-44', percentage: faker.number.int({ min: 15, max: 30 }) },
    { ageGroup: '45-54', percentage: faker.number.int({ min: 10, max: 20 }) },
    { ageGroup: '55-64', percentage: faker.number.int({ min: 5, max: 15 }) },
    { ageGroup: '65+', percentage: faker.number.int({ min: 1, max: 10 }) },
  ]

  // Normalize percentages to total 100%
  const totalDemographic = demographics.reduce(
    (total, item) => total + item.percentage,
    0
  )
  demographics.forEach((item) => {
    item.percentage = Math.round((item.percentage / totalDemographic) * 100)
  })

  // Ensure it adds up to 100%
  let remaining =
    100 - demographics.reduce((total, item) => total + item.percentage, 0)
  demographics[0].percentage += remaining

  // Mock location data
  const locations: LocationData[] = [
    {
      country: 'United States',
      percentage: faker.number.int({ min: 30, max: 60 }),
    },
    {
      country: 'United Kingdom',
      percentage: faker.number.int({ min: 10, max: 20 }),
    },
    { country: 'Canada', percentage: faker.number.int({ min: 5, max: 15 }) },
    { country: 'Australia', percentage: faker.number.int({ min: 3, max: 10 }) },
    { country: 'India', percentage: faker.number.int({ min: 3, max: 10 }) },
    { country: 'Other', percentage: faker.number.int({ min: 5, max: 20 }) },
  ]

  // Normalize location percentages
  const totalLocation = locations.reduce(
    (total, item) => total + item.percentage,
    0
  )
  locations.forEach((item) => {
    item.percentage = Math.round((item.percentage / totalLocation) * 100)
  })

  // Ensure it adds up to 100%
  remaining =
    100 - locations.reduce((total, item) => total + item.percentage, 0)
  locations[0].percentage += remaining

  // Generate mock top posts
  const topPosts = Array.from({ length: 3 }, (_, i) => {
    const date = subDays(new Date(), faker.number.int({ min: 1, max: 30 }))
    return {
      id: faker.string.uuid(),
      content: faker.lorem.sentence({ min: 5, max: 15 }),
      engagement: faker.number.int({ min: 1, max: 10 }),
      reach: faker.number.int({ min: 500, max: 10000 }),
      date: date.toISOString(),
    }
  })

  // Sort by engagement
  topPosts.sort((a, b) => b.engagement - a.engagement)

  return {
    pageMetrics: {
      totalLikes: faker.number.int({ min: 5000, max: 50000 }),
      totalFollowers: faker.number.int({ min: 5500, max: 55000 }),
      newLikes: faker.number.int({ min: 50, max: 500 }),
      newFollowers: faker.number.int({ min: 60, max: 600 }),
      reachGrowth: faker.number.float({ min: -5, max: 20, precision: 0.1 }),
      engagementRate: faker.number.float({ min: 1, max: 5, precision: 0.1 }),
      responseRate: faker.number.float({ min: 70, max: 98, precision: 0.1 }),
      averageResponseTime: faker.number.int({ min: 15, max: 120 }),
    },
    demographics,
    locations,
    topPosts,
  }
}

// Mock API function to fetch Facebook analytics
const fetchFacebookAnalytics = async (): Promise<FacebookAnalyticsData> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return generateMockAnalytics()
}

// Custom hook for fetching Facebook analytics
export const useFacebookAnalytics = () => {
  return useQuery({
    queryKey: ['facebookAnalytics'],
    queryFn: fetchFacebookAnalytics,
    staleTime: 1000 * 60 * 15, // 15 minutes
  })
}
