import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Dash = () => {
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [formData, setFormData] = useState({ title: "", taskType: "upcoming", dueDate: "", category: "" });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const token = Cookies.get("token"); 
    console.log(token)
    try {
      const res = await axios.get("http://localhost:7000/viewtask", { 
        headers: { Authorization: `Bearer ${token}` }, 
        withCredentials: true 
      });
      setTasks(res.data.tasks);
    } catch (err) { 
      console.error("Error fetching tasks", err); 
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    const token = Cookies.get("token"); 
    try {
      await axios.post("http://localhost:7000/addtask", formData, { 
        headers: { Authorization: `Bearer ${token}` }, 
        withCredentials: true 
      });
      fetchTasks();
      setFormData({ title: "", taskType: "upcoming", dueDate: "", category: "" });
    } catch (err) { 
      alert("Failed to add task"); 
    }
  };

  const markComplete = async (id) => {
    try {
      await axios.put("http://localhost:7000/updatestatus", { id });
      fetchTasks();
    } catch (err) { 
      alert("Error updating status"); 
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.post("http://localhost:7000/deletetask", { id });
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
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">TaskManager Pro</h1>
        <div className="flex gap-4">
          <button className="text-sm bg-red-50 text-red-600 px-4 py-1.5 rounded-md hover:bg-red-100">Sign Out</button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
          <h2 className="text-lg font-semibold mb-4">Create New Task</h2>
          <form onSubmit={addTask} className="space-y-4">
            <input 
              required
              className="w-full p-3 border rounded-lg" 
              placeholder="Task Title" 
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
            <input 
              className="w-full p-3 border rounded-lg" 
              placeholder="Category (e.g. Work)" 
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            />
            <input 
              type="date"
              className="w-full p-3 border rounded-lg" 
              onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
            />
            <select className="w-full p-3 border rounded-lg" onChange={(e) => setFormData({...formData, taskType: e.target.value})}>
              <option value="upcoming">Upcoming</option>
              <option value="planned">Planned</option>
            </select>
            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700">Add Task</button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex bg-gray-100 p-1 rounded-lg mb-6">
            {["upcoming", "planned", "completed"].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 text-sm font-medium rounded-md capitalize ${activeTab === tab ? "bg-white text-blue-600 shadow-sm" : "text-gray-500"}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filteredTasks.length > 0 ? filteredTasks.map((t) => (
              <div key={t._id} className="flex justify-between items-center p-4 border rounded-lg hover:border-blue-200 transition">
                <div>
                  <p className="font-medium text-gray-800">{t.title}</p>
                  <p className="text-xs text-gray-400">{t.dueDate ? new Date(t.dueDate).toLocaleDateString() : "No Date"}</p>
                </div>
                <div className="flex gap-2">
                  {t.taskType !== "completed" && (
                    <button onClick={() => markComplete(t._id)} className="text-green-500 hover:text-green-700">✓</button>
                  )}
                  <button onClick={() => deleteTask(t._id)} className="text-red-400 hover:text-red-600">✕</button>
                </div>
              </div>
            )) : <p className="text-center text-gray-400 py-10">No tasks found</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dash;