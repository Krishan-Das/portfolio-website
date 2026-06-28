import React, { useState, useEffect } from 'react';
import { User, Save, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { getMe } from "../api/authApi.js"

const ProfileSection = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState('');
  const [bio, setBio] = useState('')

  const { user, setUser, temp } = useAuth();
  const [projectField, setProjectField] = useState('')

  const [saving, setSaving] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Hello");
    // You can now safely use the state variables here:
    console.log({ name, bio, role });
    console.log(user);    
  }



  useEffect(() => {
    if (user) {
      setName(user?.username || "RKora")
      setBio("Backend Developer")
      setRole(user?.role || "user")
    }
  }, [user])



  return (
    <section className="bg-slate-900/40 backdrop-blur-sm border border-slate-800/80 rounded-2xl p-8 shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-indigo-500 to-transparent opacity-50"></div>

      <h2 className="text-xl font-bold mb-6 flex items-center gap-2.5 text-white">
        <User className="text-indigo-400" size={22} /> Update Profile
      </h2>

      <form onSubmit={(e)=>handleSubmit(e)} className="space-y-5">
        <div>
          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-slate-950/60 border border-slate-800 focus:border-indigo-500/80 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all duration-200"
            required
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Professional Role</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full bg-slate-950/60 border border-slate-800 focus:border-indigo-500/80 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all duration-200"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Bio Description</label>
          <textarea
            rows="4"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full bg-slate-950/60 border border-slate-800 focus:border-indigo-500/80 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all duration-200 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-xl text-sm transition-all duration-200 shadow-md shadow-indigo-600/10 ring-1 ring-white/10 disabled:opacity-50 cursor-pointer"
        >
          <Save size={16} />
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </section>
  );
};

export default ProfileSection;