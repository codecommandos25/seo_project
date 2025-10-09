import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'

// Mock function to simulate AI generating hashtags
const fetchHashtagSuggestions = async (topic: string): Promise<string[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Define some hashtag sets based on common topics
  const hashtagSets = {
    fashion: [
      '#fashionista',
      '#ootd',
      '#style',
      '#fashionblogger',
      '#trendy',
      '#outfitoftheday',
      '#fashionable',
      '#streetstyle',
      '#instafashion',
      '#fashiongram',
    ],
    food: [
      '#foodie',
      '#foodporn',
      '#instafood',
      '#foodstagram',
      '#foodphotography',
      '#yummy',
      '#delicious',
      '#foodlover',
      '#homemade',
      '#tasty',
    ],
    travel: [
      '#travel',
      '#travelgram',
      '#wanderlust',
      '#adventure',
      '#travelphotography',
      '#explore',
      '#instatravel',
      '#traveling',
      '#vacation',
      '#travelblogger',
    ],
    fitness: [
      '#fitness',
      '#workout',
      '#gym',
      '#fitnessmotivation',
      '#fit',
      '#training',
      '#health',
      '#healthy',
      '#bodybuilding',
      '#fitfam',
    ],
    beauty: [
      '#beauty',
      '#makeup',
      '#skincare',
      '#beautiful',
      '#makeupartist',
      '#hair',
      '#selfcare',
      '#natural',
      '#glam',
      '#beautytips',
    ],
    nature: [
      '#nature',
      '#naturephotography',
      '#outdoors',
      '#landscape',
      '#photography',
      '#naturelovers',
      '#hiking',
      '#wildlife',
      '#adventure',
      '#mountains',
    ],
  }

  // Return hashtags based on topic keyword match
  for (const [key, tags] of Object.entries(hashtagSets)) {
    if (topic.toLowerCase().includes(key)) {
      return tags
    }
  }

  // Default hashtags
  return [
    '#instagram',
    '#socialmedia',
    '#content',
    '#marketing',
    '#viral',
    '#trending',
    '#digital',
    '#creator',
    '#engagement',
    '#community',
  ]
}

export default function HashtagSuggestion() {
  const [topic, setTopic] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const {
    data: hashtags,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ['hashtagSuggestions', searchTerm],
    queryFn: () => fetchHashtagSuggestions(searchTerm),
    enabled: searchTerm !== '',
    staleTime: 1000 * 60 * 60, // 1 hour
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSearchTerm(topic)
  }

  const copyAllHashtags = () => {
    if (hashtags) {
      navigator.clipboard.writeText(hashtags.join(' '))
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hashtag Suggestions</CardTitle>
        <CardDescription>
          AI-powered hashtag generator for better Instagram reach
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='flex space-x-2'>
            <Input
              placeholder='Enter content topic or keywords...'
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className='flex-1'
            />
            <Button
              type='submit'
              disabled={isLoading || isRefetching || !topic.trim()}
            >
              {isLoading || isRefetching ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Generating...
                </>
              ) : (
                'Suggest'
              )}
            </Button>
          </div>

          {hashtags && hashtags.length > 0 && (
            <div className='space-y-3'>
              <div className='flex flex-wrap gap-2'>
                {hashtags.map((tag) => (
                  <Badge
                    key={tag}
                    variant='secondary'
                    className='cursor-pointer'
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <Button variant='outline' size='sm' onClick={copyAllHashtags}>
                Copy All Hashtags
              </Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
