import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/dashboard/")({
  beforeLoad: () => {
    throw redirect({ to: "/$lang/dashboard/overview" });
  },
});
