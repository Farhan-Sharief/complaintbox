import Salary from "../models/Salary.js";

export const getSalaries = async (req, res) => {
  const salaries = await Salary.find().sort({ date: -1 });
  res.json(salaries);
};

export const createSalary = async (req, res) => {
  const salary = await Salary.create(req.body);
  res.status(201).json(salary);
};

export const deleteSalary = async (req, res) => {
  await Salary.findByIdAndDelete(req.params.id);
  res.json({ message: "Salary deleted" });
};