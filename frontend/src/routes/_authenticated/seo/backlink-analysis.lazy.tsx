import { createLazyFileRoute } from '@tanstack/react-router'
import BacklinkAnaysis from '@/features/seo/backlink-analysis'

export const Route = createLazyFileRoute(
  '/_authenticated/seo/backlink-analysis'
)({
  component: BacklinkAnaysis,
})
