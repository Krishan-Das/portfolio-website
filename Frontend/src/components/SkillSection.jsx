import React from 'react'
import { Code2, Server, Layout, Database, Terminal, Cpu } from 'lucide-react'

// ক্যাটাগরি অনুযায়ী আইকন ম্যাপ করার জন্য একটি হেল্পার ফাংশন
const getCategoryIcon = (category) => {
  const name = category.toLowerCase();
  if (name.includes('front')) return <Layout className="w-5 h-5 text-indigo-400" />;
  if (name.includes('back')) return <Server className="w-5 h-5 text-emerald-400" />;
  if (name.includes('database') || name.includes('data')) return <Database className="w-5 h-5 text-amber-400" />;
  if (name.includes('tool') || name.includes('devops')) return <Terminal className="w-5 h-5 text-sky-400" />;
  if (name.includes('language')) return <Code2 className="w-5 h-5 text-violet-400" />;
  return <Cpu className="w-5 h-5 text-pink-400" />;
}

const SkillSection = ({ skills }) => {
  return (
    <section id="skills" className="relative max-w-6xl mx-auto px-6 py-24 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[300px] h-[300px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Section Heading */}
      <div className="text-center mb-16 relative z-10">
        <span className="uppercase tracking-[0.2em] text-indigo-400 text-xs font-semibold bg-indigo-500/10 px-4 py-1.5 rounded-full border border-indigo-500/20 backdrop-blur-md">
          Capabilities
        </span>
        <h2 className="mt-4 text-3xl md:text-5xl font-black text-white tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
          Skills & Technologies
        </h2>
        <div className="mt-4 w-12 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full" />
        <p className="mt-4 max-w-xl mx-auto text-slate-400 text-sm md:text-base leading-relaxed">
          Tools and tech stack I use to build scalable, high-performance web applications.
        </p>
      </div>

      {/* Skills Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {skills.map((group, index) => (
          <div
            key={index}
            className="group relative rounded-2xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-xl p-6 transition-all duration-500 hover:border-slate-700 hover:shadow-2xl hover:shadow-indigo-500/5"
          >
            {/* Top Border Glow Effect */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Category Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 group-hover:border-indigo-500/30 group-hover:bg-indigo-950/20 transition-all duration-300 shadow-inner">
                {getCategoryIcon(group.category)}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider group-hover:text-white transition-colors">
                  {group.category}
                </h3>
                <span className="text-[10px] text-slate-500">{group.items.length} Technologies</span>
              </div>
            </div>

            {/* Professional List Layout instead of just raw tags */}
            <div className="space-y-2.5">
              {group.items.map((skill, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between group/item rounded-xl border border-slate-800/50 bg-slate-950/20 px-3.5 py-2.5 text-sm font-medium text-slate-300 transition-all duration-300 hover:border-indigo-500/30 hover:bg-indigo-500/[0.02] hover:translate-x-1"
                >
                  <div className="flex items-center gap-2.5">
                    {/* Minimalist Tech Dot */}
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover/item:bg-indigo-400 transition-colors" />
                    <span className="text-slate-300 group-hover/item:text-white transition-colors">
                      {skill}
                    </span>
                  </div>
                  
                  {/* Fake/Visual Metric to make it look highly professional like a dashboard */}
                  <span className="text-[10px] text-slate-600 group-hover/item:text-indigo-400/70 font-mono transition-colors">
                    // active
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default SkillSection