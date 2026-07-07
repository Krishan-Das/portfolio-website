import React, { useState, useEffect, useRef } from 'react';
import { User, Save, Loader2, Camera, ShieldAlert, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import api from '../api/axios';

const ProfileSection = () => {
  const { user, setUser, accessToken } = useAuth();
  
  // Form States strictly reflecting the updated Mongoose Model
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState('');
  const [role, setRole] = useState('user'); 
  

  const [titlesInput, setTitlesInput] = useState("");
  
  // Avatar handling
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef(null);

  // Sync state with Mongoose User Model Data
  useEffect(() => {
    if (user) {
      setUsername(user?.username || "");
      setEmail(user?.email || "");
      setBio(user?.bio || "Portfolio website || RKora");
      setRole(user?.role || "user");
      
      if (user?.titles && Array.isArray(user.titles)) {
        setTitlesInput(user.titles.join(", "));
      } else {
        setTitlesInput("Full Stack Developer, Backend Developer, Flutter Developer");
      }
      
      setAvatarPreview(user?.avatar?.url || `https://api.dicebear.com/7.x/initials/svg?seed=${user?.username || 'Admin'}`);
    }
  }, [user]);

  // Handle Image Selection and Preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { 
        toast.error("Image size must be less than 5MB");
        return;
      }
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file)); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {

      const processedTitlesArray = titlesInput
        .split(",")
        .map(title => title.trim())
        .filter(title => title !== ""); 

      // Backend Payload construction
      const formData = new FormData();
      formData.append('username', username.trim());
      formData.append('bio', bio);
      
      formData.append('titles', JSON.stringify(processedTitlesArray));
      
      if (avatarFile) {
        formData.append('avatar', avatarFile); 
      }

      const response = await api.patch('/auth/update', formData, {
        headers:{
          Authorization: `Bearer ${accessToken}`
        }
      })
      
      if(response?.data) {       
        setUser(response?.data?.user);
      }

      toast.success("Admin profile configured successfully!");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to save data context.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="bg-slate-900/40 backdrop-blur-sm border border-slate-800/80 rounded-2xl p-8 shadow-2xl relative overflow-hidden max-w-2xl mx-auto">
      {/* Decorative Top Accent Line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-transparent opacity-50"></div>

      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-800/60">
        <h2 className="text-xl font-bold flex items-center gap-2.5 text-white">
          <User className="text-indigo-400" size={22} /> Admin Information
        </h2>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">
          <ShieldAlert size={12} /> Access Level: {role}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* --- DYNAMIC AVATAR HANDLER --- */}
        <div className="flex flex-col items-center sm:flex-row gap-5 bg-slate-950/40 p-4 rounded-xl border border-slate-800/50">
          <div className="relative group/avatar">
            <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-800 border-2 border-indigo-500/30 group-hover/avatar:border-indigo-500 transition-all duration-300 shadow-lg">
              <img 
                src={avatarPreview} 
                alt="Profile Avatar Layout" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="absolute inset-0 bg-slate-950/70 text-white rounded-2xl opacity-0 group-hover/avatar:opacity-100 flex flex-col items-center justify-center gap-1 transition-all duration-200 cursor-pointer text-[10px] font-medium"
            >
              <Camera size={18} className="text-indigo-400" />
              <span>Change</span>
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageChange} 
              accept="image/*" 
              className="hidden" 
            />
          </div>
          
          <div className="text-center sm:text-left space-y-1">
            <h3 className="text-sm font-semibold text-slate-200">Avatar Control</h3>
            <p className="text-xs text-slate-400 max-w-[280px]">
              This populates the profile image. Square uploads are recommended.
            </p>
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="text-xs text-indigo-400 hover:text-indigo-300 underline font-medium transition-colors cursor-pointer"
            >
              Upload media file
            </button>
          </div>
        </div>

        {/* --- GRID INPUTS FIELDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-950/60 border border-slate-800 focus:border-indigo-500/80 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all duration-200"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full bg-slate-950/30 border border-slate-900 rounded-xl px-4 py-3 text-slate-500 cursor-not-allowed select-none"
              title="Email updates require multi-factor verification pipeline protection."
            />
          </div>
        </div>

        {/* --- 🛠️ DYNAMIC TITLES / TAGLINES INPUT (For Hero Section Animation) --- */}
        <div>
          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
            <Sparkles size={12} className="text-indigo-400" /> Animated Hero Titles
          </label>
          <p className="text-[11px] text-slate-500 mb-2">
            Separate each role with a comma. These will stream inside your home page banner loop.
          </p>
          <input
            type="text"
            value={titlesInput}
            onChange={(e) => setTitlesInput(e.target.value)}
            placeholder="Full Stack Developer, Backend Developer, Problem Solver"
            className="w-full bg-slate-950/60 border border-slate-800 focus:border-indigo-500/80 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all duration-200"
            required
          />
        </div>

        {/* --- BIO ELEMENT --- */}
        <div>
          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Bio Description</label>
          <textarea
            rows="3"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full bg-slate-950/60 border border-slate-800 focus:border-indigo-500/80 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all duration-200 resize-none"
            placeholder="Portfolio website || RKora"
          />
        </div>

        {/* --- CTA SAVE SUBMISSION ACTION BUTTON --- */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-sm transition-all duration-200 shadow-md shadow-indigo-600/10 disabled:opacity-60 cursor-pointer w-full sm:w-auto"
          >
            {saving ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Saving Framework Data...</span>
              </>
            ) : (
              <>
                <Save size={16} />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
};

export default ProfileSection;