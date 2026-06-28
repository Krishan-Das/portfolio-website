import React, { useState, useEffect } from 'react';
import { Edit3, Eye } from 'lucide-react';
import { logoutUser } from '../api/authApi';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import ProjectSection from '../components/ProjectSection';
import AdminSlider from '../components/AdminSlider';
import ProfileSection from '../components/ProfileSection';
import SkiilsSection from '../components/SkiilsSection';

const Dashboard = () => {
  const navigate = useNavigate();
  const { setUser, accessToken, setAccessToken } = useAuth();

  // ===== Authentication =====
  const handleLogout = async () => {
    try {
      const data = await logoutUser(accessToken);
      if (!data) {
        toast.error("Logout Failed!");
        return;
      }
      toast.success(data.message || "Logged out successfully!");

      setUser(null);
      setAccessToken(null);
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  // --- ScrollBar Top ---
  const [scrollProgress, setScrollProgress] = useState(0);

  // --- STATE MANAGEMENT ---
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState('projects');


  // --- Scroll Progress ---
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans antialiased selection:bg-indigo-500 selection:text-white scroll-smooth">

      {/* Scroll Progress */}
      <div
        className="fixed top-0 left-0 h-1 bg-indigo-500 z-[9999] transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      ></div>

      {/* FLOATING ADMIN TOGGLE */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full shadow-lg shadow-indigo-600/30 transition-all transform hover:-translate-y-1 font-medium cursor-pointer"
        >
          <Eye size={18} /> View Portfolio
        </button>
      </div>

      <div className="flex min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-indigo-500/30">

        {/* Admin Sidebar */}
        <AdminSlider
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          handleLogout={handleLogout}
        />

        {/* Admin Main Content (কন্ডিশনাল রেন্ডারিং যুক্ত করা হয়েছে) */}
        <main className="flex-1 p-10 max-w-4xl mx-auto w-full transition-all duration-300">

          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <ProfileSection />
          )}

          {/* PROJECTS TAB */}
          {activeTab === 'projects' && (
            <ProjectSection />
          )}

          {/* SKILLS TAB */}
          {activeTab === 'skills' && (
            <SkiilsSection />
          )}

        </main>
      </div>
    </div>
  );
};

export default Dashboard;