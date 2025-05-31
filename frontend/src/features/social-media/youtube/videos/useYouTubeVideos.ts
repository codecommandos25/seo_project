// filepath: src\features\social-media\youtube\videos\useYouTubeVideos.ts
import { useQuery } from '@tanstack/react-query'
import { faker } from '@faker-js/faker'

// YouTube video type definition
export interface YouTubeVideo {
    id: string
    title: string
    thumbnailUrl: string
    views: number
    likes: number
    comments: number
    publishedAt: string
    type: 'short' | 'long'
    duration: string // formatted as MM:SS or HH:MM:SS
    description: string
    tags: string[]
}

// Function to generate mock YouTube videos
const generateMockVideos = (count: number): YouTubeVideo[] => {
    const videoTypes: ('short' | 'long')[] = ['short', 'long']

    return Array.from({ length: count }, () => {
        const type = faker.helpers.arrayElement(videoTypes)
        const isShort = type === 'short'

        // Generate duration based on video type (shorts are under 60 seconds)
        let duration = ''
        if (isShort) {
            duration = `0:${faker.number.int({ min: 15, max: 59 }).toString().padStart(2, '0')}`
        } else {
            const minutes = faker.number.int({ min: 3, max: 25 })
            const seconds = faker.number.int({ min: 0, max: 59 })
            if (minutes >= 60) {
                const hours = Math.floor(minutes / 60)
                const remainingMinutes = minutes % 60
                duration = `${hours}:${remainingMinutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
            } else {
                duration = `${minutes}:${seconds.toString().padStart(2, '0')}`
            }
        }

        // Generate tags
        const tagCount = faker.number.int({ min: 3, max: 8 })
        const tags = Array.from({ length: tagCount }, () => faker.word.sample())

        // Calculate publish date (newer for shorts, more distributed for long videos)
        const maxAgeDays = isShort ? 60 : 365
        const publishDate = faker.date.recent({ days: maxAgeDays })

        return {
            id: faker.string.alphanumeric(11),
            title: generateYouTubeTitle(type),
            thumbnailUrl: faker.image.urlLoremFlickr({ category: isShort ? 'people' : 'technology', width: 1280, height: isShort ? 720 : 720 }),
            views: isShort
                ? faker.number.int({ min: 10000, max: 1000000 })
                : faker.number.int({ min: 1000, max: 250000 }),
            likes: isShort
                ? faker.number.int({ min: 1000, max: 100000 })
                : faker.number.int({ min: 100, max: 25000 }),
            comments: isShort
                ? faker.number.int({ min: 50, max: 5000 })
                : faker.number.int({ min: 10, max: 2000 }),
            publishedAt: publishDate.toISOString(),
            type,
            duration,
            description: faker.lorem.paragraph(),
            tags
        }
    })
}

// Helper function to generate realistic YouTube titles
const generateYouTubeTitle = (type: 'short' | 'long'): string => {
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
    }

    const templates = type === 'short' ? titleTemplates.short : titleTemplates.long
    let template = faker.helpers.arrayElement(templates)

    // Replace placeholders
    if (template.includes('{verb}')) {
        template = template.replace('{verb}', faker.helpers.arrayElement([
            'master', 'optimize', 'improve', 'grow', 'build', 'learn', 'create', 'transform', 'boost'
        ]))
    }

    if (template.includes('{noun}')) {
        template = template.replace('{noun}', faker.helpers.arrayElement([
            'channel', 'business', 'skills', 'workflow', 'productivity', 'content', 'portfolio', 'strategy'
        ]))
    }

    if (template.includes('{topic}')) {
        template = template.replace('{topic}', faker.helpers.arrayElement([
            'YouTube Growth', 'Content Creation', 'Digital Marketing', 'SEO', 'Social Media Strategy',
            'Video Editing', 'Passive Income', 'Monetization', 'Algorithm Hacks'
        ]))
    }

    if (template.includes('{number}')) {
        template = template.replace('{number}', faker.helpers.arrayElement([
            '3', '5', '7', '10', '12'
        ]))
    }

    if (template.includes('{situation}')) {
        template = template.replace('{situation}', faker.helpers.arrayElement([
            'it fails', 'nobody cares', 'everyone laughs', 'it actually works', 'you\'re doing it wrong'
        ]))
    }

    return template
}

// Mock API function to fetch YouTube videos
const fetchYouTubeVideos = async (videoType?: string, page: number = 1, perPage: number = 12): Promise<{
    videos: YouTubeVideo[];
    totalCount: number;
}> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    const totalVideos = 50 // Total available videos in our "database"
    const allVideos = generateMockVideos(totalVideos)

    // Apply filter if provided
    let filteredVideos = allVideos
    if (videoType && videoType !== 'all') {
        filteredVideos = allVideos.filter(video => video.type === videoType)
    }

    // Sort by published date (newest first)
    filteredVideos = filteredVideos.sort((a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )

    // Get the current page of videos
    const start = (page - 1) * perPage
    const end = start + perPage
    const paginatedVideos = filteredVideos.slice(start, end)

    return {
        videos: paginatedVideos,
        totalCount: filteredVideos.length
    }
}

// Custom hook for fetching YouTube videos
export const useYouTubeVideos = (videoType: string = 'all', page: number = 1, perPage: number = 12) => {
    return useQuery({
        queryKey: ['youtubeVideos', videoType, page, perPage],
        queryFn: () => fetchYouTubeVideos(videoType, page, perPage),
        staleTime: 1000 * 60 * 5, // 5 minutes
    })
}
