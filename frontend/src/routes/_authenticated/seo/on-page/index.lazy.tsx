import { createLazyFileRoute } from '@tanstack/react-router'
import OnPage from '@/features/seo/on-page'

export const Route = createLazyFileRoute(
    '/_authenticated/seo/on-page/'
)({
    component: OnPage,
})
