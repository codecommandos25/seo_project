import { createLazyFileRoute } from '@tanstack/react-router'
import LinkedInAnalytics from '@/features/social-media/linkedin'

export const Route = createLazyFileRoute(
  '/_authenticated/social-media/linkedin/'
)({
  component: LinkedInAnalytics,
})
