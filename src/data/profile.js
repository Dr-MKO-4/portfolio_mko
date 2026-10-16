export const PROFILE = {
  fullName: "Georges Miguel MOUKOKO EKAMBI",
  email: "georgesmoukoko4@gmail.com",
  location: "Douala, Cameroun",
  whatsapp: { display: "+237 691 69 79 24", url: "https://wa.me/237691697924" },
  socials: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/georgesmoukoko-3890542a5" },
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
    title: { fr: "IA explicable", en: "Explainable AI" },
    text: {
      fr: "Axe de recherche. Des modèles qui justifient chaque décision : réseaux de Kolmogorov-Arnold, régression symbolique, SHAP, Grad-CAM, prédiction conforme. Indispensable en finance, en santé et face au régulateur.",
      en: "Research track. Models that justify every decision: Kolmogorov-Arnold networks, symbolic regression, SHAP, Grad-CAM, conformal prediction. Essential in finance, health and in front of regulators.",
    },
    tags: ["KAN", "SHAP", "Grad-CAM", "Conformal", "PyTorch"],
  },
  {
    num: "02",
    title: { fr: "IA embarquée (Edge AI)", en: "Edge AI" },
    text: {
      fr: "Axe de recherche. Faire tourner l'IA sans réseau : quantification INT8, TensorFlow Lite, inférence sur smartphone et lunettes connectées, synchronisation hors ligne pour les zones rurales.",
      en: "Research track. Running AI without a network: INT8 quantisation, TensorFlow Lite, inference on phones and smart glasses, offline sync for rural areas.",
    },
    tags: ["TFLite", "INT8", "YOLOv8", "EfficientNet", "Flutter"],
  },
  {
    num: "03",
    title: { fr: "IA générative & agents", en: "Generative AI & agents" },
    text: {
      fr: "Assistants documentaires souverains et systèmes multi-agents sur infrastructure maîtrisée : recherche hybride, reranking, GraphRAG, LLM locaux.",
      en: "Sovereign document assistants and multi-agent systems on infrastructure you control: hybrid retrieval, reranking, GraphRAG, local LLMs.",
    },
    tags: ["RAG", "LangGraph", "Qdrant", "Ollama", "FastAPI"],
  },
  {
    num: "04",
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
    when: { fr: "En cours", en: "Ongoing" },
    org: "ENSPD · Université de Douala",
    logo: "/img/logos/enspd.webp",
    role: { fr: "Master 2 Science des Données & Intelligence Artificielle", en: "MSc Data Science & Artificial Intelligence" },
    points: {
      fr: [
        "Mémoire : détection de fraude Mobile Money en zone CEMAC par réseaux de Kolmogorov-Arnold, simulation multi-agent et calibration NSGA-II / AHP.",
        "Apprentissage profond, IA générative, apprentissage par renforcement, data mining, Big Data, statistique bayésienne, traitement du signal et de l'image.",
        "Génie logiciel : 13 projets de programmation système en Rust.",
      ],
      en: [
        "Thesis: Mobile Money fraud detection in the CEMAC zone with Kolmogorov-Arnold networks, multi-agent simulation and NSGA-II / AHP calibration.",
        "Deep learning, generative AI, reinforcement learning, data mining, Big Data, Bayesian statistics, signal and image processing.",
        "Software engineering: 13 systems programming projects in Rust.",
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
    when: { fr: "En cours", en: "Ongoing" },
    org: "NexCQISolutions",
    role: { fr: "Développeur logiciel · Aura CareOS", en: "Software developer · Aura CareOS" },
    points: {
      fr: [
        "Développement d'un dossier médical électronique en marque blanche basé sur OpenEMR.",
        "Tableaux de bord par rôle, intégration continue et déploiement automatisé.",
      ],
      en: [
        "Development of a white-label electronic medical record built on OpenEMR.",
        "Role-based dashboards, continuous integration and automated deployment.",
      ],
    },
  },
  {
    when: { fr: "En cours", en: "Ongoing" },
    org: "LIDIA Lab",
    logo: "/img/logos/lidia.webp",
    role: { fr: "Chercheur et ingénieur IA", en: "AI researcher and engineer" },
    points: {
      fr: [
        "AgroSense : diagnostic phytosanitaire par photo avec explication Grad-CAM.",
        "Nexus : plateforme open source d'agents IA pour le marketing digital.",
        "PharmaCon : plateforme pharmacie, application mobile et portail officine.",
      ],
      en: [
        "AgroSense: photo-based crop disease diagnosis with Grad-CAM explanations.",
        "Nexus: open-source AI agent platform for digital marketing.",
        "PharmaCon: pharmacy platform, mobile app and pharmacy portal.",
      ],
    },
  },
  {
    when: { fr: "En parallèle", en: "Alongside" },
    org: { fr: "Indépendant", en: "Freelance" },
    role: { fr: "Développeur full-stack", en: "Full-stack developer" },
    points: {
      fr: [
        "Messagerie professionnelle multitenant en production, SIRH, marketplaces, plateformes communautaires et e-commerce.",
        "Intégration des paiements Mobile Money (MTN MoMo, Orange Money) et déploiement sur AWS.",
      ],
      en: [
        "Multi-tenant business email platform in production, HRIS, marketplaces, community and e-commerce platforms.",
        "Mobile Money payment integration (MTN MoMo, Orange Money) and AWS deployment.",
      ],
    },
  },
  {
    when: { fr: "2024", en: "2024" },
    org: "Club IA · ENSPD",
    role: { fr: "Responsable Recherche & Développement", en: "Head of Research & Development" },
    points: {
      fr: ["Organisation de la commission R&D et du programme hebdomadaire du club.", "Animation de projets étudiants en IA et participation aux compétitions de data science (Zindi, Data Tour)."],
      en: ["Organised the R&D committee and the club's weekly programme.", "Led student AI projects and took part in data science competitions (Zindi, Data Tour)."],
    },
  },
  {
    when: { fr: "Niveau 4 · 7 mois", en: "Year 4 · 7 months" },
    org: "ESOAF",
    role: { fr: "Stagiaire ingénierie logicielle · Full-stack et IA", en: "Software engineering intern · Full-stack and AI" },
    points: { fr: [], en: [] },
  },
  {
    when: { fr: "Niveau 3", en: "Year 3" },
    org: "CAMRAIL",
    logo: "/img/logos/camrail.webp",
    role: { fr: "Stagiaire · Systèmes embarqués et data", en: "Intern · Embedded systems and data" },
    points: { fr: [], en: [] },
  },
  {
    when: { fr: "Niveaux 1 et 2", en: "Years 1 and 2" },
    org: "CAMRAIL",
    logo: "/img/logos/camrail.webp",
    role: { fr: "Stagiaire · Ingénierie industrielle", en: "Intern · Industrial engineering" },
    points: { fr: [], en: [] },
  },
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
