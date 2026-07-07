import React from 'react'
import { Star, Code, Eye, Edit2, Trash2 } from 'lucide-react';

const ProjectCard = ({ project, editingId, handleEditClick, handleDeleteProj }) => {
  return (
    <div key={project._id} className={`py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group transition-all ${editingId === project._id ? 'bg-indigo-950/20 px-3 rounded-xl border border-indigo-500/20' : ''}`}>

      <div className="flex items-start gap-4 flex-col w-full">

        <div className="w-full aspect-[16/9] rounded-xl border border-slate-800 overflow-hidden bg-slate-950 shrink-0">
          <img src={project.image.url} alt="thumbnail" className="w-full h-full object-cover" />
        </div>


        <div className='flex justify-between w-full'>
          <div className="flex flex-col gap-1 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-medium text-sm text-slate-200">{project.title}</h4>
              {project.featured && (
                <span className="flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <Star size={9} className="fill-amber-400" /> Featured
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 max-w-md line-clamp-2">{project.description}</p>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {project.technologies.map((tech, index) => (
                <span key={index} className="bg-slate-950 px-2 py-0.5 rounded border border-slate-800/60 text-[10px] text-indigo-300 font-mono">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end border-t border-slate-800/40 pt-3 sm:pt-0 sm:border-t-0 ">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className="p-2 text-slate-400 hover:text-white bg-slate-950 hover:bg-slate-800 rounded-lg border border-slate-800/80 transition-colors" title="View Source">
                <Code size={14} />
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="p-2 text-slate-400 hover:text-white bg-slate-950 hover:bg-slate-800 rounded-lg border border-slate-800/80 transition-colors" title="Live Preview">
                <Eye size={14} />
              </a>
            )}

            {/* EDIT BUTTON */}
            <button onClick={() => handleEditClick(project)} className="p-2 text-slate-400 hover:text-indigo-400 rounded-lg sm:opacity-0 group-hover:opacity-100 transition-all hover:bg-indigo-950/40" title="Edit Project">
              <Edit2 size={14} />
            </button>

            {/* DELETE BUTTON */}
            <button onClick={() => handleDeleteProj(project._id)} className="p-2 text-slate-400 hover:text-rose-400 rounded-lg sm:opacity-0 group-hover:opacity-100 transition-all hover:bg-rose-950/20" title="Delete Project">
              <Trash2 size={15} />
            </button>
          </div>

        </div>
      </div>



    </div>
  )
}

export default ProjectCard