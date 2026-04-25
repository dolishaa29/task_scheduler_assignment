import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const Login = () => {
  const navigate = useNavigate();

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
        navigate("/dash");
      } else {
        setMessage("Invalid Credentials");
      }
    } catch (err) {
      setMessage("Login Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/guestlogin",
        { isGuest: true },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200 && response.data.token) {
        Cookies.set("token", response.data.token, { expires: 1 });
        navigate("/dash");
      } else {
        setMessage("Guest Login Failed");
      }
    } catch (err) {
      setMessage("Guest Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff5f6] px-4 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-pink-200 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-rose-200 rounded-full blur-3xl opacity-30"></div>

      <div className="w-full max-w-md z-10">
        <div className="bg-white/80 backdrop-blur-2xl border border-white rounded-[3rem] shadow-[0_32px_64px_-15px_rgba(255,182,193,0.3)] p-10 relative">
          
          <div className="text-center mb-10">
            <div className="inline-flex p-3 bg-gradient-to-br from-pink-400 to-rose-400 rounded-2xl shadow-lg mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-4xl font-black tracking-tighter text-gray-800">
              Task<span className="text-pink-500">Flow</span>
            </h1>
           
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-pink-400 uppercase tracking-[2px] ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-pink-300 group-focus-within:text-pink-500 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206" />
                  </svg>
                </div>
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-pink-200 focus:bg-white outline-none transition-all text-gray-700 placeholder:text-gray-300 font-medium"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-pink-400 uppercase tracking-[2px] ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-pink-300 group-focus-within:text-pink-500 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-4.514A11.042 11.042 0 0010 7V4.638c0-.83-.398-1.611-1.07-2.106a24.765 24.765 0 0110.396 3.066 11.031 11.031 0 00-2.385 5.855M15.966 6.505l-3.432 12.29M4.498 20.482a24.517 24.517 0 0011.55-10.426" />
                  </svg>
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-pink-200 focus:bg-white outline-none transition-all text-gray-700 placeholder:text-gray-300 font-medium"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-400 text-white font-bold text-lg shadow-xl shadow-pink-100 hover:shadow-pink-200 hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-pink-100"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-4 text-gray-400 font-bold tracking-widest">Or continue with</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGuestLogin}
            className="w-full py-4 rounded-2xl border-2 border-pink-100 text-pink-500 font-bold hover:bg-pink-50 hover:border-pink-200 transition-all flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Explore as Guest
          </button>

          {message && (
            <div className="mt-6 p-4 rounded-xl bg-rose-50 text-rose-500 text-sm font-bold flex items-center gap-2 animate-bounce">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {message}
            </div>
          )}

          <p className="text-center mt-8 text-sm font-medium text-gray-500">
            <button
              onClick={() => navigate("/register")}
              className="text-pink-500 font-bold hover:text-rose-600 transition-colors"
            >
              Create an account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;