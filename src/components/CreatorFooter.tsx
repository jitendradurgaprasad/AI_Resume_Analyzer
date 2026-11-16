import React from "react";
import { Github, Mail, Globe, Code, ShieldCheck, Heart } from "lucide-react";

export const CreatorFooter: React.FC = () => {
  return (
    <footer id="about-creator" className="bg-white border-t border-slate-200 mt-16 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-100">
          {/* Creator Profile */}
          <div className="md:col-span-6 space-y-3">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold">
              <Code className="h-3.5 w-3.5" />
              Creator & Lead Engineer
            </div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              Medisetti Jitendra Durga Prasad
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed max-w-md">
              Software Engineer specializing in Machine Learning, Full-Stack Development, and Enterprise System Architecture. Built with modern ATS algorithmic benchmarking and natural language processing.
            </p>

            {/* Contact & Social Links */}
            <div className="flex items-center gap-3 pt-2 text-xs font-medium">
              <a
                href="mailto:mjdp4317@gmail.com"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 transition"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>mjdp4317@gmail.com</span>
              </a>

              <a
                href="https://github.com/jitendradurgaprasad"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white transition"
              >
                <Github className="h-3.5 w-3.5" />
                <span>GitHub Profile</span>
              </a>
            </div>
          </div>

          {/* Project Details */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
              Project Architecture
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600">
              <li>Next.js 14 App Router</li>
              <li>TypeScript & Tailwind CSS</li>
              <li>1,500+ Skill Taxonomy Vector ML</li>
              <li>Client-side Document Parsing</li>
              <li>Automated ATS Audit Engine</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
              Repositories & Source
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600">
              <li>
                <a
                  href="https://github.com/jitendradurgaprasad/AI_Resume_Analyzer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-900 underline underline-offset-2 flex items-center gap-1"
                >
                  <span>Project GitHub Repo</span>
                </a>
              </li>
              <li>
                <a
                  href="https://ai-resume-analyzer-xi-ruby-67.vercel.app"
                  className="hover:text-slate-900 underline underline-offset-2"
                >
                  Live Production URL
                </a>
              </li>
              <li className="text-slate-400">Open Source MIT License</li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} ResuMatch AI &mdash; Engineered by{" "}
            <span className="font-semibold text-slate-700">Medisetti Jitendra Durga Prasad</span>.
          </div>
          <div className="flex items-center gap-1">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>Enterprise Privacy: Resumes are processed locally in-browser</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
