import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function IncomeExpenseChart({
  incomes = [],
  expenses = [],
}) {
  const monthlyData = {};

  incomes.forEach((item) => {
    const month = new Date(item.date).toLocaleString(
      "default",
      { month: "short" }
    );

    if (!monthlyData[month])
      monthlyData[month] = { month, income: 0, expense: 0 };

    monthlyData[month].income += Number(item.amount);
  });

  expenses.forEach((item) => {
    const month = new Date(item.date).toLocaleString(
      "default",
      { month: "short" }
    );

    if (!monthlyData[month])
      monthlyData[month] = { month, income: 0, expense: 0 };

    monthlyData[month].expense += Number(item.amount);
  });

  const data = Object.values(monthlyData);

  return (
    <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 p-6 rounded-2xl shadow-xl">
      <h3 className="text-lg font-semibold mb-4">
        Income vs Expense
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="month" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />
          <Bar dataKey="income" fill="#22c55e" />
          <Bar dataKey="expense" fill="#ef4444" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}