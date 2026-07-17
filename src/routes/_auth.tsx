import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  component: AuthLayout,
});

function AuthLayout() {
  return (
    <div className="bg-slate-50 h-full w-full">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="p-8 w-full max-w-md rounded-2xl border border-slate-100 bg-white shadow-xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
