import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { FinanceProvider } from "./context/FinanceContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/layout/Layout";
import Complaints from "./pages/Complaints";
import BorrowedItems from "./pages/BorrowedItems";
import Liabilities from "./pages/Liabilities";
import Promotions from "./pages/Promotions";
import Income from "./pages/Income";
import Expenses from "./pages/Expenses";
import Assets from "./pages/Assets";
import Salary from "./pages/Salary";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <FinanceProvider>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="/complaints" element={<Complaints />} />
            <Route path="/borrowed" element={<BorrowedItems />} />
            <Route path="/liabilities" element={<Liabilities />} />
            <Route path="/promotions" element={<Promotions />} /> 
            <Route path="/income" element={<Income />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/assets" element={<Assets />} />
            <Route path="/salary" element={<Salary />} />
          </Route>

        </Routes>
      </FinanceProvider>
    </AuthProvider>
  );
}