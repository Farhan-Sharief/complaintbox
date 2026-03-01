import { useState, useEffect } from "react";
import Modal from "../components/ui/Modal";
import axios from "../utils/axiosConfig";

export default function Promotions() {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const [form, setForm] = useState({
    title: "",
    status: "upcoming",
  });

  const API = "https://complaintbox-ownf.onrender.com/api/promotion";

  /* ================= FETCH PROMOTIONS ================= */

  const fetchPromotions = async () => {
    try {
      const res = await axios.get(API);
      setPromotions(res.data);
    } catch (err) {
      console.error("Fetch Promotion Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  /* ================= ADD PROMOTION ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title) return;

    try {
      const res = await axios.post(API, form);
      setPromotions((prev) => [...prev, res.data]);
      setForm({ title: "", status: "upcoming" });
      setIsOpen(false);
    } catch (err) {
      console.error("Create Promotion Error:", err);
    }
  };

  /* ================= UPDATE STATUS ================= */

  const updateStatus = async (id, status) => {
    try {
      const res = await axios.put(`${API}/${id}`, {
        status,
      });

      setPromotions((prev) =>
        prev.map((p) =>
          p._id === id ? res.data : p
        )
      );
    } catch (err) {
      console.error("Update Promotion Error:", err);
    }
  };

  /* ================= DELETE ================= */

  const deletePromotion = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      setPromotions((prev) =>
        prev.filter((p) => p._id !== id)
      );
    } catch (err) {
      console.error("Delete Promotion Error:", err);
    }
  };

  return (
    <div className="space-y-6">

      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">
          Promotions
        </h1>

        <button
          onClick={() => setIsOpen(true)}
          className="bg-indigo-500 px-4 py-2 rounded hover:bg-indigo-600 transition"
        >
          + Add Promotion
        </button>
      </div>

      {loading && (
        <p className="text-gray-400">
          Loading promotions...
        </p>
      )}

      {!loading && promotions.length === 0 && (
        <p className="text-gray-400">
          No promotions found
        </p>
      )}

      <div className="space-y-3">
        {promotions.map((p) => (
          <div
            key={p._id}
            className="bg-gray-900/50 border border-gray-800 p-4 rounded flex justify-between items-center"
          >
            <span>{p.title}</span>

            <div className="flex gap-3 items-center">
              <select
                value={p.status}
                onChange={(e) =>
                  updateStatus(p._id, e.target.value)
                }
                className="bg-gray-800 px-2 py-1 rounded"
              >
                <option value="upcoming">
                  Upcoming
                </option>
                <option value="pending">
                  Pending
                </option>
                <option value="completed">
                  Completed
                </option>
              </select>

              <button
                onClick={() =>
                  deletePromotion(p._id)
                }
                className="text-red-400 hover:text-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <form
          onSubmit={handleSubmit}
          className="space-y-3"
        >
          <input
            placeholder="Promotion Title"
            value={form.title}
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value,
              })
            }
            className="w-full p-2 bg-gray-800 rounded"
          />

          <button className="w-full bg-indigo-500 py-2 rounded hover:bg-indigo-600 transition">
            Save
          </button>
        </form>
      </Modal>
    </div>
  );
}