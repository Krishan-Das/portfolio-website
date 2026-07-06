import React, { useState, useEffect, useRef } from 'react';
import { User, Save, Loader2, Camera, ShieldAlert } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const ProfileSection = () => {
  const { user, setUser } = useAuth();
  
  // Form States based on your Mongoose Model
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState('');
  const [role, setRole] = useState('user'); // default schema fallback
  
  // Avatar handling
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef(null);

  // Sync state with User Model Data
  useEffect(() => {
    if (user) {
      setUsername(user?.username || "");
      setEmail(user?.email || "");
      setBio(user?.bio || "Portfolio website || RKora");
      setRole(user?.role || "user");
      // Mapping Schema avatar object logic: avatar.url
      setAvatarPreview(user?.avatar?.url || `https://api.dicebear.com/7.x/initials/svg?seed=${user?.username || 'Admin'}`);
    }
  }, [user]);

  // Handle Image Selection and Preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) { // 3MB local limit
        toast.error("Image size must be less than 3MB");
        return;
      }
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file)); // Blob URL generation for instant preview
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      // Backend structured Form Data payload construction
      const formData = new FormData();
      formData.append('username', username);
      formData.append('bio', bio);
      if (avatarFile) {
        formData.append('avatar', avatarFile); // Backend files parsing storage engine use korbe e.g Multer
      }

      console.log("Submitting updated structured data stream...");
      
      // Target API Logic example injection placeholder:
      // const response = await updateProfileApi(formData);
      
      // Simulating API Latency 
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Context storage re-allocation structure mapping with mongoose pattern 
      if(setUser) {
        setUser({
          ...user,
          username,
          bio,
          avatar: {
            ...user?.avatar,
            url: avatarFile ? avatarPreview : user?.avatar?.url // Local dynamic replacement string
          }
        });
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

      {/* Section Header Wrapper with privileges indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-800/60">
        <h2 className="text-xl font-bold flex items-center gap-2.5 text-white">
          <User className="text-indigo-400" size={22} /> Admin Information
        </h2>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">
          <ShieldAlert size={12} /> Access Level: {role}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* --- DYNAMIC AVATAR HANDLER (Schema: avatar.url Mapping) --- */}
        <div className="flex flex-col items-center sm:flex-row gap-5 bg-slate-950/40 p-4 rounded-xl border border-slate-800/50">
          <div className="relative group/avatar">
            <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-800 border-2 border-indigo-500/30 group-hover/avatar:border-indigo-500 transition-all duration-300 shadow-lg">
              <img 
                src={avatarPreview} 
                alt="Profile Avatar Layout" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Custom Interactive Click Overlay */}
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