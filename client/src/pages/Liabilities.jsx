import { useState, useEffect } from "react";
import Modal from "../components/ui/Modal";
import axios from "../utils/axiosConfig";

export default function Liabilities() {
  const [liabilities, setLiabilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    amount: "",
  });

  const API = "http://localhost:5000/api/liability";

  /* ================= FETCH ================= */

  const fetchLiabilities = async () => {
    try {
      const res = await axios.get(API);
      setLiabilities(res.data);
    } catch (err) {
      console.error("Fetch Liability Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiabilities();
  }, []);

  /* ================= CREATE ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.amount) return;

    try {
      const res = await axios.post(API, {
        name: form.name,
        amount: Number(form.amount),
      });

      setLiabilities((prev) => [...prev, res.data]);
      setForm({ name: "", amount: "" });
      setIsOpen(false);
    } catch (err) {
      console.error("Create Liability Error:", err);
    }
  };

  /* ================= DELETE ================= */

  const deleteLiability = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      setLiabilities((prev) =>
        prev.filter((l) => l._id !== id)
      );
    } catch (err) {
      console.error("Delete Liability Error:", err);
    }
  };

  /* ================= CALCULATION ================= */

  const totalLiabilities = liabilities.reduce(
    (sum, l) => sum + Number(l.amount || 0),
    0
  );

  return (
    <div className="space-y-6">

      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">
          Liabilities
        </h1>

        <button
          onClick={() => setIsOpen(true)}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
        >
          + Add Liability
        </button>
      </div>

      {/* Total Card */}
      <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-800">
        <p>Total Liabilities</p>
        <h2 className="text-2xl font-bold text-red-400">
          ₹{totalLiabilities.toLocaleString()}
        </h2>
      </div>

      {/* List */}
      {loading && (
        <p className="text-gray-400">
          Loading liabilities...
        </p>
      )}

      {!loading && liabilities.length === 0 && (
        <p className="text-gray-400">
          No liabilities added yet.
        </p>
      )}

      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
        {liabilities.map((l) => (
          <div
            key={l._id}
            className="flex justify-between items-center border-b border-gray-800 py-2"
          >
            <span>{l.name}</span>
            <span className="font-semibold">
              ₹{l.amount}
            </span>
            <button
              onClick={() =>
                deleteLiability(l._id)
              }
              className="text-red-400 hover:text-red-500"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* MODAL */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <h2 className="text-xl font-bold mb-4">
          Add Liability
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-3"
        >
          <input
            placeholder="Liability Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            className="w-full p-2 bg-gray-800 rounded"
          />

          <input
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) =>
              setForm({
                ...form,
                amount: e.target.value,
              })
            }
            className="w-full p-2 bg-gray-800 rounded"
          />

          <button className="w-full bg-red-500 py-2 rounded hover:bg-red-600 transition">
            Save
          </button>
        </form>
      </Modal>
    </div>
  );
}