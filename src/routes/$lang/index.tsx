import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/")({
  component: App,
});

function App() {
  return (
    <div className="container self-center py-6">
      <h1 className="text-2xl font-bold">Hello world!</h1>
    </div>
  );
}
