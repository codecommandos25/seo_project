import { format, parseISO } from 'date-fns'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowDown, ArrowUp, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import LongText from '@/components/long-text'
import { searchIntentTypes } from '../data/data'
import { Keyword, SearchIntent } from '../data/schema'
import { DataTableColumnHeader } from './data-table-column-header'

export const columns: ColumnDef<Keyword>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    meta: {
      className: cn(
        'sticky md:table-cell left-0 z-10 rounded-tl',
        'bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted'
      ),
    },
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'keyword',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Keyword' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36'>{row.getValue('keyword')}</LongText>
    ),
    meta: {
      className: cn(
        'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)] lg:drop-shadow-none',
        'bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
        'sticky left-6 md:table-cell'
      ),
    },
    enableHiding: false,
  },
  {
    accessorKey: 'main_intent',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Search Intent' />
    ),
    cell: ({ row }) => {
      const intent = row.getValue('main_intent') as SearchIntent
      const intentType = searchIntentTypes.find((type) => type.value === intent)

      return (
        <div className='flex space-x-2'>
          <Badge
            variant='outline'
            className={cn('capitalize', intentType?.color)}
          >
            {intent}
          </Badge>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'rank_absolute',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Position' />
    ),
    cell: ({ row }) => {
      const position = row.getValue('rank_absolute') as number
      const prevPosition = row.original.prevPosition

      let positionChange = null
      if (prevPosition !== undefined) {
        const diff = prevPosition - position
        if (diff > 0) {
          positionChange = <ArrowUp className='h-4 w-4 text-green-500' />
        } else if (diff < 0) {
          positionChange = <ArrowDown className='h-4 w-4 text-red-500' />
        } else {
          positionChange = <Minus className='h-4 w-4 text-gray-500' />
        }
      }

      return (
        <div className='flex items-center gap-2'>
          <span>{position}</span>
          {positionChange}
        </div>
      )
    },
  },
  {
    accessorKey: 'search_volume',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Volume' />
    ),
    cell: ({ row }) => <div>{row.getValue('search_volume')}</div>,
  },
  {
    accessorKey: 'keyword_difficulty',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Difficulty' />
    ),
    cell: ({ row }) => {
      const difficulty = row.getValue('keyword_difficulty') as number
      let color = 'bg-green-100 text-green-800'

      if (difficulty > 70) {
        color = 'bg-red-100 text-red-800'
      } else if (difficulty > 40) {
        color = 'bg-yellow-100 text-yellow-800'
      }

      return (
        <Badge variant='outline' className={cn(color)}>
          {difficulty}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'etv',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Traffic' />
    ),
    cell: ({ row }) => <div>{(row.getValue('etv') as number).toFixed(2)}</div>,
  },
  {
    accessorKey: 'cpc',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='CPC ($)' />
    ),
    cell: ({ row }) => (
      <div>
        {row.getValue('cpc')
          ? `$${(row.getValue('cpc') as number).toFixed(2)}`
          : ''}
      </div>
    ),
  },
  {
    accessorKey: 'url',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='URL' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36 text-blue-600 hover:underline'>
        <a
          href={row.getValue('url') as string}
          target='_blank'
          rel='noopener noreferrer'
        >
          {row.getValue('url')}
        </a>
      </LongText>
    ),
  },
  {
    accessorKey: 'last_updated_time',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Last Updated' />
    ),
    cell: ({ row }) => {
      const date: string = row.getValue('last_updated_time')
      const isoDate = date.replace(' ', 'T')
      return <div>{format(date, 'dd/MM/yyyy')}</div>
    },
  },
]
