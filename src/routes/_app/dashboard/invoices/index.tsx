import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/dashboard/invoices/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_app/Invoices/"!</div>;
}
