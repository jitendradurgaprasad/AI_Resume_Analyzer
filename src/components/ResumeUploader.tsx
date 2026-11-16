"use client";

import React, { useRef, useState } from "react";
import { UploadCloud, FileText, Clipboard, AlertCircle, Sparkles } from "lucide-react";
import { extractTextFromFile } from "../lib/analyzer/textExtractor";
import { SAMPLE_RESUMES } from "../lib/datasets/jobRoles";

interface ResumeUploaderProps {
  onTextLoaded: (text: string, fileName?: string) => void;
  isLoading: boolean;
}

export const ResumeUploader: React.FC<ResumeUploaderProps> = ({
  onTextLoaded,
  isLoading,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [pasteMode, setPasteMode] = useState(false);
  const [pastedText, setPastedText] = useState("");
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [currentFileName, setCurrentFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await processFile(e.target.files[0]);
    }
  };

  const processFile = async (file: File) => {
    setUploadError(null);
    try {
      setCurrentFileName(file.name);
      const text = await extractTextFromFile(file);
      if (!text || text.trim().length < 40) {
        setUploadError("Could not extract readable text from this file. Please paste your resume text directly.");
        return;
      }
      onTextLoaded(text, file.name);
    } catch (err: any) {
      console.error("File extraction error:", err);
      setUploadError("Failed to parse file. Please try pasting the resume text directly.");
    }
  };

  const handlePastedSubmit = () => {
    if (!pastedText.trim() || pastedText.trim().length < 40) {
      setUploadError("Please paste at least 40 characters of resume text.");
      return;
    }
    setUploadError(null);
    setCurrentFileName("Pasted Resume");
    onTextLoaded(pastedText.trim(), "Pasted Resume");
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
      {/* Background glow decoration */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FileText className="h-5 w-5 text-emerald-400" />
            Resume Ingestion & Analysis
          </h2>
          <p className="text-xs text-slate-400">
            Accepts PDF, DOCX, or Plain Text. Simulates enterprise ATS parsing and machine learning evaluation.
          </p>
        </div>

        {/* Toggle between Upload File vs Paste Text */}
        <div className="flex items-center bg-slate-800/80 p-1 rounded-xl border border-slate-700 text-xs font-medium">
          <button
            onClick={() => setPasteMode(false)}
            className={`px-3 py-1.5 rounded-lg transition ${
              !pasteMode
                ? "bg-emerald-500 text-slate-950 font-semibold shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Upload File
          </button>
          <button
            onClick={() => setPasteMode(true)}
            className={`px-3 py-1.5 rounded-lg transition ${
              pasteMode
                ? "bg-emerald-500 text-slate-950 font-semibold shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Paste Text
          </button>
        </div>
      </div>

      {uploadError && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{uploadError}</span>
        </div>
      )}

      {!pasteMode ? (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
            dragActive
              ? "border-emerald-500 bg-emerald-500/10 scale-[0.99]"
              : "border-slate-700/80 hover:border-emerald-500/50 hover:bg-slate-800/40 bg-slate-950/40"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,.txt,.md"
            onChange={handleChange}
            className="hidden"
          />

          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="h-14 w-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
              <UploadCloud className="h-7 w-7" />
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-200">
                {currentFileName ? (
                  <span className="text-emerald-400 font-medium">Loaded: {currentFileName}</span>
                ) : (
                  <>
                    <span className="text-emerald-400">Click to upload</span> or drag and drop
                  </>
                )}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                PDF, DOCX, TXT documents (Enterprise safe, client-side parsed)
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <textarea
            rows={7}
            value={pastedText}
            onChange={(e) => setPastedText(e.target.value)}
            placeholder="Paste your full resume text here (Summary, Work Experience, Skills, Education)..."
            className="w-full bg-slate-950/70 border border-slate-700 rounded-xl p-3.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono resize-y"
          />
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-500">
              {pastedText.split(/\s+/).filter(Boolean).length} words
            </span>
            <button
              onClick={handlePastedSubmit}
              disabled={isLoading || !pastedText.trim()}
              className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/20 transition flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4" />
              Analyze Resume Text
            </button>
          </div>
        </div>
      )}

      {/* Quick Demo Previews */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 flex-wrap gap-2">
        <span className="text-[11px] text-slate-500">Want to test instantly? Select a pre-loaded sample:</span>
        <div className="flex items-center gap-2">
          {SAMPLE_RESUMES.map((sample) => (
            <button
              key={sample.id}
              onClick={() => onTextLoaded(sample.text, `${sample.title}.txt`)}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-[11px] border border-slate-700/60 transition"
            >
              {sample.title.split("(")[0].trim()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
