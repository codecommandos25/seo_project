import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function CompetitorsSection() {
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
        // Competitors Table Will be here
      </CardContent>
    </Card>
  )
}
