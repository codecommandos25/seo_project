import { useQuery } from '@tanstack/react-query'
import { faker } from '@faker-js/faker'

// Instagram post type definition
export interface InstagramPost {
  id: string
  imageUrl: string
  caption: string
  likes: number
  comments: number
  createdAt: string
}

// Function to generate mock Instagram posts
const generateMockPosts = (count: number): InstagramPost[] => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    imageUrl: faker.image.urlLoremFlickr({
      category: 'fashion',
      width: 640,
      height: 640,
    }),
    caption: faker.lorem.sentences({ min: 1, max: 3 }),
    likes: faker.number.int({ min: 10, max: 5000 }),
    comments: faker.number.int({ min: 0, max: 500 }),
    createdAt: faker.date.recent({ days: 30 }).toISOString(),
  }))
}

// Mock API function to fetch Instagram posts
const fetchInstagramPosts = async (): Promise<InstagramPost[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return generateMockPosts(12)
}

// Custom hook for fetching Instagram posts
export const useInstagramPosts = () => {
  return useQuery({
    queryKey: ['instagramPosts'],
    queryFn: fetchInstagramPosts,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
