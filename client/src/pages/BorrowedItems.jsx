import { useState, useEffect } from "react";
import Modal from "../components/ui/Modal";
import axios from "../utils/axiosConfig";

export default function BorrowedItems() {
  const [borrowedItems, setBorrowedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    person: "",
  });

  const API = "https://complaintbox-ownf.onrender.com/api/borrowed";

  /* ================= FETCH ================= */

  const fetchBorrowedItems = async () => {
    try {
      const res = await axios.get(API);
      setBorrowedItems(res.data);
    } catch (err) {
      console.error("Fetch Borrowed Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBorrowedItems();
  }, []);

  /* ================= CREATE ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.person) return;

    try {
      const res = await axios.post(API, {
        name: form.name,
        person: form.person,
        returned: false,
      });

      setBorrowedItems((prev) => [...prev, res.data]);
      setForm({ name: "", person: "" });
      setIsOpen(false);
    } catch (err) {
      console.error("Create Borrowed Error:", err);
    }
  };

  /* ================= MARK RETURNED ================= */

  const markReturned = async (id) => {
    try {
      const res = await axios.put(`${API}/${id}`, {
        returned: true,
      });

      setBorrowedItems((prev) =>
        prev.map((item) =>
          item._id === id ? res.data : item
        )
      );
    } catch (err) {
      console.error("Mark Returned Error:", err);
    }
  };

  /* ================= DELETE ================= */

  const deleteBorrowedItem = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      setBorrowedItems((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (err) {
      console.error("Delete Borrowed Error:", err);
    }
  };

  const pending = borrowedItems.filter(
    (item) => !item.returned
  );

  return (
    <div className="space-y-6">

      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">
          Borrowed Items
        </h1>

        <button
          onClick={() => setIsOpen(true)}
          className="bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600 transition"
        >
          + Add Item
        </button>
      </div>

      {/* Pending Count */}
      <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-800">
        <p>Pending Returns</p>
        <h2 className="text-xl font-bold text-yellow-400">
          {pending.length}
        </h2>
      </div>

      {loading && (
        <p className="text-gray-400">
          Loading borrowed items...
        </p>
      )}

      {!loading && borrowedItems.length === 0 && (
        <p className="text-gray-400">
          No borrowed items found.
        </p>
      )}

      <div className="space-y-3">
        {borrowedItems.map((item) => (
          <div
            key={item._id}
            className="flex justify-between bg-gray-900/50 border border-gray-800 rounded p-3"
          >
            <div>
              <p>{item.name}</p>
              <p className="text-sm text-gray-400">
                From: {item.person}
              </p>
            </div>

            <div className="space-x-3">
              {!item.returned && (
                <button
                  onClick={() =>
                    markReturned(item._id)
                  }
                  className="text-green-400 hover:text-green-500"
                >
                  Mark Returned
                </button>
              )}

              <button
                onClick={() =>
                  deleteBorrowedItem(item._id)
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
        <h2 className="text-xl font-bold mb-4">
          Add Borrowed Item
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-3"
        >
          <input
            placeholder="Item Name"
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
            placeholder="Borrowed From"
            value={form.person}
            onChange={(e) =>
              setForm({
                ...form,
                person: e.target.value,
              })
            }
            className="w-full p-2 bg-gray-800 rounded"
          />

          <button className="w-full bg-yellow-500 py-2 rounded hover:bg-yellow-600 transition">
            Save
          </button>
        </form>
      </Modal>
    </div>
  );
}