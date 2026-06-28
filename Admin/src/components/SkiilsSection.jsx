import React, {useState} from 'react'
import { Code, X } from 'lucide-react';


const SkiilsSection = () => {

  const [newSkill, setNewSkill] = useState('');


  const [skills, setSkills] = useState([
    "JavaScript", "TypeScript", "Java", "React.js", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "Git"
  ]);

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    if (skills.includes(newSkill)) {
      toast.error("Skill already exists!");
      return;
    }
    setSkills([...skills, newSkill.trim()]);
    setNewSkill('');
    toast.success("Skill added!");
  };

  // ✅ ফিক্স ২: handleDeleteSkill ফাংশনটি তৈরি করা হলো
    const handleDeleteSkill = (skillToDelete) => {
      setSkills(skills.filter(skill => skill !== skillToDelete));
      toast.success("Skill removed!");
    };
  

  return (
    <section className="space-y-8">
      <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-800/80 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-indigo-500 to-transparent opacity-50"></div>
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2.5 text-white">
          <Code className="text-indigo-400" size={22} /> Add New Skill Tag
        </h2>
        <form onSubmit={handleAddSkill} className="flex gap-4">
          <input type="text"
            placeholder="e.g. Docker"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)} className="flex-1 bg-slate-950/60 border border-slate-800 focus:border-indigo-500/80 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all duration-200" />
          <button type="submit" className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-xl text-sm transition-all duration-200 shadow-md shadow-indigo-600/10 ring-1 ring-white/10">Add</button>
        </form>
      </div>

      <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-800/80 rounded-2xl p-8 shadow-2xl">
        <h3 className="text-lg font-bold mb-5 text-white">Manage Skills</h3>
        <div className="flex flex-wrap gap-3">
          {skills.map((skill, index) => (
            <span key={index} className="flex items-center gap-2 px-3.5 py-2 bg-slate-950 border border-slate-800/80 rounded-xl text-sm font-medium text-slate-300 hover:text-slate-100 hover:border-slate-700 transition-all duration-200">
              {skill}
              <button onClick={() => handleDeleteSkill(skill)} className="text-slate-500 hover:text-rose-400 p-0.5 rounded-md hover:bg-rose-950/30 transition-all duration-200">
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SkiilsSection;