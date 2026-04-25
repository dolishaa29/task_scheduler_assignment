import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [bio, setBio] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await axios.post(
        import.meta.env.VITE_API_URL + "/register",
        { email, password, name, contact, address, gender, dob, bio }
      );

      if (res.status === 200) {
        setMessage("Account created successfully");
      } else {
        setMessage("Registration failed");
      }
    } catch (err) {
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200">

      <div className="w-full max-w-4xl bg-white/90 backdrop-blur-xl border border-pink-200 rounded-3xl shadow-2xl p-8">

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-slate-800">
            Task<span className="bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 bg-clip-text text-transparent">Flow</span>
          </h1>
          <p className="text-pink-400 text-xs uppercase tracking-widest mt-1">
            Create Account
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >

          <div>
            <label className="text-xs font-semibold text-pink-500 uppercase">Full Name</label>
            <input
              className="w-full mt-1 px-4 py-3 rounded-xl border border-pink-200 bg-white focus:outline-none focus:ring-2 focus:ring-pink-300"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-pink-500 uppercase">Email</label>
            <input
              className="w-full mt-1 px-4 py-3 rounded-xl border border-pink-200 bg-white focus:outline-none focus:ring-2 focus:ring-pink-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-pink-500 uppercase">Password</label>
            <input
              type="password"
              className="w-full mt-1 px-4 py-3 rounded-xl border border-pink-200 bg-white focus:outline-none focus:ring-2 focus:ring-pink-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-pink-500 uppercase">Contact</label>
            <div className="mt-1">
              <PhoneInput
                value={contact}
                onChange={setContact}
                className="w-full px-4 py-3 rounded-xl border border-pink-200 bg-white focus:ring-2 focus:ring-pink-300"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-pink-500 uppercase">Address</label>
            <input
              className="w-full mt-1 px-4 py-3 rounded-xl border border-pink-200 bg-white focus:outline-none focus:ring-2 focus:ring-pink-300"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-pink-500 uppercase">Gender</label>
            <select
              className="w-full mt-1 px-4 py-3 rounded-xl border border-pink-200 bg-white focus:outline-none focus:ring-2 focus:ring-pink-300"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-pink-500 uppercase">DOB</label>
            <input
              type="date"
              className="w-full mt-1 px-4 py-3 rounded-xl border border-pink-200 bg-white focus:outline-none focus:ring-2 focus:ring-pink-300"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-xs font-semibold text-pink-500 uppercase">Bio</label>
            <textarea
              className="w-full mt-1 px-4 py-3 h-24 rounded-xl border border-pink-200 bg-white focus:outline-none focus:ring-2 focus:ring-pink-300"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-300 via-rose-300 to-pink-400 text-white font-semibold shadow-md hover:opacity-90 transition"
            >
              {loading ? "Creating..." : "Register"}
            </button>
          </div>

        </form>

        {message && (
          <p className="text-center mt-4 text-sm text-pink-500 font-medium">
            {message}
          </p>
        )}

        <div className="text-center mt-6 text-sm text-slate-600">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/")}
            className="text-pink-500 font-semibold hover:underline"
          >
            Login
          </button>
        </div>

      </div>
    </div>
  );
};

export default Register;