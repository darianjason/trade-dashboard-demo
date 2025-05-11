import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$lang/reporting')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/reporting"!</div>
}
