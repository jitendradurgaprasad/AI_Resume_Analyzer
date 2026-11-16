# ResuMatch AI — Enterprise AI Resume Analyzer & ATS Intelligence Suite

![ResuMatch AI Badge](https://img.shields.io/badge/ATS_Engine-Enterprise_v2.4-10b981?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js_14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel_Live-000000?style=for-the-badge&logo=vercel&logoColor=white)

**Live Production App**: [https://ai-resume-analyzer-xi-ruby-67.vercel.app](https://ai-resume-analyzer-xi-ruby-67.vercel.app)

An advanced, enterprise-grade AI Resume Analyzer, Applicant Tracking System (ATS) simulator, and recruiter intelligence platform. Designed for candidates, hiring managers, and HR offices to evaluate resumes with high accuracy, uncover missing critical keywords, predict career trajectories, and generate interview guides.

---

## 🌟 Key Features

### 1. 🎯 Enterprise 5-Pillar ATS Scoring Engine (0 - 100)
- **Contact & Identity Verification**: Verifies email, phone, location, LinkedIn hyperlink, and portfolio/GitHub presence.
- **Section Parsing & Structure**: Detects standard industry sections (Experience, Education, Skills, Projects, Certifications).
- **Power Verbs Density**: Analyzes the ratio of leadership/action verbs (*Spearheaded, Architected, Engineered*) vs passive verbs (*helped, worked on*). Flags overused buzzwords (*hard worker, ninja*).
- **Quantifiable Impact & Metrics**: Identifies numerical data, percentages, latency improvements, and revenue metrics.
- **Skills Density & Breadth**: Classifies hard vs soft skills across multi-domain tech stacks.

### 2. 🧠 Machine Learning Taxonomy & Role Fit Predictor
- Pre-trained on **1,500+ enterprise technologies and competencies** spanning:
  - Programming Languages, Frontend, Backend, Databases & ORMs
  - Cloud Infrastructure (AWS, GCP, Azure, Kubernetes, Docker, Terraform)
  - AI / ML / Deep Learning / LLMs / MLOps
  - Cybersecurity, Automated QA, Agile, and Soft Skills.
- **Vector Space Matching**: Computes cosine similarity between candidate skill profiles and 25+ industry benchmark role profiles (Full Stack, ML Engineer, Data Scientist, Cloud Architect, DevOps, Product Manager, etc.) with fit confidence scores.

### 3. 💼 Target Job Description (JD) Gap Matcher
- Paste any target job description or choose from presets.
- Instantly extracts required skills from the job description and performs real-time gap analysis:
  - **Covered Keywords** (Green)
  - **Missing Critical Skills** (Red)
  - **STAR Keyword Injection Tips**: Generates copyable, contextual bullet points showing exactly how to phrase missing keywords naturally.

### 4. ⚡ STAR Method Bullet Point Enhancer
- Scans candidate resumes for weak, passive, or metric-less bullet points.
- Automatically generates high-impact STAR rewrites (Situation, Task, Action, Result) with power verbs and quantifiable outcome placeholders.

### 5. 🏢 Recruiter & HR Office Suite
- **Automated Interview Question Generator**: Generates custom technical deep-dive questions and behavioral STAR questions based on candidate claims.
- **Official ATS Audit PDF Export**: Generates a professional, print-ready PDF evaluation report for HR hiring committees and candidate dossiers.
- **Candidate Decision Matrix**: Generates hiring recommendations (Advance to Screen / Hold / Request More Info).

### 6. 🤖 Optional Gemini 1.5 Deep AI Critique
- Works 100% locally and offline out-of-the-box using the built-in ML taxonomy dataset.
- Supports optional Google Gemini API keys for deep qualitative executive summaries and bespoke cover letter pitches.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or 20.x+
- npm or yarn

### Installation & Local Run
```bash
# Clone the repository
git clone https://github.com/jitendradurgaprasad/AI_Resume_Analyzer.git
cd AI_Resume_Analyzer

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production
```bash
npm run build
npm run start
```

---

## 🌐 Deploy to Vercel

This repository is optimized for deployment on Vercel:

```bash
# Deploy with Vercel CLI
vercel --prod
```

Or connect the GitHub repository `jitendradurgaprasad/AI_Resume_Analyzer` in your Vercel Dashboard for automated continuous deployment.

---

## 📄 License
MIT License. Built for candidates and enterprise recruiting offices.
