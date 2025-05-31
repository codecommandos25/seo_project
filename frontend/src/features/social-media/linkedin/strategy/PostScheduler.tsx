// filepath: src\features\social-media\linkedin\strategy\PostScheduler.tsx
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
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon, Clock, Image, Paperclip, Rocket, Calendar as CalendarIcon2 } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"

interface ScheduledPost {
    id: string
    content: string
    scheduledFor: Date
    mediaType: 'text' | 'image' | 'article'
    status: 'scheduled' | 'draft'
}

export default function PostScheduler() {
    const [date, setDate] = useState<Date | undefined>()
    const [time, setTime] = useState<string>("12:00")
    const [content, setContent] = useState<string>("")
    const [mediaType, setMediaType] = useState<'text' | 'image' | 'article'>('text')
    const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([
        {
            id: '1',
            content: "Excited to announce our latest product feature launch! #ProductLaunch #Innovation",
            scheduledFor: new Date(new Date().getTime() + 86400000 * 2), // 2 days from now
            mediaType: 'image',
            status: 'scheduled'
        },
        {
            id: '2',
            content: "Join me next week for a webinar on 'The Future of Digital Marketing' where we'll discuss emerging trends and strategies.",
            scheduledFor: new Date(new Date().getTime() + 86400000 * 5), // 5 days from now
            mediaType: 'text',
            status: 'scheduled'
        }
    ])

    const handleSchedulePost = () => {
        if (!content.trim()) {
            toast({
                title: "Content required",
                description: "Please add some content for your post",
                variant: "destructive"
            })
            return
        }

        if (!date) {
            toast({
                title: "Date required",
                description: "Please select a date for your post",
                variant: "destructive"
            })
            return
        }

        // Combine date and time
        const [hours, minutes] = time.split(':').map(Number)
        const scheduledDate = new Date(date)
        scheduledDate.setHours(hours, minutes)

        // Add new scheduled post
        const newPost: ScheduledPost = {
            id: Math.random().toString(36).substring(2, 9),
            content,
            scheduledFor: scheduledDate,
            mediaType,
            status: 'scheduled'
        }

        setScheduledPosts([...scheduledPosts, newPost])

        // Reset form
        setContent("")
        setDate(undefined)

        toast({
            title: "Post scheduled",
            description: `Your post has been scheduled for ${format(scheduledDate, 'PPP')} at ${format(scheduledDate, 'p')}`,
        })
    }

    const handleSaveDraft = () => {
        if (!content.trim()) {
            toast({
                title: "Content required",
                description: "Please add some content for your draft",
                variant: "destructive"
            })
            return
        }

        // Add new draft post
        const newDraft: ScheduledPost = {
            id: Math.random().toString(36).substring(2, 9),
            content,
            scheduledFor: new Date(),
            mediaType,
            status: 'draft'
        }

        setScheduledPosts([...scheduledPosts, newDraft])
        setContent("")

        toast({
            title: "Draft saved",
            description: "Your post has been saved as a draft",
        })
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Schedule LinkedIn Posts</CardTitle>
                <CardDescription>
                    Create and schedule posts for your LinkedIn profile or page
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <Tabs defaultValue="compose">
                    <TabsList className="mb-4">
                        <TabsTrigger value="compose">Compose</TabsTrigger>
                        <TabsTrigger value="scheduled">
                            Scheduled ({scheduledPosts.filter(p => p.status === 'scheduled').length})
                        </TabsTrigger>
                        <TabsTrigger value="drafts">
                            Drafts ({scheduledPosts.filter(p => p.status === 'draft').length})
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="compose" className="space-y-4">
                        {/* Compose form */}
                        <div className="space-y-4">
                            <div>
                                <Textarea
                                    placeholder="What do you want to talk about?"
                                    className="min-h-[150px] resize-none"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                />
                                <div className="flex justify-end mt-2 text-xs text-muted-foreground">
                                    {content.length} characters
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Content Type</Label>
                                    <Select value={mediaType} onValueChange={(value) => setMediaType(value as any)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select content type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="text">Text Post</SelectItem>
                                            <SelectItem value="image">Image Post</SelectItem>
                                            <SelectItem value="article">Article</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {mediaType !== 'text' && (
                                    <div className="border-2 border-dashed rounded-md flex items-center justify-center p-4 hover:bg-muted/50 cursor-pointer">
                                        <div className="flex flex-col items-center gap-1 text-muted-foreground">
                                            {mediaType === 'image' ? (
                                                <>
                                                    <Image className="h-6 w-6" />
                                                    <span>Upload Image</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Paperclip className="h-6 w-6" />
                                                    <span>Attach Article Content</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label>Schedule Date</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full justify-start text-left font-normal",
                                                    !date && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {date ? format(date, "PPP") : "Select date"}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={date}
                                                onSelect={setDate}
                                                initialFocus
                                                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>

                                <div className="space-y-2">
                                    <Label>Time</Label>
                                    <Select value={time} onValueChange={setTime}>
                                        <SelectTrigger>
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-4 w-4" />
                                                <span>{time}</span>
                                            </div>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Array.from({ length: 24 }).map((_, hour) => (
                                                <>
                                                    <SelectItem key={`${hour}:00`} value={`${hour.toString().padStart(2, '0')}:00`}>
                                                        {`${hour.toString().padStart(2, '0')}:00`}
                                                    </SelectItem>
                                                    <SelectItem key={`${hour}:30`} value={`${hour.toString().padStart(2, '0')}:30`}>
                                                        {`${hour.toString().padStart(2, '0')}:30`}
                                                    </SelectItem>
                                                </>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex items-end">
                                    <div className="flex items-center space-x-2">
                                        <Switch id="notification" defaultChecked />
                                        <Label htmlFor="notification">Send notification on publish</Label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="scheduled">
                        <div className="space-y-4">
                            {scheduledPosts
                                .filter(post => post.status === 'scheduled')
                                .sort((a, b) => a.scheduledFor.getTime() - b.scheduledFor.getTime())
                                .map(post => (
                                    <div key={post.id} className="border rounded-md p-4 space-y-3">
                                        <div className="flex justify-between items-start">
                                            <div className="flex items-center gap-2">
                                                <CalendarIcon2 className="h-4 w-4 text-blue-600" />
                                                <span className="text-sm font-medium">
                                                    {format(post.scheduledFor, "PPP")} at {format(post.scheduledFor, "p")}
                                                </span>
                                            </div>
                                            <Button variant="ghost" size="sm">Edit</Button>
                                        </div>
                                        <p className="text-sm">{post.content}</p>
                                        <div className="flex justify-end gap-2">
                                            <Button variant="outline" size="sm">Cancel</Button>
                                            <Button size="sm" className="bg-linkedin hover:bg-linkedin/90 text-white">
                                                <Rocket className="h-3 w-3 mr-1" /> Publish now
                                            </Button>
                                        </div>
                                    </div>
                                ))}

                            {scheduledPosts.filter(post => post.status === 'scheduled').length === 0 && (
                                <div className="text-center py-8 text-muted-foreground">
                                    No scheduled posts. Schedule your first post now!
                                </div>
                            )}
                        </div>
                    </TabsContent>

                    <TabsContent value="drafts">
                        <div className="space-y-4">
                            {scheduledPosts
                                .filter(post => post.status === 'draft')
                                .map(post => (
                                    <div key={post.id} className="border rounded-md p-4 space-y-3">
                                        <div className="flex justify-between items-start">
                                            <div className="text-sm font-medium">Draft</div>
                                            <Button variant="ghost" size="sm">Edit</Button>
                                        </div>
                                        <p className="text-sm">{post.content}</p>
                                        <div className="flex justify-end gap-2">
                                            <Button variant="outline" size="sm">Delete</Button>
                                            <Button size="sm">Schedule</Button>
                                        </div>
                                    </div>
                                ))}

                            {scheduledPosts.filter(post => post.status === 'draft').length === 0 && (
                                <div className="text-center py-8 text-muted-foreground">
                                    No draft posts. Save a draft from the compose tab!
                                </div>
                            )}
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleSaveDraft}>Save as Draft</Button>
                <Button onClick={handleSchedulePost}>Schedule Post</Button>
            </CardFooter>
        </Card>
    )
}
