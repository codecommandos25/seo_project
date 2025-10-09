import { format } from 'date-fns'
import { ColumnDef } from '@tanstack/react-table'
import { ExternalLink, Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import LongText from '@/components/long-text'
import { Backlink, LinkType } from '../data/schema'
import { DataTableColumnHeader } from './data-table-column-header'

export const columns: ColumnDef<Backlink>[] = [
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
    accessorKey: 'source_page',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Source Page' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36'>{row.getValue('source_page')}</LongText>
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
    accessorKey: 'source_url',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Source URL' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36 text-blue-600 hover:underline'>
        <a
          href={row.getValue('source_url') as string}
          target='_blank'
          rel='noopener noreferrer'
        >
          {row.getValue('source_url')}
          <ExternalLink className='ml-1 inline h-3 w-3' />
        </a>
      </LongText>
    ),
  },
  {
    accessorKey: 'target_url',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Target URL' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36 text-blue-600 hover:underline'>
        <a
          href={row.getValue('target_url') as string}
          target='_blank'
          rel='noopener noreferrer'
        >
          {row.getValue('target_url')}
        </a>
      </LongText>
    ),
  },
  {
    accessorKey: 'anchor_text',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Anchor Text' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36'>{row.getValue('anchor_text')}</LongText>
    ),
  },
  {
    accessorKey: 'linked_type',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Link Type' />
    ),
    cell: ({ row }) => {
      const linkType = row.getValue('linked_type') as LinkType

      const getLinkTypeColor = (type: LinkType) => {
        switch (type) {
          case 'follow':
            return 'bg-green-100 text-green-800'
          case 'nofollow':
            return 'bg-yellow-100 text-yellow-800'
          case 'sponsored':
            return 'bg-blue-100 text-blue-800'
          case 'ugc':
            return 'bg-purple-100 text-purple-800'
          default:
            return ''
        }
      }

      return (
        <Badge
          variant='outline'
          className={cn('capitalize', getLinkTypeColor(linkType))}
        >
          {linkType}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'external_links',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='External Links' />
    ),
    cell: ({ row }) => <div>{row.getValue('external_links')}</div>,
  },
  {
    accessorKey: 'internal_links',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Internal Links' />
    ),
    cell: ({ row }) => <div>{row.getValue('internal_links')}</div>,
  },
  {
    accessorKey: 'domain_authority',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Domain Authority' />
    ),
    cell: ({ row }) => {
      const da = row.getValue('domain_authority') as number | undefined
      return <div>{da ?? 'N/A'}</div>
    },
  },
  {
    accessorKey: 'page_authority',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Page Authority' />
    ),
    cell: ({ row }) => {
      const pa = row.getValue('page_authority') as number | undefined
      return <div>{pa ?? 'N/A'}</div>
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const isLive = row.getValue('status') as boolean | undefined
      const statusCode = row.original.status

      return (
        <div className='flex items-center gap-1'>
          {isLive === true ? (
            <Check className='h-4 w-4 text-green-500' />
          ) : isLive === false ? (
            <X className='h-4 w-4 text-red-500' />
          ) : null}
          {statusCode && (
            <span className='ml-1 text-xs text-muted-foreground'>
              {statusCode}
            </span>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: 'first_seen',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='First Seen' />
    ),
    cell: ({ row }) => {
      const date = row.getValue('first_seen') as Date
      return <div>{format(date, 'dd/MM/yyyy')}</div>
    },
  },
  {
    accessorKey: 'last_seen',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Last Seen' />
    ),
    cell: ({ row }) => {
      const date = row.getValue('last_seen') as Date
      return <div>{format(date, 'dd/MM/yyyy')}</div>
    },
  },
]
