import React from 'react'

const ContactSection = ({profile}) => {
  return (
    <section
      id="contact"
      className="relative max-w-7xl mx-auto px-6 py-28"
    >

      {/* Background Glow */}

      <div className="absolute inset-0 -z-10 overflow-hidden">

        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[160px]" />

      </div>

      <div className="rounded-[32px] border border-slate-800 bg-slate-900/70 backdrop-blur-xl p-10 md:p-16">

        <div className="max-w-3xl mx-auto text-center">

          <span className="uppercase tracking-[0.3em] text-indigo-400 text-sm font-semibold">
            Contact
          </span>

          <h2 className="mt-4 text-4xl md:text-5xl font-black text-white">
            Let's Build Something Amazing
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">

            Whether you have a project, internship opportunity, collaboration,
            or just want to connect, feel free to reach out.

            I'm always open to meaningful conversations.

          </p>

          {/* Availability */}

          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-green-500/30 bg-green-500/10 px-5 py-2">

            <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse"></span>

            <span className="text-green-300 text-sm font-medium">
              Open to Opportunities
            </span>

          </div>

          {/* Buttons */}

          <div className="mt-12 flex flex-wrap justify-center gap-5">

            <a
              href={`mailto:${profile.email}`}
              className="rounded-xl bg-indigo-600 px-8 py-4 text-white font-semibold transition hover:bg-indigo-500"
            >
              Email Me
            </a>

            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-slate-700 bg-slate-900 px-8 py-4 text-white transition hover:border-indigo-500 hover:bg-slate-800"
            >
              GitHub
            </a>

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-slate-700 bg-slate-900 px-8 py-4 text-white transition hover:border-indigo-500 hover:bg-slate-800"
            >
              LinkedIn
            </a>

          </div>

          {/* Bottom Info */}

          <div className="mt-14 flex flex-col md:flex-row justify-center items-center gap-8 text-slate-500 text-sm">

            <span>
              📍 India
            </span>

            <span>
              📧 {profile.email}
            </span>

            <span>
              🚀 Available for Internships & Freelance
            </span>

          </div>

        </div>

      </div>

    </section>
  )
}

export default ContactSection