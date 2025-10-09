import { z } from 'zod'

// Backlink Analysis Schema
const linkTypeSchema = z.union([
  z.literal('follow'),
  z.literal('nofollow'),
  z.literal('sponsored'),
  z.literal('ugc'),
])
export type LinkType = z.infer<typeof linkTypeSchema>

const backlinkSchema = z.object({
  id: z.string(),
  source_page: z.string(),
  source_url: z.string().url(),
  target_url: z.string().url(),
  anchor_text: z.string(),
  external_links: z.number(),
  internal_links: z.number(),
  linked_type: linkTypeSchema,
  domain_authority: z.number().optional(),
  page_authority: z.number().optional(),
  first_seen: z.coerce.date(),
  last_seen: z.coerce.date(),
  status: z.number().optional(),
  // isLive: z.boolean().optional(),
})
export type Backlink = z.infer<typeof backlinkSchema>

export const backlinkListSchema = z.array(backlinkSchema)
