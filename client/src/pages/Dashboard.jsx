import StatCard from "../components/ui/Statcard";
import IncomeExpenseChart from "../components/charts/IncomeExpenseChart";
import PromotionWidget from "../components/ui/PromotionWidget";
import { useState, useEffect } from "react";
import axios from "../utils/axiosConfig";

export default function Dashboard() {
  const [filter, setFilter] = useState("thisMonth");
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  const API =
    "https://complaintbox-ownf.onrender.com/api/dashboard/summary";

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API}?filter=${filter}`);
        setSummary(res.data);
      } catch (err) {
        console.error("Dashboard Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [filter]);

  if (loading || !summary) {
    return (
      <div className="p-6 text-gray-400 text-center">
        Loading dashboard...
      </div>
    );
  }

  const {
    totalIncome,
    totalExpense,
    totalSalary,
    profit,
    totalAssets,
    totalLiabilities,
    netWorth,
  } = summary;

  const profitPercentage =
    totalIncome > 0
      ? ((profit / totalIncome) * 100).toFixed(1)
      : 0;

  return (
    <div className="space-y-6 p-4 sm:p-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            Financial Overview
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Backend Powered Dashboard
          </p>
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white w-full sm:w-auto"
        >
          <option value="thisMonth">This Month</option>
          <option value="lastMonth">Last Month</option>
          <option value="all">All Time</option>
        </select>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
        <StatCard
          title="Total Income"
          value={totalIncome}
          percentage={null}
          gradient="bg-green-500"
        />

        <StatCard
          title="Total Expense"
          value={totalExpense}
          percentage={null}
          gradient="bg-red-500"
        />

        <StatCard
          title="Salary Paid"
          value={totalSalary}
          percentage={null}
          gradient="bg-pink-500"
        />

        <StatCard
          title="Net Profit"
          value={profit}
          percentage={profitPercentage}
          gradient="bg-orange-500"
        />

        <StatCard
          title="Net Worth"
          value={netWorth}
          percentage={null}
          gradient="bg-blue-500"
        />
      </div>

      {/* Cash Flow Summary */}
      <div className="bg-gray-900/50 border border-gray-800 p-4 sm:p-6 rounded-2xl">
        <h3 className="text-lg font-semibold mb-4">
          Cash Flow Summary
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div>
            <p className="text-gray-400 text-sm">Assets</p>
            <h2 className="text-lg sm:text-xl font-bold text-blue-400">
              ₹{totalAssets.toLocaleString()}
            </h2>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Liabilities</p>
            <h2 className="text-lg sm:text-xl font-bold text-red-400">
              ₹{totalLiabilities.toLocaleString()}
            </h2>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Salary Paid</p>
            <h2 className="text-lg sm:text-xl font-bold text-pink-400">
              ₹{totalSalary.toLocaleString()}
            </h2>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Net Worth</p>
            <h2 className="text-lg sm:text-xl font-bold text-green-400">
              ₹{netWorth.toLocaleString()}
            </h2>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gray-900/50 p-4 sm:p-6 rounded-2xl">
          <p className="text-gray-400 text-sm sm:text-base">
            Chart module can now be upgraded to backend data.
          </p>

          {/* Optional Chart Component */}
          <div className="mt-4">
            <IncomeExpenseChart />
          </div>
        </div>

        <div>
          <PromotionWidget />
        </div>
      </div>
    </div>
  );
}