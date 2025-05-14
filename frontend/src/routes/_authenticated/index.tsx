import { createFileRoute } from '@tanstack/react-router'
import { DomainOverview } from '@/features/domain-overview'

export const Route = createFileRoute('/_authenticated/')({
  component: DomainOverview,
})
