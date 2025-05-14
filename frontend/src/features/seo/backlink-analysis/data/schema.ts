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
  sourcePageTitle: z.string(),
  sourceUrl: z.string().url(),
  targetUrl: z.string().url(),
  anchorText: z.string(),
  externalLinks: z.number(),
  internalLinks: z.number(),
  linkType: linkTypeSchema,
  domainAuthority: z.number().optional(),
  pageAuthority: z.number().optional(),
  firstSeen: z.coerce.date(),
  lastSeen: z.coerce.date(),
  statusCode: z.number().optional(),
  isLive: z.boolean().optional(),
})
export type Backlink = z.infer<typeof backlinkSchema>

export const backlinkListSchema = z.array(backlinkSchema)
