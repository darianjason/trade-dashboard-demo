import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$lang/dashboard/analytics')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/analytics"!</div>
}
