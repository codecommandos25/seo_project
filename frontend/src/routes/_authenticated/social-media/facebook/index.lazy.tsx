import { createLazyFileRoute } from '@tanstack/react-router'
import FacebookAnalytics from '@/features/social-media/facebook'

export const Route = createLazyFileRoute(
    '/_authenticated/social-media/facebook/',
)({
    component: FacebookAnalytics,
})