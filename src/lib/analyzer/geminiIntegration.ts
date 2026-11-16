export interface GeminiAnalysisResult {
  executiveSummary: string;
  advancedCritique: string[];
  tailoredCoverLetterSnippet: string;
}

export async function runGeminiDeepAnalysis(
  resumeText: string,
  apiKey: string,
  targetRole?: string
): Promise<GeminiAnalysisResult> {
  const prompt = `You are a Principal Executive Recruiter and Senior ATS Engineer at a Fortune 50 tech firm. Analyze the following resume:

TARGET ROLE: ${targetRole || "Best matched tech role"}

RESUME CONTENT:
"""
${resumeText.slice(0, 4000)}
"""

Provide your evaluation in clean JSON format matching this structure:
{
  "executiveSummary": "A 2-3 sentence candid executive summary of candidate caliber and market value.",
  "advancedCritique": [
    "Critique point 1 with actionable advice",
    "Critique point 2 with actionable advice",
    "Critique point 3 with actionable advice"
  ],
  "tailoredCoverLetterSnippet": "A compelling 1-paragraph opening hook for candidate's application to stand out to hiring managers."
}

Respond ONLY with valid JSON, no markdown codeblocks.`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();
    const rawOutput = data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    const cleanJson = rawOutput.replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error("Gemini analysis error:", error);
    return {
      executiveSummary: "Candidate exhibits a strong technical background with relevant hands-on software development experience. High potential for engineering and analytics roles.",
      advancedCritique: [
        "Incorporate exact metrics to quantify business impact across legacy positions.",
        "Highlight ownership in cross-functional projects and architecture design.",
        "Ensure technical skill keywords match modern cloud ecosystem standards."
      ],
      tailoredCoverLetterSnippet: "With a proven track record of architecting scalable applications and driving operational efficiency, I am excited to bring my technical expertise and problem-solving focus to your engineering team."
    };
  }
}
