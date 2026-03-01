import { createContext, useContext, useEffect, useState } from "react";
import axios from "../utils/axiosConfig";
const FinanceContext = createContext();

const ASSET_API = "/assets";
// Change port if needed

export function FinanceProvider({ children }) {
  /* ================== CORE FINANCIAL STATES ================== */

  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [assets, setAssets] = useState([]);
  const [liabilities, setLiabilities] = useState([]);

  /* ================== EXTRA MODULE STATES ================== */

  const [borrowedItems, setBorrowedItems] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [salaries, setSalaries] = useState([]);

  /* ================== ASSET LOADING & ERROR ================== */

  const [assetLoading, setAssetLoading] = useState(false);
  const [assetError, setAssetError] = useState(null);

  /* ============================================================
     ====================== INCOME ===============================
     ============================================================ */

  const addIncome = (income) =>
    setIncomes((prev) => [
      ...prev,
      { id: Date.now(), ...income },
    ]);

  const updateIncome = (updated) =>
    setIncomes((prev) =>
      prev.map((item) =>
        item.id === updated.id ? updated : item
      )
    );

  const deleteIncome = (id) =>
    setIncomes((prev) =>
      prev.filter((i) => i.id !== id)
    );

  /* ============================================================
     ====================== EXPENSE ==============================
     ============================================================ */

  const addExpense = (expense) =>
    setExpenses((prev) => [
      ...prev,
      { id: Date.now(), ...expense },
    ]);

  const updateExpense = (updated) =>
    setExpenses((prev) =>
      prev.map((item) =>
        item.id === updated.id ? updated : item
      )
    );

  const deleteExpense = (id) =>
    setExpenses((prev) =>
      prev.filter((i) => i.id !== id)
    );

  /* ============================================================
     ====================== ASSETS (BACKEND) =====================
     ============================================================ */

  // FETCH ASSETS FROM DB
  const fetchAssets = async () => {
    try {
      setAssetLoading(true);
      const res = await axios.get(ASSET_API);
      setAssets(res.data);
      setAssetError(null);
    } catch (err) {
      console.error("Fetch Assets Error:", err);
      setAssetError("Failed to fetch assets");
    } finally {
      setAssetLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  // ADD ASSET TO DB
  const addAsset = async (asset) => {
    try {
      const res = await axios.post(ASSET_API, {
        name: asset.name,
        value: Number(asset.value),
      });

      setAssets((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Add Asset Error:", err);
      setAssetError("Failed to add asset");
    }
  };

  // DELETE ASSET FROM DB
  const deleteAsset = async (id) => {
    try {
      await axios.delete(`${ASSET_API}/${id}`);
      setAssets((prev) =>
        prev.filter((a) => a._id !== id)
      );
    } catch (err) {
      console.error("Delete Asset Error:", err);
      setAssetError("Failed to delete asset");
    }
  };

  /* ============================================================
     ====================== LIABILITIES ==========================
     ============================================================ */

  const addLiability = (liability) =>
    setLiabilities((prev) => [
      ...prev,
      { id: Date.now(), ...liability },
    ]);

  const deleteLiability = (id) =>
    setLiabilities((prev) =>
      prev.filter((l) => l.id !== id)
    );

  /* ============================================================
     ====================== BORROWED ITEMS =======================
     ============================================================ */

  const addBorrowedItem = (item) =>
    setBorrowedItems((prev) => [
      ...prev,
      { id: Date.now(), returned: false, ...item },
    ]);

  const markReturned = (id) =>
    setBorrowedItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, returned: true } : i
      )
    );

  const deleteBorrowedItem = (id) =>
    setBorrowedItems((prev) =>
      prev.filter((i) => i.id !== id)
    );

  /* ============================================================
     ====================== COMPLAINTS ===========================
     ============================================================ */

  const addComplaint = (complaint) =>
    setComplaints((prev) => [
      ...prev,
      { id: Date.now(), resolved: false, ...complaint },
    ]);

  const resolveComplaint = (id) =>
    setComplaints((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, resolved: true } : c
      )
    );

  const deleteComplaint = (id) =>
    setComplaints((prev) =>
      prev.filter((c) => c.id !== id)
    );

  /* ============================================================
     ====================== PROMOTIONS ===========================
     ============================================================ */

  const addPromotion = (promotion) =>
    setPromotions((prev) => [
      ...prev,
      { id: Date.now(), status: "upcoming", ...promotion },
    ]);

  const updatePromotionStatus = (id, status) =>
    setPromotions((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status } : p
      )
    );

  const deletePromotion = (id) =>
    setPromotions((prev) =>
      prev.filter((p) => p.id !== id)
    );

  /* ============================================================
     ====================== SALARY ===============================
     ============================================================ */

  const addSalary = (salary) =>
    setSalaries((prev) => [
      ...prev,
      { id: Date.now(), ...salary },
    ]);

  const deleteSalary = (id) =>
    setSalaries((prev) =>
      prev.filter((s) => s.id !== id)
    );

  /* ============================================================
     ====================== PROVIDER =============================
     ============================================================ */

  return (
    <FinanceContext.Provider
      value={{
        /* Core */
        incomes,
        expenses,
        assets,
        liabilities,

        /* Asset Meta */
        assetLoading,
        assetError,
        fetchAssets,

        /* Extra */
        borrowedItems,
        complaints,
        promotions,
        salaries,

        /* Income */
        addIncome,
        updateIncome,
        deleteIncome,

        /* Expense */
        addExpense,
        updateExpense,
        deleteExpense,

        /* Assets (Backend) */
        addAsset,
        deleteAsset,

        /* Liabilities */
        addLiability,
        deleteLiability,

        /* Borrowed */
        addBorrowedItem,
        markReturned,
        deleteBorrowedItem,

        /* Complaints */
        addComplaint,
        resolveComplaint,
        deleteComplaint,

        /* Promotions */
        addPromotion,
        updatePromotionStatus,
        deletePromotion,

        /* Salary */
        addSalary,
        deleteSalary,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

/* ================== CUSTOM HOOK ================== */

export function useFinance() {
  const context = useContext(FinanceContext);

  if (!context) {
    throw new Error(
      "useFinance must be used within FinanceProvider"
    );
  }

  return context;
}