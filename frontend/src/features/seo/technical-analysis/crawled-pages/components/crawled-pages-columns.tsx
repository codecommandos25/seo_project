import { format } from 'date-fns'
import { ColumnDef } from '@tanstack/react-table'
import { ExternalLink, Clock, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import LongText from '@/components/long-text'
import { CrawledPage } from '../data/schema'
import { DataTableColumnHeader } from './data-table-column-header'

export const columns: ColumnDef<CrawledPage>[] = [
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
    accessorKey: 'url',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Page URL' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36 text-blue-600 hover:underline'>
        <a href={row.getValue('url')} target='_blank' rel='noopener noreferrer'>
          {row.getValue('url')}
        </a>
      </LongText>
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
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Page Title' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36'>{row.getValue('title')}</LongText>
    ),
  },
  {
    accessorKey: 'status_code',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const status = row.getValue('status_code') as number
      let color = 'bg-green-100 text-green-800'

      if (status === 404 || status === 500) {
        color = 'bg-red-100 text-red-800'
      } else if (status === 301 || status === 302) {
        color = 'bg-yellow-100 text-yellow-800'
      }

      return (
        <Badge variant='outline' className={cn(color)}>
          {status}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'duration_time',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Load Time' />
    ),
    cell: ({ row }) => {
      const loadTime = row.getValue('duration_time') as number
      let color = 'text-green-600'

      if (loadTime > 3000) {
        color = 'text-red-600'
      } else if (loadTime > 1500) {
        color = 'text-yellow-600'
      }

      return (
        <div className={cn('flex items-center gap-1', color)}>
          <Clock className='h-3 w-3' />
          <span>{(loadTime / 1000).toFixed(2)}s</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'inbound_links_count',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Internal Links (In)' />
    ),
    cell: ({ row }) => <div>{row.getValue('inbound_links_count')}</div>,
  },
  {
    accessorKey: 'internal_links_count',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Internal Links (Out)' />
    ),
    cell: ({ row }) => <div>{row.getValue('internal_links_count')}</div>,
  },
  {
    accessorKey: 'external_links_count',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='External Links' />
    ),
    cell: ({ row }) => (
      <div className='flex items-center gap-1'>
        <span>{row.getValue('external_links_count')}</span>
        <ExternalLink className='h-3 w-3 text-gray-500' />
      </div>
    ),
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Meta Description' />
    ),
    cell: ({ row }) => {
      const metaDescription = row.getValue('description') as string | null

      if (!metaDescription) {
        return (
          <div className='flex items-center gap-1 text-amber-600'>
            <AlertCircle className='h-3 w-3' />
            <span>Missing</span>
          </div>
        )
      }

      return <LongText className='max-w-36'>{metaDescription}</LongText>
    },
  },
  {
    accessorKey: 'canonical',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Canonical URL' />
    ),
    cell: ({ row }) => {
      const canonicalUrl = row.original.canonical

      if (!canonicalUrl) {
        return <span className='text-gray-500'>-</span>
      }

      return (
        <LongText className='max-w-36 text-blue-600 hover:underline'>
          <a href={canonicalUrl} target='_blank' rel='noopener noreferrer'>
            {canonicalUrl}
          </a>
        </LongText>
      )
    },
  },
  {
    accessorKey: 'structured_data',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Structured Data' />
    ),
    // cell: ({ row }) => {
    //   const items = row.original.structured_data

    //   return (
    //     <div>
    //       {items.length > 0 ? (
    //         <Badge variant="outline" className="bg-blue-100 text-blue-800">
    //           {items.length} {items.length === 1 ? 'type' : 'types'}
    //         </Badge>
    //       ) : (
    //         <span className="text-gray-500">None</span>
    //       )}
    //     </div>
    //   )
    // },
  },
  {
    accessorKey: 'fetch_time',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Last Crawled' />
    ),
    cell: ({ row }) => {
      const date = row.getValue('fetch_time') as Date
      return (
        <div className='text-gray-600'>
          {/* {date.toLocaleDateString()} {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
           */}
          {format(date, 'dd/MM/yyyy')}
        </div>
      )
    },
  },
]
