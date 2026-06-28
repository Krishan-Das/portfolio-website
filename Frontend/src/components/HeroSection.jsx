import React from 'react'
import { TypeAnimation } from "react-type-animation";
import { ArrowRight, Download, ChevronDown } from "lucide-react";

import ProfilePic from "../assets/Profile.jpeg"

const HeroSection = ({profile}) => {
  return (
    <section
      id="home"
      className="relative max-w-7xl mx-auto px-6 py-30"
    >

      {/* Background Glow */}

      <div className="absolute inset-0 -z-20 overflow-hidden">

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-indigo-600/20 blur-[180px] rounded-full" />

        <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-[140px]" />

        <div className="absolute top-40 left-0 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[130px]" />

      </div>

      {/* Dots */}

      <div className="hidden xl:grid absolute top-24 right-12 grid-cols-7 gap-3 opacity-20">

        {[...Array(49)].map((_, i) => (

          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-white"
          />

        ))}

      </div>

      <div className="max-w-7xl mx-auto px-6 w-full">

        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-20">

          {/* ================= LEFT ================= */}

          <div className="flex-1 text-center lg:text-left">

            <span className="inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-5 py-2 text-sm text-indigo-300 font-medium backdrop-blur">

              👋 Hello, I'm

            </span>

            <h1 className="mt-2 text-5xl md:text-7xl font-black tracking-tight leading-tight">

              <span className="text-white">
                {profile.name}
              </span>

            </h1>

            {/* Animated */}

            <div className="mt-2 h-12">

              <TypeAnimation

                sequence={[

                  "Full Stack Developer",
                  1800,

                  "Backend Developer",
                  1800,

                  "Flutter Developer",
                  1800,

                  "Problem Solver",
                  1800,

                  "AI / ML Learner",
                  1800,

                ]}

                wrapper="span"

                speed={45}

                repeat={Infinity}

                cursor={true}

                className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-indigo-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent"

              />

            </div>

            <p className="mt-8 max-w-2xl text-slate-400 text-lg leading-8">

              Computer Science & Engineering student passionate about building
              modern web applications and solving real-world problems.

              Currently focusing on building production-ready projects while
              improving my Backend Development, MERN Stack, Flutter,
              Data Structures & Algorithms, and exploring AI/ML.

            </p>

            {/* Skills */}

            <div className="mt-10 flex flex-wrap gap-3 justify-center lg:justify-start">

              {[
                "MERN",
                "Backend",
                "Flutter",
                "DSA",
                "AI / ML",
              ].map((item) => (

                <span

                  key={item}

                  className="px-5 py-2 rounded-full border border-slate-700 bg-slate-900/70 backdrop-blur text-slate-300 text-sm"

                >

                  {item}

                </span>

              ))}

            </div>

            {/* Buttons */}

            <div className="mt-12 flex flex-wrap justify-center lg:justify-start gap-5">

              <a

                href="#projects"

                className="group flex items-center gap-2 rounded-xl bg-indigo-600 px-7 py-4 font-semibold text-white transition hover:bg-indigo-500"

              >

                View Projects

                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition"
                />

              </a>

              <a

                href="/resume.pdf"

                target="_blank"

                className="group flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-7 py-4 font-semibold text-white transition hover:border-indigo-500 hover:bg-slate-800"

              >

                Resume

                <Download size={18} />

              </a>

            </div>

          </div>

          {/* ================= RIGHT ================= */}
          <div className="flex-1 flex justify-center">

            <div className="relative">

              {/* Background Glow */}
              <div className="absolute -inset-5 rounded-[35px] bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 blur-3xl opacity-30"></div>

              {/* Image Frame */}
              <div className="relative rounded-[32px] border border-slate-800 bg-slate-900/70 backdrop-blur-xl p-3 shadow-2xl">

                <img
                  src={ProfilePic}
                  alt={profile.name}
                  className="w-[330px] h-[430px] md:w-[390px] md:h-[500px] rounded-[24px] object-cover transition duration-500 hover:scale-[1.03]"
                />

              </div>

              {/* Floating Card */}
              <div className="absolute -bottom-8 -left-8 hidden md:block">

                <div className="rounded-2xl border border-slate-800 bg-slate-900/90 backdrop-blur-xl px-6 py-5 shadow-2xl">

                  <p className="text-3xl font-bold text-indigo-400">
                    &lt;/&gt;
                  </p>

                  <h3 className="mt-2 text-white font-semibold">
                    Building Real Projects
                  </h3>

                  <p className="mt-1 text-sm text-slate-400">
                    Learning by building scalable
                    <br />
                    full-stack applications.
                  </p>

                </div>

              </div>

              {/* Experience Badge */}
              <div className="absolute -top-5 -right-5 hidden lg:flex">

                <div className="rounded-2xl border border-slate-800 bg-slate-900/90 backdrop-blur-xl px-5 py-4 shadow-xl">

                  <p className="text-3xl font-bold text-cyan-400">
                    20+
                  </p>

                  <p className="text-sm text-slate-400">
                    Projects
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Scroll Indicator */}

        <div className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center">

          <span className="text-xs uppercase tracking-[0.35em] text-slate-500">
            Scroll
          </span>

          <div className="mt-4 w-6 h-10 rounded-full border border-slate-600 flex justify-center">

            <div className="mt-2 w-2 h-2 rounded-full bg-indigo-400 animate-bounce"></div>

          </div>

        </div>
      </div>
    </section>
  )
}

export default HeroSection