import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const Login = () => {
  const navigate = useNavigate();
  const [role] = useState('user');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      setMessage("Please fill all fields");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200 && response.data.token) {
        Cookies.set("token", response.data.token, { expires: 1 });
        navigate("/Userdashboard");
      } else {
        setMessage("Invalid Credentials");
      }
    } catch (err) {
      setMessage("Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200 px-4">

      <div className="w-full max-w-md bg-white/90 backdrop-blur-xl border border-pink-100 rounded-3xl shadow-xl p-8">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">
            Task<span className="text-pink-400">Flow</span>
          </h1>
          <p className="text-pink-300 text-xs uppercase tracking-widest mt-1">
            Login to your account
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">

          <div>
            <label className="text-xs font-semibold text-pink-400 uppercase">Email</label>
            <input
              type="email"
              className="w-full mt-1 px-4 py-3 rounded-xl border border-pink-200 bg-white focus:outline-none focus:ring-2 focus:ring-pink-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-pink-400 uppercase">Password</label>
            <input
              type="password"
              className="w-full mt-1 px-4 py-3 rounded-xl border border-pink-200 bg-white focus:outline-none focus:ring-2 focus:ring-pink-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-300 via-rose-300 to-pink-400 text-white font-semibold shadow-md hover:opacity-90 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/Userdashboard")}
            className="w-full py-3 rounded-xl border border-pink-200 text-pink-500 font-semibold hover:bg-pink-50 transition"
          >
            Login as Guest
          </button>

        </form>

        {message && (
          <p className="text-center mt-4 text-sm text-pink-500 font-medium">
            {message}
          </p>
        )}

        <p className="text-center mt-6 text-sm text-slate-600">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-pink-400 font-semibold hover:underline"
          >
            Register
          </button>
        </p>

      </div>
    </div>
  );
};

export default Login;