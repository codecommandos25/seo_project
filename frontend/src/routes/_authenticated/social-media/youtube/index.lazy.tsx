import { createLazyFileRoute } from '@tanstack/react-router'
import YouTubeAnalytics from '@/features/social-media/youtube'

export const Route = createLazyFileRoute(
    '/_authenticated/social-media/youtube/',
)({
    component: YouTubeAnalytics,
})
