import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Complaints from "./pages/Complaints";
import Income from "./pages/Income";
import Expenses from "./pages/Expenses";
import Promotions from "./pages/Promotions";
import Salary from "./pages/Salary";
import Assets from "./pages/Assets";
import Liabilities from "./pages/Liabilities";
import BorrowedItems from "./pages/BorrowedItems";

import Layout from "./components/layout/Layout";

/* ---------------- PROTECTED ROUTE ---------------- */

function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

/* ---------------- APP ROUTES ---------------- */

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/complaints" element={<Complaints />} />
          <Route path="/income" element={<Income />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/promotions" element={<Promotions />} />
          <Route path="/salary" element={<Salary />} />
          <Route path="/assets" element={<Assets />} />
          <Route path="/liabilities" element={<Liabilities />} />
          <Route path="/borrowed" element={<BorrowedItems />} />
        </Route>

        {/* Catch all unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}