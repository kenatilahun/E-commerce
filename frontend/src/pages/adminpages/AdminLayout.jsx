import { Link, NavLink, Outlet } from "react-router-dom";

 
const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 lg:grid-cols-[260px_1fr]">
        <aside className="border-b border-slate-200 bg-white lg:border-b-0 lg:border-r">
          <div className="flex h-16 items-center justify-between px-6 lg:h-20">
            <Link to="/" className="text-lg font-semibold tracking-tight">
              Admin Console
            </Link>
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
              Live
            </span>
          </div>
          <nav className="px-3 pb-6 pt-2">
            <div className="px-3 pb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Manage
            </div>
            <NavLink
              to="products"
              className={({ isActive }) =>
                [
                  "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition",
                  isActive
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-700 hover:bg-slate-100",
                ].join(" ")
              }
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                P
              </span>
              Products
            </NavLink>
          </nav>
        </aside>

        <div className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur">
            <div className="flex h-16 items-center justify-between px-6 lg:h-20">
              <div>
                <p className="text-sm text-slate-500">Welcome back</p>
                <h1 className="text-lg font-semibold tracking-tight">
                  Admin Dashboard
                </h1>
              </div>
              <div className="flex items-center gap-3">
                <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-600 shadow-sm md:flex">
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
                  Status healthy
                </div>
                <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800">
                  New report
                </button>
              </div>
            </div>
          </header>

          <main className="flex-1 px-6 py-6 lg:px-8">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
  
