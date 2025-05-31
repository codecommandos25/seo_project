import { createLazyFileRoute } from '@tanstack/react-router'
import WebsiteSpeed from '@/features/seo/technical-analysis/website-speed'

export const Route = createLazyFileRoute(
    '/_authenticated/seo/technical-analysis/website-speed',
)({
    component: WebsiteSpeed,
})
