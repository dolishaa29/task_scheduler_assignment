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
      const res = await axios.post(import.meta.env.VITE_API_URL + "/register", {
        email, password, name, contact, address, gender, dob, bio
      });
      if (res.status === 200) {
        setMessage("Account created successfully!");
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (err) {
      setMessage("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffafa] flex items-center justify-center p-6 font-sans">
      
      <div className="w-full max-w-4xl bg-white rounded-[2rem] shadow-2xl shadow-pink-100 border border-pink-50 overflow-hidden">
        
        <div className="p-8 md:p-12">
          <div className="flex justify-between items-end mb-10 border-b border-gray-50 pb-6">
            <div>
              <h1 className="text-3xl font-black text-gray-800 tracking-tighter">
                Task<span className="text-pink-500">Flow</span>
              </h1>
             
            </div>
            <button onClick={() => navigate("/")} className="text-pink-500 font-bold text-sm hover:underline">
              Already a member?
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-pink-400 uppercase tracking-widest ml-1">Full Name</label>
                <input required className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-pink-100 transition" 
                  placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-pink-400 uppercase tracking-widest ml-1">Email Address</label>
                <input required type="email" className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-pink-100 transition" 
                  placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-pink-400 uppercase tracking-widest ml-1">Password</label>
                <input required type="password" className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-pink-100 transition" 
                  placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>

              <div className="space-y-1 custom-phone">
                <label className="text-[10px] font-bold text-pink-400 uppercase tracking-widest ml-1">Phone Number</label>
                <PhoneInput international defaultCountry="IN" value={contact} onChange={setContact} 
                  className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus-within:ring-2 focus-within:ring-pink-100 transition" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-pink-400 uppercase tracking-widest ml-1">Gender</label>
                  <select className="w-full p-4 bg-gray-50 rounded-2xl outline-none appearance-none cursor-pointer" value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="">Select</option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-pink-400 uppercase tracking-widest ml-1">DOB</label>
                  <input type="date" className="w-full p-4 bg-gray-50 rounded-2xl outline-none" value={dob} onChange={(e) => setDob(e.target.value)} />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-pink-400 uppercase tracking-widest ml-1">Address</label>
                <input className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-pink-100 transition" 
                  placeholder="City, Country" value={address} onChange={(e) => setAddress(e.target.value)} />
              </div>

              <div className="md:col-span-2 space-y-1">
                <label className="text-[10px] font-bold text-pink-400 uppercase tracking-widest ml-1">Bio</label>
                <textarea className="w-full p-4 h-28 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-pink-100 transition resize-none" 
                  placeholder="Tell us about yourself..." value={bio} onChange={(e) => setBio(e.target.value)} />
              </div>
            </div>

            <div className="pt-4">
              <button disabled={loading} type="submit" className="w-full md:w-64 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-pink-600 transition-all shadow-lg active:scale-95 disabled:opacity-50">
                {loading ? "Creating Account..." : "Register Now"}
              </button>
            </div>
          </form>

          {message && (
            <div className={`mt-6 p-4 rounded-xl text-center text-sm font-bold ${message.includes("success") ? "bg-green-50 text-green-600" : "bg-rose-50 text-rose-500"}`}>
              {message}
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default Register;