import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const base =
    "relative block px-4 py-2 rounded-lg transition-all duration-300";

  return (
    <div className="w-64 bg-gray-900/60 backdrop-blur-lg border-r border-gray-800 p-6 space-y-3">

      <h1 className="text-2xl font-bold text-orange-400 mb-8">
        Control Panel
      </h1>

      {[
        ["Dashboard", "/dashboard"],
        ["Complaints", "/complaints"],
        ["Income", "/income"],
        ["Expenses", "/expenses"],
        ["Promotions", "/promotions"],
        ["Salary", "/salary"],
        ["Assets", "/assets"],
        ["Liabilities", "/liabilities"],
        ["Borrowed Items", "/borrowed"],
      ].map(([name, path]) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            `${base} ${
              isActive
                ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`
          }
        >
          {name}
        </NavLink>
      ))}
    </div>
  );
}