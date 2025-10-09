import { createLazyFileRoute } from '@tanstack/react-router'
import KeywordAnaysis from '@/features/seo/keyword-analysis'

export const Route = createLazyFileRoute(
  '/_authenticated/seo/keyword-analysis'
)({
  component: KeywordAnaysis,
})
