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
  size = 180,
}) => {
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const arcLength = circumference * 0.75;
  const strokeDashoffset = arcLength - (score / 100) * arcLength;

  let strokeColor = "#10b981"; // emerald
  let textColor = "text-emerald-600";
  let tierBadgeBg = "bg-emerald-50 text-emerald-700 border-emerald-200";

  if (score < 55) {
    strokeColor = "#ef4444"; // red
    textColor = "text-red-600";
    tierBadgeBg = "bg-red-50 text-red-700 border-red-200";
  } else if (score < 75) {
    strokeColor = "#f59e0b"; // amber
    textColor = "text-amber-600";
    tierBadgeBg = "bg-amber-50 text-amber-700 border-amber-200";
  } else if (score < 88) {
    strokeColor = "#2563eb"; // blue
    textColor = "text-blue-600";
    tierBadgeBg = "bg-blue-50 text-blue-700 border-blue-200";
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative" style={{ width: size, height: size * 0.82 }}>
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
            stroke="#e2e8f0"
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
              transition: "stroke-dashoffset 0.8s ease-in-out",
            }}
          />
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
          <span className={`text-4xl font-extrabold tracking-tight ${textColor}`}>
            {score}
          </span>
          <span className="text-[11px] font-semibold text-slate-500 uppercase mt-0.5">
            ATS Score
          </span>
          <div className="mt-1">
            <span className="text-xs font-bold text-slate-800 px-2 py-0.5 bg-slate-100 rounded border border-slate-200">
              Grade: {grade}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-2">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium border ${tierBadgeBg}`}
        >
          {tier} Tier
        </span>
      </div>
    </div>
  );
};
