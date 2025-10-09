// filepath: src\features\social-media\youtube\insights\useVideoInsights.ts
import { useQuery } from '@tanstack/react-query'
import { faker } from '@faker-js/faker'
import { YouTubeVideo } from '../videos/useYouTubeVideos'

export interface VideoInsight {
  videoId: string
  title: string
  thumbnailUrl: string
  publishedAt: string
  retentionRate: number // percentage of average view duration
  averageViewDuration: string // formatted as MM:SS
  ctr: number // click-through rate percentage
  viewsPerHour: number // for new videos
  viewsLast48Hours: number
  viewsLast7Days: number
  viewsLast30Days: number
  subscribersGained: number
  impressions: number
  audienceRetention: RetentionPoint[]
  audienceSourcesData: AudienceSource[]
  trafficSources: TrafficSource[]
  performanceScore: number // 0-100 rating
  recommendationImpressions: number
}

export interface RetentionPoint {
  position: number // percentage position in video
  retentionPercentage: number // percentage of viewers still watching
}

export interface AudienceSource {
  source: string
  percentage: number
}

export interface TrafficSource {
  source: string
  percentage: number
  views: number
}

// Generate mock video insights data
const generateMockVideoInsights = (video: YouTubeVideo): VideoInsight => {
  const isShort = video.type === 'short'
  const publishDate = new Date(video.publishedAt)
  const daysAgo = Math.floor(
    (Date.now() - publishDate.getTime()) / (1000 * 60 * 60 * 24)
  )

  // Generate realistic retention points (typical drop-off pattern)
  const generateRetention = (): RetentionPoint[] => {
    const points = []
    let currentRetention = 100

    // Initial drop (first 10%)
    currentRetention -= faker.number.int({ min: 5, max: 15 })
    points.push({ position: 0, retentionPercentage: 100 })
    points.push({ position: 10, retentionPercentage: currentRetention })

    // Middle section drops (10% to 80%)
    for (let i = 20; i <= 80; i += 10) {
      const dropAmount = faker.number.int({ min: 2, max: 8 })
      currentRetention -= dropAmount
      points.push({ position: i, retentionPercentage: currentRetention })
    }

    // Final section (80% to 100%) - steeper drop for long videos, less for shorts
    const finalDropFactor = isShort ? 0.7 : 1.2
    for (let i = 90; i <= 100; i += 10) {
      const dropAmount = faker.number.int({ min: 3, max: 10 }) * finalDropFactor
      currentRetention -= dropAmount
      points.push({
        position: i,
        retentionPercentage: Math.max(currentRetention, i === 100 ? 5 : 15),
      })
    }

    return points
  }

  // Average view duration calculation based on retention curve
  const calculateAverageDuration = (
    retentionPoints: RetentionPoint[]
  ): string => {
    const totalDuration = isShort
      ? parseInt(video.duration.split(':')[1])
      : parseInt(video.duration.split(':')[0]) * 60 +
        parseInt(video.duration.split(':')[1])

    // Calculate average retention percentage
    let totalRetention = 0
    retentionPoints.forEach((point) => {
      totalRetention += point.retentionPercentage
    })
    const averageRetention = totalRetention / retentionPoints.length

    // Calculate seconds watched
    const secondsWatched = Math.floor(totalDuration * (averageRetention / 100))
    const minutes = Math.floor(secondsWatched / 60)
    const seconds = secondsWatched % 60

    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const retentionPoints = generateRetention()
  const avgDuration = calculateAverageDuration(retentionPoints)

  // Calculate overall retention rate
  const totalRetention = retentionPoints.reduce(
    (sum, point) => sum + point.retentionPercentage,
    0
  )
  const retentionRate = Math.round(totalRetention / retentionPoints.length)

  // Generate audience sources
  const generateAudienceSources = (): AudienceSource[] => {
    const sources = [
      {
        source: 'Subscribers',
        percentage: faker.number.int({ min: 15, max: 45 }),
      },
      { source: 'Non-subscribers', percentage: 0 },
    ]

    sources[1].percentage = 100 - sources[0].percentage
    return sources
  }

  // Generate traffic sources
  const generateTrafficSources = (): TrafficSource[] => {
    const sources = [
      {
        source: 'YouTube search',
        percentage: faker.number.int({
          min: isShort ? 5 : 15,
          max: isShort ? 15 : 40,
        }),
        views: 0,
      },
      {
        source: 'Browse features',
        percentage: faker.number.int({ min: 10, max: 30 }),
        views: 0,
      },
      {
        source: 'Suggested videos',
        percentage: faker.number.int({ min: 10, max: 35 }),
        views: 0,
      },
      {
        source: isShort ? 'Shorts feed' : 'External',
        percentage: 0,
        views: 0,
      },
    ]

    // Adjust the last source to make total 100%
    const allocatedPercentage = sources
      .slice(0, 3)
      .reduce((sum, src) => sum + src.percentage, 0)
    sources[3].percentage = 100 - allocatedPercentage

    // Calculate views
    sources.forEach((source) => {
      source.views = Math.floor((source.percentage / 100) * video.views)
    })

    return sources
  }

  // Generate performance score (based on video age, engagement, views)
  const calculatePerformanceScore = (): number => {
    // Base score depends on engagement and views
    const engagementRate = ((video.likes + video.comments) / video.views) * 100
    let score = 0

    // Newer videos get a boost
    if (daysAgo <= 7) {
      score += faker.number.int({ min: 10, max: 25 })
    }

    // Engagement rate impact
    if (engagementRate > 10) score += 40
    else if (engagementRate > 5) score += 30
    else if (engagementRate > 3) score += 20
    else score += 10

    // Views impact
    if (video.views > 100000) score += 30
    else if (video.views > 10000) score += 20
    else if (video.views > 1000) score += 10
    else score += 5

    // Add randomness
    score += faker.number.int({ min: -5, max: 5 })

    // Clamp between 0-100
    return Math.min(100, Math.max(0, score))
  }

  // Calculate impressions (always more than views)
  const impressions =
    video.views * faker.number.float({ min: 5, max: 20, precision: 0.1 })
  const ctr = (video.views / impressions) * 100

  const trafficSources = generateTrafficSources()

  return {
    videoId: video.id,
    title: video.title,
    thumbnailUrl: video.thumbnailUrl,
    publishedAt: video.publishedAt,
    retentionRate,
    averageViewDuration: avgDuration,
    ctr: parseFloat(ctr.toFixed(1)),
    viewsPerHour:
      daysAgo <= 2 ? Math.floor(video.views / (daysAgo * 24 || 1)) : 0,
    viewsLast48Hours:
      daysAgo <= 30 ? Math.floor(video.views * (daysAgo <= 2 ? 1 : 0.15)) : 0,
    viewsLast7Days:
      daysAgo <= 30 ? Math.floor(video.views * (daysAgo <= 7 ? 1 : 0.4)) : 0,
    viewsLast30Days:
      daysAgo <= 60 ? Math.floor(video.views * (daysAgo <= 30 ? 1 : 0.7)) : 0,
    subscribersGained: Math.floor(
      video.views *
        faker.number.float({ min: 0.001, max: 0.05, precision: 0.001 })
    ),
    impressions: Math.floor(impressions),
    audienceRetention: retentionPoints,
    audienceSourcesData: generateAudienceSources(),
    trafficSources,
    performanceScore: calculatePerformanceScore(),
    recommendationImpressions: Math.floor(
      (impressions *
        (trafficSources.find((s) => s.source === 'Suggested videos')
          ?.percentage || 20)) /
        100
    ),
  }
}

// Mock API function to fetch video insights
const fetchVideoInsights = async (videoId: string): Promise<VideoInsight> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 600))

  // Create a mock video first
  const mockVideo: YouTubeVideo = {
    id: videoId,
    title: faker.lorem.sentence(),
    thumbnailUrl: faker.image.urlLoremFlickr({
      category: 'technology',
      width: 1280,
      height: 720,
    }),
    views: faker.number.int({ min: 1000, max: 500000 }),
    likes: faker.number.int({ min: 100, max: 50000 }),
    comments: faker.number.int({ min: 10, max: 5000 }),
    publishedAt: faker.date.recent({ days: 60 }).toISOString(),
    type: faker.helpers.arrayElement(['short', 'long']),
    duration: faker.helpers.arrayElement(['0:45', '3:22', '8:15', '12:48']),
    description: faker.lorem.paragraph(),
    tags: Array.from({ length: 5 }, () => faker.word.sample()),
  }

  return generateMockVideoInsights(mockVideo)
}

// Custom hook for fetching video insights
export const useVideoInsights = (videoId?: string) => {
  return useQuery({
    queryKey: ['videoInsights', videoId],
    queryFn: () => fetchVideoInsights(videoId!),
    enabled: !!videoId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
