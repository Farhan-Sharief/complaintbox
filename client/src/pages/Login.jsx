import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "../utils/axiosConfig";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const res = await axios.post("/auth/login", {
        username,
        password,
      });

      login(res.data.token);
      navigate("/dashboard");

    } catch (err) {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">

      {/* Login Card */}
      <div className="w-full max-w-md bg-gray-900/60 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-2xl p-8 animate-fadeIn">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-orange-500 tracking-wide">
            Company Panel
          </h1>
          <p className="text-gray-400 text-sm mt-2">
            Authorized Access Only
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">

          {/* Username */}
          <div>
            <label className="text-sm text-gray-400">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full mt-1 p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-orange-500 focus:outline-none transition"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-400">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-orange-500 focus:outline-none transition"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 text-sm"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-400 p-2 rounded text-sm text-center">
              {error}
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 transition py-3 rounded-lg font-semibold text-white shadow-lg disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Login"}
          </button>

        </form>

        {/* Footer */}
        <div className="text-center mt-6 text-xs text-gray-500">
          ComplaintBox Business Control Panel
        </div>

      </div>
    </div>
  );
}