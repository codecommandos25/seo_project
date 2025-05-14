import { ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import LongText from '@/components/long-text'
import { searchIntentTypes } from '../data/data'
import { Keyword, SearchIntent } from '../data/schema'
import { DataTableColumnHeader } from './data-table-column-header'
import { ArrowDown, ArrowUp, Minus } from 'lucide-react'

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
    accessorKey: 'intent',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Search Intent' />
    ),
    cell: ({ row }) => {
      const intent = row.getValue('intent') as SearchIntent
      const intentType = searchIntentTypes.find(type => type.value === intent)

      return (
        <div className='flex space-x-2'>
          <Badge variant='outline' className={cn('capitalize', intentType?.color)}>
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
    accessorKey: 'position',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Position' />
    ),
    cell: ({ row }) => {
      const position = row.getValue('position') as number
      const prevPosition = row.original.prevPosition

      let positionChange = null
      if (prevPosition !== undefined) {
        const diff = prevPosition - position
        if (diff > 0) {
          positionChange = <ArrowUp className="text-green-500 h-4 w-4" />
        } else if (diff < 0) {
          positionChange = <ArrowDown className="text-red-500 h-4 w-4" />
        } else {
          positionChange = <Minus className="text-gray-500 h-4 w-4" />
        }
      }

      return (
        <div className="flex items-center gap-2">
          <span>{position}</span>
          {positionChange}
        </div>
      )
    },
  },
  {
    accessorKey: 'volume',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Volume' />
    ),
    cell: ({ row }) => <div>{row.getValue('volume')}</div>,
  },
  {
    accessorKey: 'keywordDifficulty',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Difficulty' />
    ),
    cell: ({ row }) => {
      const difficulty = row.getValue('keywordDifficulty') as number
      let color = 'bg-green-100 text-green-800'

      if (difficulty > 70) {
        color = 'bg-red-100 text-red-800'
      } else if (difficulty > 40) {
        color = 'bg-yellow-100 text-yellow-800'
      }

      return (
        <Badge variant="outline" className={cn(color)}>
          {difficulty}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'traffic',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Traffic' />
    ),
    cell: ({ row }) => <div>{row.getValue('traffic')}</div>,
  },
  {
    accessorKey: 'cpc',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='CPC ($)' />
    ),
    cell: ({ row }) => <div>${(row.getValue('cpc') as number).toFixed(2)}</div>,
  },
  {
    accessorKey: 'url',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='URL' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36 text-blue-600 hover:underline'>
        <a href={row.getValue('url') as string} target="_blank" rel="noopener noreferrer">
          {row.getValue('url')}
        </a>
      </LongText>
    ),
  },
  {
    accessorKey: 'lastUpdate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Last Updated' />
    ),
    cell: ({ row }) => {
      const date = row.getValue('lastUpdate') as Date
      return <div>{date.toLocaleDateString()}</div>
    },
  },
]