import Income from "../models/Income.js";
import Expense from "../models/Expense.js";
import Salary from "../models/Salary.js";
import Asset from "../models/Asset.js";
import Liability from "../models/Liability.js";

export const getDashboardSummary = async (req, res) => {
  try {
    const filter = req.query.filter;
    const now = new Date();
    const currentMonth = now.getMonth();
    const lastMonth = currentMonth - 1;

    const filterByMonth = (date) => {
      if (!date) return false;
      const month = new Date(date).getMonth();
      if (filter === "thisMonth") return month === currentMonth;
      if (filter === "lastMonth") return month === lastMonth;
      return true;
    };

    const incomes = await Income.find();
    const expenses = await Expense.find();
    const salaries = await Salary.find();
    const assets = await Asset.find();
    const liabilities = await Liability.find();

    const filteredIncome = incomes.filter((i) =>
      filterByMonth(i.date)
    );

    const filteredExpense = expenses.filter((e) =>
      filterByMonth(e.date)
    );

    const filteredSalary = salaries.filter((s) =>
      filterByMonth(s.date)
    );

    const totalIncome = filteredIncome.reduce(
      (sum, i) => sum + Number(i.amount || 0),
      0
    );

    const totalExpenseOnly = filteredExpense.reduce(
      (sum, e) => sum + Number(e.amount || 0),
      0
    );

    const totalSalary = filteredSalary.reduce(
      (sum, s) => sum + Number(s.amount || 0),
      0
    );

    const totalExpense = totalExpenseOnly + totalSalary;
    const profit = totalIncome - totalExpense;

    const totalAssets = assets.reduce(
      (sum, a) => sum + Number(a.value || 0),
      0
    );

    const totalLiabilities = liabilities.reduce(
      (sum, l) => sum + Number(l.amount || 0),
      0
    );

    const netWorth = totalAssets - totalLiabilities;

    res.json({
      totalIncome,
      totalExpense,
      totalSalary,
      profit,
      totalAssets,
      totalLiabilities,
      netWorth,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Dashboard error" });
  }
};