import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  Menu,
  X,
  LayoutDashboard,
  AlertCircle,
  IndianRupee,
  TrendingDown,
  Megaphone,
  Users,
  Wallet,
  Scale,
  Package
} from "lucide-react";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const base =
    "flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300";

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Complaints", path: "/complaints", icon: AlertCircle },
    { name: "Income", path: "/income", icon: IndianRupee },
    { name: "Expenses", path: "/expenses", icon: TrendingDown },
    { name: "Promotions", path: "/promotions", icon: Megaphone },
    { name: "Salary", path: "/salary", icon: Users },
    { name: "Assets", path: "/assets", icon: Wallet },
    { name: "Liabilities", path: "/liabilities", icon: Scale },
    { name: "Borrowed Items", path: "/borrowed", icon: Package },
  ];

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden flex items-center justify-between bg-gray-900 p-4 border-b border-gray-800">
        <h1 className="text-lg font-bold text-orange-400">
          Control Panel
        </h1>
        <button onClick={() => setMobileOpen(true)}>
          <Menu className="text-white" />
        </button>
      </div>

      {/* Overlay (Mobile) */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:static top-0 left-0 z-50 h-full
          bg-gray-900/90 backdrop-blur-lg border-r border-gray-800
          transition-all duration-300
          ${collapsed ? "w-20" : "w-64"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <div className="p-6 space-y-6 h-full flex flex-col">

          {/* Header */}
          <div className="flex items-center justify-between">
            {!collapsed && (
              <h1 className="text-xl font-bold text-orange-400">
                Control Panel
              </h1>
            )}

            {/* Desktop Collapse Toggle */}
            <button
              className="hidden lg:block"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? (
                <Menu className="text-white" />
              ) : (
                <X className="text-white" />
              )}
            </button>

            {/* Mobile Close */}
            <button
              className="lg:hidden"
              onClick={() => setMobileOpen(false)}
            >
              <X className="text-white" />
            </button>
          </div>

          {/* Navigation */}
          <div className="space-y-2 flex-1">
            {navItems.map(({ name, path, icon: Icon }) => (
              <NavLink
                key={path}
                to={path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `${base} ${
                    isActive
                      ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                      : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  }`
                }
              >
                <Icon size={20} />

                {!collapsed && (
                  <span className="whitespace-nowrap">
                    {name}
                  </span>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}