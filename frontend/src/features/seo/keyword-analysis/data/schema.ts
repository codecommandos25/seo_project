import { z } from 'zod'

const searchIntentSchema = z.union([
  z.literal('informational'),
  z.literal('navigational'),
  z.literal('commercial'),
  z.literal('transactional'),
])
export type SearchIntent = z.infer<typeof searchIntentSchema>

const keywordSchema = z.object({
  id: z.string(),
  keyword: z.string(),
  intent: searchIntentSchema,
  position: z.number(),
  traffic: z.number(),
  trafficPercentage: z.number(),
  volume: z.number(),
  keywordDifficulty: z.number(),
  cpc: z.number(),
  url: z.string().url(),
  prevPosition: z.number().optional(),
  lastUpdate: z.coerce.date(),
})
export type Keyword = z.infer<typeof keywordSchema>

export const keywordListSchema = z.array(keywordSchema)
