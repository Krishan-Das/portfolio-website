import React, { useState, useEffect } from 'react';


import {
  User, Briefcase, Code, Mail, Settings,
  Plus, Trash2, Edit3, Eye, LogOut, Menu, X
} from 'lucide-react';

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProjectSection from './components/ProjectSection';
import SkillSection from './components/SkillSection';
import ContactSection from './components/ContactSection';

// project images
import advAuthPic from "./assets/projects_image/Advanced_Auth.png"
import mernEcommercePic from "./assets/projects_image/mern_e_commerce.png"
import mernGaleryPic from "./assets/projects_image/mern_galery.png"

export default function App() {

  // --- ScroolBar Top ---
  const [scrollProgress, setScrollProgress] = useState(0);

  // Portfolio Data States
  const [profile, setProfile] = useState({
    name: "Krishan Das",
    role: "Full Stack Developer",
    bio: "Building beautiful, scalable, and user-centric digital experiences.",
    email: "krishan8974783135@gmail.com",
    github: "https://github.com/Krishan-Das",
    linkedin: "https://www.linkedin.com/in/krishan-das-93951433a/"
  });

  const [projects, setProjects] = useState([
    { 
      id: 1,
      title: "E-Commerce Platform", 
      desc: "A modern headless commerce solution built with React.", 
      tech: "React, Tailwind, Node.js",
      image: mernEcommercePic
    },

    { 
      id: 2, 
      title: "Galery App (MERN)", 
      desc: "Real-time analytics platform with predictive insights.", 
      tech: "Node.js, React.js, Tailwind CSS", 
      image: mernGaleryPic, 
      github: "https://github.com/Krishan-Das/galery-full-stack-proj-1-.git" 
    },

    { 
      id: 3, 
      title: "Advanced Authentication", 
      desc: "A production-inspired authentication system built with Node.js, Express.js, MongoDB, and JWT.", 
      tech: "Node.js, MongoDB, Express.js", 
      image: advAuthPic,
      github: "https://github.com/Krishan-Das/Advanced_authentication.git" 
    }
  ]);

  const skills = [
    {
      category: "Languages",
      items: ["JavaScript", "TypeScript", "Java", "C++", "Python"],
    },
    {
      category: "Frontend",
      items: ["React.js", "Tailwind CSS", "HTML5", "CSS3"],
    },
    {
      category: "Backend",
      items: ["Node.js", "Express.js", "REST API", "JWT"],
    },
    {
      category: "Database",
      items: ["MongoDB", "PostgreSQL", "MySQL"],
    },
    {
      category: "Mobile",
      items: ["Flutter", "Dart"],
    },
    {
      category: "Tools",
      items: ["Git", "GitHub", "VS Code", "Postman"],
    },
  ];





  const handleDeleteProj = (id) => setProjects(projects.filter(p => p.id !== id));
  const handleDeleteSkill = (index) => setSkills(skills.filter((_, i) => i !== index));



  // --- Scrool Progress ---
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const progress = (window.scrollY / totalHeight) * 100;

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (

    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans antialiased selection:bg-indigo-500 selection:text-white scroll-smooth">

      {/* --- Scrol Progress --- */}
      <div
        className="fixed top-0 left-0 h-1 bg-indigo-500 z-[9999] transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      ></div>

      <>
        <Navbar profile={profile} />
        <HeroSection />
        <ProjectSection projects={projects} />
        <SkillSection skills={skills} />
        <ContactSection profile={profile} />
        <footer className="border-t border-slate-800/60 py-8 text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
        </footer>
      </>

    </div>
  );
}