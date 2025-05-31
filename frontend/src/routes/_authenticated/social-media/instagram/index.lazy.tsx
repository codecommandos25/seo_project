import { createLazyFileRoute } from '@tanstack/react-router'
import InstagramAnalytics from '@/features/social-media/instagram'

export const Route = createLazyFileRoute(
    '/_authenticated/social-media/instagram/',
)({
    component: InstagramAnalytics,
})
