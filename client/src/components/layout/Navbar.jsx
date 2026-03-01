import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="bg-gray-800 px-6 py-4 flex justify-between items-center">
      <h2 className="text-lg font-semibold">Business Dashboard</h2>
      <button
        onClick={handleLogout}
        className="bg-orange-500 px-4 py-2 rounded hover:bg-orange-600"
      >
        Logout
      </button>
    </div>
  );
}