import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/dashboard/invoices")({
  component: Invoices,
});

function Invoices() {
  return (
    <div
      className={
        "text-3xl caret-blue-950 w-full h-full flex items-center justify-center"
      }
    >
      Not yet started !!
    </div>
  );
}
