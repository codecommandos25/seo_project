import { useQuery } from '@tanstack/react-query'
import { faker } from '@faker-js/faker'

// Facebook post type definition
export interface FacebookPost {
    id: string
    text: string
    imageUrl: string | null
    videoUrl: string | null
    likes: number
    comments: number
    shares: number
    createdAt: string
    type: 'text' | 'image' | 'video' | 'link'
    link?: string
    linkTitle?: string
    linkDescription?: string
}

// Function to generate mock Facebook posts
const generateMockPosts = (count: number): FacebookPost[] => {
    const postTypes: ('text' | 'image' | 'video' | 'link')[] = ['text', 'image', 'video', 'link'];

    return Array.from({ length: count }, () => {
        const type = faker.helpers.arrayElement(postTypes);
        const hasImage = type === 'image' || type === 'link';
        const hasVideo = type === 'video';

        return {
            id: faker.string.uuid(),
            text: faker.lorem.paragraph(),
            imageUrl: hasImage ? faker.image.urlLoremFlickr({ category: 'business', width: 1200, height: 630 }) : null,
            videoUrl: hasVideo ? 'https://example.com/sample-video.mp4' : null,
            likes: faker.number.int({ min: 5, max: 2000 }),
            comments: faker.number.int({ min: 0, max: 200 }),
            shares: faker.number.int({ min: 0, max: 50 }),
            createdAt: faker.date.recent({ days: 30 }).toISOString(),
            type,
            link: type === 'link' ? faker.internet.url() : undefined,
            linkTitle: type === 'link' ? faker.company.name() : undefined,
            linkDescription: type === 'link' ? faker.company.catchPhrase() : undefined
        }
    })
}

// Mock API function to fetch Facebook posts
const fetchFacebookPosts = async (): Promise<FacebookPost[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 600))
    return generateMockPosts(10)
}

// Custom hook for fetching Facebook posts
export const useFacebookPosts = () => {
    return useQuery({
        queryKey: ['facebookPosts'],
        queryFn: fetchFacebookPosts,
        staleTime: 1000 * 60 * 5, // 5 minutes
    })
}
