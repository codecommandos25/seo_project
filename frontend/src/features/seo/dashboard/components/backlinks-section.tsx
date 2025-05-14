import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"


type AnchorData = {
    anchor: string;
    backlinks: number;
    percentage: string;
    avgDA: number;
    type: string;
};

type ReferringDomain = {
    domain: string;
    backlinks: number;
    DA: number;
    spam: string;
    dofollow: string;
    firstSeen: string;
    lastSeen: string;
};

const topAnchor: AnchorData[] = [
    { anchor: "best laptops", backlinks: 2500, percentage: "10%", avgDA: 65, type: "Editorial" },
    { anchor: "buy online", backlinks: 2100, percentage: "8.4%", avgDA: 55, type: "Sponsored" },
    { anchor: "top smartphones", backlinks: 1800, percentage: "7.2%", avgDA: 70, type: "Editorial" },
    { anchor: "discount shoes", backlinks: 1600, percentage: "6.4%", avgDA: 60, type: "Sponsored" },
    { anchor: "best running shoes", backlinks: 1400, percentage: "5.6%", avgDA: 75, type: "Editorial" },
    { anchor: "cheap flights", backlinks: 1200, percentage: "4.8%", avgDA: 50, type: "Sponsored" },
];

const topReferringDomain: ReferringDomain[] = [
    { domain: "example1.com", backlinks: 1500, DA: 85, spam: "1%", dofollow: "90%", firstSeen: "Jan 2022", lastSeen: "Mar 2025" },
    { domain: "example2.com", backlinks: 1200, DA: 78, spam: "2%", dofollow: "85%", firstSeen: "Feb 2023", lastSeen: "Mar 2025" },
    { domain: "example3.com", backlinks: 1000, DA: 80, spam: "1.5%", dofollow: "88%", firstSeen: "Mar 2022", lastSeen: "Mar 2025" },
    { domain: "example4.com", backlinks: 800, DA: 75, spam: "3%", dofollow: "80%", firstSeen: "Apr 2023", lastSeen: "Mar 2025" },
    { domain: "example5.com", backlinks: 600, DA: 70, spam: "2.5%", dofollow: "82%", firstSeen: "May 2022", lastSeen: "Mar 2025" },
    { domain: "example6.com", backlinks: 500, DA: 65, spam: "4%", dofollow: "75%", firstSeen: "Jun 2023", lastSeen: "Mar 2025" },
    { domain: "example7.com", backlinks: 400, DA: 68, spam: "1%", dofollow: "90%", firstSeen: "Jul 2022", lastSeen: "Mar 2025" },
    { domain: "example8.com", backlinks: 300, DA: 72, spam: "2%", dofollow: "85%", firstSeen: "Aug 2023", lastSeen: "Mar 2025" },
];

export function BacklinksSection() {

    return (
        <Card>
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                    <CardTitle>
                        Website Backlinks
                    </CardTitle>
                    <CardDescription>
                        See backlinks to your website and their status.
                    </CardDescription>
                </div>
            </CardHeader>

            <CardContent className="px-2 sm:p-6">
                <Tabs defaultValue="top-anchor" className="w-full">

                    <div className='w-full overflow-x-auto py-4 sm:py-0'>
                        <TabsList >
                            <TabsTrigger value="top-anchor">Top Anchors</TabsTrigger>
                            <TabsTrigger value="referring-domain">Referring Domains</TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="top-anchor">
                        <div className="overflow-x-auto">
                            <Table className="w-full">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Anchor</TableHead>
                                        <TableHead>Backlinks</TableHead>
                                        <TableHead>Percentage</TableHead>
                                        <TableHead>Avg DA</TableHead>
                                        <TableHead>Type</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {topAnchor.map((anchor, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{anchor.anchor}</TableCell>
                                            <TableCell>{anchor.backlinks}</TableCell>
                                            <TableCell>{anchor.percentage}</TableCell>
                                            <TableCell>{anchor.avgDA}</TableCell>
                                            <TableCell>{anchor.type}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </TabsContent>

                    <TabsContent value="referring-domain">
                        <div className="overflow-x-auto">
                            <Table className="w-full">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Domain</TableHead>
                                        <TableHead>Backlinks</TableHead>
                                        <TableHead>DA</TableHead>
                                        <TableHead>Spam</TableHead>
                                        <TableHead>Dofollow</TableHead>
                                        <TableHead>First Seen</TableHead>
                                        <TableHead>Last Seen</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {topReferringDomain.map((domain, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{domain.domain}</TableCell>
                                            <TableCell>{domain.backlinks}</TableCell>
                                            <TableCell>{domain.DA}</TableCell>
                                            <TableCell>{domain.spam}</TableCell>
                                            <TableCell>{domain.dofollow}</TableCell>
                                            <TableCell>{domain.firstSeen}</TableCell>
                                            <TableCell>{domain.lastSeen}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </TabsContent>
                </Tabs>

            </CardContent>
        </Card>
    )
}
