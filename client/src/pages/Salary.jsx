import { useEffect, useState } from "react";
import Modal from "../components/ui/Modal";
import Table from "../components/ui/Table";
import axios from "../utils/axiosConfig";

export default function Salary() {
  const [isOpen, setIsOpen] = useState(false);
  const [salaries, setSalaries] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    amount: "",
    date: "",
  });

  /* ================= FETCH ================= */

  const fetchSalaries = async () => {
    try {
      const res = await axios.get("/salary");

      if (Array.isArray(res.data)) {
        setSalaries(res.data);
      } else {
        console.warn("Unexpected salary response:", res.data);
        setSalaries([]);
      }

    } catch (err) {
      console.error("Error fetching salaries:", err);
      setSalaries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSalaries();
  }, []);

  /* ================= ADD ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/salary", form);

      setForm({ name: "", amount: "", date: "" });
      setIsOpen(false);
      fetchSalaries();
    } catch (err) {
      console.error("Error adding salary:", err);
    }
  };

  /* ================= DELETE ================= */

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/salary/${id}`);
      fetchSalaries();
    } catch (err) {
      console.error("Error deleting salary:", err);
    }
  };

  /* ================= TOTAL ================= */

  const totalSalary = Array.isArray(salaries)
    ? salaries.reduce((sum, item) => sum + Number(item.amount), 0)
    : 0;

  if (loading) return <p>Loading salary data...</p>;

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Salary Withdrawals
        </h1>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-pink-500 px-4 py-2 rounded"
        >
          + Add Salary
        </button>
      </div>

      <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-800">
        <p>Total Salary Paid</p>
        <h2 className="text-2xl font-bold text-pink-400">
          ₹{totalSalary.toLocaleString()}
        </h2>
      </div>

      <Table
        columns={["Name", "Amount", "Date"]}
        data={salaries.map((item) => ({
          ...item,
          id: item._id,
          source: item.name,
          date: new Date(item.date).toLocaleDateString(),
        }))}
        onDelete={handleDelete}
      />

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 className="text-xl font-bold mb-4">
          Add Salary
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            placeholder="Employee / Owner Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
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

          <button className="w-full bg-pink-500 py-2 rounded">
            Save
          </button>
        </form>
      </Modal>
    </div>
  );
}