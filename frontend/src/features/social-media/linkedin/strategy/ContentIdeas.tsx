// filepath: src\features\social-media\linkedin\strategy\ContentIdeas.tsx
import { useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, Copy, Edit, Loader2, Save, Sparkles } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/hooks/use-toast"

type ContentType = 'thought-leadership' | 'hiring' | 'industry-news' | 'company-update' | 'product-launch'

interface ContentIdea {
    id: string
    type: ContentType
    title: string
    content: string
}

const contentIdeaTemplates: Record<ContentType, ContentIdea[]> = {
    'thought-leadership': [
        {
            id: 'tl1',
            type: 'thought-leadership',
            title: 'Emerging Industry Trends',
            content: "The most successful leaders I've worked with share one common trait: they anticipate change rather than react to it.\n\nHere are 3 emerging trends I'm seeing in our industry that will reshape how we work in 2025:\n\n1️⃣ [Trend One]\n2️⃣ [Trend Two]\n3️⃣ [Trend Three]\n\nWhich of these do you think will have the biggest impact? And what trends would you add to this list?\n\n#LeadershipInsights #IndustryTrends #FutureOfWork"
        },
        {
            id: 'tl2',
            type: 'thought-leadership',
            title: 'Leadership Philosophy',
            content: "After 15+ years of building teams, I've learned that true leadership isn't about having all the answers—it's about asking the right questions.\n\nThe five questions I ask myself daily as a leader:\n\n1. How am I empowering my team today?\n2. What assumptions am I making that I should challenge?\n3. Whose voice haven't I heard recently?\n4. What long-term investment am I neglecting for short-term gains?\n5. How am I measuring success beyond the numbers?\n\nWhat questions guide your leadership approach?\n\n#LeadershipPhilosophy #TeamBuilding #ExecutiveGrowth"
        }
    ],
    'hiring': [
        {
            id: 'h1',
            type: 'hiring',
            title: 'Job Opening Announcement',
            content: "We're growing our team! 🚀\n\nI'm excited to share that we're looking for a [Job Title] to join our [Department] team.\n\nWhat you'll do:\n• [Key Responsibility 1]\n• [Key Responsibility 2]\n• [Key Responsibility 3]\n\nWhy join us:\n• [Company Benefit 1]\n• [Company Benefit 2]\n• [Company Benefit 3]\n\nIf this sounds like you or someone in your network, check out the full job description and apply here: [Link]\n\n#Hiring #Careers #JobOpportunity"
        },
        {
            id: 'h2',
            type: 'hiring',
            title: 'Team Culture Spotlight',
            content: "What makes our team special? It's not just what we do, but how we work together.\n\nAs we continue growing, I wanted to share what working at [Company] is really like:\n\n🤝 Collaboration over competition\n💡 Permission to innovate and take smart risks\n🌱 Genuine commitment to personal and professional growth\n🔄 Feedback is a gift we give regularly\n\nWe're hiring across multiple departments. If these values resonate with you, check out our open roles: [Link]\n\n#CompanyCulture #JoinOurTeam #CareerGrowth"
        }
    ],
    'industry-news': [
        {
            id: 'in1',
            type: 'industry-news',
            title: 'Breaking Industry News',
            content: "💡 BIG industry news just dropped:\n\n[Company/Regulatory Body] has announced [brief description of news].\n\nWhat this means for our industry:\n\n✅ [Impact point 1]\n✅ [Impact point 2]\n✅ [Impact point 3]\n\nMy initial thoughts: [your brief analysis]\n\nI'd love to hear what others think about this development. Will this change how you approach [relevant area]?\n\n#IndustryNews #MarketTrends #ProfessionalInsights"
        },
        {
            id: 'in2',
            type: 'industry-news',
            title: 'Industry Report Summary',
            content: "I just finished reading [Report Name]'s latest industry report, and these 3 findings stood out:\n\n📊 [Statistic/Finding 1]\n📊 [Statistic/Finding 2]\n📊 [Statistic/Finding 3]\n\nParticularly interesting was [specific insight], which contradicts what many of us have assumed about [topic].\n\nHave you reviewed this report? What caught your attention?\n\nHappy to share more insights if anyone's interested.\n\n#IndustryResearch #DataInsights #MarketTrends"
        }
    ],
    'company-update': [
        {
            id: 'cu1',
            type: 'company-update',
            title: 'Company Milestone',
            content: "Proud moment for our team! 🎉\n\nToday [Company] reached a significant milestone: [achievement].\n\nThis wouldn't have been possible without:\n• Our incredible team pushing boundaries every day\n• Our customers who trust us with their business\n• Our partners who amplify our capabilities\n\nA special thank you to [specific team or individuals] who went above and beyond to make this happen.\n\nExcited for what's next on our journey!\n\n#CompanyMilestone #TeamAchievement #GrowthJourney"
        },
        {
            id: 'cu2',
            type: 'company-update',
            title: 'Office Culture',
            content: "What does a day at [Company] look like?\n\nSpoiler: It's not just about work.\n\nYesterday we:\n• [Fun team activity]\n• Celebrated [team member]'s 5-year anniversary\n• [Other meaningful moment]\n\nBuilding a company is about more than metrics and deliverables—it's about creating a place where people genuinely enjoy spending their time.\n\nWhat does your workplace do to foster connection and engagement?\n\n#CompanyCulture #TeamBuilding #WorkplaceHappiness"
        }
    ],
    'product-launch': [
        {
            id: 'pl1',
            type: 'product-launch',
            title: 'New Product Announcement',
            content: "🚀 JUST LAUNCHED: Introducing [Product Name]\n\nAfter [time period] of development, customer interviews, and rigorous testing, we're thrilled to announce our newest solution designed to [primary value proposition].\n\nKey features:\n✨ [Feature 1]: [Brief benefit]\n✨ [Feature 2]: [Brief benefit]\n✨ [Feature 3]: [Brief benefit]\n\nWe built this because [customer problem or market gap].\n\nExplore how [Product Name] can transform your [relevant process/outcome]: [Link]\n\n#ProductLaunch #Innovation #[Industry]Technology"
        },
        {
            id: 'pl2',
            type: 'product-launch',
            title: 'Product Demo Preview',
            content: "Seeing is believing—which is why I'm excited to share this sneak peek of our new [Product/Feature].\n\nIn this short demo, you'll see how [Product/Feature] helps you:\n• [Benefit 1]\n• [Benefit 2]\n• [Benefit 3]\n\nWe designed this with [specific user persona] in mind, focusing on solving [specific pain point].\n\nInterested in a personalized demo? Drop a comment or DM me.\n\n#ProductDemo #Innovation #UserExperience"
        }
    ]
}

export default function ContentIdeas() {
    const [selectedType, setSelectedType] = useState<ContentType>('thought-leadership')
    const [topic, setTopic] = useState('')
    const [isGenerating, setIsGenerating] = useState(false)
    const [generatedIdeas, setGeneratedIdeas] = useState<ContentIdea[]>([])
    const [savedIdeas, setSavedIdeas] = useState<ContentIdea[]>([])
    const [editingIdea, setEditingIdea] = useState<string | null>(null)
    const [editContent, setEditContent] = useState('')

    const handleGenerateIdeas = () => {
        setIsGenerating(true)

        // Simulate API delay
        setTimeout(() => {
            // Get template ideas for the selected type
            const ideas = contentIdeaTemplates[selectedType] || []

            // Create personalized versions by replacing placeholders if a topic is provided
            const personalizedIdeas = ideas.map(idea => {
                let content = idea.content

                // Replace placeholders if topic is provided
                if (topic) {
                    content = content
                        .replace(/\[Company\]/g, topic)
                        .replace(/\[Industry\]/g, topic)
                        .replace(/\[Product Name\]/g, `${topic} Pro`)
                }

                return {
                    ...idea,
                    id: Math.random().toString(36).substring(2, 9),
                    content
                }
            })

            setGeneratedIdeas(personalizedIdeas)
            setIsGenerating(false)
        }, 1500)
    }

    const handleCopyContent = (content: string) => {
        navigator.clipboard.writeText(content)
        toast({
            title: "Copied to clipboard",
            description: "Content has been copied to your clipboard",
        })
    }

    const handleEditIdea = (idea: ContentIdea) => {
        setEditingIdea(idea.id)
        setEditContent(idea.content)
    }

    const handleSaveEdit = (id: string) => {
        setGeneratedIdeas(generatedIdeas.map(idea =>
            idea.id === id ? { ...idea, content: editContent } : idea
        ))
        setEditingIdea(null)
    }

    const handleSaveIdea = (idea: ContentIdea) => {
        setSavedIdeas([...savedIdeas, idea])
        toast({
            title: "Saved to drafts",
            description: "Content idea has been saved to your drafts",
        })
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>LinkedIn Content Ideas</CardTitle>
                <CardDescription>
                    Generate engaging LinkedIn post ideas for your professional brand
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Tabs defaultValue="generate">
                    <TabsList className="mb-4">
                        <TabsTrigger value="generate">Generate Ideas</TabsTrigger>
                        <TabsTrigger value="saved">
                            Saved Drafts ({savedIdeas.length})
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="generate" className="space-y-4">
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="contentType">Content Type</Label>
                                    <Select value={selectedType} onValueChange={(value) => setSelectedType(value as ContentType)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select content type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="thought-leadership">Thought Leadership</SelectItem>
                                            <SelectItem value="hiring">Hiring & Recruitment</SelectItem>
                                            <SelectItem value="industry-news">Industry News</SelectItem>
                                            <SelectItem value="company-update">Company Updates</SelectItem>
                                            <SelectItem value="product-launch">Product Launch</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="topic">Company/Topic (optional)</Label>
                                    <Textarea
                                        id="topic"
                                        placeholder="Enter your company name or specific topic"
                                        value={topic}
                                        onChange={(e) => setTopic(e.target.value)}
                                        className="resize-none h-[38px]"
                                    />
                                </div>
                            </div>

                            <Button
                                onClick={handleGenerateIdeas}
                                disabled={isGenerating}
                                className="w-full"
                            >
                                {isGenerating ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Generating Ideas...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="mr-2 h-4 w-4" />
                                        Generate Content Ideas
                                    </>
                                )}
                            </Button>

                            {/* Generated ideas */}
                            {generatedIdeas.length > 0 && (
                                <div className="space-y-4 mt-6">
                                    <Separator />
                                    <h3 className="font-medium">Generated Ideas</h3>

                                    {generatedIdeas.map((idea) => (
                                        <Card key={idea.id} className="shadow-sm">
                                            <CardHeader className="pb-2">
                                                <CardTitle className="text-base">{idea.title}</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                {editingIdea === idea.id ? (
                                                    <div className="space-y-4">
                                                        <Textarea
                                                            value={editContent}
                                                            onChange={(e) => setEditContent(e.target.value)}
                                                            className="min-h-[180px]"
                                                        />
                                                        <div className="flex justify-end gap-2">
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => setEditingIdea(null)}
                                                            >
                                                                Cancel
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                onClick={() => handleSaveEdit(idea.id)}
                                                            >
                                                                <Check className="mr-2 h-4 w-4" /> Save Changes
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="whitespace-pre-line text-sm">
                                                        {idea.content}
                                                    </div>
                                                )}
                                            </CardContent>
                                            <CardFooter className="flex justify-end gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleCopyContent(idea.content)}
                                                >
                                                    <Copy className="mr-2 h-4 w-4" /> Copy
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleEditIdea(idea)}
                                                >
                                                    <Edit className="mr-2 h-4 w-4" /> Edit
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    onClick={() => handleSaveIdea(idea)}
                                                >
                                                    <Save className="mr-2 h-4 w-4" /> Save to Drafts
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </div>
                    </TabsContent>

                    <TabsContent value="saved">
                        <div className="space-y-4">
                            {savedIdeas.length === 0 ? (
                                <div className="text-center py-8 text-muted-foreground">
                                    No saved drafts yet. Generate and save some ideas!
                                </div>
                            ) : (
                                savedIdeas.map((idea) => (
                                    <Card key={idea.id} className="shadow-sm">
                                        <CardHeader className="pb-2">
                                            <div className="flex justify-between">
                                                <CardTitle className="text-base">{idea.title}</CardTitle>
                                                <Badge>{getContentTypeLabel(idea.type)}</Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="whitespace-pre-line text-sm">
                                                {idea.content}
                                            </div>
                                        </CardContent>
                                        <CardFooter className="flex justify-end gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleCopyContent(idea.content)}
                                            >
                                                <Copy className="mr-2 h-4 w-4" /> Copy
                                            </Button>
                                            <Button size="sm">
                                                Use in Scheduler
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                ))
                            )}
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    )
}

// Helper function to get a display label for content type
function getContentTypeLabel(type: ContentType): string {
    const labels: Record<ContentType, string> = {
        'thought-leadership': 'Thought Leadership',
        'hiring': 'Hiring',
        'industry-news': 'Industry News',
        'company-update': 'Company Update',
        'product-launch': 'Product Launch'
    }
    return labels[type] || type
}
