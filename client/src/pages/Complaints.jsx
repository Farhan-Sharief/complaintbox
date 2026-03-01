import { useState, useEffect } from "react";
import Modal from "../components/ui/Modal";
import axios from "../utils/axiosConfig";

export default function Complaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const [form, setForm] = useState({
    text: "",
  });

  const API = "https://complaintbox-ownf.onrender.com/api/complaint";

  /* ================= FETCH ================= */

  const fetchComplaints = async () => {
    try {
      const res = await axios.get(API);
      setComplaints(res.data);
    } catch (err) {
      console.error("Fetch Complaint Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  /* ================= CREATE ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.text) return;

    try {
      const res = await axios.post(API, {
        text: form.text,
        resolved: false,
      });

      setComplaints((prev) => [...prev, res.data]);
      setForm({ text: "" });
      setIsOpen(false);
    } catch (err) {
      console.error("Create Complaint Error:", err);
    }
  };

  /* ================= RESOLVE ================= */

  const markResolved = async (id) => {
    try {
      const res = await axios.put(`${API}/${id}`, {
        resolved: true,
      });

      setComplaints((prev) =>
        prev.map((c) =>
          c._id === id ? res.data : c
        )
      );
    } catch (err) {
      console.error("Resolve Complaint Error:", err);
    }
  };

  /* ================= DELETE ================= */

  const deleteComplaint = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      setComplaints((prev) =>
        prev.filter((c) => c._id !== id)
      );
    } catch (err) {
      console.error("Delete Complaint Error:", err);
    }
  };

  return (
    <div className="space-y-6">

      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">
          Complaints
        </h1>

        <button
          onClick={() => setIsOpen(true)}
          className="bg-purple-500 px-4 py-2 rounded hover:bg-purple-600 transition"
        >
          + Add Complaint
        </button>
      </div>

      {loading && (
        <p className="text-gray-400">
          Loading complaints...
        </p>
      )}

      {!loading && complaints.length === 0 && (
        <p className="text-gray-400">
          No complaints found
        </p>
      )}

      <div className="space-y-3">
        {complaints.map((c) => (
          <div
            key={c._id}
            className="bg-gray-900/50 border border-gray-800 p-4 rounded"
          >
            <p>{c.text}</p>

            <div className="flex gap-4 mt-3">
              {!c.resolved && (
                <button
                  onClick={() =>
                    markResolved(c._id)
                  }
                  className="text-green-400 hover:text-green-500"
                >
                  Mark Resolved
                </button>
              )}

              <button
                onClick={() =>
                  deleteComplaint(c._id)
                }
                className="text-red-400 hover:text-red-500"
              >
                Delete
              </button>
            </div>

            {c.resolved && (
              <p className="text-xs text-green-400 mt-2">
                ✓ Resolved
              </p>
            )}
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
          <textarea
            placeholder="Complaint description"
            value={form.text}
            onChange={(e) =>
              setForm({
                text: e.target.value,
              })
            }
            className="w-full p-2 bg-gray-800 rounded"
          />

          <button className="w-full bg-purple-500 py-2 rounded hover:bg-purple-600 transition">
            Save
          </button>
        </form>
      </Modal>
    </div>
  );
}