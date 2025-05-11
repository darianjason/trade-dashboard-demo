import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$lang/users')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/users"!</div>
}
