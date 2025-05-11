import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$lang/dashboard/saved-reports')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/saved-reports"!</div>
}
