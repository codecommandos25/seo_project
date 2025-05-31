import {
  IconLink,
  IconFileDescription,
  IconWorld,
  IconCode,
  IconHeading,
  IconPhoto,
  IconRuler,
  IconKeyboard,
  IconLock,
  IconList,
} from '@tabler/icons-react'

// Table column configuration for on-page SEO analysis
export const onPageAnalysisColumns = [
  {
    label: 'URL',
    value: 'url',
    icon: IconLink,
    color: 'text-blue-600 dark:text-blue-400',
  },
  {
    label: 'Title',
    value: 'title',
    icon: IconFileDescription,
    color: 'text-gray-900 dark:text-gray-200',
  },
  {
    label: 'H1',
    value: 'h1',
    icon: IconHeading,
    color: 'text-indigo-600 dark:text-indigo-400',
  },
  {
    label: 'H2 Tags',
    value: 'h2Tags',
    icon: IconList,
    color: 'text-indigo-500 dark:text-indigo-300',
  },
  {
    label: 'Description',
    value: 'description',
    icon: IconFileDescription,
    color: 'text-gray-600 dark:text-gray-400',
  },
  {
    label: 'Content Length',
    value: 'contentLength',
    icon: IconRuler,
    color: 'text-purple-600 dark:text-purple-400',
  },
  {
    label: 'Images',
    value: 'imageCount',
    icon: IconPhoto,
    color: 'text-amber-600 dark:text-amber-400',
  },
  {
    label: 'Internal Links',
    value: 'internalLinks',
    icon: IconLink,
    color: 'text-green-600 dark:text-green-400',
  },
  {
    label: 'External Links',
    value: 'externalLinks',
    icon: IconWorld,
    color: 'text-amber-600 dark:text-amber-400',
  },
  {
    label: 'Keywords',
    value: 'keywords',
    icon: IconKeyboard,
    color: 'text-gray-900 dark:text-gray-200',
  },
  {
    label: 'Has Canonical',
    value: 'hasCanonical',
    icon: IconLock,
    color: 'text-blue-600 dark:text-blue-400',
  },
  {
    label: 'Has Schema',
    value: 'hasSchema',
    icon: IconCode,
    color: 'text-purple-600 dark:text-purple-400',
  },
] as const

// Helper function to format content length with appropriate unit
export function formatContentLength(length: number): string {
  if (length < 1000) {
    return `${length} chars`;
  }
  return `${(length / 1000).toFixed(1)}k chars`;
}

// Helper function to format boolean values for display
export function formatBoolean(value: boolean): string {
  return value ? 'Yes' : 'No';
}

// Helper function to format array data for display
export function formatArray(arr: string[]): string {
  if (!arr.length) return 'None';
  if (arr.length <= 2) return arr.join(', ');
  return `${arr.slice(0, 2).join(', ')} +${arr.length - 2}`;
}

// Re-export the types from the schema
export type { onPageAnalysis } from './schema'
