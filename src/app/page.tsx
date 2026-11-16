"use client";

import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { Header } from "../components/Header";
import { ResumeUploader } from "../components/ResumeUploader";
import { OverviewTab } from "../components/OverviewTab";
import { SkillsTab } from "../components/SkillsTab";
import { JobMatcherTab } from "../components/JobMatcherTab";
import { BulletOptimizerTab } from "../components/BulletOptimizerTab";
import { RecruiterOfficeTab } from "../components/RecruiterOfficeTab";
import { GeminiModal } from "../components/GeminiModal";

import { parseResumeText, ParsedResume } from "../lib/analyzer/sectionParser";
import { computeATSScore, ATSAuditReport } from "../lib/analyzer/scoringEngine";
import { predictJobRoles, PredictionAnalysis } from "../lib/analyzer/rolePredictor";
import { SAMPLE_RESUMES } from "../lib/datasets/jobRoles";

import {
  FileText,
  Tag,
  Briefcase,
  Zap,
  Building,
  Sparkles,
  Award,
  Layers,
  ArrowUpRight
} from "lucide-react";

export default function Home() {
  const [currentText, setCurrentText] = useState<string>("");
  const [activeSampleId, setActiveSampleId] = useState<string>("software-engineer");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<
    "overview" | "skills" | "matcher" | "optimizer" | "office"
  >("overview");
  const [geminiModalOpen, setGeminiModalOpen] = useState<boolean>(false);

  // Parsed state
  const [parsed, setParsed] = useState<ParsedResume | null>(null);
  const [audit, setAudit] = useState<ATSAuditReport | null>(null);
  const [prediction, setPrediction] = useState<PredictionAnalysis | null>(null);

  // Load default sample on mount
  useEffect(() => {
    const initialSample = SAMPLE_RESUMES[0];
    analyzeResume(initialSample.text, initialSample.id);
  }, []);

  const analyzeResume = (text: string, sampleId?: string) => {
    setIsLoading(true);
    setCurrentText(text);
    if (sampleId) {
      setActiveSampleId(sampleId);
    } else {
      setActiveSampleId("");
    }

    try {
      const parsedData = parseResumeText(text);
      const auditData = computeATSScore(parsedData);
      const predictionData = predictJobRoles(parsedData);

      setParsed(parsedData);
      setAudit(auditData);
      setPrediction(predictionData);

      // Celebrate high score
      if (auditData.overallScore >= 85) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#10b981", "#3b82f6", "#14b8a6"],
        });
      }
    } catch (e) {
      console.error("Analysis failure:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadSample = (sampleId: string) => {
    const sample = SAMPLE_RESUMES.find((s) => s.id === sampleId);
    if (sample) {
      analyzeResume(sample.text, sample.id);
    }
  };

  interface NavTab {
    id: "overview" | "skills" | "matcher" | "optimizer" | "office";
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
  }

  const tabs: NavTab[] = [
    { id: "overview", label: "ATS Score & Audit", icon: Layers, badge: audit ? `${audit.overallScore}/100` : undefined },
    { id: "skills", label: "Skills & Role Fit", icon: Tag, badge: parsed ? `${parsed.extractedSkills.length}` : undefined },
    { id: "matcher", label: "Job Description Matcher", icon: Briefcase },
    { id: "optimizer", label: "STAR Bullet Rewriter", icon: Zap },
    { id: "office", label: "Recruiter Office Suite", icon: Building },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Header onLoadSample={handleLoadSample} activeSampleId={activeSampleId} />

      {/* Hero Header */}
      <section className="relative overflow-hidden pt-10 pb-6 border-b border-slate-900 bg-gradient-to-b from-slate-900/60 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
                <Sparkles className="h-3.5 w-3.5" />
                Enterprise-Grade AI Resume Evaluation & Career Intelligence
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Unlock 90+ ATS Pass Rates & Recruiter Alignment
              </h1>
              <p className="text-sm text-slate-400 mt-2 max-w-2xl">
                Trained on 1,500+ industry skills and 25+ benchmark roles. Pinpoint missing keywords, simulate applicant tracking systems, optimize STAR bullets, and generate tailored interview scripts.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setGeminiModalOpen(true)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition flex items-center gap-2"
              >
                <Sparkles className="h-4 w-4 text-emerald-400" />
                <span>Gemini AI Critique</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Upload / Ingestion Component */}
        <ResumeUploader
          onTextLoaded={(text, fileName) => analyzeResume(text)}
          isLoading={isLoading}
        />

        {/* Tab Navigation */}
        {audit && parsed && prediction && (
          <div className="space-y-6">
            <div className="border-b border-slate-800">
              <nav className="flex space-x-2 sm:space-x-4 overflow-x-auto pb-1 scrollbar-none" aria-label="Tabs">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center gap-2 py-3 px-3.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
                        isActive
                          ? "bg-slate-800 text-emerald-400 border border-slate-700 shadow-sm"
                          : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
                      }`}
                    >
                      <Icon className={`h-4 w-4 ${isActive ? "text-emerald-400" : "text-slate-400"}`} />
                      <span>{tab.label}</span>
                      {tab.badge && (
                        <span
                          className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                            isActive
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "bg-slate-800 text-slate-400"
                          }`}
                        >
                          {tab.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Active Tab View */}
            {activeTab === "overview" && (
              <OverviewTab
                parsed={parsed}
                audit={audit}
                primaryRole={prediction.primaryRole}
              />
            )}

            {activeTab === "skills" && (
              <SkillsTab
                parsed={parsed}
                rankedRoles={prediction.rankedRoles}
              />
            )}

            {activeTab === "matcher" && (
              <JobMatcherTab parsed={parsed} />
            )}

            {activeTab === "optimizer" && (
              <BulletOptimizerTab parsed={parsed} />
            )}

            {activeTab === "office" && (
              <RecruiterOfficeTab
                parsed={parsed}
                audit={audit}
                primaryRole={prediction.primaryRole}
              />
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            ResuMatch AI &mdash; Enterprise Machine Learning Resume Analyzer & ATS Intelligence.
          </p>
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/jitendradurgaprasad/AI_Resume_Analyzer"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white flex items-center gap-1 transition"
            >
              <span>GitHub Repository</span>
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </footer>

      {/* Optional Gemini AI Modal */}
      {parsed && (
        <GeminiModal
          isOpen={geminiModalOpen}
          onClose={() => setGeminiModalOpen(false)}
          resumeText={currentText}
          targetRole={prediction?.primaryRole.role.title}
        />
      )}
    </div>
  );
}
