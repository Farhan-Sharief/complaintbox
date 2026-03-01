import { useEffect, useState } from "react";
import Modal from "../components/ui/Modal";
import Table from "../components/ui/Table";
import axios from "../utils/axiosConfig";

export default function Income() {
  const [isOpen, setIsOpen] = useState(false);
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    source: "",
    amount: "",
    date: "",
  });

  /* ================= FETCH ================= */

  const fetchIncomes = async () => {
    try {
      const res = await axios.get("/income");

      if (Array.isArray(res.data)) {
        setIncomes(res.data);
      } else {
        console.warn("Unexpected income response:", res.data);
        setIncomes([]);
      }

    } catch (error) {
      console.error("Error fetching incomes:", error);
      setIncomes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncomes();
  }, []);

  /* ================= ADD ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/income", form);

      setIsOpen(false);
      setForm({ source: "", amount: "", date: "" });
      fetchIncomes();
    } catch (error) {
      console.error("Error adding income:", error);
    }
  };

  /* ================= DELETE ================= */

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/income/${id}`);
      fetchIncomes();
    } catch (error) {
      console.error("Error deleting income:", error);
    }
  };

  /* ================= TOTAL ================= */

  const totalIncome = Array.isArray(incomes)
    ? incomes.reduce((sum, item) => sum + Number(item.amount), 0)
    : 0;

  if (loading) return <p>Loading income...</p>;

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Income</h1>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600"
        >
          + Add Income
        </button>
      </div>

      <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-800">
        <p className="text-gray-400">Total Income</p>
        <h2 className="text-2xl font-bold text-green-400">
          ₹{totalIncome.toLocaleString()}
        </h2>
      </div>

      <Table
        columns={["Source", "Amount", "Date"]}
        data={incomes.map((item) => ({
          ...item,
          id: item._id,
          date: new Date(item.date).toLocaleDateString(),
        }))}
        onDelete={handleDelete}
      />

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 className="text-xl font-bold mb-4">Add Income</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Source"
            value={form.source}
            onChange={(e) =>
              setForm({ ...form, source: e.target.value })
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

          <button
            type="submit"
            className="w-full bg-green-500 py-2 rounded hover:bg-green-600"
          >
            Save
          </button>
        </form>
      </Modal>
    </div>
  );
}