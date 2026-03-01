import Expense from "../models/Expense.js";

export const getExpenses = async (req, res) => {
  const expenses = await Expense.find().sort({ date: -1 });
  res.json(expenses);
};

export const createExpense = async (req, res) => {
  const { title, amount, date } = req.body;

  const expense = await Expense.create({
    title,
    amount,
    date,
  });

  res.status(201).json(expense);
};

export const deleteExpense = async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json({ message: "Expense deleted" });
};