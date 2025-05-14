import {
  IconLink,
  IconLinkOff,
  IconAd,
  IconUsers,
} from '@tabler/icons-react'
import { LinkType } from './schema'

// Link type styles and definitions
export const linkTypeColors = new Map<LinkType, string>([
  ['follow', 'bg-green-100/30 text-green-900 dark:text-green-200 border-green-200'],
  ['nofollow', 'bg-red-100/30 text-red-900 dark:text-red-200 border-red-200'],
  ['sponsored', 'bg-orange-100/30 text-orange-900 dark:text-orange-200 border-orange-200'],
  ['ugc', 'bg-blue-100/30 text-blue-900 dark:text-blue-200 border-blue-200'],
])

export const linkTypes = [
  {
    label: 'Follow',
    value: 'follow',
    icon: IconLink,
    color: 'bg-green-100/30 text-green-900 dark:text-green-200 border-green-200',
  },
  {
    label: 'NoFollow',
    value: 'nofollow',
    icon: IconLinkOff,
    color: 'bg-red-100/30 text-red-900 dark:text-red-200 border-red-200',
  },
  {
    label: 'Sponsored',
    value: 'sponsored',
    icon: IconAd,
    color: 'bg-orange-100/30 text-orange-900 dark:text-orange-200 border-orange-200',
  },
  {
    label: 'UGC',
    value: 'ugc',
    icon: IconUsers,
    color: 'bg-blue-100/30 text-blue-900 dark:text-blue-200 border-blue-200',
  },
] as const
