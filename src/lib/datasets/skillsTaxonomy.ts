export interface SkillCategory {
  name: string;
  category: string;
  aliases?: string[];
  weight: number;
}

export const SKILLS_TAXONOMY: Record<string, string[]> = {
  programmingLanguages: [
    "JavaScript", "TypeScript", "Python", "Java", "C++", "C#", "Go", "Golang",
    "Rust", "Ruby", "PHP", "Swift", "Kotlin", "Scala", "R", "SQL", "Bash",
    "Shell", "Dart", "Perl", "Elixir", "Haskell", "C", "Objective-C", "MATLAB",
    "Groovy", "Julia", "Solidity", "Assembly", "Lua"
  ],
  frontend: [
    "React", "React.js", "Next.js", "Vue", "Vue.js", "Nuxt.js", "Angular", "Svelte",
    "SvelteKit", "HTML", "HTML5", "CSS", "CSS3", "Tailwind CSS", "TailwindCSS",
    "Sass", "SCSS", "Bootstrap", "Redux", "Redux Toolkit", "Zustand", "MobX",
    "Webpack", "Vite", "Babel", "GraphQL", "Apollo Client", "WebSockets", "Socket.io",
    "Three.js", "WebGL", "Canvas API", "Responsive Web Design", "Progressive Web Apps",
    "PWA", "Storybook", "Framer Motion", "Material UI", "Chakra UI", "Ant Design",
    "Shadcn UI", "Accessibility", "WCAG", "Web Vitals", "SEO"
  ],
  backend: [
    "Node.js", "Express", "Express.js", "NestJS", "Fastify", "Django", "Django REST Framework",
    "FastAPI", "Flask", "Spring Boot", "Spring MVC", "Hibernate", "ASP.NET Core",
    ".NET Core", "Ruby on Rails", "Laravel", "Koa", "Fiber", "Gin", "Microservices",
    "RESTful API", "REST API", "gRPC", "Protobuf", "GraphQL API", "Apache Kafka",
    "RabbitMQ", "Celery", "BullMQ", "Event-Driven Architecture", "API Gateway",
    "OAuth 2.0", "OpenID Connect", "JWT", "Session Management", "Webhooks", "SSE",
    "Message Queues", "RPC"
  ],
  databases: [
    "PostgreSQL", "Postgres", "MySQL", "MongoDB", "Redis", "SQLite", "DynamoDB",
    "Cassandra", "Elasticsearch", "OpenSearch", "Supabase", "Firebase", "Prisma",
    "Prisma ORM", "TypeORM", "Mongoose", "SQLAlchemy", "Sequelize", "Snowflake",
    "BigQuery", "Amazon Redshift", "ClickHouse", "Neo4j", "Graph Database", "Vector Database",
    "Pinecone", "Milvus", "ChromaDB", "Weaviate", "Qdrant", "CouchDB", "MariaDB",
    "Database Indexing", "Query Optimization", "Database Replication", "Sharding"
  ],
  cloudDevops: [
    "Amazon Web Services", "AWS", "Google Cloud Platform", "GCP", "Microsoft Azure", "Azure",
    "Docker", "Containerization", "Kubernetes", "K8s", "Helm", "Terraform", "Infrastructure as Code",
    "IaC", "Ansible", "CI/CD", "Continuous Integration", "Continuous Deployment",
    "GitHub Actions", "GitLab CI", "Jenkins", "CircleCI", "ArgoCD", "Prometheus",
    "Grafana", "Datadog", "New Relic", "ELK Stack", "Nginx", "Apache", "Cloudflare",
    "Linux", "Ubuntu", "Debian", "CentOS", "AWS Lambda", "Serverless", "Amazon S3",
    "Amazon EC2", "Amazon ECS", "Amazon EKS", "CloudWatch", "CloudFormation",
    "Vercel", "Netlify", "Heroku"
  ],
  aiMlData: [
    "Machine Learning", "Deep Learning", "Artificial Intelligence", "AI", "Natural Language Processing",
    "NLP", "Computer Vision", "LLMs", "Large Language Models", "Generative AI", "GenAI",
    "PyTorch", "TensorFlow", "Keras", "Scikit-Learn", "Pandas", "NumPy", "SciPy",
    "Hugging Face", "Transformers", "BERT", "GPT", "LangChain", "LlamaIndex",
    "Retrieval Augmented Generation", "RAG", "Prompt Engineering", "Fine-Tuning",
    "OpenCV", "YOLO", "XGBoost", "LightGBM", "CatBoost", "Random Forest",
    "Reinforcement Learning", "Neural Networks", "CNN", "RNN", "LSTM", "A/B Testing",
    "Feature Engineering", "Data Preprocessing", "Model Evaluation", "MLOps",
    "MLflow", "Weights & Biases", "Wandb", "Data Pipelines", "Apache Spark",
    "PySpark", "Apache Airflow", "dbt", "Data Modeling", "ETL", "ELT"
  ],
  mobile: [
    "React Native", "Flutter", "iOS Development", "Android Development", "Swift",
    "SwiftUI", "Kotlin", "Jetpack Compose", "Expo", "Mobile UI", "App Store Submission",
    "Google Play Console", "Push Notifications", "Core Data", "Room Database"
  ],
  cybersecurity: [
    "Cybersecurity", "Penetration Testing", "Pen Testing", "Ethical Hacking", "OWASP Top 10",
    "Vulnerability Assessment", "SIEM", "SOC", "Incident Response", "Cryptography",
    "Network Security", "Firewalls", "Identity and Access Management", "IAM", "Zero Trust",
    "Compliance", "SOC 2", "HIPAA", "GDPR", "ISO 27001", "Wireshark", "Burp Suite",
    "Metasploit", "NIST Framework", "AppSec", "Threat Modeling"
  ],
  testingQuality: [
    "Jest", "Vitest", "Cypress", "Playwright", "Selenium", "Mocha", "Chai",
    "Unit Testing", "Integration Testing", "End-to-End Testing", "E2E Testing",
    "Test Driven Development", "TDD", "Behavior Driven Development", "BDD",
    "Postman", "K6", "Load Testing", "Performance Testing", "Automated QA"
  ],
  businessAnalytics: [
    "Data Analysis", "Business Intelligence", "BI", "Tableau", "Power BI",
    "Looker", "Google Analytics", "Google Tag Manager", "Excel", "Advanced Excel",
    "Financial Modeling", "KPI Dashboards", "Statistical Analysis", "Cohort Analysis",
    "Market Research", "Predictive Analytics", "Data Storytelling"
  ],
  projectManagement: [
    "Agile", "Scrum", "Kanban", "JIRA", "Confluence", "Asana", "Trello", "Sprint Planning",
    "Product Management", "Product Roadmapping", "User Stories", "Stakeholder Management",
    "Cross-functional Collaboration", "Release Management", "Scrum Master", "PMP", "OKRs"
  ],
  softSkills: [
    "Leadership", "Communication", "Problem Solving", "Critical Thinking",
    "Teamwork", "Collaboration", "Mentorship", "Public Speaking", "Negotiation",
    "Time Management", "Adaptability", "Conflict Resolution", "Analytical Thinking",
    "Decision Making", "Active Listening", "Work Ethic", "Client Facing"
  ]
};

// Aliases mapping for normalized matching
export const SKILL_ALIASES: Record<string, string> = {
  "js": "JavaScript",
  "ts": "TypeScript",
  "py": "Python",
  "reactjs": "React",
  "react.js": "React",
  "nextjs": "Next.js",
  "next.js": "Next.js",
  "vuejs": "Vue",
  "vue.js": "Vue",
  "angularjs": "Angular",
  "node": "Node.js",
  "nodejs": "Node.js",
  "expressjs": "Express",
  "postgres": "PostgreSQL",
  "postgresql": "PostgreSQL",
  "mongo": "MongoDB",
  "k8s": "Kubernetes",
  "kube": "Kubernetes",
  "docker container": "Docker",
  "tf": "TensorFlow",
  "torch": "PyTorch",
  "sklearn": "Scikit-Learn",
  "scikit learn": "Scikit-Learn",
  "ml": "Machine Learning",
  "dl": "Deep Learning",
  "genai": "Generative AI",
  "rag": "Retrieval Augmented Generation",
  "ci cd": "CI/CD",
  "cicd": "CI/CD",
  "gcp": "Google Cloud Platform",
  "aws": "Amazon Web Services",
  "rest": "RESTful API",
  "rest api": "RESTful API",
  "rest apis": "RESTful API",
  "tailwind": "Tailwind CSS",
  "tailwindcss": "Tailwind CSS",
  "powerbi": "Power BI"
};

// High-impact action verbs that recruiters & ATS look for
export const STRONG_ACTION_VERBS = [
  "architected", "spearheaded", "engineered", "designed", "developed", "implemented",
  "optimized", "accelerated", "scaled", "orchestrated", "automated", "streamlined",
  "transformed", "revolutionized", "championed", "pioneered", "delivered", "executed",
  "boosted", "maximized", "curated", "mentored", "directed", "formulated", "secured",
  "consolidated", "modernized", "enhanced", "reduced", "surpassed", "outperformed",
  "standardized", "debugged", "refactored", "integrated", "launched", "generated"
];

// Weak verbs that reduce ATS and recruiter engagement
export const WEAK_PASSIVE_VERBS = [
  "helped", "assisted", "worked on", "handled", "was responsible for", "responsible for",
  "participated in", "aided", "tried to", "contributed to", "involved in", "did",
  "looked after", "attempted", "dealt with", "supported", "monitored"
];

// Overused buzzwords to flag
export const CLICHE_BUZZWORDS = [
  "go-getter", "hard worker", "team player", "think outside the box", "detail-oriented",
  "synergy", "dynamic", "self-starter", "results-driven", "fast-paced environment",
  "seasoned professional", "guru", "rockstar", "ninja", "wear many hats"
];
