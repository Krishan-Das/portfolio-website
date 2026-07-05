import React, { useState, useRef } from 'react';
import { Plus, Trash2, FolderGit2, Link, Star, Image, X, Code, Eye, Edit2 } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const ProjectSection = () => {
  const { accessToken } = useAuth();
  const fileInputRef = useRef(null);

  // Tracks if we are editing an existing project (holds the project ID)
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: "",
    githubUrl: "",
    liveUrl: "",
    featured: false,
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  const [projects, setProjects] = useState([
    {
      _id: "1",
      title: "E-Commerce Platform",
      description: "A modern headless commerce solution built with React.",
      technologies: ["React", "Tailwind", "Node.js"],
      githubUrl: "https://github.com",
      liveUrl: "https://live.com",
      featured: true,
      images: ["https://api.dicebear.com/7.x/shapes/svg?seed=Ecommerce"],
    },
  ]);

  // Handle inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle single image selection
  const handleImageSelection = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    setSelectedFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // Remove single image preview
  const removeSelectedPreview = () => {
    setSelectedFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Reset Form state completely
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      technologies: "",
      githubUrl: "",
      liveUrl: "",
      featured: false,
    });
    setEditingId(null);
    removeSelectedPreview();
  };

  // Set form values to edit an existing project
  const handleEditClick = (project) => {
    setEditingId(project._id);
    setFormData({
      title: project.title,
      description: project.description,
      technologies: project.technologies.join(", "),
      githubUrl: project.githubUrl || "",
      liveUrl: project.liveUrl || "",
      featured: project.featured || false,
    });
    
    // Set preview if the project already has an image uploaded
    if (project.images && project.images.length > 0) {
      setImagePreview(project.images[0]);
    } else {
      setImagePreview(null);
    }
    setSelectedFile(null);
  };

  // Submit Form (Handles both Create and Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description) {
      toast.error("Title and Description are required");
      return;
    }

    const techArray = formData.technologies
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const uploadData = new FormData();
    uploadData.append("title", formData.title);
    uploadData.append("description", formData.description);
    uploadData.append("githubUrl", formData.githubUrl);
    uploadData.append("liveUrl", formData.liveUrl);
    uploadData.append("featured", formData.featured);

    techArray.forEach((tech) => {
      uploadData.append("technologies", tech);
    });

    if (selectedFile) {
      uploadData.append("image", selectedFile);
    }

    try {
      if (editingId) {
        // --- UPDATE EXISTING PROJECT ---
        const response = await api.put(`/project/update/${editingId}`, uploadData, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        setProjects((prev) =>
          prev.map((proj) => (proj._id === editingId ? response.data.project : proj))
        );
        toast.success("Project updated successfully");
      } else {
        // --- CREATE NEW PROJECT ---
        const response = await api.post("/project/create", uploadData, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        setProjects((prev) => [response.data.project, ...prev]);
        toast.success("Project created successfully");
      }

      resetForm();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || `Failed to ${editingId ? 'update' : 'create'} project`);
    }
  };

  // Delete Project
  const handleDeleteProj = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      await api.delete(`/project/delete/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      setProjects((prev) => prev.filter((proj) => proj._id !== id));
      toast.success("Project deleted successfully.");
      
      // If we were editing the project that just got deleted, reset the form
      if (editingId === id) resetForm();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to delete project");
    }
  };

  return (
    <section className="flex flex-col gap-8 max-w-3xl mx-auto p-4 text-slate-200">
      
      {/* 🛠️ ADD / UPDATE PROJECT BOX */}
      <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
        <h2 className="text-lg font-semibold mb-6 flex items-center justify-between text-white border-b border-slate-800/50 pb-3">
          <span className="flex items-center gap-2">
            <Plus className="text-indigo-400" size={20} /> 
            {editingId ? "Update Project Details" : "Add New Project"}
          </span>
          {editingId && (
            <button type="button" onClick={resetForm} className="text-xs text-slate-400 hover:text-rose-400 transition-colors">
              Cancel Edit
            </button>
          )}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Form Row: Title & Tech */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Project Title *</label>
              <input type="text" name="title" required value={formData.title} onChange={handleChange} placeholder="e.g. AI SaaS Engine" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:border-indigo-500 outline-none transition-all" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Tech Stack</label>
              <input type="text" name="technologies" value={formData.technologies} onChange={handleChange} placeholder="React, Node.js, MongoDB" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:border-indigo-500 outline-none transition-all" />
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Description *</label>
            <textarea name="description" required rows="3" value={formData.description} onChange={handleChange} placeholder="Describe what this project does..." className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:border-indigo-500 outline-none transition-all resize-none"></textarea>
          </div>

          {/* Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5"><FolderGit2 size={13} /> GitHub Link</label>
              <input type="url" name="githubUrl" value={formData.githubUrl} onChange={handleChange} placeholder="https://github.com/..." className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:border-indigo-500 outline-none transition-all" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5"><Link size={13} /> Live Preview Link</label>
              <input type="url" name="liveUrl" value={formData.liveUrl} onChange={handleChange} placeholder="https://myproject.com" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:border-indigo-500 outline-none transition-all" />
            </div>
          </div>

          {/* Upload & Options Wrapper */}
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 flex flex-col gap-4">
            <div className="flex flex-row justify-between items-center gap-4">
              <div>
                <h4 className="text-xs font-semibold text-slate-200 flex items-center gap-2"><Image size={14} className="text-indigo-400" /> Project Screenshot</h4>
                <p className="text-[11px] text-slate-400">Upload a cover image for your work.</p>
              </div>
              <button type="button" onClick={() => fileInputRef.current.click()} className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-medium rounded-lg border border-slate-700 transition-colors">
                Select File
              </button>
              <input type="file" ref={fileInputRef} accept="image/*" onChange={handleImageSelection} className="hidden" />
            </div>

            {/* Selected Image Preview */}
            {imagePreview && (
              <div className="pt-1">
                <div className="relative w-20 h-20 rounded-lg border border-slate-700 overflow-hidden bg-slate-900 group">
                  <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
                  <button type="button" onClick={removeSelectedPreview} className="absolute top-1 right-1 p-1 bg-rose-600/90 rounded-md text-white shadow hover:bg-rose-500 transition-colors">
                    <X size={10} />
                  </button>
                </div>
              </div>
            )}

            <hr className="border-slate-800/60" />

            {/* Featured */}
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} className="w-4 h-4 rounded text-indigo-600 bg-slate-950 border-slate-800 accent-indigo-500" />
              <div>
                <span className="text-xs font-semibold flex items-center gap-1">
                  <Star size={13} className={formData.featured ? "fill-amber-400 text-amber-400" : "text-slate-400"} /> Feature this project
                </span>
                <p className="text-[11px] text-slate-500">Highlight this on your portfolio main page.</p>
              </div>
            </label>
          </div>

          <div className="flex items-center justify-end gap-3">
            {editingId && (
              <button type="button" onClick={resetForm} className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium rounded-xl transition-colors">
                Cancel
              </button>
            )}
            <button type="submit" className="w-full sm:w-fit px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl text-sm transition-colors shadow-lg shadow-indigo-600/10">
              {editingId ? "Update Project Entry" : "Save Project Entry"}
            </button>
          </div>
        </form>
      </div>

      {/* 🗂️ SAVED PROJECTS LIST */}
      <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-6 shadow-xl">
        <h3 className="text-base font-semibold mb-4 text-white">
          Your Projects ({projects.length})
        </h3>

        <div className="flex flex-col divide-y divide-slate-800/60">
          {projects.map((project) => (
            <div key={project._id} className={`py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group transition-all ${editingId === project._id ? 'bg-indigo-950/20 px-3 rounded-xl border border-indigo-500/20' : ''}`}>
              
              <div className="flex items-start gap-4">
                {project.images?.length > 0 && (
                  <div className="w-16 h-16 rounded-xl border border-slate-800 overflow-hidden bg-slate-950 shrink-0">
                    <img src={project.images[0]} alt="thumbnail" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex flex-col gap-1">
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
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end border-t border-slate-800/40 pt-3 sm:pt-0 sm:border-t-0">
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
          ))}

          {projects.length === 0 && (
            <p className="text-xs text-slate-500 text-center py-8">No projects found. Add one above!</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;