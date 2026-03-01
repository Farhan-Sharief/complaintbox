import Income from "../models/Income.js";

export const getIncomes = async (req, res) => {
  const incomes = await Income.find().sort({ date: -1 });
  res.json(incomes);
};

export const createIncome = async (req, res) => {
  const { source, amount, date } = req.body;

  const income = await Income.create({
    source,
    amount,
    date,
  });

  res.status(201).json(income);
};

export const deleteIncome = async (req, res) => {
  await Income.findByIdAndDelete(req.params.id);
  res.json({ message: "Income deleted" });
};