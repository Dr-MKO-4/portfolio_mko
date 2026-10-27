// Contenu propre au CV PDF. Le reste (contact, expériences, formation, certifications, langues)
// vient de profile.js. Régénérer les PDF : npm run cv
export const CV = {
  headline: { fr: "Ingénieur IA & Data Scientist", en: "AI Engineer & Data Scientist" },
  tagline: {
    fr: "IA explicable · IA embarquée · Full-stack · Fondateur du LIDIA Lab · Master 2 SDIA, ENSPD Douala",
    en: "Explainable AI · Edge AI · Full-stack · Founder of LIDIA Lab · MSc Data Science & AI, ENSPD Douala",
  },
  summary: {
    fr: "Ingénieur en fin de Master 2 Science des Données et IA. Je conçois des modèles explicables et je les mets en production. Mes deux axes de recherche sont l'IA explicable (réseaux de Kolmogorov-Arnold, SHAP, prédiction conforme) et l'IA embarquée (modèles quantifiés qui tournent hors ligne). Je viens de terminer un stage de Data Scientist à la BEAC, où j'ai livré une application de détection d'anomalies et mené une étude de balance des paiements. Fondateur de LIDIA, startup d'IA souveraine, et instructeur en développement logiciel à l'ENSPD.",
    en: "Final-year MSc Data Science & AI engineer. I design explainable models and ship them to production. My two research tracks are explainable AI (Kolmogorov-Arnold networks, SHAP, conformal prediction) and edge AI (quantised models that run offline). I have just completed a Data Scientist internship at the BEAC, where I delivered an anomaly detection application and led a balance of payments study. Founder of LIDIA, a sovereign-AI startup, and software development instructor at ENSPD.",
  },
  // Expériences de profile.js à exclure du CV (déjà dans « Engagement »)
  skipExperiences: ["Club IA · ENSPD"],
  // Nombre d'expériences sur la page 1, les suivantes passent en page 2
  page1Experiences: 4,
  involvement: [
    { label: { fr: "Club IA ENSPD", en: "ENSPD AI Club" }, value: { fr: "responsable R&D (2024)", en: "head of R&D (2024)" } },
    { label: { fr: "Compétitions", en: "Competitions" }, value: { fr: "Zindi, Data Tour", en: "Zindi, Data Tour" } },
    { label: { fr: "Intérêts", en: "Interests" }, value: { fr: "musique, lecture, cinéma, cuisine, football", en: "music, reading, cinema, cooking, football" } },
  ],
  skills: [
    { title: { fr: "IA & Data Science", en: "AI & Data Science" }, items: { fr: "Python, R, PyTorch, TensorFlow / TFLite, scikit-learn, XGBoost, SHAP, Optuna, séries temporelles, détection d'anomalies, RL", en: "Python, R, PyTorch, TensorFlow / TFLite, scikit-learn, XGBoost, SHAP, Optuna, time series, anomaly detection, RL" } },
    { title: { fr: "IA explicable & embarquée", en: "Explainable & edge AI" }, items: { fr: "KAN, Grad-CAM, prédiction conforme, quantification INT8, YOLOv8, EfficientNet, offline-first", en: "KAN, Grad-CAM, conformal prediction, INT8 quantisation, YOLOv8, EfficientNet, offline-first" } },
    { title: { fr: "IA générative & agents", en: "Generative AI & agents" }, items: { fr: "RAG hybride (BM25 + dense, RRF), GraphRAG, LangGraph, Qdrant, Ollama, OCR multimodal, GAN, VAE", en: "Hybrid RAG (BM25 + dense, RRF), GraphRAG, LangGraph, Qdrant, Ollama, multimodal OCR, GAN, VAE" } },
    { title: { fr: "Économie & finance", en: "Economics & finance" }, items: { fr: "statistiques monétaires (IFS), balance des paiements (MBP6), analyse conjoncturelle, ACP, k-moyennes", en: "monetary statistics (IFS), balance of payments (BPM6), economic outlook analysis, PCA, k-means" } },
    { title: { fr: "Développement", en: "Engineering" }, items: { fr: "C# / ASP.NET Core 8, FastAPI, Node.js, React, TypeScript, Flutter, PyQt6, Rust, PHP, Clean Architecture", en: "C# / ASP.NET Core 8, FastAPI, Node.js, React, TypeScript, Flutter, PyQt6, Rust, PHP, Clean Architecture" } },
    { title: { fr: "Données & Ops", en: "Data & Ops" }, items: { fr: "PostgreSQL / PostGIS, SQLite, Redis, Kafka, Linux, Docker, AWS EC2 / S3, GitHub Actions, Caddy, Plotly Dash", en: "PostgreSQL / PostGIS, SQLite, Redis, Kafka, Linux, Docker, AWS EC2 / S3, GitHub Actions, Caddy, Plotly Dash" } },
  ],
  projects: [
    { title: "MKAN · MoMTSim", tag: { fr: "Mémoire · IA explicable", en: "Thesis · explainable AI" }, text: { fr: "Détection de fraude Mobile Money par réseau KAN récurrent, simulateur multi-agent, scoring temps réel expliqué (Kafka, Redis, Dash).", en: "Mobile Money fraud detection with a recurrent KAN, multi-agent simulator, explained real-time scoring (Kafka, Redis, Dash)." } },
    { title: "BEAC Detect", tag: { fr: "BEAC · détection d'anomalies", en: "BEAC · anomaly detection" }, text: { fr: "LOF*, MKAN et BiVAT sur les bilans bancaires CEMAC, prédiction conforme, SHAP ; logiciel Dash + PyQt6 livré.", en: "LOF*, MKAN and BiVAT on CEMAC bank balance sheets, conformal prediction, SHAP; Dash + PyQt6 software delivered." } },
    { title: { fr: "Rétention des exportations", en: "Export value retention" }, tag: { fr: "BEAC · balance des paiements", en: "BEAC · balance of payments" }, text: { fr: "41 pays pétroliers, 246 observations : typologie en cinq bandes, transitions, profils de fuite (k-moyennes, ACP).", en: "41 oil exporters, 246 observations: five-band typology, transitions, leakage profiles (k-means, PCA)." } },
    { title: "KALATI-RAG", tag: { fr: "CAMRAIL · RAG souverain", en: "CAMRAIL · sovereign RAG" }, text: { fr: "Assistant documentaire on-premise : recherche hybride, GraphRAG, contrôle de fidélité, Qwen3 via Ollama.", en: "On-premise document assistant: hybrid retrieval, GraphRAG, faithfulness gate, Qwen3 via Ollama." } },
    { title: "PREDOC", tag: { fr: "CAMRAIL · prédiction", en: "CAMRAIL · forecasting" }, text: { fr: "Durée d'occupation d'un canton après déraillement : XGBoost quantile, intervalle calibré, SHAP.", en: "Block occupation time after a derailment: quantile XGBoost, calibrated interval, SHAP." } },
    { title: "AgroSense", tag: { fr: "LIDIA · IA embarquée", en: "LIDIA · edge AI" }, text: { fr: "Diagnostic phytosanitaire par photo hors ligne (TFLite), Grad-CAM, surveillance DBSCAN ; Flutter, .NET, FastAPI.", en: "Offline photo-based crop diagnosis (TFLite), Grad-CAM, DBSCAN surveillance; Flutter, .NET, FastAPI." } },
  ],
};
