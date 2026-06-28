import React from 'react'

const SkillSection = ({skills}) => {
  return (
    <section
      id="skills"
      className="relative max-w-6xl mx-auto px-6 py-25"
    >
      {/* Section Heading */}
      <div className="text-center mb-14">
        <span className="uppercase tracking-[0.25em] text-indigo-400 text-xs font-bold bg-indigo-500/10 px-3 py-1.5 rounded-full border border-indigo-500/20">
          Tech Stack
        </span>
        <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Skills & Technologies
        </h2>
        <p className="mt-3 max-w-xl mx-auto text-slate-400 text-sm md:text-base leading-relaxed">
          Technologies and tools I use to design, develop, and deploy modern
          applications.
        </p>
      </div>

      {/* Skills Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((group, index) => (
          <div
            key={index}
            className="group relative rounded-2xl border border-slate-800/80 bg-gradient-to-b from-slate-900/50 to-slate-900/20 backdrop-blur-md p-6 transition-all duration-300 hover:border-indigo-500/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/5 overflow-hidden"
          >
            {/* Background Subtle Glow Effect */}
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all duration-300" />

            {/* Category Title with Dot */}
            <div className="flex items-center gap-2.5 mb-5 border-b border-slate-800/60 pb-3">
              <div className="h-2 w-2 rounded-full bg-indigo-500 group-hover:animate-pulse" />
              <h3 className="text-base font-bold text-slate-200 tracking-wide group-hover:text-white transition-colors">
                {group.category}
              </h3>
            </div>

            {/* Interactive Tags */}
            <div className="flex flex-wrap gap-2">
              {group.items.map((skill) => (
                <span
                  key={skill}
                  className="rounded-xl border border-slate-800 bg-slate-950/40 px-3 py-1.5 text-xs font-medium text-slate-400 transition-all duration-300 hover:border-indigo-500/40 hover:text-indigo-300 hover:bg-indigo-500/5 hover:scale-105"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default SkillSection