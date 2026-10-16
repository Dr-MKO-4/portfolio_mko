export const PROFILE = {
  fullName: "Georges Miguel MOUKOKO EKAMBI",
  email: "georgesmoukoko4@gmail.com",
  location: "Douala, Cameroun",
  cv: { fr: "/cv/CV_Georges-Miguel-MOUKOKO_FR.pdf", en: "/cv/CV_Georges-Miguel-MOUKOKO_EN.pdf" },
  whatsapp: { display: "+237 691 69 79 24", url: "https://wa.me/237691697924" },
  socials: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/georges-miguel-moukoko-3890542a5" },
    { label: "GitHub", url: "https://github.com/Dr-MKO-4" },
    { label: "WhatsApp", url: "https://wa.me/237691697924" },
  ],
};

export const MARQUEE = {
  fr: ["IA explicable", "IA embarquée", "Kolmogorov-Arnold Networks", "Détection de fraude", "RAG", "Vision par ordinateur", "Full-stack .NET · React", "MLOps", "Mobile Money"],
  en: ["Explainable AI", "Edge AI", "Kolmogorov-Arnold Networks", "Fraud detection", "RAG", "Computer vision", "Full-stack .NET · React", "MLOps", "Mobile Money"],
};

export const PILLARS = [
  {
    num: "01",
    cat: "xai",
    title: { fr: "IA explicable", en: "Explainable AI" },
    text: {
      fr: "Des modèles qui justifient chaque décision : réseaux de Kolmogorov-Arnold, régression symbolique, SHAP, Grad-CAM, prédiction conforme. Indispensable en finance, en santé et face au régulateur.",
      en: "Models that justify every decision: Kolmogorov-Arnold networks, symbolic regression, SHAP, Grad-CAM, conformal prediction. Essential in finance, health and in front of regulators.",
    },
    tags: ["KAN", "SHAP", "Grad-CAM", "Conformal", "PyTorch"],
  },
  {
    num: "02",
    cat: "edge",
    title: { fr: "IA embarquée (Edge AI)", en: "Edge AI" },
    text: {
      fr: "Faire tourner l'IA sans réseau : quantification INT8, TensorFlow Lite, inférence sur smartphone et lunettes connectées, synchronisation hors ligne pour les zones rurales.",
      en: "Running AI without a network: INT8 quantisation, TensorFlow Lite, inference on phones and smart glasses, offline sync for rural areas.",
    },
    tags: ["TFLite", "INT8", "YOLOv8", "EfficientNet", "Flutter"],
  },
  {
    num: "03",
    cat: "genai",
    title: { fr: "IA générative & agents", en: "Generative AI & agents" },
    text: {
      fr: "Assistants documentaires souverains et systèmes multi-agents sur infrastructure maîtrisée : recherche hybride, reranking, GraphRAG, LLM locaux.",
      en: "Sovereign document assistants and multi-agent systems on infrastructure you control: hybrid retrieval, reranking, GraphRAG, local LLMs.",
    },
    tags: ["RAG", "LangGraph", "Qdrant", "Ollama", "FastAPI"],
  },
  {
    num: "04",
    cat: "platforms",
    title: { fr: "Ingénierie full-stack", en: "Full-stack engineering" },
    text: {
      fr: "Des modèles aux produits : API en Clean Architecture, interfaces React, applications Flutter, PostgreSQL, Docker, déploiement cloud et intégration continue.",
      en: "From models to products: Clean Architecture APIs, React interfaces, Flutter apps, PostgreSQL, Docker, cloud deployment and CI.",
    },
    tags: [".NET 8", "React", "Flutter", "PostgreSQL", "AWS"],
  },
];

export const EXPERIENCES = [
  {
    when: { fr: "2025 · en cours", en: "2025 · present" },
    org: "LIDIA",
    logo: "/img/logos/lidia.webp",
    role: { fr: "Fondateur & Lead IA · startup d'IA souveraine", en: "Founder & AI Lead · sovereign AI startup" },
    points: {
      fr: [
        "Architecture RAG hybride (recherche sémantique + BM25) et pipelines OCR multimodaux pour un déploiement intranet fermé.",
        "Produits : AgroSense, Nexus AI, Meerkat, PharmaCon et Lead's AI, un LLM souverain adapté aux langues africaines.",
        "Recherche appliquée en IA explicable et en IA embarquée.",
      ],
      en: [
        "Hybrid RAG architecture (semantic + BM25 retrieval) and multimodal OCR pipelines for closed intranet deployment.",
        "Products: AgroSense, Nexus AI, Meerkat, PharmaCon and Lead's AI, a sovereign LLM adapted to African languages.",
        "Applied research in explainable AI and edge AI.",
      ],
    },
  },
  {
    when: { fr: "2026", en: "2026" },
    org: "BEAC · Banque des États de l'Afrique Centrale",
    role: { fr: "Stagiaire Data Scientist · Service de la Balance des Paiements", en: "Data Scientist Intern · Balance of Payments Department" },
    points: {
      fr: [
        "Outil de détection d'anomalies sur les séries monétaires : LOF*, Transformer + BiLSTM + VAE avec prédiction conforme, explications SHAP.",
        "Application Dash packagée en logiciel de bureau (PyQt6), base SQLite, spécification technique complète.",
        "Analyse de la rétention des recettes d'exportation pétrolière dans la CEMAC : extraction BEAC / FMI, typologie, clustering.",
      ],
      en: [
        "Anomaly detection tool for monetary series: LOF*, Transformer + BiLSTM + VAE with conformal prediction, SHAP explanations.",
        "Dash application packaged as desktop software (PyQt6), SQLite storage, full technical specification.",
        "Analysis of oil export revenue retention in CEMAC: BEAC / IMF data extraction, typology, clustering.",
      ],
    },
  },
  {
    when: { fr: "2026 · en cours", en: "2026 · present" },
    org: "NexCQISolutions",
    role: { fr: "Développeur logiciel · Aura CareOS", en: "Software developer · Aura CareOS" },
    points: {
      fr: ["Module sécurité d'un dossier médical électronique basé sur OpenEMR : MFA, contrôle d'accès, journal d'audit infalsifiable, tests PHPUnit."],
      en: ["Security module of an OpenEMR-based electronic medical record: MFA, access control, tamper-evident audit log, PHPUnit tests."],
    },
  },
  {
    when: { fr: "07/2025 · 01/2026", en: "07/2025 · 01/2026" },
    org: "ESOAF · Yaoundé",
    role: { fr: "Stagiaire ingénierie logicielle · Full-stack et IA", en: "Software engineering intern · Full-stack and AI" },
    points: {
      fr: [
        "Architecture et développement de modules full-stack pour l'anonymisation de données d'entreprise.",
        "Intégration de modèles de vision par ordinateur dans des workflows industriels.",
        "Structuration des flux de données et pipelines de traitement pour l'aide à la décision.",
      ],
      en: [
        "Designed and built full-stack modules for enterprise data anonymisation.",
        "Integrated computer vision models into industrial workflows.",
        "Structured data flows and processing pipelines for decision support.",
      ],
    },
  },
  {
    when: { fr: "En parallèle", en: "Alongside" },
    org: { fr: "Indépendant · ENSPD", en: "Freelance · ENSPD" },
    role: { fr: "Développeur full-stack et instructeur en développement logiciel", en: "Full-stack developer and software development instructor" },
    points: {
      fr: [
        "WinPlus (plateforme éducative en production), messagerie professionnelle multitenant, HomeGamesFive, SISIA SARL.",
        "Intégration des paiements Mobile Money (MTN MoMo, Orange Money) et déploiement sur AWS.",
        "Instructeur en développement logiciel à l'ENSPD.",
      ],
      en: [
        "WinPlus (live learning platform), multi-tenant business email, HomeGamesFive, SISIA SARL.",
        "Mobile Money payment integration (MTN MoMo, Orange Money) and AWS deployment.",
        "Software development instructor at ENSPD.",
      ],
    },
  },
  {
    when: { fr: "2022 · 2023 · 2024", en: "2022 · 2023 · 2024" },
    org: "CAMRAIL · Douala",
    logo: "/img/logos/camrail.webp",
    role: { fr: "Stagiaire · trois stages d'été", en: "Intern · three summer internships" },
    points: {
      fr: [
        "Observation et soutien aux équipes de gestion du trafic ferroviaire.",
        "Rédaction de rapports techniques sur les indicateurs de performance opérationnelle.",
        "Contribution à des projets d'optimisation du temps de transport.",
      ],
      en: [
        "Supported railway traffic management teams.",
        "Wrote technical reports on operational performance indicators.",
        "Contributed to transit-time optimisation projects.",
      ],
    },
  },
  {
    when: { fr: "2024", en: "2024" },
    org: "Club IA · ENSPD",
    role: { fr: "Responsable Recherche & Développement", en: "Head of Research & Development" },
    points: {
      fr: ["Organisation de la commission R&D et du programme hebdomadaire du club.", "Projets étudiants en IA et compétitions de data science (Zindi, Data Tour)."],
      en: ["Organised the R&D committee and the club's weekly programme.", "Student AI projects and data science competitions (Zindi, Data Tour)."],
    },
  },
];

export const EDUCATION = [
  { when: { fr: "En cours", en: "Ongoing" }, title: { fr: "Master 2 Science des Données & IA (SDIA)", en: "MSc Data Science & AI (SDIA)" }, where: { fr: "ENSPD, Université de Douala · mémoire : détection de fraude Mobile Money par réseaux de Kolmogorov-Arnold", en: "ENSPD, University of Douala · thesis: Mobile Money fraud detection with Kolmogorov-Arnold networks" } },
  { when: { fr: "2024", en: "2024" }, title: { fr: "Licence Science des Données & IA", en: "BSc Data Science & AI" }, where: { fr: "ENSPD · mention Assez-Bien", en: "ENSPD · with honours" } },
  { when: { fr: "2021", en: "2021" }, title: { fr: "Baccalauréat C (mathématiques et physique)", en: "Baccalaureate, series C (maths & physics)" }, where: { fr: "Collège Adventiste de Yaoundé · mention Bien", en: "Collège Adventiste de Yaoundé · with honours" } },
];

export const CERTIFICATIONS = [
  "Huawei · Artificial Intelligence Technology and Application V2.0",
  "Meta · Front-End Developer (HTML, CSS, JavaScript, React)",
  "Board Infinity · .NET Developer & ASP.NET Core",
];

export const LANGUAGES = [
  { name: "Français", level: { fr: "langue maternelle", en: "native" } },
  { name: "English", level: { fr: "niveau professionnel (B2)", en: "professional (B2)" } },
];

export const SKILLS = [
  {
    title: { fr: "Data & IA", en: "Data & AI" },
    items: ["Python", "PyTorch", "scikit-learn", "XGBoost", "SHAP", "Optuna", "KAN", "Transformers", "GAN / VAE", "Deep RL", "NSGA-II", "Séries temporelles"],
  },
  {
    title: { fr: "IA générative", en: "Generative AI" },
    items: ["RAG", "GraphRAG", "LangGraph", "Qdrant", "Ollama", "HyDE", "Reranking", "Multi-agents"],
  },
  {
    title: { fr: "Développement", en: "Engineering" },
    items: ["C# / .NET 8", "ASP.NET Core", "FastAPI", "Node.js", "TypeScript", "React", "Flutter", "PHP", "Rust", "SQL"],
  },
  {
    title: { fr: "Données & Ops", en: "Data & Ops" },
    items: ["PostgreSQL / PostGIS", "Redis", "Kafka", "Docker", "AWS EC2", "GitHub Actions", "Nginx / Caddy", "Plotly Dash", "LaTeX"],
  },
];
