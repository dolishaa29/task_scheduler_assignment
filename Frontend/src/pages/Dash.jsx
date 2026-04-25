import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const Dash = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [formData, setFormData] = useState({ title: "", taskType: "upcoming", dueDate: "", category: "" });
  
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/");
      return;
    }
    try {
      const res = await axios.get(`${API_BASE_URL}/viewtask`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setTasks(res.data.tasks);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSignOut = () => {
    Cookies.remove("token");
    navigate("/");
  };

  const addTask = async (e) => {
    e.preventDefault();
    const token = Cookies.get("token");
    try {
      await axios.post(`${API_BASE_URL}/addtask`, formData, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      fetchTasks();
      setFormData({ title: "", taskType: "upcoming", dueDate: "", category: "" });
    } catch (err) {
      alert("Failed to add task");
    }
  };

  const markComplete = async (id) => {
    try {
      await axios.put(`${API_BASE_URL}/updatestatus`, { id });
      fetchTasks();
    } catch (err) {
      alert("Error updating status");
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.post(`${API_BASE_URL}/deletetask`, { id });
      fetchTasks();
    } catch (err) {
      alert("Error deleting task");
    }
  };

  const filteredTasks = tasks.filter((t) => {
    if (activeTab === "completed") return t.taskType === "completed";
    return t.taskType === activeTab;
  });

  return (
    <div className="min-h-screen bg-[#fff5f6] font-sans text-gray-700">
      <nav className="bg-white/80 backdrop-blur-xl sticky top-0 z-50 px-6 md:px-10 py-4 flex justify-between items-center border-b border-pink-100">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-pink-400 to-rose-400 rounded-xl shadow-lg shadow-pink-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <h1 className="text-2xl font-black tracking-tight text-gray-800">Task<span className="text-pink-500">Flow</span></h1>
        </div>
        
        <div className="flex items-center gap-4 md:gap-8">
          <button 
            onClick={() => navigate("/userprofile")} 
            className="flex items-center gap-2 group transition-all cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full border-2 border-pink-100 p-0.5 group-hover:border-pink-400 transition-all">
              <div className="w-full h-full bg-pink-50 rounded-full flex items-center justify-center text-pink-500 group-hover:bg-pink-100 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <span className="font-semibold text-sm text-gray-600 hidden md:block group-hover:text-pink-600 transition-colors">
              My Profile
            </span>
          </button>
          
          <button 
            onClick={handleSignOut}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900 text-white text-sm font-bold hover:bg-rose-600 transition-all shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5 xl:col-span-4">
          <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(255,182,193,0.2)] border border-pink-50">
            <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight mb-8">Create Task</h2>

            <form onSubmit={addTask} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-pink-400 uppercase tracking-[2px] ml-1">Task Information</label>
                <input 
                  required
                  className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-pink-200 focus:bg-white outline-none transition-all text-gray-700" 
                  placeholder="Task Title..." 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <input 
                    className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-pink-200 focus:bg-white outline-none transition-all text-gray-700" 
                    placeholder="Category (e.g. Work)" 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  />
                </div>
                <input 
                  type="date"
                  required
                  className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-pink-200 outline-none transition-all text-gray-700" 
                  onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                />
                <select 
                  className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-pink-200 outline-none transition-all text-gray-700 cursor-pointer"
                  value={formData.taskType}
                  onChange={(e) => setFormData({...formData, taskType: e.target.value})}
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="planned">Planned</option>
                </select>
              </div>

              <button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-rose-400 text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-pink-100 hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
                Add to Schedule
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-7 xl:col-span-8 space-y-8">
          <div className="bg-white/60 p-2 rounded-3xl flex gap-2 border border-white/50 backdrop-blur-sm">
            {["upcoming", "planned", "completed"].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 text-sm font-bold rounded-2xl capitalize transition-all ${
                  activeTab === tab 
                  ? "bg-white text-pink-600 shadow-lg scale-105" 
                  : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid gap-5">
            {filteredTasks.length > 0 ? filteredTasks.map((t) => (
              <div key={t._id} className="group bg-white p-6 rounded-[2rem] flex justify-between items-center border border-transparent hover:border-pink-100 shadow-sm hover:shadow-2xl hover:shadow-pink-100/50 transition-all duration-500">
                <div className="flex items-center gap-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                    t.taskType === 'completed' ? 'bg-green-50 text-green-500' : 'bg-pink-50 text-pink-500'
                  }`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={t.taskType === 'completed' ? "M5 13l4 4L19 7" : "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"} />
                    </svg>
                  </div>
                  <div>
                    <h3 className={`font-bold text-xl ${t.taskType === 'completed' ? 'text-gray-300 line-through' : 'text-gray-800'}`}>
                      {t.title}
                    </h3>
                    <div className="flex items-center gap-4 mt-1.5 font-bold">
                      <span className="text-xs text-pink-400 uppercase tracking-wider">{t.category || "Task"}</span>
                      <span className="text-xs text-gray-400">{t.dueDate ? new Date(t.dueDate).toLocaleDateString('en-GB') : "No Date"}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  {t.taskType !== "completed" && (
                    <button onClick={() => markComplete(t._id)} className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-600 hover:text-white transition-all">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </button>
                  )}
                  <button onClick={() => deleteTask(t._id)} className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center hover:bg-rose-600 hover:text-white transition-all">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </div>
            )) : (
              <div className="text-center py-20 bg-white/40 rounded-[3rem] border-4 border-dashed border-pink-100">
                <p className="text-pink-300 font-bold text-xl uppercase tracking-widest">No Tasks Found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dash;