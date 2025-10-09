import { z } from 'zod'

const httpStatusCodeSchema = z.union([
  z.literal(200),
  z.literal(301),
  z.literal(302),
  z.literal(404),
  z.literal(500),
  // Add other status codes as needed
  z.number(), // Fallback for other codes
])

const structuredDataItemSchema = z.object({
  type: z.string(),
  properties: z.record(z.string(), z.any()),
})

const crawledPageSchema = z.object({
  id: z.string(),

  url: z.string().url(),
  title: z.string(),
  description: z.string().nullable(),
  status_code: httpStatusCodeSchema,
  duration_time: z.number(), // in milliseconds
  structured_data: z.array(structuredDataItemSchema),
  // incomingInternalLinks: z.number(),
  internal_links_count: z.number(),
  inbound_links_count: z.number(),
  external_links_count: z.number(),
  hreflangUsage: z
    .array(
      z.object({
        lang: z.string(),
        url: z.string().url(),
      })
    )
    .optional(),
  canonical: z.string().url().optional(),
  fetch_time: z.coerce.date(),
})

export type CrawledPage = z.infer<typeof crawledPageSchema>

export const crawledPageListSchema = z.array(crawledPageSchema)
