import { createLazyFileRoute } from '@tanstack/react-router'
import Dashboard from '@/features/seo/dashboard'

export const Route = createLazyFileRoute('/_authenticated/seo/')({
  component: Dashboard,
})