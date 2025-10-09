// filepath: src\features\social-media\linkedin\posts\useLinkedInPosts.ts
import { useQuery } from '@tanstack/react-query'
import { faker } from '@faker-js/faker'

// LinkedIn post type definition
export interface LinkedInPost {
  id: string
  content: string
  mediaType: 'text' | 'image' | 'article'
  mediaUrl?: string
  articleTitle?: string
  articleSummary?: string
  reactions: number
  comments: number
  impressions: number
  createdAt: string
}

// Function to generate mock LinkedIn posts
const generateMockPosts = (count: number): LinkedInPost[] => {
  const postTypes: ('text' | 'image' | 'article')[] = [
    'text',
    'image',
    'article',
  ]

  return Array.from({ length: count }, () => {
    const mediaType = faker.helpers.arrayElement(postTypes)
    const hasImage = mediaType === 'image'
    const isArticle = mediaType === 'article'

    return {
      id: faker.string.uuid(),
      content: faker.lorem.paragraph(),
      mediaType,
      mediaUrl: hasImage
        ? faker.image.urlLoremFlickr({
            category: 'business',
            width: 1200,
            height: 630,
          })
        : undefined,
      articleTitle: isArticle ? faker.company.catchPhrase() : undefined,
      articleSummary: isArticle
        ? faker.lorem.sentences({ min: 1, max: 2 })
        : undefined,
      reactions: faker.number.int({ min: 5, max: 500 }),
      comments: faker.number.int({ min: 0, max: 50 }),
      impressions: faker.number.int({ min: 100, max: 10000 }),
      createdAt: faker.date.recent({ days: 30 }).toISOString(),
    }
  })
}

// Mock API function to fetch LinkedIn posts
const fetchLinkedInPosts = async (filter?: string): Promise<LinkedInPost[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 700))

  const posts = generateMockPosts(12)

  // Apply filter if provided
  if (filter && filter !== 'all') {
    return posts.filter((post) => post.mediaType === filter)
  }

  return posts
}

// Custom hook for fetching LinkedIn posts
export const useLinkedInPosts = (filter: string = 'all') => {
  return useQuery({
    queryKey: ['linkedinPosts', filter],
    queryFn: () => fetchLinkedInPosts(filter),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
