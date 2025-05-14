import { createLazyFileRoute } from '@tanstack/react-router'
import CrawledPages from '@/features/seo/technical-analysis/crawled-pages'

export const Route = createLazyFileRoute(
  '/_authenticated/seo/technical-analysis/crawled-pages',
)({
  component: CrawledPages,
})
