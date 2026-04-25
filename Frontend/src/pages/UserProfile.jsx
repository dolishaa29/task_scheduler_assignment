import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/userprofile`, {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      });
      setUser(res.data.user);
    } catch (err) {
      setError("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${API}/updateuser`,
        { ...user },
        { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
      );
      alert("Profile Updated");
      fetchProfile();
    } catch (err) {
      setError("Update failed");
    }
  };

  const inputStyle = "w-full px-4 py-3 rounded-2xl border border-transparent bg-gray-50 focus:bg-white focus:ring-2 focus:ring-pink-100 focus:border-pink-200 outline-none transition-all text-gray-700 font-medium";
  const labelStyle = "text-[11px] font-bold text-pink-400 uppercase tracking-widest ml-1 mb-1.5 block";

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff5f6] px-4 py-10 font-sans">
      
      <div className="w-full max-w-3xl bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(255,182,193,0.2)] border border-pink-50 overflow-hidden">
        
        <div className="p-8 md:p-12">
          <div className="flex justify-between items-center mb-10 border-b border-gray-50 pb-6">
            <div>
              <h1 className="text-2xl font-black text-pink-500 tracking-tighter">
                Your Profile
              </h1>
            </div>
            <button 
              onClick={() => navigate("/dash")}
              className="text-pink-500 font-bold text-sm hover:underline"
            >
              Back to Dashboard
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-10">
              <div className="w-8 h-8 border-4 border-pink-100 border-t-pink-500 rounded-full animate-spin"></div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className={labelStyle}>Full Name</label>
                  <input
                    name="name"
                    value={user.name || ""}
                    onChange={handleChange}
                    className={inputStyle}
                    placeholder="Enter name"
                  />
                </div>

                <div>
                  <label className={labelStyle}>Email (Locked)</label>
                  <input
                    value={user.email || ""}
                    disabled
                    className="w-full px-4 py-3 rounded-2xl bg-gray-100 text-gray-400 cursor-not-allowed font-medium"
                  />
                </div>

                <div>
                  <label className={labelStyle}>Contact Number</label>
                  <input
                    name="contact"
                    value={user.contact || ""}
                    onChange={handleChange}
                    className={inputStyle}
                    placeholder="Phone number"
                  />
                </div>

                <div>
                  <label className={labelStyle}>Gender</label>
                  <select
                    name="gender"
                    value={user.gender || ""}
                    onChange={handleChange}
                    className={`${inputStyle} appearance-none cursor-pointer`}
                  >
                    <option value="">Select</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className={labelStyle}>Date of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    value={user.dob || ""}
                    onChange={handleChange}
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label className={labelStyle}>Address</label>
                  <input
                    name="address"
                    value={user.address || ""}
                    onChange={handleChange}
                    className={inputStyle}
                    placeholder="City, Country"
                  />
                </div>
              </div>

              <div>
                <label className={labelStyle}>Short Bio</label>
                <textarea
                  name="bio"
                  value={user.bio || ""}
                  onChange={handleChange}
                  className={`${inputStyle} h-28 resize-none`}
                  placeholder="Tell us about yourself..."
                />
              </div>

              {error && (
                <p className="text-rose-500 text-xs font-bold text-center bg-rose-50 py-2 rounded-lg">{error}</p>
              )}

              <div className="pt-4 space-y-3">
                <button
                  type="submit"
                  className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold text-lg hover:bg-pink-600 transition-all shadow-lg active:scale-95"
                >
                  Save Changes
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/changepassword")}
                  className="w-full py-4 rounded-2xl border-2 border-pink-100 text-pink-500 font-bold text-sm hover:bg-pink-50 transition-all"
                >
                  Change Password
                </button>
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;