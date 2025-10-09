import {
  IconInfoCircle,
  IconCompass,
  IconShoppingCart,
  IconCreditCard,
} from '@tabler/icons-react'
import { SearchIntent } from './schema'

export const intentColors = new Map<SearchIntent, string>([
  [
    'informational',
    'bg-blue-100/30 text-blue-900 dark:text-blue-200 border-blue-200',
  ],
  [
    'navigational',
    'bg-green-100/30 text-green-900 dark:text-green-200 border-green-200',
  ],
  [
    'commercial',
    'bg-amber-100/30 text-amber-900 dark:text-amber-200 border-amber-200',
  ],
  [
    'transactional',
    'bg-purple-100/30 text-purple-900 dark:text-purple-200 border-purple-200',
  ],
])

export const searchIntentTypes = [
  {
    label: 'Informational',
    value: 'informational',
    icon: IconInfoCircle,
    color: 'bg-blue-100/30 text-blue-900 dark:text-blue-200 border-blue-200',
  },
  {
    label: 'Navigational',
    value: 'navigational',
    icon: IconCompass,
    color:
      'bg-green-100/30 text-green-900 dark:text-green-200 border-green-200',
  },
  {
    label: 'Commercial',
    value: 'commercial',
    icon: IconShoppingCart,
    color:
      'bg-amber-100/30 text-amber-900 dark:text-amber-200 border-amber-200',
  },
  {
    label: 'Transactional',
    value: 'transactional',
    icon: IconCreditCard,
    color:
      'bg-purple-100/30 text-purple-900 dark:text-purple-200 border-purple-200',
  },
] as const
