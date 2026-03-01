import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Sidebar({ collapsed, setCollapsed }) {
  const base =
    "flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300";

  const navItems = [
    ["Dashboard", "/dashboard"],
    ["Complaints", "/complaints"],
    ["Income", "/income"],
    ["Expenses", "/expenses"],
    ["Promotions", "/promotions"],
    ["Salary", "/salary"],
    ["Assets", "/assets"],
    ["Liabilities", "/liabilities"],
    ["Borrowed Items", "/borrowed"],
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-gray-900 border-r border-gray-800 transition-all duration-300 z-50 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="p-6 space-y-6">

        <div className="flex justify-between items-center">
         <h1
  className={`text-xl font-bold text-orange-400 transition-all duration-300 ${
    collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
  }`}
>
  Control Panel
</h1>
          <button onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? (
              <Menu className="text-white" />
            ) : (
              <X className="text-white" />
            )}
          </button>
        </div>

        <div className="space-y-2">
          {navItems.map(([name, path]) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `${base} ${
                  isActive
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`
              }
            >
              {!collapsed && name}
              {collapsed && name.charAt(0)}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}