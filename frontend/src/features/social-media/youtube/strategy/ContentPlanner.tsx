// filepath: src\features\social-media\youtube\strategy\ContentPlanner.tsx
import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter
} from "@/components/ui/card";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Calendar as CalendarIcon,
    ListTodo,
    Plus,
    Clock,
    BarChart,
    Calendar,
    ArrowRight,
    Edit,
    Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format, addDays } from "date-fns";
import { faker } from "@faker-js/faker";

// Interfaces
interface ContentPlan {
    id: string;
    title: string;
    contentType: "short" | "long";
    status: "draft" | "scheduled" | "published";
    scheduledDate: string;
    tags: string[];
    estimatedViews: number;
    notes: string;
    thumbnail?: string;
}

interface IdeaItem {
    id: string;
    title: string;
    contentType: "short" | "long";
    description: string;
    potentialScore: number;
    tags: string[];
}

export default function ContentPlanner() {
    const [activeTab, setActiveTab] = useState("calendar");
    const [selectedWeek, setSelectedWeek] = useState<string>(format(new Date(), "yyyy-MM-dd"));

    // Generate mock data
    const contentPlans: ContentPlan[] = generateContentPlans();
    const contentIdeas: IdeaItem[] = generateContentIdeas();

    const startDate = new Date(selectedWeek);
    const daysOfWeek = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

    const filterContentForDate = (date: Date): ContentPlan[] => {
        return contentPlans.filter(content =>
            format(new Date(content.scheduledDate), "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
        );
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div>
                        <CardTitle>Content Planner</CardTitle>
                        <CardDescription>
                            Schedule and plan your upcoming YouTube content
                        </CardDescription>
                    </div>
                    <Button>
                        <Plus className="h-4 w-4 mr-2" /> Create Content
                    </Button>
                </div>
            </CardHeader>

            <CardContent className="p-0 pt-2">
                <Tabs defaultValue="calendar" value={activeTab} onValueChange={setActiveTab} className="px-6">
                    <TabsList className="mb-4">
                        <TabsTrigger value="calendar">
                            <Calendar className="h-4 w-4 mr-2" /> Calendar View
                        </TabsTrigger>
                        <TabsTrigger value="list">
                            <ListTodo className="h-4 w-4 mr-2" /> List View
                        </TabsTrigger>
                        <TabsTrigger value="ideas">
                            <BarChart className="h-4 w-4 mr-2" /> Content Ideas
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="calendar" className="pt-2 pb-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-sm font-medium">
                                Week of {format(startDate, "MMM d, yyyy")}
                            </h3>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        const newDate = addDays(startDate, -7);
                                        setSelectedWeek(format(newDate, "yyyy-MM-dd"));
                                    }}
                                >
                                    Previous Week
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        const newDate = addDays(startDate, 7);
                                        setSelectedWeek(format(newDate, "yyyy-MM-dd"));
                                    }}
                                >
                                    Next Week
                                </Button>
                            </div>
                        </div>

                        <div className="grid grid-cols-7 gap-2">
                            {/* Day headers */}
                            {daysOfWeek.map((day) => (
                                <div
                                    key={`header-${format(day, "yyyy-MM-dd")}`}
                                    className="text-center p-2 text-sm font-medium"
                                >
                                    <div>{format(day, "EEE")}</div>
                                    <div className="text-xs text-muted-foreground">{format(day, "MMM d")}</div>
                                </div>
                            ))}

                            {/* Day cells */}
                            {daysOfWeek.map((day) => {
                                const contentForDay = filterContentForDate(day);
                                const isToday = format(day, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");

                                return (
                                    <div
                                        key={`cell-${format(day, "yyyy-MM-dd")}`}
                                        className={`border rounded-md min-h-[150px] p-2 ${isToday ? "border-primary/50 bg-primary/5" : ""}`}
                                    >
                                        {contentForDay.length > 0 ? (
                                            <div className="space-y-2">
                                                {contentForDay.map((content) => (
                                                    <div
                                                        key={content.id}
                                                        className={`p-2 text-xs rounded-md cursor-pointer
                              ${content.status === "draft" ? "bg-orange-100 border-orange-200" :
                                                                content.status === "scheduled" ? "bg-blue-100 border-blue-200" :
                                                                    "bg-green-100 border-green-200"}
                              ${content.contentType === "short" ? "border-l-[3px] border-l-red-500" : "border-l-[3px] border-l-blue-500"}
                            `}
                                                    >
                                                        <div className="line-clamp-2 font-medium">{content.title}</div>
                                                        <div className="mt-1 flex justify-between items-center">
                                                            <Badge variant="outline" className="text-[10px]">
                                                                {content.contentType === "short" ? "SHORT" : "VIDEO"}
                                                            </Badge>
                                                            <div className="flex items-center">
                                                                <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                                                                <span className="text-[10px] text-muted-foreground">
                                                                    {format(new Date(content.scheduledDate), "h:mm a")}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="h-full flex items-center justify-center">
                                                <Button variant="ghost" size="sm" className="h-8 text-xs text-muted-foreground">
                                                    <Plus className="h-3 w-3 mr-1" /> Add
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        <div className="flex justify-between items-center mt-6">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1">
                                    <div className="w-3 h-3 bg-orange-100 border border-orange-200 rounded-sm"></div>
                                    <span className="text-xs">Draft</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="w-3 h-3 bg-blue-100 border border-blue-200 rounded-sm"></div>
                                    <span className="text-xs">Scheduled</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="w-3 h-3 bg-green-100 border border-green-200 rounded-sm"></div>
                                    <span className="text-xs">Published</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1">
                                    <div className="w-3 h-3 border-l-[3px] border-l-red-500"></div>
                                    <span className="text-xs">Short</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="w-3 h-3 border-l-[3px] border-l-blue-500"></div>
                                    <span className="text-xs">Long-form</span>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="list" className="pt-2 pb-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-sm font-medium">Content Schedule</h3>
                            <div className="flex gap-2">
                                <Select defaultValue="all">
                                    <SelectTrigger className="w-[150px]">
                                        <SelectValue placeholder="Filter by status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Status</SelectItem>
                                        <SelectItem value="draft">Draft</SelectItem>
                                        <SelectItem value="scheduled">Scheduled</SelectItem>
                                        <SelectItem value="published">Published</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Select defaultValue="all">
                                    <SelectTrigger className="w-[150px]">
                                        <SelectValue placeholder="Filter by type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Types</SelectItem>
                                        <SelectItem value="short">Shorts</SelectItem>
                                        <SelectItem value="long">Long-form</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="border rounded-md overflow-hidden">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[250px]">Title</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Scheduled Date</TableHead>
                                        <TableHead>Est. Views</TableHead>
                                        <TableHead>Tags</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {contentPlans.map((content) => (
                                        <TableRow key={content.id}>
                                            <TableCell>
                                                <div className="font-medium line-clamp-1">{content.title}</div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={content.contentType === "short" ? "destructive" : "secondary"}>
                                                    {content.contentType === "short" ? "Short" : "Long-form"}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        content.status === "draft" ? "outline" :
                                                            content.status === "scheduled" ? "secondary" : "default"
                                                    }
                                                >
                                                    {content.status.charAt(0).toUpperCase() + content.status.slice(1)}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {format(new Date(content.scheduledDate), "MMM d, yyyy h:mm a")}
                                            </TableCell>
                                            <TableCell>
                                                {content.estimatedViews.toLocaleString()}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-wrap gap-1">
                                                    {content.tags.slice(0, 2).map((tag, i) => (
                                                        <Badge key={i} variant="outline" className="text-xs">
                                                            {tag}
                                                        </Badge>
                                                    ))}
                                                    {content.tags.length > 2 && (
                                                        <Badge variant="outline" className="text-xs">
                                                            +{content.tags.length - 2}
                                                        </Badge>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button size="sm" variant="ghost">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-700">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </TabsContent>

                    <TabsContent value="ideas" className="pt-2 pb-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-sm font-medium">Content Ideas</h3>
                            <div className="flex gap-2">
                                <Select defaultValue="popular">
                                    <SelectTrigger className="w-[150px]">
                                        <SelectValue placeholder="Sort by" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="popular">Most Popular</SelectItem>
                                        <SelectItem value="recent">Most Recent</SelectItem>
                                        <SelectItem value="potential">Highest Potential</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button size="sm">
                                    <Plus className="h-4 w-4 mr-2" /> Add Idea
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {contentIdeas.map((idea) => (
                                <div key={idea.id} className="border rounded-md p-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-medium">{idea.title}</h4>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Badge variant={idea.contentType === "short" ? "destructive" : "secondary"}>
                                                    {idea.contentType === "short" ? "Short" : "Long-form"}
                                                </Badge>
                                                <div className="flex items-center">
                                                    <BarChart className="h-4 w-4 text-muted-foreground mr-1" />
                                                    <span className="text-xs text-muted-foreground">
                                                        Potential score: <span className="font-medium">{idea.potentialScore}/100</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <Button size="sm" variant="outline">
                                            <Calendar className="h-4 w-4 mr-2" /> Schedule
                                        </Button>
                                    </div>
                                    <p className="mt-2 text-sm text-muted-foreground">{idea.description}</p>
                                    <div className="mt-3 flex flex-wrap gap-1">
                                        {idea.tags.map((tag, i) => (
                                            <Badge key={i} variant="outline" className="text-xs">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>

            <CardFooter className="border-t px-6 py-4">
                <Button variant="outline" className="ml-auto">
                    Content Strategy Guide <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
            </CardFooter>
        </Card>
    );
}

// Helper functions to generate mock data
function generateContentPlans(): ContentPlan[] {
    const plans: ContentPlan[] = [];
    const today = new Date();
    const statuses: ("draft" | "scheduled" | "published")[] = ['draft', 'scheduled', 'published'];
    const contentTypes: ("short" | "long")[] = ['short', 'long'];

    // Generate content for the past 3 days and next 10 days
    for (let i = -3; i <= 10; i++) {
        const numContent = faker.number.int({ min: 0, max: 2 });
        const day = addDays(today, i);

        for (let j = 0; j < numContent; j++) {
            const contentType = faker.helpers.arrayElement(contentTypes);

            // For past dates, mark as published
            const status = i < 0 ? 'published' : faker.helpers.arrayElement(statuses);

            const hours = faker.number.int({ min: 9, max: 19 });
            const minutes = faker.helpers.arrayElement([0, 15, 30, 45]);
            day.setHours(hours, minutes, 0, 0);

            const scheduledDate = new Date(day);

            plans.push({
                id: faker.string.uuid(),
                title: generateYouTubeTitle(contentType),
                contentType,
                status,
                scheduledDate: scheduledDate.toISOString(),
                tags: Array.from(
                    { length: faker.number.int({ min: 2, max: 5 }) },
                    () => faker.helpers.arrayElement([
                        'growth', 'tutorial', 'tips', 'strategy', 'review', 'algorithm',
                        'monetization', 'trending', 'viral', 'howto', 'shorts', 'beginners'
                    ])
                ),
                estimatedViews: contentType === 'short'
                    ? faker.number.int({ min: 5000, max: 500000 })
                    : faker.number.int({ min: 1000, max: 50000 }),
                notes: faker.lorem.sentence()
            });
        }
    }

    // Sort by scheduled date
    return plans.sort((a, b) =>
        new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime()
    );
}

function generateContentIdeas(): IdeaItem[] {
    const ideas: IdeaItem[] = [];
    const contentTypes: ("short" | "long")[] = ['short', 'long'];

    for (let i = 0; i < 5; i++) {
        const contentType = faker.helpers.arrayElement(contentTypes);

        ideas.push({
            id: faker.string.uuid(),
            title: generateYouTubeTitle(contentType),
            contentType,
            description: faker.lorem.paragraph(),
            potentialScore: faker.number.int({ min: 55, max: 95 }),
            tags: Array.from(
                { length: faker.number.int({ min: 2, max: 5 }) },
                () => faker.helpers.arrayElement([
                    'growth', 'tutorial', 'tips', 'strategy', 'review', 'algorithm',
                    'monetization', 'trending', 'viral', 'howto', 'shorts', 'beginners'
                ])
            )
        });
    }

    // Sort by potential score (high to low)
    return ideas.sort((a, b) => b.potentialScore - a.potentialScore);
}

// Helper function to generate realistic YouTube titles
function generateYouTubeTitle(type: 'short' | 'long'): string {
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
    };

    const templates = type === 'short' ? titleTemplates.short : titleTemplates.long;
    let template = faker.helpers.arrayElement(templates);

    // Replace placeholders
    if (template.includes('{verb}')) {
        template = template.replace('{verb}', faker.helpers.arrayElement([
            'master', 'optimize', 'improve', 'grow', 'build', 'learn', 'create', 'transform', 'boost'
        ]));
    }

    if (template.includes('{noun}')) {
        template = template.replace('{noun}', faker.helpers.arrayElement([
            'channel', 'business', 'skills', 'workflow', 'productivity', 'content', 'portfolio', 'strategy'
        ]));
    }

    if (template.includes('{topic}')) {
        template = template.replace('{topic}', faker.helpers.arrayElement([
            'YouTube Growth', 'Content Creation', 'Digital Marketing', 'SEO', 'Social Media Strategy',
            'Video Editing', 'Passive Income', 'Monetization', 'Algorithm Hacks'
        ]));
    }

    if (template.includes('{number}')) {
        template = template.replace('{number}', faker.helpers.arrayElement([
            '3', '5', '7', '10', '12'
        ]));
    }

    if (template.includes('{situation}')) {
        template = template.replace('{situation}', faker.helpers.arrayElement([
            'it fails', 'nobody cares', 'everyone laughs', 'it actually works', 'you\'re doing it wrong'
        ]));
    }

    return template;
}
