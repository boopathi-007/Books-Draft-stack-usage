import {
  createFileRoute,
  Link,
  Outlet,
  useRouter,
} from "@tanstack/react-router";
import { debounce } from "lodash";
import {
  Bell,
  FileText,
  LayoutDashboard,
  LogOut,
  Search,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import SearchSchema from "#/schemas/search.schema";
import { useAuthStore } from "#/stores/auth.store";

export const Route = createFileRoute("/_app/dashboard")({
  component: DashboardLayout,
  validateSearch: SearchSchema,
});

function DashboardLayout() {
  const { useSearch } = Route;
  const { navigate } = useRouter();
  const { q } = useSearch();
  const { user, logout } = useAuthStore();

  const [searchText, setSearchText] = useState(q);

  useEffect(() => {
    setSearchText(q);
  }, [q]);

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        navigate({
          to: ".",
          search: (prev) => ({
            ...prev,
            q: value,
          }),
          replace: true,
        });
      }, 300),
    [navigate],
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setSearchText(value);
    debouncedSearch(value);
  };

  const handleLogout = () => {
    logout();

    navigate({
      to: "/login",
      replace: true,
    });
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      {/* Sidebar */}
      <aside className="flex w-64 flex-col border-r border-slate-200 bg-white">
        {/* Logo */}
        <div className="border-b border-slate-200 px-6 py-5">
          <h1 className="text-xl font-bold text-blue-600">Elixir Books</h1>

          <p className="text-sm text-slate-500">Accounting System</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-1">
            <Link
              to="/dashboard"
              activeOptions={{ exact: true }}
              activeProps={{
                className: "bg-blue-50 text-blue-600 font-medium",
              }}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-slate-700 transition hover:bg-slate-100"
              search={{ q }}
            >
              <LayoutDashboard size={18} />
              Dashboard
            </Link>

            <Link
              to="/dashboard/customers"
              activeProps={{
                className: "bg-blue-50 text-blue-600 font-medium",
              }}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-slate-700 transition hover:bg-slate-100"
              search={{ q }}
            >
              <Users size={18} />
              Customers
            </Link>

            <Link
              to="/dashboard/invoices"
              activeProps={{
                className: "bg-blue-50 text-blue-600 font-medium",
              }}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-slate-700 transition hover:bg-slate-100"
              search={{ q }}
            >
              <FileText size={18} />
              Invoices
            </Link>
          </div>
        </nav>

        {/* User */}
        <div className="border-t border-slate-200 p-4">
          <div className="mb-4">
            <p className="font-medium text-slate-800">{user?.name}</p>

            <p className="text-sm text-slate-500">{user?.email}</p>
          </div>

          {/** biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-50 py-2 text-red-600 transition hover:bg-red-100 cursor-pointer"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
          <div className="relative">
            <Search
              size={18}
              className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search..."
              value={searchText}
              className="w-80 rounded-lg border border-slate-300 py-2 pr-4 pl-10 outline-none transition focus:border-blue-600"
              onChange={handleSearchChange}
            />
          </div>

          <div className="flex items-center gap-5">
            {/** biome-ignore lint/a11y/useButtonType: <explanation> */}
            <button className="relative">
              <Bell className="text-slate-600" size={20} />

              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500" />
            </button>

            <div className="text-right">
              <p className="text-sm font-medium text-slate-800">{user?.name}</p>

              <p className="text-xs text-slate-500">Administrator</p>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
