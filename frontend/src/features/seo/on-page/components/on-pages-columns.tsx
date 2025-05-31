import { ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import LongText from '@/components/long-text'
import { DataTableColumnHeader } from './data-table-column-header'
import { ExternalLink, ImageIcon, Link2, Code2, FileText, Hash } from 'lucide-react'
import { onPageAnalysis } from '../data/schema'

export const columns: ColumnDef<onPageAnalysis>[] = [
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
      <DataTableColumnHeader column={column} title='URL' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36 text-blue-600 hover:underline'>
        <a href={row.getValue('url')} target="_blank" rel="noopener noreferrer">
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
      <DataTableColumnHeader column={column} title='Title' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36'>{row.getValue('title')}</LongText>
    ),
  },
  {
    accessorKey: 'h1',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='H1' />
    ),
    cell: ({ row }) => {
      const h1 = row.getValue('h1') as string | null

      if (!h1) {
        return <span className="text-red-500">Missing</span>
      }

      return <LongText className='max-w-36'>{h1}</LongText>
    },
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Meta Description' />
    ),
    cell: ({ row }) => {
      const description = row.getValue('description') as string | null

      if (!description) {
        return <span className="text-red-500">Missing</span>
      }

      return <LongText className='max-w-36'>{description}</LongText>
    },
  },
  {
    accessorKey: 'contentLength',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Content Length' />
    ),
    cell: ({ row }) => {
      const contentLength = row.getValue('contentLength') as number
      let color = 'text-green-600'

      if (contentLength < 300) {
        color = 'text-red-600'
      } else if (contentLength < 600) {
        color = 'text-yellow-600'
      }

      return (
        <div className={cn('flex items-center gap-1', color)}>
          <FileText className="h-3 w-3" />
          <span>{contentLength} words</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'imageCount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Images' />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <ImageIcon className="h-3 w-3 text-gray-500" />
        <span>{row.getValue('imageCount')}</span>
      </div>
    ),
  },
  {
    accessorKey: 'internalLinks',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Internal Links' />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <Link2 className="h-3 w-3 text-gray-500" />
        <span>{row.getValue('internalLinks')}</span>
      </div>
    ),
  },
  {
    accessorKey: 'externalLinks',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='External Links' />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <ExternalLink className="h-3 w-3 text-gray-500" />
        <span>{row.getValue('externalLinks')}</span>
      </div>
    ),
  },
  {
    accessorKey: 'h2Tags',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='H2 Tags' />
    ),
    cell: ({ row }) => {
      const h2Tags = row.getValue('h2Tags') as string[]

      return (
        <div className="flex items-center gap-1">
          <span>{h2Tags.length}</span>
          {h2Tags.length > 0 ? (
            <Badge variant="outline" className="bg-blue-100 text-blue-800">
              View
            </Badge>
          ) : null}
        </div>
      )
    },
  },
  {
    accessorKey: 'keywords',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Keywords' />
    ),
    cell: ({ row }) => {
      const keywords = row.getValue('keywords') as string[]

      return (
        <div className="flex items-center gap-1">
          <Hash className="h-3 w-3 text-gray-500" />
          <span>{keywords.length}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'hasCanonical',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Canonical' />
    ),
    cell: ({ row }) => {
      const hasCanonical = row.getValue('hasCanonical') as boolean

      return (
        <Badge variant="outline" className={hasCanonical ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
          {hasCanonical ? "Yes" : "No"}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'hasSchema',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Schema' />
    ),
    cell: ({ row }) => {
      const hasSchema = row.getValue('hasSchema') as boolean

      return (
        <div className="flex items-center gap-1">
          <Code2 className={`h-3 w-3 ${hasSchema ? "text-green-500" : "text-red-500"}`} />
          <span>{hasSchema ? "Yes" : "No"}</span>
        </div>
      )
    },
  },
]