import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Changepass= () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/changepassworduser`,
        {
          oldpassword: currentPassword,
          newpassword: newPassword,
        },
        {
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
          withCredentials: true
        }
      );

      if (response.status === 200) {
        setSuccess("Password updated successfully");
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
      }
    } catch (err) {
      setError(err.response?.data?.msg || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200">

      <div className="w-full max-w-md bg-white/90 backdrop-blur-xl border border-pink-100 rounded-3xl shadow-xl p-8">

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">
            Task<span className="text-pink-400">Flow</span>
          </h1>
          <p className="text-pink-300 text-xs uppercase tracking-widest mt-1">
            Security Settings
          </p>
        </div>

        <form onSubmit={handleChangePassword} className="space-y-5">

          <div>
            <label className="text-xs font-semibold text-pink-500 uppercase">
              Current Password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full mt-1 px-4 py-3 rounded-xl border border-pink-200 bg-white focus:outline-none focus:ring-2 focus:ring-pink-300"
              placeholder="••••••••"
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-pink-500 uppercase">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full mt-1 px-4 py-3 rounded-xl border border-pink-200 bg-white focus:outline-none focus:ring-2 focus:ring-pink-300"
              placeholder="Enter new password"
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-pink-500 uppercase">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="w-full mt-1 px-4 py-3 rounded-xl border border-pink-200 bg-white focus:outline-none focus:ring-2 focus:ring-pink-300"
              placeholder="Confirm password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-300 via-rose-300 to-pink-400 text-white font-semibold shadow-md hover:opacity-90 transition"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>

        </form>

        {error && (
          <p className="text-center mt-4 text-sm text-red-500 font-medium">
            {error}
          </p>
        )}

        {success && (
          <p className="text-center mt-4 text-sm text-pink-500 font-medium">
            {success}
          </p>
        )}

        <div className="text-center mt-6">
          <button
            onClick={() => navigate(-1)}
            className="text-pink-400 hover:underline text-sm font-semibold"
          >
            ← Back
          </button>
        </div>

      </div>
    </div>
  );
};

export default Changepass;