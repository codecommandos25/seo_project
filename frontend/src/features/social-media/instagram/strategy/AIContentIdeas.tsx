import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Copy, Edit, Bookmark, RefreshCw, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface ContentIdea {
  id: string
  title: string
  caption: string
  type: 'carousel' | 'reels' | 'post'
}

// Mock function to generate content ideas
const fetchContentIdeas = async (): Promise<ContentIdea[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return [
    {
      id: '1',
      type: 'carousel',
      title: '5 Essential SEO Tips for 2025',
      caption:
        "Boost your website's visibility with these 5 essential SEO tips that still work in 2025! 💻\n\n1️⃣ Focus on user experience metrics\n2️⃣ Create high-quality, in-depth content\n3️⃣ Optimize for voice search\n4️⃣ Build quality backlinks\n5️⃣ Leverage AI for content optimization\n\nWhich tip will you implement first? Let me know in the comments! 👇\n\n#SEOtips #DigitalMarketing #WebsiteOptimization",
    },
    {
      id: '2',
      type: 'reels',
      title: 'Behind-the-Scenes Content Creation',
      caption:
        "Ever wonder how we create our marketing content? Here's a quick behind-the-scenes peek at our process from ideation to execution! 🎬\n\nShowing you how the magic happens step-by-step because transparency is everything in 2025! What behind-the-scenes content would you like to see next?\n\n#BehindTheScenes #ContentCreation #MarketingLife #Reels",
    },
    {
      id: '3',
      type: 'post',
      title: 'Client Success Story',
      caption:
        "🎉 SUCCESS STORY ALERT! 🎉\n\nWe helped @clientname increase their organic traffic by 215% in just 3 months!\n\nTheir challenge: Low visibility in search results despite quality products\nOur solution: Comprehensive SEO strategy with technical fixes and content optimization\nThe result: 3X traffic and 150% increase in conversions\n\nWant similar results for your business? Let's chat!\n\n#ClientSuccess #SEOResults #BusinessGrowth",
    },
    {
      id: '4',
      type: 'carousel',
      title: 'Social Media Trends for 2025',
      caption:
        '🔮 These social media trends are shaping marketing in 2025! Swipe through to see all 6 trends you need to know about.\n\n1. AI-powered personalization is now expected\n2. Micro-communities over mass followers\n3. Authentic, unfiltered content outperforms polished posts\n4. Voice search optimization is essential\n5. AR/VR experiences are mainstream\n6. Social commerce integration is non-negotiable\n\nWhich trend excites you most? Or which one are you already implementing?\n\n#SocialMediaTrends #DigitalMarketing #2025Trends',
    },
    {
      id: '5',
      type: 'post',
      title: 'Industry Insights Q&A',
      caption:
        "You asked, we answered! 🎤\n\nHere are responses to your top marketing questions from last week's poll:\n\nQ: Is SEO still worth it in 2025?\nA: Absolutely! But it's evolved—focus on user experience, helpful content, and solving search intent.\n\nQ: How often should I post on social media?\nA: Quality > quantity. 2-3 strategic, high-value posts weekly outperform daily low-effort content.\n\nMore questions? Drop them below!\n\n#MarketingQA #DigitalMarketing #ExpertTips",
    },
  ]
}

export default function AIContentIdeas() {
  const [activeType, setActiveType] = useState<'carousel' | 'reels' | 'post'>(
    'post'
  )

  const {
    data: ideas,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ['contentIdeas'],
    queryFn: fetchContentIdeas,
    staleTime: 1000 * 60 * 30, // 30 minutes
  })

  const filteredIdeas =
    ideas?.filter((idea) => activeType === 'all' || idea.type === activeType) ||
    []

  const copyCaption = (caption: string) => {
    navigator.clipboard.writeText(caption)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Content Ideas</CardTitle>
        <CardDescription>
          Get inspired with AI-generated content suggestions for your Instagram
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          value={activeType}
          onValueChange={(value) =>
            setActiveType(value as 'carousel' | 'reels' | 'post')
          }
        >
          <TabsList className='mb-4'>
            <TabsTrigger value='post'>Feed Posts</TabsTrigger>
            <TabsTrigger value='carousel'>Carousels</TabsTrigger>
            <TabsTrigger value='reels'>Reels</TabsTrigger>
          </TabsList>

          {isLoading ? (
            <div className='flex items-center justify-center py-8'>
              <Loader2 className='h-8 w-8 animate-spin text-muted-foreground' />
            </div>
          ) : (
            <>
              <div className='mb-4 flex justify-end'>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => refetch()}
                  disabled={isRefetching}
                  className='flex items-center gap-1'
                >
                  <RefreshCw
                    className={`h-3 w-3 ${isRefetching ? 'animate-spin' : ''}`}
                  />
                  {isRefetching ? 'Refreshing...' : 'Refresh Ideas'}
                </Button>
              </div>

              <TabsContent value={activeType} className='space-y-4'>
                {filteredIdeas.map((idea) => (
                  <Card key={idea.id} className='overflow-hidden'>
                    <CardHeader className='py-3'>
                      <CardTitle className='text-base'>{idea.title}</CardTitle>
                      <CardDescription className='text-xs'>
                        Type:{' '}
                        {idea.type.charAt(0).toUpperCase() + idea.type.slice(1)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className='pb-3 pt-0'>
                      <div className='whitespace-pre-line rounded-md bg-muted/40 p-3 text-sm'>
                        {idea.caption}
                      </div>
                    </CardContent>
                    <CardFooter className='flex gap-2 pt-0'>
                      <Button
                        variant='outline'
                        size='sm'
                        className='flex-1'
                        onClick={() => copyCaption(idea.caption)}
                      >
                        <Copy className='mr-2 h-4 w-4' />
                        Copy Caption
                      </Button>
                      <Button variant='outline' size='sm' className='flex-1'>
                        <Edit className='mr-2 h-4 w-4' />
                        Edit
                      </Button>
                      <Button variant='outline' size='sm' className='flex-1'>
                        <Bookmark className='mr-2 h-4 w-4' />
                        Save
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </TabsContent>
            </>
          )}
        </Tabs>
      </CardContent>
    </Card>
  )
}
