import { z } from 'zod'

export const onPageAnalysisSchema = z.object({
  id: z.string(),
  url: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  images: z.number(),
  h1: z.string().nullable(),
  h2: z.array(z.string()),
  plain_text_word_count: z.number(),
  internal_links_count: z.number(),
  external_links_count: z.number(),
  keyword: z.array(z.string()),
  canonical: z.boolean(),
  schema: z.boolean(),
})

export const onPageAnalysisListSchema = z.array(onPageAnalysisSchema)

export type onPageAnalysis = z.infer<typeof onPageAnalysisSchema>
