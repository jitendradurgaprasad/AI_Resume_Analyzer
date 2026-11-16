"use client";

import React, { useRef, useState } from "react";
import { UploadCloud, FileText, CheckCircle2, AlertCircle, Loader2, ArrowRight } from "lucide-react";
import { extractTextFromFile } from "../lib/analyzer/textExtractor";
import { SAMPLE_RESUMES } from "../lib/datasets/jobRoles";
import { parseResumeText } from "../lib/analyzer/sectionParser";
import { computeATSScore } from "../lib/analyzer/scoringEngine";
import { predictJobRoles } from "../lib/analyzer/rolePredictor";
import { saveAnalysis } from "../lib/storage/resumeStore";

interface ResumeUploaderProps {
  onAnalysisComplete: () => void;
}

export const ResumeUploader: React.FC<ResumeUploaderProps> = ({
  onAnalysisComplete,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState("");
  const [pasteMode, setPasteMode] = useState(false);
  const [pastedText, setPastedText] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await processFile(e.target.files[0]);
    }
  };

  const processFile = async (file: File) => {
    setErrorMessage(null);
    setIsProcessing(true);
    setProcessingStatus("Extracting resume content...");

    try {
      const text = await extractTextFromFile(file);
      if (!text || text.trim().length < 40) {
        setErrorMessage("Could not read enough textual content from this file. Please paste your resume text instead.");
        setIsProcessing(false);
        return;
      }

      runAnalysis(text, file.name);
    } catch (err) {
      console.error(err);
      setErrorMessage("Error reading file. Please try pasting the text directly.");
      setIsProcessing(false);
    }
  };

  const handlePastedSubmit = () => {
    if (!pastedText.trim() || pastedText.trim().length < 40) {
      setErrorMessage("Please paste at least 40 characters of resume content.");
      return;
    }
    setErrorMessage(null);
    setIsProcessing(true);
    setProcessingStatus("Analyzing pasted resume text...");
    runAnalysis(pastedText.trim(), "Pasted Resume");
  };

  const handleSampleSelect = (sampleId: string) => {
    const sample = SAMPLE_RESUMES.find((s) => s.id === sampleId);
    if (sample) {
      setIsProcessing(true);
      setProcessingStatus(`Loading ${sample.title.split("(")[0]}...`);
      runAnalysis(sample.text, `${sample.role}.txt`);
    }
  };

  const runAnalysis = (rawText: string, fileName?: string) => {
    try {
      setProcessingStatus("Running ATS audit & taxonomy matching...");
      const parsed = parseResumeText(rawText);
      const audit = computeATSScore(parsed);
      const prediction = predictJobRoles(parsed);

      // Save to sessionStorage
      saveAnalysis({
        rawText,
        fileName,
        parsed,
        audit,
        prediction,
        timestamp: Date.now(),
      });

      // Complete and notify parent to navigate to /results
      setTimeout(() => {
        setIsProcessing(false);
        onAnalysisComplete();
      }, 400);
    } catch (err) {
      console.error("Analysis failed:", err);
      setErrorMessage("Analysis calculation encountered an error. Please check formatting and retry.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
      {/* Header of Upload Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Upload Resume
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Supports PDF, DOCX, and TXT files. Client-side parsed.
          </p>
        </div>

        {/* Upload Mode Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-medium self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setPasteMode(false)}
            className={`px-3 py-1.5 rounded-lg transition ${
              !pasteMode
                ? "bg-white text-slate-900 shadow-sm font-semibold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Upload File
          </button>
          <button
            type="button"
            onClick={() => setPasteMode(true)}
            className={`px-3 py-1.5 rounded-lg transition ${
              pasteMode
                ? "bg-white text-slate-900 shadow-sm font-semibold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Paste Text
          </button>
        </div>
      </div>

      {errorMessage && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Main Drag & Drop Box */}
      {!pasteMode ? (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => !isProcessing && fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-8 sm:p-12 text-center cursor-pointer transition ${
            dragActive
              ? "border-slate-900 bg-slate-50"
              : "border-slate-300 hover:border-slate-400 bg-slate-50/50 hover:bg-slate-50"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,.txt"
            onChange={handleFileChange}
            className="hidden"
            disabled={isProcessing}
          />

          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="h-12 w-12 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-700">
              {isProcessing ? (
                <Loader2 className="h-6 w-6 animate-spin text-slate-900" />
              ) : (
                <UploadCloud className="h-6 w-6" />
              )}
            </div>

            {isProcessing ? (
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {processingStatus}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Parsing sections, computing metrics, and preparing your report...
                </p>
              </div>
            ) : (
              <div>
                <p className="text-sm font-medium text-slate-900">
                  <span className="font-semibold underline underline-offset-2">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  PDF, DOCX, or plain text (up to 10MB)
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <textarea
            rows={8}
            value={pastedText}
            onChange={(e) => setPastedText(e.target.value)}
            disabled={isProcessing}
            placeholder="Paste your complete resume text here (Summary, Work Experience, Skills, Education)..."
            className="w-full bg-slate-50 border border-slate-300 rounded-xl p-4 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 font-sans"
          />

          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500">
              {pastedText.split(/\s+/).filter(Boolean).length} words
            </span>

            <button
              onClick={handlePastedSubmit}
              disabled={isProcessing || !pastedText.trim()}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-medium text-xs rounded-xl transition flex items-center gap-2 shadow-sm"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>Analyze Resume</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Quick Test Samples */}
      <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <span className="text-slate-500 font-medium">Or test instantly with a sample profile:</span>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => handleSampleSelect("software-engineer")}
            disabled={isProcessing}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition"
          >
            Senior Full Stack
          </button>
          <button
            type="button"
            onClick={() => handleSampleSelect("data-scientist")}
            disabled={isProcessing}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition"
          >
            Machine Learning Engineer
          </button>
          <button
            type="button"
            onClick={() => handleSampleSelect("weak-resume")}
            disabled={isProcessing}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition"
          >
            Junior (Needs Improvement)
          </button>
        </div>
      </div>
    </div>
  );
};
