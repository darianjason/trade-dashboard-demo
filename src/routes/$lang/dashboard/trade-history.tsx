import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$lang/dashboard/trade-history')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/trade-history"!</div>
}
