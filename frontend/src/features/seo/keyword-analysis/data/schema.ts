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
  main_intent: searchIntentSchema,
  rank_absolute: z.number(),
  // traffic: z.number(),
  etv: z.number(),
  trafficPercentage: z.number(),
  search_volume: z.number(),
  keyword_difficulty: z.number(),
  cpc: z.number(),
  url: z.string().url(),
  prevPosition: z.number().optional(),
  last_updated_time: z.coerce.date(),
})
export type Keyword = z.infer<typeof keywordSchema>

export const keywordListSchema = z.array(keywordSchema)
