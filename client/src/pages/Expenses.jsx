import { useEffect, useState } from "react";
import Modal from "../components/ui/Modal";
import Table from "../components/ui/Table";
import axios from "../utils/axiosConfig";

export default function Expenses() {
  const [isOpen, setIsOpen] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    amount: "",
    date: "",
  });

  /* ---------- FETCH ---------- */

  const fetchExpenses = async () => {
    try {
      const res = await axios.get("/expense");

      // Ensure array safety
      if (Array.isArray(res.data)) {
        setExpenses(res.data);
      } else {
        console.warn("Unexpected expense response:", res.data);
        setExpenses([]);
      }
    } catch (err) {
      console.error("Error fetching expenses:", err);
      setExpenses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  /* ---------- ADD ---------- */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/expense", form);

      setForm({ title: "", amount: "", date: "" });
      setIsOpen(false);
      fetchExpenses();
    } catch (err) {
      console.error("Error adding expense:", err);
    }
  };

  /* ---------- DELETE ---------- */

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/expense/${id}`);
      fetchExpenses();
    } catch (err) {
      console.error("Error deleting expense:", err);
    }
  };

  /* ---------- TOTAL ---------- */

  const totalExpense = Array.isArray(expenses)
    ? expenses.reduce((sum, item) => sum + Number(item.amount), 0)
    : 0;

  if (loading) {
    return <p>Loading expenses...</p>;
  }

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Expenses</h1>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-red-500 px-4 py-2 rounded"
        >
          + Add Expense
        </button>
      </div>

      <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-800">
        <p>Total Expense</p>
        <h2 className="text-2xl font-bold text-red-400">
          ₹{totalExpense.toLocaleString()}
        </h2>
      </div>

      <Table
        columns={["Title", "Amount", "Date"]}
        data={expenses.map((item) => ({
          ...item,
          id: item._id,
          source: item.title,
          date: new Date(item.date).toLocaleDateString(),
        }))}
        onDelete={handleDelete}
      />

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 className="text-xl font-bold mb-4">Add Expense</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            className="w-full p-2 bg-gray-800 rounded"
            required
          />

          <input
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) =>
              setForm({ ...form, amount: e.target.value })
            }
            className="w-full p-2 bg-gray-800 rounded"
            required
          />

          <input
            type="date"
            value={form.date}
            onChange={(e) =>
              setForm({ ...form, date: e.target.value })
            }
            className="w-full p-2 bg-gray-800 rounded"
            required
          />

          <button className="w-full bg-red-500 py-2 rounded">
            Save
          </button>
        </form>
      </Modal>
    </div>
  );
}