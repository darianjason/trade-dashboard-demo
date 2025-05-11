import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$lang/dashboard/user-reports')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/user-reports"!</div>
}
