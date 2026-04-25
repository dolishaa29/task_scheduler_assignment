import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Changepass = () => {
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
        setTimeout(() => navigate("/profile"), 2000);
      }
    } catch (err) {
      setError(err.response?.data?.msg || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = "w-full px-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-pink-100 focus:border-pink-200 outline-none transition-all text-gray-700 font-medium";
  const labelStyle = "text-[11px] font-bold text-pink-400 uppercase tracking-widest ml-1 mb-1.5 block";

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff5f6] px-4 font-sans">
      
      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(255,182,193,0.2)] border border-pink-50 overflow-hidden">
        
        <div className="p-8 md:p-10">
          
          <div className="text-center mb-10">
            <h1 className="text-2xl font-black text-gray-800 tracking-tighter">
               Update Password
            </h1>
            
          </div>

          <form onSubmit={handleChangePassword} className="space-y-6">

            <div>
              <label className={labelStyle}>Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className={inputStyle}
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label className={labelStyle}>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={inputStyle}
                placeholder="Minimum 6 characters"
                required
              />
            </div>

            <div>
              <label className={labelStyle}>Confirm New Password</label>
              <input
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className={inputStyle}
                placeholder="Repeat new password"
                required
              />
            </div>

            {error && (
              <div className="p-3 bg-rose-50 text-rose-500 rounded-xl text-xs font-bold text-center border border-rose-100 animate-shake">
                {error}
              </div>
            )}

            {success && (
              <div className="p-3 bg-green-50 text-green-600 rounded-xl text-xs font-bold text-center border border-green-100">
                {success}
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold text-base shadow-lg hover:bg-pink-600 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  "Update Password"
                )}
              </button>
            </div>

          </form>

          <div className="text-center mt-8">
            <button
              onClick={() => navigate(-1)}
              className="text-gray-400 hover:text-pink-500 text-sm font-bold transition-colors flex items-center justify-center gap-1 mx-auto"
            >
              
              ← Back
              
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Changepass;