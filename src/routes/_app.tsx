import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useAuthStore } from "#/stores/auth.store";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState();
    if (!isAuthenticated())
      throw redirect({
        to: "/login",
        replace: true,
      });
  },
});

function AppLayout() {
  return <Outlet />;
}
