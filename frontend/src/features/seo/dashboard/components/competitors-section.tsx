import { useEffect, useState } from 'react'
import { useCompetitorsSEOTable } from '@/service/seo'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

type CompetitorData = {
  competitorWebsite: string
  domainAuthority: number
  organicTraffic: number
  totalBacklinks: number
  referringDomains: number
  keywordOverlap: number
  contentType: string
}

const competitorsData: CompetitorData[] = [
  {
    competitorWebsite: 'example1.com',
    domainAuthority: 75,
    organicTraffic: 520000,
    totalBacklinks: 30000,
    referringDomains: 3500,
    keywordOverlap: 65,
    contentType: 'Blog',
  },
  {
    competitorWebsite: 'example2.com',
    domainAuthority: 68,
    organicTraffic: 450000,
    totalBacklinks: 25000,
    referringDomains: 2900,
    keywordOverlap: 58,
    contentType: 'E-commerce',
  },
  {
    competitorWebsite: 'example3.com',
    domainAuthority: 82,
    organicTraffic: 700000,
    totalBacklinks: 45000,
    referringDomains: 5000,
    keywordOverlap: 72,
    contentType: 'News/Media',
  },
  {
    competitorWebsite: 'example4.com',
    domainAuthority: 60,
    organicTraffic: 320000,
    totalBacklinks: 18000,
    referringDomains: 2200,
    keywordOverlap: 50,
    contentType: 'Affiliate Marketing',
  },
  {
    competitorWebsite: 'example5.com',
    domainAuthority: 73,
    organicTraffic: 600000,
    totalBacklinks: 40000,
    referringDomains: 4200,
    keywordOverlap: 67,
    contentType: 'SaaS',
  },
  {
    competitorWebsite: 'example6.com',
    domainAuthority: 55,
    organicTraffic: 250000,
    totalBacklinks: 14000,
    referringDomains: 1900,
    keywordOverlap: 45,
    contentType: 'Local Business',
  },
  {
    competitorWebsite: 'example7.com',
    domainAuthority: 80,
    organicTraffic: 680000,
    totalBacklinks: 47000,
    referringDomains: 5300,
    keywordOverlap: 75,
    contentType: 'Blog',
  },
  {
    competitorWebsite: 'example8.com',
    domainAuthority: 63,
    organicTraffic: 380000,
    totalBacklinks: 22000,
    referringDomains: 2600,
    keywordOverlap: 55,
    contentType: 'E-commerce',
  },
  {
    competitorWebsite: 'example9.com',
    domainAuthority: 77,
    organicTraffic: 550000,
    totalBacklinks: 35000,
    referringDomains: 4100,
    keywordOverlap: 69,
    contentType: 'News/Media',
  },
  {
    competitorWebsite: 'example10.com',
    domainAuthority: 58,
    organicTraffic: 270000,
    totalBacklinks: 16000,
    referringDomains: 2000,
    keywordOverlap: 48,
    contentType: 'Affiliate Marketing',
  },
]

export function CompetitorsSection() {
  const [competitorsData, setCompetitorsData] = useState([])
  const { mutate } = useCompetitorsSEOTable({
    onSuccess(data: any, variables, context) {
      console.log('data', data.data)
      setCompetitorsData(data.data)
    },
  })
  useEffect(() => {
    mutate({
      domain: 'newmouth.com',
    })
  }, [])

  console.log(competitorsData)
  return (
    <Card>
      <CardHeader className='flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row'>
        <div className='flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6'>
          <CardTitle>Website Competitors</CardTitle>
          <CardDescription>
            See how your website compares to competitors in terms of traffic.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className='px-2 sm:p-6'>
        <div className='overflow-x-auto'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Competitor Website</TableHead>
                <TableHead>Domain Authority</TableHead>
                <TableHead>Organic Traffic</TableHead>
                <TableHead>Total Backlinks</TableHead>
                <TableHead>Referring Domains</TableHead>
                <TableHead>Keyword Overlap</TableHead>
                <TableHead>Content Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {competitorsData.map((competitor: any, index) => (
                <TableRow key={index}>
                  <TableCell className='font-medium'>
                    {competitor.domain}
                  </TableCell>
                  <TableCell>{competitor.domain_authority}</TableCell>
                  <TableCell>{Math.round(competitor.etv)}</TableCell>
                  <TableCell>{competitor.backlinks}</TableCell>
                  <TableCell>{competitor.referring_domains}</TableCell>
                  <TableCell>{competitor.intersections}</TableCell>
                  <TableCell>{competitor.content_type}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
