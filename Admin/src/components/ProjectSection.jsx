import React, {useState} from 'react'
import {
  Plus, Trash2
} from 'lucide-react';

const ProjectSection = () => {

  // Form States for Admin
  const [newProj, setNewProj] = useState({ title: '', desc: '', tech: '' });
  

  const [projects, setProjects] = useState([
    { id: 1, title: "E-Commerce Platform", desc: "A modern headless commerce solution built with React.", tech: "React, Tailwind, Node.js" },
    { id: 2, title: "Galery App (MERN)", desc: "Real-time analytics platform with predictive insights.", tech: "Node.js, React.js, Tailwind CSS" },
    { id: 3, title: "Advanced Authentication", desc: "A production-inspired authentication system built with Node.js, Express.js, MongoDB, and JWT.", tech: "Node.js, MongoDB, Express.js" }
  ]);

  // --- HANDLERS ---
  const handleAddProject = (e) => {
    e.preventDefault();
    if (!newProj.title) return;
    setProjects([...projects, { ...newProj, id: Date.now() }]);
    setNewProj({ title: '', desc: '', tech: '' });
    toast.success("Project added successfully!");
  };


  // ✅ ফিক্স ১: handleDeleteProj ফাংশনটি তৈরি করা হলো
  const handleDeleteProj = (id) => {
    setProjects(projects.filter(project => project.id !== id));
    toast.success("Project deleted!");
  };

  return (
    <section className="space-y-8">
      <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-800/80 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-indigo-500 to-transparent opacity-50"></div>
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2.5 text-white">
          <Plus className="text-indigo-400" size={22} /> Add New Project
        </h2>
        <form onSubmit={handleAddProject} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Project Title" value={newProj.title} onChange={(e) => setNewProj({ ...newProj, title: e.target.value })} className="w-full bg-slate-950/60 border border-slate-800 focus:border-indigo-500/80 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all duration-200" />
            <input type="text" placeholder="Tech Stack (e.g. React, Tailwind)" value={newProj.tech} onChange={(e) => setNewProj({ ...newProj, tech: e.target.value })} className="w-full bg-slate-950/60 border border-slate-800 focus:border-indigo-500/80 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all duration-200" />
          </div>
          <textarea placeholder="Short project description..." rows="3" value={newProj.desc} onChange={(e) => setNewProj({ ...newProj, desc: e.target.value })} className="w-full bg-slate-950/60 border border-slate-800 focus:border-indigo-500/80 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all duration-200 resize-none"></textarea>
          <button type="submit" className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-xl text-sm transition-all duration-200 shadow-md shadow-indigo-600/10 ring-1 ring-white/10">Add Project</button>
        </form>
      </div>

      <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-800/80 rounded-2xl p-8 shadow-2xl">
        <h3 className="text-lg font-bold mb-4 text-white">Manage Current Projects</h3>
        <div className="divide-y divide-slate-800/60">
          {projects.map((project) => (
            <div key={project.id} className="py-4 flex justify-between items-center gap-4 group/item">
              <div>
                <h4 className="font-semibold text-slate-200 group-hover/item:text-indigo-400 transition-colors duration-200">{project.title}</h4>
                <p className="text-sm text-slate-400 mt-0.5">{project.tech}</p>
              </div>
              <button onClick={() => handleDeleteProj(project.id)} className="p-2.5 text-slate-500 hover:text-rose-400 rounded-xl hover:bg-rose-950/30 border border-transparent hover:border-rose-900/20 transition-all duration-200">
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectSection;