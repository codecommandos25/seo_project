import { z } from 'zod'

export const onPageAnalysisSchema = z.object({
  id: z.string(),
  url: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  imageCount: z.number(),
  h1: z.string().nullable(),
  h2Tags: z.array(z.string()),
  contentLength: z.number(),
  internalLinks: z.number(),
  externalLinks: z.number(),
  keywords: z.array(z.string()),
  hasCanonical: z.boolean(),
  hasSchema: z.boolean(),
})

export const onPageAnalysisListSchema = z.array(onPageAnalysisSchema)

export type onPageAnalysis = z.infer<typeof onPageAnalysisSchema>
