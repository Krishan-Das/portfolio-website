import { useState, useEffect } from "react";
import { Menu, X, Download } from "lucide-react";

const Navbar = ({ profile }) => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = ["home", "projects", "skills", "contact"];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    sections.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const navLinks = [
    {
      id: "home",
      label: "Home",
    },
    {
      id: "projects",
      label: "Projects",
    },
    {
      id: "skills",
      label: "Skills",
    },
    {
      id: "contact",
      label: "Contact",
    },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/70 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Logo */}
        <a
          href="#home"
          aria-label="Go to Home"
          className="text-2xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 via-cyan-400 to-sky-400 bg-clip-text text-transparent"
        >
          {profile.name.split(" ")[0]}.dev
        </a>

        {/* Desktop Navigation */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-8"
        >
          {navLinks.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`relative text-sm font-medium transition-all duration-300

              ${
                activeSection === item.id
                  ? "text-white"
                  : "text-slate-400 hover:text-white"
              }

              after:absolute
              after:left-0
              after:-bottom-1
              after:h-[2px]
              after:bg-cyan-400
              after:transition-all
              after:duration-300

              ${
                activeSection === item.id
                  ? "after:w-full"
                  : "after:w-0 hover:after:w-full"
              }
              `}
            >
              {item.label}
            </a>
          ))}

          {/* Resume Button */}
          {/* <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500"
          >
            <Download size={16} />
            Resume
          </a> */}
        </nav>

        {/* Mobile Button */}
        <button
          aria-label="Toggle Menu"
          onClick={() => setMobileMenu(!mobileMenu)}
          className="md:hidden text-slate-200"
        >
          {mobileMenu ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden transition-all duration-300 md:hidden

        ${
          mobileMenu
            ? "max-h-96 border-t border-slate-800"
            : "max-h-0"
        }
        `}
      >
        <div className="bg-slate-950 px-6 py-6 space-y-5">

          {navLinks.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setMobileMenu(false)}
              className={`block text-base transition

              ${
                activeSection === item.id
                  ? "text-white"
                  : "text-slate-400 hover:text-white"
              }
              `}
            >
              {item.label}
            </a>
          ))}

          {/* <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-white font-medium hover:bg-indigo-500 transition"
          >
            <Download size={18} />
            Resume
          </a> */}

        </div>
      </div>
    </header>
  );
};

export default Navbar;