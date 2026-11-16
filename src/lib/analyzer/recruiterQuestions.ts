import { ParsedResume } from "./sectionParser";
import { ATSAuditReport } from "./scoringEngine";

export interface InterviewQuestion {
  category: "Technical Deep-Dive" | "Behavioral & STAR" | "System Architecture" | "Gap Verification";
  question: string;
  context: string;
  whatRecruiterLooksFor: string;
}

export function generateRecruiterInterviewQuestions(
  parsed: ParsedResume,
  audit: ATSAuditReport
): InterviewQuestion[] {
  const questions: InterviewQuestion[] = [];
  const topSkills = parsed.extractedSkills.slice(0, 4).map((s) => s.name);

  // 1. Technical Deep-Dive based on top skill
  if (topSkills.length > 0) {
    const primarySkill = topSkills[0];
    questions.push({
      category: "Technical Deep-Dive",
      question: `In your resume, you highlight significant work with ${primarySkill}. Could you walk me through the most complex challenge you solved using ${primarySkill} and how you debugged or optimized it?`,
      context: `Candidate demonstrates high proficiency in ${primarySkill} across their experience.`,
      whatRecruiterLooksFor: `Clear explanation of trade-offs, internal mechanics, performance considerations, and real-world debugging.`,
    });
  }

  // 2. Metric / Impact behavioral question
  if (parsed.quantifiableExamples.length > 0) {
    const sample = parsed.quantifiableExamples[0];
    questions.push({
      category: "Behavioral & STAR",
      question: `You noted that you "${sample.slice(0, 80)}...". How did you define the baseline metric, what specific actions did you take, and how did you verify the final outcome?`,
      context: `Verifying ownership and methodology behind candidate's quantified claims.`,
      whatRecruiterLooksFor: `Ability to articulate individual contribution versus team accomplishments, and rigorous measurement metrics.`,
    });
  } else {
    questions.push({
      category: "Behavioral & STAR",
      question: `Can you describe a major project where you were tasked with improving system performance or user experience? What measurable metrics did you track?`,
      context: `Resume lacked numerical metrics, so probing for quantitative business awareness.`,
      whatRecruiterLooksFor: `Data-driven mindset and accountability for business outcomes.`,
    });
  }

  // 3. System Architecture / Microservices
  if (topSkills.length > 1) {
    const skillA = topSkills[0];
    const skillB = topSkills[1];
    questions.push({
      category: "System Architecture",
      question: `When integrating ${skillA} with ${skillB}, how did you ensure fault tolerance, scalability, and clean data contracts across components?`,
      context: `Evaluating candidates' high-level architectural reasoning and integration standards.`,
      whatRecruiterLooksFor: `Understanding of caching, latency bottlenecks, failure recovery, and decoupling.`,
    });
  }

  // 4. Gap / Red-flag verification question
  if (audit.redFlags.length > 0) {
    questions.push({
      category: "Gap Verification",
      question: `If asked to rapidly onboard into a production codebase with minimal documentation, what is your 30-60-90 day playbook for delivering high-impact features safely?`,
      context: `Assessing resilience, self-sufficiency, and engineering discipline.`,
      whatRecruiterLooksFor: `Structured discovery process, documentation habits, testing rigor, and cross-team communication.`,
    });
  }

  return questions;
}
