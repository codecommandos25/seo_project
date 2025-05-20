import { ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import LongText from '@/components/long-text'
import { Backlink, LinkType } from '../data/schema'
import { DataTableColumnHeader } from './data-table-column-header'
import { ExternalLink, Check, X } from 'lucide-react'

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
    accessorKey: 'sourcePageTitle',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Source Page' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36'>{row.getValue('sourcePageTitle')}</LongText>
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
    accessorKey: 'sourceUrl',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Source URL' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36 text-blue-600 hover:underline'>
        <a href={row.getValue('sourceUrl') as string} target="_blank" rel="noopener noreferrer">
          {row.getValue('sourceUrl')}
          <ExternalLink className="h-3 w-3 ml-1 inline" />
        </a>
      </LongText>
    ),
  },
  {
    accessorKey: 'targetUrl',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Target URL' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36 text-blue-600 hover:underline'>
        <a href={row.getValue('targetUrl') as string} target="_blank" rel="noopener noreferrer">
          {row.getValue('targetUrl')}
        </a>
      </LongText>
    ),
  },
  {
    accessorKey: 'anchorText',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Anchor Text' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36'>{row.getValue('anchorText')}</LongText>
    ),
  },
  {
    accessorKey: 'linkType',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Link Type' />
    ),
    cell: ({ row }) => {
      const linkType = row.getValue('linkType') as LinkType

      const getLinkTypeColor = (type: LinkType) => {
        switch (type) {
          case 'follow': return 'bg-green-100 text-green-800'
          case 'nofollow': return 'bg-yellow-100 text-yellow-800'
          case 'sponsored': return 'bg-blue-100 text-blue-800'
          case 'ugc': return 'bg-purple-100 text-purple-800'
          default: return ''
        }
      }

      return (
        <Badge variant='outline' className={cn('capitalize', getLinkTypeColor(linkType))}>
          {linkType}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'externalLinks',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='External Links' />
    ),
    cell: ({ row }) => <div>{row.getValue('externalLinks')}</div>,
  },
  {
    accessorKey: 'internalLinks',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Internal Links' />
    ),
    cell: ({ row }) => <div>{row.getValue('internalLinks')}</div>,
  },
  {
    accessorKey: 'domainAuthority',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Domain Authority' />
    ),
    cell: ({ row }) => {
      const da = row.getValue('domainAuthority') as number | undefined
      return <div>{da ?? 'N/A'}</div>
    },
  },
  {
    accessorKey: 'pageAuthority',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Page Authority' />
    ),
    cell: ({ row }) => {
      const pa = row.getValue('pageAuthority') as number | undefined
      return <div>{pa ?? 'N/A'}</div>
    },
  },
  {
    accessorKey: 'isLive',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const isLive = row.getValue('isLive') as boolean | undefined
      const statusCode = row.original.statusCode

      return (
        <div className="flex items-center gap-1">
          {isLive === true ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : isLive === false ? (
            <X className="h-4 w-4 text-red-500" />
          ) : null}
          {statusCode && <span className="text-xs text-muted-foreground ml-1">{statusCode}</span>}
        </div>
      )
    },
  },
  {
    accessorKey: 'firstSeen',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='First Seen' />
    ),
    cell: ({ row }) => {
      const date = row.getValue('firstSeen') as Date
      return <div>{date.toLocaleDateString()}</div>
    },
  },
  {
    accessorKey: 'lastSeen',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Last Seen' />
    ),
    cell: ({ row }) => {
      const date = row.getValue('lastSeen') as Date
      return <div>{date.toLocaleDateString()}</div>
    },
  },
]