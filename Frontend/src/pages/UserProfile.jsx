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
        {
          name: user.name || "",
          email: user.email || "",
          contact: user.contact || "",
          address: user.address || "",
          gender: user.gender || "",
          dob: user.dob || "",
          bio: user.bio || "",
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      alert("Profile Updated");
      fetchProfile();
    } catch (err) {
      setError("Update failed");
    }
  };

  const input =
    "w-full px-4 py-3 rounded-xl border border-pink-200 bg-white focus:ring-2 focus:ring-pink-300 outline-none";

  const label =
    "text-xs font-semibold text-pink-500 uppercase";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200 px-4 py-10">

      <div className="w-full max-w-3xl bg-white/90 backdrop-blur-xl border border-pink-100 rounded-3xl shadow-xl p-8">

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">
            Task<span className="text-pink-400">Flow</span>
          </h1>
          <p className="text-pink-300 text-xs uppercase tracking-widest">
            User Profile
          </p>
        </div>

        {loading ? (
          <p className="text-center text-pink-400">Loading...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* BASIC INFO */}
            <div className="grid md:grid-cols-2 gap-4">

              <div>
                <label className={label}>Name</label>
                <input
                  name="name"
                  value={user.name || ""}
                  onChange={handleChange}
                  className={input}
                />
              </div>

              <div>
                <label className={label}>Email (Locked)</label>
                <input
                  value={user.email || ""}
                  disabled
                  className="w-full px-4 py-3 rounded-xl border border-pink-100 bg-pink-50 text-gray-500"
                />
              </div>

              <div>
                <label className={label}>Contact</label>
                <input
                  name="contact"
                  value={user.contact || ""}
                  onChange={handleChange}
                  className={input}
                />
              </div>

              <div>
                <label className={label}>Gender</label>
                <select
                  name="gender"
                  value={user.gender || ""}
                  onChange={handleChange}
                  className={input}
                >
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className={label}>DOB</label>
                <input
                  type="date"
                  name="dob"
                  value={user.dob || ""}
                  onChange={handleChange}
                  className={input}
                />
              </div>

              <div>
                <label className={label}>Address</label>
                <input
                  name="address"
                  value={user.address || ""}
                  onChange={handleChange}
                  className={input}
                />
              </div>

            </div>

            <div>
              <label className={label}>Bio</label>
              <textarea
                name="bio"
                value={user.bio || ""}
                onChange={handleChange}
                className={input}
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-300 via-rose-300 to-pink-400 text-white font-semibold"
            >
              Save Profile
            </button>

            <button
              type="button"
              onClick={() => navigate("/changepassworduser")}
              className="w-full py-3 rounded-xl border border-pink-200 text-pink-500 font-semibold hover:bg-pink-50"
            >
              Change Password
            </button>

          </form>
        )}

      </div>
    </div>
  );
};

export default UserProfile;