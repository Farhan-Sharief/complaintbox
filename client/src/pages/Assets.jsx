import { useState } from "react";
import Modal from "../components/ui/Modal";
import { useFinance } from "../context/FinanceContext";

export default function Assets() {
  const { assets, addAsset, deleteAsset, loading, error } = useFinance();

  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    value: "",
  });

  /* ================= ADD ASSET ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.value) return;

    try {
      await addAsset(form);

      setForm({ name: "", value: "" });
      setIsOpen(false);
    } catch (err) {
      console.error("Error adding asset:", err);
    }
  };

  /* ================= TOTAL CALCULATION ================= */

  const safeAssets = Array.isArray(assets) ? assets : [];

  const totalAssets = safeAssets.reduce(
    (sum, a) => sum + Number(a.value || 0),
    0
  );

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Assets</h1>

        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          + Add Asset
        </button>
      </div>

      {/* TOTAL CARD */}
      <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-800">
        <p className="text-gray-400">Total Assets</p>
        <h2 className="text-2xl font-bold text-blue-400">
          ₹{totalAssets.toLocaleString()}
        </h2>
      </div>

      {/* ERROR MESSAGE */}
      {error && (
        <div className="bg-red-500/20 border border-red-500 p-3 rounded text-red-400">
          {error}
        </div>
      )}

      {/* LOADING */}
      {loading && (
        <div className="text-gray-400">Loading assets...</div>
      )}

      {/* ASSET LIST */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
        {!loading && safeAssets.length === 0 && (
          <p className="text-gray-400">No assets added yet.</p>
        )}

        {safeAssets.map((a) => (
          <div
            key={a._id}
            className="flex justify-between items-center border-b border-gray-800 py-2"
          >
            <span className="font-medium">{a.name}</span>

            <span className="font-semibold text-blue-300">
              ₹{Number(a.value).toLocaleString()}
            </span>

            <button
              onClick={() => deleteAsset(a._id)}
              className="text-red-400 hover:text-red-500 transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* MODAL */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 className="text-xl font-bold mb-4">Add Asset</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            placeholder="Asset Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className="w-full p-2 bg-gray-800 rounded"
            required
          />

          <input
            type="number"
            placeholder="Value"
            value={form.value}
            onChange={(e) =>
              setForm({ ...form, value: e.target.value })
            }
            className="w-full p-2 bg-gray-800 rounded"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-500 py-2 rounded hover:bg-blue-600 transition"
          >
            Save
          </button>
        </form>
      </Modal>
    </div>
  );
}