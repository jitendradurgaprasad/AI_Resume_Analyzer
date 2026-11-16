"use client";

import React from "react";

interface ScoreGaugeProps {
  score: number;
  grade: string;
  tier: string;
  size?: number;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({
  score,
  grade,
  tier,
  size = 200,
}) => {
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // Semi-circle/three-quarter arc (270 degrees)
  const arcLength = circumference * 0.75;
  const strokeDashoffset = arcLength - (score / 100) * arcLength;

  let strokeColor = "#10b981"; // emerald
  let textColor = "text-emerald-400";
  let tierBadgeBg = "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";

  if (score < 55) {
    strokeColor = "#ef4444"; // red
    textColor = "text-red-400";
    tierBadgeBg = "bg-red-500/10 text-red-400 border-red-500/30";
  } else if (score < 75) {
    strokeColor = "#f59e0b"; // amber
    textColor = "text-amber-400";
    tierBadgeBg = "bg-amber-500/10 text-amber-400 border-amber-500/30";
  } else if (score < 88) {
    strokeColor = "#3b82f6"; // blue
    textColor = "text-blue-400";
    tierBadgeBg = "bg-blue-500/10 text-blue-400 border-blue-500/30";
  }

  return (
    <div className="flex flex-col items-center justify-center relative">
      <div className="relative" style={{ width: size, height: size * 0.85 }}>
        <svg
          width={size}
          height={size}
          className="transform -rotate-[135deg]"
          style={{ overflow: "visible" }}
        >
          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#1e293b"
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeLinecap="round"
          />

          {/* Value Arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              transition: "stroke-dashoffset 1s ease-in-out, stroke 0.5s ease",
            }}
          />
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
          <span className={`text-5xl font-black tracking-tight ${textColor}`}>
            {score}
          </span>
          <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase mt-0.5">
            ATS Score / 100
          </span>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="text-sm font-bold text-white px-2 py-0.5 bg-slate-800 rounded border border-slate-700">
              Grade: {grade}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-1">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium border ${tierBadgeBg}`}
        >
          {tier} Candidate Tier
        </span>
      </div>
    </div>
  );
};
