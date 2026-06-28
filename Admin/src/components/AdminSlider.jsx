import React from 'react'
import {
  User, Briefcase, Code,LogOut,
} from 'lucide-react';
import { RiPictureInPictureExitFill } from "react-icons/ri";


const AdminSlider = ({activeTab, handleLogout, setActiveTab}) => {
  return (
    <aside className="w-66 bg-slate-900/60 backdrop-blur-md border-r border-slate-800/80 p-6 flex flex-col justify-between sticky top-0 h-screen">
      <div>
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20 ring-1 ring-white/20">
            A
          </div>
          <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Admin Studio
          </span>
        </div>

        <nav className="space-y-1.5">
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${activeTab === 'profile' ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-600/15 ring-1 ring-white/10' : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'}`}
          >
            <User size={18} className={activeTab === 'profile' ? 'text-white' : 'text-slate-400'} /> Profile
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${activeTab === 'projects' ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-600/15 ring-1 ring-white/10' : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'}`}
          >
            <Briefcase size={18} className={activeTab === 'projects' ? 'text-white' : 'text-slate-400'} /> Projects
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${activeTab === 'skills' ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-600/15 ring-1 ring-white/10' : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'}`}
          >
            <Code size={18} className={activeTab === 'skills' ? 'text-white' : 'text-slate-400'} /> Skills
          </button>
        </nav>
      </div>

      <div className='w-full flex flex-col gap-2'>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-rose-400 hover:bg-rose-950/25 hover:text-rose-300 transition-all duration-200 border border-transparent hover:border-rose-900/30 w-full cursor-pointer"
        >
          <LogOut size={18} /> Logout
        </button>
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-amber-400 hover:bg-amber-950/25 hover:text-amber-300 transition-all duration-200 border border-transparent hover:border-amber-900/30 w-full cursor-pointer"
        >
          <RiPictureInPictureExitFill size={18} /> Exit Admin
        </button>
      </div>
    </aside>
  )
}

export default AdminSlider