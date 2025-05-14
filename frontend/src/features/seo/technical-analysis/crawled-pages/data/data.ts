import {
  IconLink,
  IconArrowRightCircle,
  IconArrowLeftCircle,
  IconWorld,
  IconFileDescription,
  IconCode,
  IconSpeedboat,
  IconCalendarTime,
  IconStatusChange,
} from '@tabler/icons-react'

// HTTP Status code colors and display properties
export const httpStatusColors = new Map<number, string>([
  [200, 'bg-green-100/30 text-green-900 dark:text-green-200 border-green-200'],
  [301, 'bg-amber-100/30 text-amber-900 dark:text-amber-200 border-amber-200'],
  [302, 'bg-amber-100/30 text-amber-900 dark:text-amber-200 border-amber-200'],
  [404, 'bg-red-100/30 text-red-900 dark:text-red-200 border-red-200'],
  [500, 'bg-red-100/30 text-red-900 dark:text-red-200 border-red-200'],
])

// Table column configuration for crawled pages
export const crawledPageColumns = [
  {
    label: 'Page URL',
    value: 'pageUrl',
    icon: IconLink,
    color: 'text-blue-600 dark:text-blue-400',
  },
  {
    label: 'Page Title',
    value: 'pageTitle',
    icon: IconFileDescription,
    color: 'text-gray-900 dark:text-gray-200',
  },
  {
    label: 'Status',
    value: 'httpStatusCode',
    icon: IconStatusChange,
    color: '', // Will be determined dynamically based on status code
  },
  {
    label: 'Load Time',
    value: 'pageLoadTime',
    icon: IconSpeedboat,
    color: 'text-gray-900 dark:text-gray-200',
  },
  {
    label: 'Incoming Links',
    value: 'incomingInternalLinks',
    icon: IconArrowLeftCircle,
    color: 'text-green-600 dark:text-green-400',
  },
  {
    label: 'Outgoing Internal',
    value: 'outgoingInternalLinks',
    icon: IconArrowRightCircle,
    color: 'text-indigo-600 dark:text-indigo-400',
  },
  {
    label: 'External Links',
    value: 'outgoingExternalLinks',
    icon: IconWorld,
    color: 'text-amber-600 dark:text-amber-400',
  },
  {
    label: 'Structured Data',
    value: 'structuredDataItems',
    icon: IconCode,
    color: 'text-purple-600 dark:text-purple-400',
  },
  {
    label: 'Last Crawled',
    value: 'lastCrawled',
    icon: IconCalendarTime,
    color: 'text-gray-600 dark:text-gray-400',
  },
] as const

// Helper function to get the appropriate status color
export function getStatusColor(statusCode: number): string {
  return httpStatusColors.get(statusCode) || 'bg-gray-100/30 text-gray-900 dark:text-gray-200 border-gray-200'
}

// Re-export the types from the schema
export type { CrawledPage } from './schema'
