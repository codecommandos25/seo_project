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
  pageUrl: z.string().url(),
  pageTitle: z.string(),
  metaDescription: z.string().nullable(),
  httpStatusCode: httpStatusCodeSchema,
  pageLoadTime: z.number(), // in milliseconds
  structuredDataItems: z.array(structuredDataItemSchema),
  incomingInternalLinks: z.number(),
  outgoingInternalLinks: z.number(),
  outgoingExternalLinks: z.number(),
  hreflangUsage: z.array(z.object({
    lang: z.string(),
    url: z.string().url(),
  })).optional(),
  canonicalUrl: z.string().url().optional(),
  lastCrawled: z.coerce.date(),
})

export type CrawledPage = z.infer<typeof crawledPageSchema>

export const crawledPageListSchema = z.array(crawledPageSchema)
