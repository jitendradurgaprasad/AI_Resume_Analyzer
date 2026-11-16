export interface JobRoleBenchmark {
  id: string;
  title: string;
  category: string;
  description: string;
  coreSkills: string[];
  secondarySkills: string[];
  expectedImpactKeywords: string[];
  averageExperienceYears: number;
}

export const BENCHMARK_JOB_ROLES: JobRoleBenchmark[] = [
  {
    id: "full-stack-engineer",
    title: "Full Stack Software Engineer",
    category: "Software Engineering",
    description: "Designs, develops, and maintains end-to-end web applications across client-side, server-side, and databases.",
    coreSkills: ["React", "Node.js", "TypeScript", "JavaScript", "PostgreSQL", "RESTful API", "HTML5", "CSS3", "Git"],
    secondarySkills: ["Next.js", "Docker", "AWS", "GraphQL", "Redis", "CI/CD", "Tailwind CSS", "Jest", "Microservices"],
    expectedImpactKeywords: ["latency", "scaled", "architected", "users", "throughput", "reliability", "automated"],
    averageExperienceYears: 3
  },
  {
    id: "machine-learning-engineer",
    title: "Machine Learning / AI Engineer",
    category: "Data Science & AI",
    description: "Researches, trains, optimizes, and deploys scalable machine learning and deep learning models into production.",
    coreSkills: ["Python", "Machine Learning", "PyTorch", "TensorFlow", "Scikit-Learn", "Deep Learning", "Pandas", "NumPy"],
    secondarySkills: ["NLP", "Computer Vision", "Docker", "AWS", "MLOps", "MLflow", "FastAPI", "Transformers", "RAG", "LLMs"],
    expectedImpactKeywords: ["accuracy", "F1-score", "inference time", "latency", "pipeline", "fine-tuning", "loss reduction"],
    averageExperienceYears: 3
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    category: "Data Science & AI",
    description: "Extracts actionable business insights, creates predictive statistical models, and performs exploratory data analysis.",
    coreSkills: ["Python", "SQL", "Pandas", "Machine Learning", "Data Analysis", "NumPy", "Scikit-Learn", "Statistical Analysis"],
    secondarySkills: ["Tableau", "Power BI", "A/B Testing", "R", "Deep Learning", "Feature Engineering", "Data Modeling", "BigQuery"],
    expectedImpactKeywords: ["revenue", "conversion rate", "predictive model", "ROI", "statistical significance", "insights"],
    averageExperienceYears: 3
  },
  {
    id: "frontend-developer",
    title: "Frontend Engineer / UI Developer",
    category: "Software Engineering",
    description: "Crafts engaging, accessible, and high-performance client-side interfaces and responsive user experiences.",
    coreSkills: ["React", "JavaScript", "TypeScript", "HTML5", "CSS3", "Tailwind CSS", "Responsive Web Design"],
    secondarySkills: ["Next.js", "Redux", "Web Vitals", "Jest", "Cypress", "GraphQL", "Framer Motion", "Webpack", "Vite"],
    expectedImpactKeywords: ["page load time", "Lighthouse score", "conversion", "accessibility", "user retention", "UI component library"],
    averageExperienceYears: 2
  },
  {
    id: "backend-developer",
    title: "Backend Engineer / API Developer",
    category: "Software Engineering",
    description: "Engineers high-throughput backend services, distributed systems, resilient microservices, and databases.",
    coreSkills: ["Node.js", "Python", "Java", "PostgreSQL", "RESTful API", "Go", "Docker", "Microservices"],
    secondarySkills: ["Redis", "RabbitMQ", "Apache Kafka", "gRPC", "AWS", "Kubernetes", "MongoDB", "SQLAlchemy", "Spring Boot"],
    expectedImpactKeywords: ["throughput", "QPS", "latency", "scalability", "99.99% uptime", "concurrency", "caching"],
    averageExperienceYears: 3
  },
  {
    id: "devops-cloud-engineer",
    title: "DevOps & Cloud Infrastructure Engineer / SRE",
    category: "Cloud & Infrastructure",
    description: "Automates CI/CD pipelines, provisions infrastructure as code, and maintains enterprise high availability.",
    coreSkills: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD", "Linux", "GitHub Actions", "Bash"],
    secondarySkills: ["Prometheus", "Grafana", "Ansible", "GCP", "Azure", "Python", "Nginx", "Helm", "CloudWatch", "ArgoCD"],
    expectedImpactKeywords: ["deployment frequency", "MTTR", "downtime", "infrastructure cost", "zero-downtime", "automation"],
    averageExperienceYears: 4
  },
  {
    id: "data-engineer",
    title: "Data Engineer",
    category: "Data Science & AI",
    description: "Constructs robust distributed data pipelines, ETL/ELT workflows, data warehouses, and streaming systems.",
    coreSkills: ["Python", "SQL", "Apache Spark", "Data Pipelines", "ETL", "PostgreSQL", "Snowflake", "Docker"],
    secondarySkills: ["Apache Airflow", "Kafka", "dbt", "BigQuery", "AWS", "PySpark", "Data Modeling", "Databricks"],
    expectedImpactKeywords: ["data throughput", "ETL latency", "pipeline reliability", "terabytes", "query cost", "data lake"],
    averageExperienceYears: 3
  },
  {
    id: "cybersecurity-analyst",
    title: "Cybersecurity Analyst / Information Security",
    category: "Cybersecurity",
    description: "Safeguards enterprise assets, executes vulnerability assessments, implements zero-trust architecture, and monitors threats.",
    coreSkills: ["Cybersecurity", "Network Security", "Vulnerability Assessment", "SIEM", "Incident Response", "Firewalls", "Linux"],
    secondarySkills: ["Penetration Testing", "OWASP Top 10", "SOC", "Identity and Access Management", "Wireshark", "Burp Suite", "SOC 2"],
    expectedImpactKeywords: ["incident resolution", "vulnerability remediation", "zero breaches", "compliance", "threat detection"],
    averageExperienceYears: 3
  },
  {
    id: "mobile-developer",
    title: "Mobile App Developer (iOS / Android / Flutter / React Native)",
    category: "Software Engineering",
    description: "Builds intuitive, cross-platform or native mobile applications for mobile devices.",
    coreSkills: ["React Native", "Flutter", "Swift", "Kotlin", "iOS Development", "Android Development", "TypeScript"],
    secondarySkills: ["SwiftUI", "Jetpack Compose", "Expo", "RESTful API", "Firebase", "App Store Submission", "Push Notifications"],
    expectedImpactKeywords: ["app downloads", "crash rate", "App Store rating", "frame rate", "battery consumption", "offline mode"],
    averageExperienceYears: 3
  },
  {
    id: "product-manager",
    title: "Technical Product Manager",
    category: "Product & Management",
    description: "Bridges user needs, business strategy, and engineering to deliver high-impact digital software products.",
    coreSkills: ["Product Management", "Agile", "Scrum", "Product Roadmapping", "Stakeholder Management", "Data Analysis", "JIRA"],
    secondarySkills: ["User Stories", "Sprint Planning", "A/B Testing", "Market Research", "KPI Dashboards", "Figma", "OKRs"],
    expectedImpactKeywords: ["revenue growth", "user adoption", "churn reduction", "NPS", "launch cycle", "cross-functional"],
    averageExperienceYears: 4
  },
  {
    id: "qa-automation-engineer",
    title: "QA Automation Engineer / SDET",
    category: "Testing & Quality",
    description: "Builds comprehensive automated test suites, end-to-end testing frameworks, and ensures software reliability.",
    coreSkills: ["Selenium", "Cypress", "Playwright", "Jest", "JavaScript", "Python", "CI/CD", "Automated QA"],
    secondarySkills: ["Postman", "Unit Testing", "Integration Testing", "Load Testing", "K6", "JIRA", "Docker"],
    expectedImpactKeywords: ["test coverage", "bug escape rate", "regression time", "test flakiness", "CI pipeline speed"],
    averageExperienceYears: 3
  },
  {
    id: "ui-ux-designer",
    title: "UI/UX Product Designer",
    category: "Design & Creative",
    description: "Designs empathetic user journeys, wireframes, prototypes, design systems, and engaging visual interfaces.",
    coreSkills: ["Figma", "User Research", "Wireframing", "Prototyping", "Responsive Web Design", "Design Systems"],
    secondarySkills: ["HTML5", "CSS3", "Usability Testing", "Accessibility", "Information Architecture", "Storybook"],
    expectedImpactKeywords: ["conversion rate", "task completion rate", "user satisfaction", "design consistency", "SUS score"],
    averageExperienceYears: 3
  }
];

export const SAMPLE_RESUMES = [
  {
    id: "software-engineer",
    title: "Senior Full Stack Engineer (High ATS)",
    role: "Full Stack Software Engineer",
    text: `ALEXANDER WRIGHT
San Francisco, CA | (555) 382-9102 | alex.wright@email.com | linkedin.com/in/alexander-wright | github.com/alexwright

PROFESSIONAL SUMMARY
Results-driven Senior Full Stack Engineer with 5+ years of experience designing scalable distributed web architectures, high-throughput microservices, and modern frontend platforms. Proven track record of improving system latency by 42% and driving 99.99% system availability serving 2M+ active users.

CORE COMPETENCIES & TECHNICAL SKILLS
- Programming Languages: TypeScript, JavaScript, Python, Go, SQL, HTML5, CSS3
- Frontend: React, Next.js, Redux Toolkit, Tailwind CSS, WebSockets, Web Vitals, Responsive Design
- Backend & Cloud: Node.js, Express, NestJS, PostgreSQL, Redis, Docker, Kubernetes, AWS (EC2, S3, Lambda), Terraform, CI/CD, GitHub Actions
- Architecture & Practices: Microservices, RESTful API, gRPC, Event-Driven Architecture, Jest, Cypress, TDD, Agile/Scrum

PROFESSIONAL EXPERIENCE

STRIPE HORIZON | San Francisco, CA
Senior Full Stack Engineer | May 2022 - Present
- Architected and deployed a multi-tenant payment reconciliation engine using Node.js, TypeScript, and PostgreSQL, processing over $14M in monthly transactions.
- Spearheaded the frontend modernization of the core customer dashboard using Next.js and Tailwind CSS, reducing initial page load time by 48% and boosting Lighthouse score from 62 to 98.
- Orchestrated containerized deployment pipelines using Docker, Kubernetes, and AWS ECS, cutting production deployment time from 45 minutes to 7 minutes with zero downtime.
- Engineered Redis caching layer that reduced database query load by 60% and improved peak API response times by 120ms.
- Mentored a cohort of 6 junior engineers through weekly technical code reviews and instituted automated test standards that increased test coverage from 68% to 92%.

NEXUS SYSTEMS | San Jose, CA
Software Engineer | June 2019 - April 2022
- Developed RESTful APIs and real-time collaborative workspace features using React, Node.js, and WebSockets for 450,000 daily active enterprise users.
- Optimized slow SQL queries and created composite indexes in PostgreSQL, reducing 95th percentile query latency by 35%.
- Implemented robust end-to-end automated test suites using Jest and Cypress within GitHub Actions CI/CD workflows, eliminating 80% of regression bugs before staging.
- Collaborated closely with cross-functional product managers and UI/UX designers across 2-week agile sprints to ship 14 major feature releases ahead of schedule.

EDUCATION
University of California, Berkeley
Bachelor of Science in Computer Science | Graduated May 2019
GPA: 3.8 / 4.0 | Dean's Honor List

CERTIFICATIONS
- AWS Certified Solutions Architect - Associate (Amazon Web Services, 2023)
- Certified Kubernetes Administrator (CKA, The Linux Foundation, 2022)`
  },
  {
    id: "data-scientist",
    title: "AI / Data Science Practitioner",
    role: "Machine Learning / AI Engineer",
    text: `PRIYA SHARMA
Austin, TX | (555) 782-3921 | priya.sharma.ml@email.com | linkedin.com/in/priya-sharma-ai | github.com/priyasharma-ml

PROFESSIONAL SUMMARY
Machine Learning Engineer with 4 years of expertise in NLP, predictive analytics, Deep Learning architectures, and automated MLOps pipelines. Successfully built and scaled production LLM retrieval-augmented generation (RAG) models reducing document search latency by 65%.

TECHNICAL SKILLS
- Languages: Python, SQL, R, Bash
- AI / ML / DL: PyTorch, TensorFlow, Scikit-Learn, Hugging Face, Transformers, Pandas, NumPy, OpenCV, XGBoost, LangChain
- MLOps & Tools: Docker, MLflow, FastAPI, AWS SageMaker, Git, PostgreSQL, Pinecone, Weights & Biases
- Concepts: Natural Language Processing, Computer Vision, Feature Engineering, A/B Testing, Model Evaluation

PROFESSIONAL EXPERIENCE

COGNITIVE AI LABS | Austin, TX
Machine Learning Engineer | July 2021 - Present
- Engineered an enterprise RAG knowledge retrieval system using Python, LangChain, Pinecone vector database, and open-source Hugging Face Transformers, decreasing customer question resolution time by 55%.
- Fine-tuned BERT and LLaMA models for multi-class entity extraction, achieving an F1-score of 94.2% across 1.2M unstructured clinical transcripts.
- Deployed asynchronous model inference endpoints using FastAPI, Docker, and AWS SageMaker, maintaining sub-80ms p99 latency under 800 QPS load.
- Automated data validation and model drift monitoring pipelines using MLflow and PostgreSQL, cutting model retraining turnaround from 2 weeks to 24 hours.

SYNAPSE ANALYTICS | Dallas, TX
Data Analyst / Junior Data Scientist | June 2019 - June 2021
- Built predictive churn classification models using Scikit-Learn and XGBoost, identifying at-risk accounts and saving $420,000 in annualized recurring revenue.
- Designed interactive executive dashboards in Tableau and optimized complex SQL queries across snowflake data warehouse tables containing 50M+ rows.
- Conducted 24 statistical A/B tests to optimize checkout funnel conversion rates, delivering a measured 3.4% lift in completed customer purchases.

EDUCATION
University of Texas at Austin
Master of Science in Data Science | 2019
Bachelor of Science in Statistics | 2017`
  },
  {
    id: "weak-resume",
    title: "Junior Developer (Needs Optimization)",
    role: "Junior Web Developer",
    text: `JOHN DOE
john@email.com | 123-456-7890

ABOUT ME
I am a hardworking and motivated team player looking for a challenging position in a fast-paced environment where I can grow my skills and help the team succeed.

SKILLS
HTML, CSS, JavaScript, React, Git, Teamwork, Hardworking, Fast Learner

WORK EXPERIENCE
Freelance Web Developer (2022 - 2023)
- Worked on websites for various local businesses.
- Responsible for updating content and fixing bugs.
- Helped make pages look better on phones.
- Talked to clients about their requirements.

Intern, Tech Solutions (2021 - 2022)
- Assisted senior developers with day to day tasks.
- Participated in team meetings.
- Handled basic bug fixes.

EDUCATION
State College
Bachelor of Arts in Computer Information Systems
Graduated 2021`
  }
];
