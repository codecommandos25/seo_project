// filepath: src\features\social-media\youtube\analytics\useAudienceAnalytics.ts
import { useQuery } from '@tanstack/react-query'
import { faker } from '@faker-js/faker'

export interface AudienceAnalytics {
  totalSubscribers: number
  subscriberChange: {
    count: number
    percentage: number
  }
  demographics: {
    age: AgeDemographics[]
    gender: GenderDemographics
    devices: DeviceDemographics[]
  }
  countries: CountryData[]
  subscriberActivity: ActivityData[]
  viewsPerSubscriberTrend: TrendData[]
  notificationStats: NotificationStats
  watchTimeByTrafficSource: TrafficSourceData[]
  subscribersDates: DateDistribution[]
  watchTimeTrend: TrendData[]
  topSubscribedVideos: TopSubscribedVideo[]
  audienceTypes: AudienceType[]
  returningViewerPercentage: number
  audienceRetentionTrend: TrendData[]
}

export interface AgeDemographics {
  ageRange: string
  percentage: number
}

export interface GenderDemographics {
  male: number
  female: number
  other: number
}

export interface DeviceDemographics {
  device: string
  percentage: number
}

export interface CountryData {
  country: string
  percentage: number
  subscriberCount: number
}

export interface ActivityData {
  day: string
  activePercentage: number
}

export interface TrendData {
  date: string
  value: number
}

export interface NotificationStats {
  enabled: number
  clickRate: number
  bellIconRate: number
}

export interface TrafficSourceData {
  source: string
  minutes: number
  percentage: number
}

export interface DateDistribution {
  hour: number
  percentage: number
}

export interface TopSubscribedVideo {
  id: string
  title: string
  thumbnailUrl: string
  subscribersGained: number
  subscribersLost: number
  netGain: number
  conversionRate: number
  publishedAt: string
}

export interface AudienceType {
  type: string
  percentage: number
}

// Mock data generation function
const generateMockAudienceAnalytics = (): AudienceAnalytics => {
  // Generate age demographics with realistic distribution
  const ageDemographics: AgeDemographics[] = [
    { ageRange: '13-17', percentage: faker.number.int({ min: 3, max: 8 }) },
    { ageRange: '18-24', percentage: faker.number.int({ min: 25, max: 35 }) },
    { ageRange: '25-34', percentage: faker.number.int({ min: 28, max: 40 }) },
    { ageRange: '35-44', percentage: faker.number.int({ min: 15, max: 25 }) },
    { ageRange: '45-54', percentage: faker.number.int({ min: 5, max: 12 }) },
    { ageRange: '55-64', percentage: faker.number.int({ min: 2, max: 6 }) },
    { ageRange: '65+', percentage: faker.number.int({ min: 1, max: 4 }) },
  ]

  // Adjust to ensure percentages sum to 100
  const totalAge = ageDemographics.reduce(
    (sum, item) => sum + item.percentage,
    0
  )
  ageDemographics.forEach((item) => {
    item.percentage = Math.round((item.percentage / totalAge) * 100)
  })

  // If after rounding we're not at 100%, adjust the largest group
  const newTotal = ageDemographics.reduce(
    (sum, item) => sum + item.percentage,
    0
  )
  if (newTotal !== 100) {
    const diff = 100 - newTotal
    const largest = ageDemographics.sort(
      (a, b) => b.percentage - a.percentage
    )[0]
    largest.percentage += diff
  }

  // Generate gender demographics
  const malePercentage = faker.number.int({ min: 55, max: 75 })
  const femalePercentage = faker.number.int({
    min: 23,
    max: 100 - malePercentage - 1,
  })
  const otherPercentage = 100 - malePercentage - femalePercentage

  // Generate device demographics
  const mobilePercentage = faker.number.int({ min: 45, max: 65 })
  const desktopPercentage = faker.number.int({ min: 20, max: 40 })
  const tabletPercentage = faker.number.int({ min: 5, max: 15 })
  const tvPercentage = faker.number.int({ min: 2, max: 10 })
  const deviceTotal =
    mobilePercentage + desktopPercentage + tabletPercentage + tvPercentage

  const deviceDemographics: DeviceDemographics[] = [
    {
      device: 'Mobile',
      percentage: Math.round((mobilePercentage / deviceTotal) * 100),
    },
    {
      device: 'Desktop',
      percentage: Math.round((desktopPercentage / deviceTotal) * 100),
    },
    {
      device: 'Tablet',
      percentage: Math.round((tabletPercentage / deviceTotal) * 100),
    },
    {
      device: 'TV',
      percentage: Math.round((tvPercentage / deviceTotal) * 100),
    },
  ]

  // Ensure device percentages sum to 100
  const totalDevices = deviceDemographics.reduce(
    (sum, item) => sum + item.percentage,
    0
  )
  if (totalDevices !== 100) {
    deviceDemographics[0].percentage += 100 - totalDevices
  }

  // Generate country data
  const countries = [
    'United States',
    'India',
    'United Kingdom',
    'Canada',
    'Australia',
    'Germany',
    'Brazil',
    'Nigeria',
    'Philippines',
    'Other',
  ]
  const totalSubscribers = faker.number.int({ min: 10000, max: 200000 })

  const countryData: CountryData[] = countries.map((country) => {
    let percentage: number
    if (country === 'United States') {
      percentage = faker.number.int({ min: 25, max: 40 })
    } else if (country === 'India') {
      percentage = faker.number.int({ min: 15, max: 30 })
    } else if (
      country === 'United Kingdom' ||
      country === 'Canada' ||
      country === 'Australia'
    ) {
      percentage = faker.number.int({ min: 4, max: 10 })
    } else if (country === 'Other') {
      percentage = faker.number.int({ min: 5, max: 15 })
    } else {
      percentage = faker.number.int({ min: 1, max: 5 })
    }

    return {
      country,
      percentage,
      subscriberCount: Math.round((percentage / 100) * totalSubscribers),
    }
  })

  // Adjust country percentages to sum to 100
  const totalCountryPercentage = countryData.reduce(
    (sum, item) => sum + item.percentage,
    0
  )
  countryData.forEach((item) => {
    item.percentage = Math.round(
      (item.percentage / totalCountryPercentage) * 100
    )
    item.subscriberCount = Math.round(
      (item.percentage / 100) * totalSubscribers
    )
  })

  // Generate subscriber activity by day of week
  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ]
  const subscriberActivity = days.map((day) => ({
    day,
    activePercentage: faker.number.int({
      min: 20,
      max: day === 'Saturday' || day === 'Sunday' ? 65 : 50,
    }),
  }))

  // Generate trend data (30 days)
  const generateTrendData = (
    min: number,
    max: number,
    trend: 'up' | 'down' | 'stable' = 'up'
  ): TrendData[] => {
    const result: TrendData[] = []
    const today = new Date()
    let currentValue = faker.number.int({ min, max })

    for (let i = 29; i >= 0; i--) {
      const date = new Date()
      date.setDate(today.getDate() - i)

      // Generate change based on trend
      let changeFactor: number
      if (trend === 'up') {
        changeFactor = faker.number.float({
          min: -0.03,
          max: 0.08,
          precision: 0.01,
        })
      } else if (trend === 'down') {
        changeFactor = faker.number.float({
          min: -0.08,
          max: 0.03,
          precision: 0.01,
        })
      } else {
        // stable
        changeFactor = faker.number.float({
          min: -0.03,
          max: 0.03,
          precision: 0.01,
        })
      }

      currentValue = Math.max(min, currentValue + currentValue * changeFactor)

      result.push({
        date: date.toISOString().split('T')[0],
        value: Math.round(currentValue),
      })
    }

    return result
  }

  const viewsPerSubscriberTrend = generateTrendData(8, 15, 'stable')
  const watchTimeTrend = generateTrendData(5000, 10000, 'up')
  const audienceRetentionTrend = generateTrendData(35, 55, 'up')

  // Generate hour distribution data
  const subscribersDates: DateDistribution[] = Array.from(
    { length: 24 },
    (_, hour) => {
      let percentage: number
      if (hour >= 17 && hour <= 23) {
        // Evening hours
        percentage = faker.number.float({ min: 6, max: 10, precision: 0.1 })
      } else if (hour >= 9 && hour <= 16) {
        // Day hours
        percentage = faker.number.float({ min: 3, max: 6, precision: 0.1 })
      } else {
        // Night/early morning
        percentage = faker.number.float({ min: 0.5, max: 3, precision: 0.1 })
      }
      return { hour, percentage }
    }
  )

  // Adjust to 100%
  const totalHourPercentage = subscribersDates.reduce(
    (sum, item) => sum + item.percentage,
    0
  )
  subscribersDates.forEach((item) => {
    item.percentage = parseFloat(
      ((item.percentage / totalHourPercentage) * 100).toFixed(1)
    )
  })

  // Generate top subscribed videos
  const generateTopSubscribedVideos = (): TopSubscribedVideo[] => {
    const videos: TopSubscribedVideo[] = []

    for (let i = 0; i < 5; i++) {
      const subscribersGained = faker.number.int({ min: 100, max: 3000 })
      const subscribersLost = faker.number.int({
        min: 10,
        max: subscribersGained * 0.4,
      })
      const netGain = subscribersGained - subscribersLost
      const views = faker.number.int({
        min: subscribersGained * 10,
        max: subscribersGained * 30,
      })
      const conversionRate = parseFloat(
        ((subscribersGained / views) * 100).toFixed(2)
      )

      videos.push({
        id: faker.string.alphanumeric(11),
        title: faker.lorem.sentence(),
        thumbnailUrl: faker.image.urlLoremFlickr({
          width: 1280,
          height: 720,
          category: 'technology',
        }),
        subscribersGained,
        subscribersLost,
        netGain,
        conversionRate,
        publishedAt: faker.date.recent({ days: 60 }).toISOString(),
      })
    }

    return videos.sort((a, b) => b.netGain - a.netGain)
  }

  // Generate audience types
  const audienceTypes: AudienceType[] = [
    {
      type: 'Casual Viewers',
      percentage: faker.number.int({ min: 35, max: 50 }),
    },
    {
      type: 'Dedicated Fans',
      percentage: faker.number.int({ min: 20, max: 35 }),
    },
    { type: 'Creators', percentage: faker.number.int({ min: 10, max: 25 }) },
    {
      type: 'Industry Professionals',
      percentage: faker.number.int({ min: 5, max: 15 }),
    },
  ]

  // Adjust to 100%
  const totalAudiencePercentage = audienceTypes.reduce(
    (sum, item) => sum + item.percentage,
    0
  )
  audienceTypes.forEach((item) => {
    item.percentage = Math.round(
      (item.percentage / totalAudiencePercentage) * 100
    )
  })

  // Generate traffic source data
  const trafficSources = [
    'Suggested videos',
    'Browse features',
    'YouTube search',
    'External',
    'Direct or unknown',
  ]
  const watchTimeByTrafficSource: TrafficSourceData[] = []
  let totalMinutes = 0

  trafficSources.forEach((source) => {
    let minutes: number
    if (source === 'Suggested videos') {
      minutes = faker.number.int({ min: 50000, max: 120000 })
    } else if (source === 'Browse features') {
      minutes = faker.number.int({ min: 40000, max: 100000 })
    } else if (source === 'YouTube search') {
      minutes = faker.number.int({ min: 30000, max: 80000 })
    } else if (source === 'External') {
      minutes = faker.number.int({ min: 10000, max: 40000 })
    } else {
      minutes = faker.number.int({ min: 5000, max: 20000 })
    }

    totalMinutes += minutes

    watchTimeByTrafficSource.push({
      source,
      minutes,
      percentage: 0, // Will be calculated after all minutes are generated
    })
  })

  // Calculate percentages based on total minutes
  watchTimeByTrafficSource.forEach((item) => {
    item.percentage = Math.round((item.minutes / totalMinutes) * 100)
  })

  // Generate subscriber change
  const subscriberChange = {
    count: faker.number.int({ min: 500, max: 5000 }),
    percentage: faker.number.float({ min: 2, max: 15, precision: 0.1 }),
  }

  // Generate notification stats
  const notificationStats = {
    enabled: faker.number.int({ min: 15, max: 40 }),
    clickRate: faker.number.float({ min: 3, max: 15, precision: 0.1 }),
    bellIconRate: faker.number.float({ min: 12, max: 35, precision: 0.1 }),
  }

  return {
    totalSubscribers,
    subscriberChange,
    demographics: {
      age: ageDemographics,
      gender: {
        male: malePercentage,
        female: femalePercentage,
        other: otherPercentage,
      },
      devices: deviceDemographics,
    },
    countries: countryData,
    subscriberActivity,
    viewsPerSubscriberTrend,
    notificationStats,
    watchTimeByTrafficSource,
    subscribersDates,
    watchTimeTrend,
    topSubscribedVideos: generateTopSubscribedVideos(),
    audienceTypes,
    returningViewerPercentage: faker.number.float({
      min: 20,
      max: 45,
      precision: 0.1,
    }),
    audienceRetentionTrend,
  }
}

// Mock API function to fetch audience analytics
const fetchAudienceAnalytics = async (): Promise<AudienceAnalytics> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  return generateMockAudienceAnalytics()
}

// Custom hook for fetching audience analytics
export const useAudienceAnalytics = () => {
  return useQuery({
    queryKey: ['audienceAnalytics'],
    queryFn: fetchAudienceAnalytics,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
