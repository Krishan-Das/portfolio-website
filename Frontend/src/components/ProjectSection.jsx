import React from 'react'

const ProjectSection = ({ projects }) => {
  return (
    <section
      id="projects"
      className="relative max-w-6xl mx-auto px-6 py-25"
    >
      {/* Section Heading */}
      <div className="text-center mb-14">
        <span className="text-indigo-400 uppercase tracking-[0.25em] text-xs font-bold bg-indigo-500/10 px-3 py-1.5 rounded-full border border-indigo-500/20">
          Portfolio
        </span>
        <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Featured Projects
        </h2>
        <p className="mt-3 max-w-xl mx-auto text-slate-400 text-sm md:text-base leading-relaxed">
          A collection of projects built while learning, experimenting and solving
          real-world problems.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/5"
          >
            {/* Gradient Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none" />

            {/* Image Container */}
            <div className="relative h-48 overflow-hidden bg-slate-950">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover object-top transition duration-500 group-hover:scale-105"
              />
              <div className="absolute top-3 left-3">
                <span className="rounded-lg bg-indigo-600/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold text-white uppercase tracking-wider shadow-sm">
                  Featured
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition duration-200">
                {project.title}
              </h3>
              <p className="mt-2.5 text-slate-400 text-sm leading-relaxed line-clamp-3">
                {project.desc}
              </p>

              {/* Tech Stack Tags */}
              <div className="mt-5 flex flex-wrap gap-2">
                {project.tech.split(",").map((tech, index) => (
                  <span
                    key={index}
                    className="rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1 text-xs font-medium text-slate-400"
                  >
                    {tech.trim()}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex gap-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 rounded-xl border border-slate-800 py-2.5 text-center text-xs font-semibold text-slate-300 transition-all duration-200 hover:border-indigo-500/50 hover:bg-slate-800/50 hover:text-white"
                >
                  GitHub
                </a>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 rounded-xl bg-indigo-600 py-2.5 text-center text-xs font-bold text-white shadow-md shadow-indigo-600/10 transition-all duration-200 hover:bg-indigo-500"
                >
                  Live Demo →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ProjectSection