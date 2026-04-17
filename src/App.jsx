import { useState, useEffect, useRef } from "react";
import './App.css';

const PROFILE = {
  fullName: "MOUKOKO EKAMBI Georges Miguel",
  shortName: "Miguel",
  email: "georgesmoukoko4@gmail.com",
};

const INTERESTS = ["Data Scientist", "Computer Vision", "Deep Learning", "Full-Stack Dev"];

// PROJETS IA (6 projets)
const PROJECTS_IA = [
  { tag: "Santé · IA Embarquée", title: "DermAI", subtitle: "Diagnostic Dermatologique Offline-First", desc: "Pipeline IA hybride (TFLite + FastAPI) avec EfficientNet fine-tuné sur les phototypes africains. Explicabilité via Grad-CAM, clustering épidémiologique DBSCAN.", impact: "Accès au diagnostic médical sans connexion internet en zones rurales africaines.", badges: ["Flutter", "TFLite", "FastAPI", "EfficientNet"], img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=260&fit=crop&auto=format", category: "IA" },
  { tag: "Fintech · NFC", title: "SwiftPay", subtitle: "Paiement NFC Biométrique", desc: "Paiement sans contact NFC avec authentification biométrique multifactorielle. Architecture sécurisée conforme aux standards bancains africains.", impact: "Infrastructure fintech sécurisée pour les marchés émergents.", badges: ["NFC", "Biométrie", "Flutter", "C#"], img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=260&fit=crop&auto=format", category: "IA" },
  { tag: "Agriculture · Géospatial", title: "AgroSense", subtitle: "Agriculture de Précision", desc: "Ensemble Learning (EfficientNet, MobileNet, ResNet) avec pipeline MLOps pour réentraînement automatique et analyse spatiale via PostGIS.", impact: "Réduction des pertes agricoles. Agriculture de précision au Cameroun.", badges: ["PyTorch", "MLOps", "PostGIS"], img: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&h=260&fit=crop&auto=format", category: "IA" },
  { tag: "Logistique · Robotique", title: "Drone Autonome", subtitle: "Livraison par IA", desc: "Navigation A*/RRT*, optimisation multi-objectifs énergie/temps, vision embarquée pour détection d'obstacles et Reinforcement Learning décisionnel.", impact: "Infrastructure Smart City. Désenclavement des zones urbaines africaines.", badges: ["RL", "Computer Vision", "A*", "Python"], img: "https://images.unsplash.com/photo-1527977966861-9b14bd96c648?w=800&h=260&fit=crop&auto=format", category: "IA" },
  { tag: "Accessibilité · Vision", title: "SignLanguage AI", subtitle: "Traduction Langue des Signes", desc: "Détection de gestes via Computer Vision. Modélisation temporelle LSTM/Transformer. Pipeline vidéo→texte en temps réel.", impact: "Inclusion numérique des personnes malentendantes.", badges: ["LSTM", "Transformer", "OpenCV", "TensorFlow"], img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=260&fit=crop&auto=format", category: "IA" },
  { tag: "Finance · Deep RL", title: "TradingAgent", subtitle: "Trading Autonome", desc: "Deep Q-Learning sur environnement financier modélisé en MDP. Backtesting complet sur données OHLCV. Algorithmes génétiques pour optimisation heuristique.", impact: "Stratégies de trading adaptatives et évolutives sur marchés émergents.", badges: ["Deep-QL", "MDP", "Python"], img: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800&h=260&fit=crop&auto=format", category: "IA" },
];

// PROJETS DEV/SaaS (3 projets)
const PROJECTS_SAAS = [
  { tag: "HR Tech · SaaS", title: "Application RH", subtitle: "15 Modules Intégrés", desc: "Système modulaire 15 modules. Matching candidats par IA. Analytics prédictifs turnover & performance. Multi-pays, multi-devises.", impact: "Digitalisation RH complète pour entreprises africaines en croissance.", badges: ["ASP.NET Core", "React", "ML"], img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=260&fit=crop&auto=format", category: "SaaS" },
  { tag: "Edtech · Recommandation", title: "WinPlus / Réussir", subtitle: "Préparation aux Concours", desc: "Plateforme de préparation aux concours. Parcours personnalisés par IA. Dashboard analytique étudiant avec prédiction de performance.", impact: "Accompagnement haut-débit pour étudiants africains ambitieux.", badges: ["React", "FastAPI", "Filtering"], img: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=260&fit=crop&auto=format", category: "SaaS" },
  { tag: "Multi-tenant · SaaS", title: "AJPEAC Platform", subtitle: "Gestion Intelligente", desc: "Architecture multi-tenant avec dashboards analytiques, chatbot intelligent et système de recommandation intégré.", impact: "Plateforme de gestion opérationnelle pour organisations panafricaines.", badges: ["ASP.NET Core", "React", "Redis"], img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=260&fit=crop&auto=format", category: "SaaS" },
];

const PROJECTS_ALL = [...PROJECTS_IA, ...PROJECTS_SAAS];

const STATS = [
  { target: 12, suffix: "+", label: "Projets Complets", img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=40&h=40&fit=crop" },
  { target: 5, suffix: "", label: "Domaines Impact", img: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=40&h=40&fit=crop" },
  { target: 3, suffix: " ans", label: "d'Expérience", img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=40&h=40&fit=crop" },
  { target: 2, suffix: "", label: "Pays Actifs", img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=40&h=40&fit=crop" },
];

const EXPERIENCES = [
  { num: "01", company: "ESOAF", role: "Stage Ingénierie Logicielle · Fullstack + IA", level: "Niveau 4", duration: "7 MOIS", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=60&h=60&fit=crop" },
  { num: "02", company: "CAMRAIL", role: "Stage Opérationnel · Ingénierie Industrielle", level: "Niv. 1 & 2", duration: "1 AN", img: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=60&h=60&fit=crop" },
  { num: "03", company: "CAMRAIL", role: "Stage Avancé · Systèmes Embarqués & Data", level: "Niveau 3", duration: "2 ANS", img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=60&h=60&fit=crop" },
  { num: "04", company: "ENSPD", role: "Master 2 Science des Données & IA", level: "M2 SDAI", duration: "EN COURS", img: "https://images.unsplash.com/photo-1562774053-701939374585?w=60&h=60&fit=crop" },
];

const OFFER_CARDS = [
  { num: "01 — IA / ML", title: "IA Appliquée", desc: "Deep Learning, Computer Vision, NLP, Reinforcement Learning. Modèles PyTorch fine-tunés.", img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=60&h=60&fit=crop&auto=format" },
  { num: "02 — Fullstack", title: "Systèmes & APIs", desc: "APIs robustes ASP.NET Core, architectures SaaS multi-tenant, React.js & Flutter.", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=60&h=60&fit=crop&auto=format" },
  { num: "03 — MLOps", title: "Cloud & Stratégie", desc: "MLOps, CI/CD AWS, PostGIS, analytics prédictifs, vision produit end-to-end.", img: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=60&h=60&fit=crop&auto=format" },
];

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [counted, setCounted] = useState(false);
  const [statVals, setStatVals] = useState(STATS.map(() => 0));
  const [submitted, setSubmitted] = useState(false);
  const [cfName, setCfName] = useState("");
  const [cfEmail, setCfEmail] = useState("");
  const [activeInterests, setActiveInterests] = useState([]);
  const statsRef = useRef(null);

  // Navbar scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-reveal animation
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [submitted]);

  // Animated stat counters
  useEffect(() => {
    if (!statsRef.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !counted) {
          setCounted(true);
          STATS.forEach((s, idx) => {
            let current = 0;
            const dur = 1800;
            const step = 16;
            const inc = Math.ceil(s.target / (dur / step));
            const timer = setInterval(() => {
              current += inc;
              if (current >= s.target) {
                current = s.target;
                clearInterval(timer);
              }
              setStatVals((prev) => {
                const next = [...prev];
                next[idx] = current;
                return next;
              });
            }, step);
          });
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, [counted]);

  const formatStat = (val) => (val >= 1000 ? (val / 1000).toFixed(1) + "k" : val);
  const toggleInterest = (item) =>
    setActiveInterests((prev) =>
      prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]
    );
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const submitForm = () => {
    if (!cfName || !cfEmail) {
      alert("Veuillez remplir les champs obligatoires.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div style={{ width: "100%", margin: 0, padding: 0 }}>
      {/* NAV */}
      <nav className={`mko-nav${scrolled ? " scrolled" : ""}`}>
        <div className="nav-container">
          <div className="nav-logo">MKO</div>
          <ul className="nav-links">
            <li><a onClick={() => scrollTo("offer")}>Services</a></li>
            <li><a onClick={() => scrollTo("exp")}>Parcours</a></li>
            <li><a onClick={() => scrollTo("projects")}>Projets</a></li>
            <li><a onClick={() => scrollTo("contact")}>Contact</a></li>
          </ul>
          <button className="nav-btn filled" onClick={() => scrollTo("contact")}>Parlons ↗</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero" id="hero">
        <div className="hero-top reveal">
          <span className="hero-badge">it's me</span>
          <div className="hero-nav-pills">
            <span className="hero-pill active">Mon Portfolio</span>
            <span className="hero-pill">À propos</span>
            <span className="hero-pill">Contact</span>
            <span className="hero-contact-pill">{PROFILE.email}</span>
          </div>
        </div>

        <div className="hero-main">
          <div>
            <div className="reveal" style={{ transitionDelay: ".05s" }}>
              <h1 className="hero-h1">
                Hello! Je suis <em>Georges</em><br />
                MOUKOKO{" "}
                <span style={{ display: "inline-block", fontSize: "clamp(32px,4vw,52px)", fontWeight: 500, color: "var(--accent-yellow)" }}>
                  Data Scientist ✦
                </span>
              </h1>
            </div>
            <div className="reveal" style={{ transitionDelay: ".12s" }}>
              <span className="hero-title-text">
                Data Scientist & Architecte Systèmes Fullstack — M2 SDAI · ENSPD Douala
              </span>
              <div className="hero-checks">
                {[
                  "Solutions IA end-to-end, de la recherche au produit fini",
                  "Computer Vision & Deep Learning sur phototypes africains",
                  "Architectures scalables, Offline-First & MLOps",
                ].map((c) => (
                  <div className="hero-check" key={c}>
                    <span className="hero-check-dot" />{c}
                  </div>
                ))}
              </div>
            </div>
            <div className="hero-btns reveal" style={{ transitionDelay: ".2s" }}>
              <button className="btn-main" onClick={() => scrollTo("projects")}>Voir les projets ↓</button>
              <button className="btn-sec" onClick={() => scrollTo("contact")}>Me contacter</button>
            </div>
          </div>

          <div className="hero-photo-wrap">
            <div style={{ position: "relative", display: "inline-block" }}>
              <div className="hero-color-blob" />
              <div className="hero-photo-blob">
                <img
                  src="public\Photo_Officietl.jpg"
                  alt="Georges MOUKOKO"
                />
              </div>
              <div className="hero-hello-badge">Hello!</div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-wrap">
        <div className="marquee-inner">
          {[
            "Data Scientist", "Computer Vision", "Deep Learning", "Full-Stack Dev",
            "MLOps", "Douala · Cameroun", "ENSPD M2 SDAI",
            "Data", "Computer Vision", "Deep Learning", "Full-Stack Dev",
            "MLOps", "Douala · Cameroun", "ENSPD M2 SDAI",
          ].map((item, i) => (
            <div className="marquee-item" key={i}>{item}<span className="marquee-dot" /></div>
          ))}
        </div>
      </div>

      {/* OFFER */}
      <section id="offer" style={{ background: "var(--white)" }}>
        <div className="offer-grid">
          <div className="reveal-left">
            <div className="section-eyebrow">Ce que je fais</div>
            <h2 className="section-h2">What I'm<br />Offering</h2>
            <p className="section-sub" style={{ marginBottom: 32, fontSize: 13 }}>
              Des solutions intelligentes conçues pour des contextes africains réels — de la recherche au déploiement production.
            </p>
            <button className="offer-cta-btn" onClick={() => scrollTo("projects")}>All Services ↗</button>
          </div>
          <div className="offer-cards reveal-right">
            {OFFER_CARDS.map((card) => (
              <div className="offer-card" key={card.num}>
                <img src={card.img} alt={card.title} className="oc-icon-img" />
                <div className="oc-num">{card.num}</div>
                <div className="oc-title">{card.title}</div>
                <div className="oc-desc">{card.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="hdivider" />

      {/* EXPERIENCE */}
      <section id="exp" className="exp-section">
        <div className="exp-header">
          <div className="reveal-left">
            <div className="section-eyebrow">Expérience</div>
            <h2 className="section-h2">Experience</h2>
          </div>
          <div className="reveal-right" style={{ paddingTop: 8 }}>
            <p className="exp-desc">
              Parcours marqué par des stages opérationnels et une formation d'excellence en Data Science & IA à l'ENSPD Douala.
              Chaque expérience a forgé une vision technique et produit transversale.
            </p>
          </div>
        </div>
        <div className="exp-rows reveal">
          {EXPERIENCES.map((e) => (
            <div className="exp-row" key={e.num}>
              <span className="er-num">{e.num}</span>
              <img src={e.img} alt={e.company} className="er-img" />
              <div>
                <div className="er-company">{e.company}</div>
                <div className="er-role">{e.role}</div>
              </div>
              <span className="er-level">{e.level}</span>
              <span className="er-duration">JOB DURATION · {e.duration}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="hdivider" />

      {/* PROJECTS */}
      <section id="projects" className="proj-section">
        <div className="proj-header">
          <div className="section-eyebrow reveal">Case Study</div>
          <h2 className="section-h2 reveal" style={{ marginBottom: 8 }}>Projets IA</h2>
          <p className="section-sub reveal" style={{ marginBottom: 0, fontSize: 13 }}>
            Six projets à fort impact social, appliquant l'IA à la santé, finance, agriculture, mobilité et accessibilité.
          </p>
        </div>

        {/* PROJETS IA (3 colonnes) */}
        <div className="proj-category">
          <div style={{ borderBottom: "2px solid var(--black)", paddingBottom: 12 }}>
            <div className="proj-category-label">Solutions IA</div>
          </div>
          <div />
        </div>
        <div className="proj-grid proj-grid-3 reveal">
          {PROJECTS_IA.map((p, i) => (
            <div className="proj-card" key={p.title} style={{ transitionDelay: `${i * 0.04}s` }}>
              <img src={p.img} alt={p.title} className="pc-img" />
              <div className="proj-card-inner">
                <div className="pc-top">
                  <span className="pc-tag">{p.tag}</span>
                  <span className="pc-arrow">↗</span>
                </div>
                <h3 className="pc-title">{p.title}</h3>
                <p className="pc-subtitle">{p.subtitle}</p>
                <p className="pc-desc">{p.desc}</p>
                <div className="pc-impact">
                  <span className="pc-impact-label">Impact</span>{p.impact}
                </div>
                <div className="pc-badges">
                  {p.badges.map((b) => <span className="pc-badge" key={b}>{b}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SEPARATOR */}
        <div className="hdivider" style={{ margin: "80px 0" }} />

        {/* PROJETS SaaS (2 colonnes) */}
        <div className="proj-header">
          <h2 className="section-h2 reveal" style={{ marginBottom: 8 }}>Projets Dev & SaaS</h2>
          <p className="section-sub reveal" style={{ marginBottom: 0, fontSize: 13 }}>
            Trois plateformes Full-Stack conçues pour la gestion d'entreprise et l'éducation digitale.
          </p>
        </div>

        <div className="proj-category">
          <div style={{ borderBottom: "2px solid var(--black)", paddingBottom: 12 }}>
            <div className="proj-category-label">Plateformes Production</div>
          </div>
          <div />
        </div>
        <div className="proj-grid proj-grid-2 reveal">
          {PROJECTS_SAAS.map((p, i) => (
            <div className="proj-card" key={p.title} style={{ transitionDelay: `${(i + 6) * 0.04}s` }}>
              <img src={p.img} alt={p.title} className="pc-img" />
              <div className="proj-card-inner">
                <div className="pc-top">
                  <span className="pc-tag">{p.tag}</span>
                  <span className="pc-arrow">↗</span>
                </div>
                <h3 className="pc-title">{p.title}</h3>
                <p className="pc-subtitle">{p.subtitle}</p>
                <p className="pc-desc">{p.desc}</p>
                <div className="pc-impact">
                  <span className="pc-impact-label">Impact</span>{p.impact}
                </div>
                <div className="pc-badges">
                  {p.badges.map((b) => <span className="pc-badge" key={b}>{b}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="hdivider" />

      {/* TESTIMONIAL */}
      <section className="testi-section">
        <div className="testi-label">Client Feedback</div>
        <div className="reveal">
          <blockquote className="testi-quote">
            "Je voulais juste partager une note et vous faire savoir que{" "}
            <span>vous faites vraiment du très bon travail.</span>"
          </blockquote>
          <div className="testi-author">
            <div className="testi-info">
              <h4>Rohan Singh</h4>
              <p>Project Manager, Airline Tech Inc.</p>
              <svg viewBox="0 0 80 20" fill="none" style={{ width: 80, height: 20, marginTop: 12, color: "var(--black)" }}>
                <path d="M2 10 Q10 2 20 10 Q30 18 40 10 Q50 2 60 10 Q70 18 78 10" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
            </div>
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&auto=format"
              alt="Rohan Singh"
              className="testi-photo"
            />
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="stats-section" ref={statsRef}>
        <div className="stats-grid">
          {STATS.map((s, i) => (
            <div className="stat-block reveal" key={i} style={{ transitionDelay: `${i * 0.08}s` }}>
              <img src={s.img} alt={s.label} className="sb-img" />
              <div className="sb-val">{formatStat(statVals[i])}{s.suffix}</div>
              <div className="sb-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="hdivider" />

      {/* CONTACT */}
      <section id="contact" className="contact-section">
        <div className="section-eyebrow reveal" style={{ justifyContent: "center" }}>Contact</div>
        <h2 className="contact-h2 reveal">
          Say Hi! <em>and tell me about</em><br /><em>your idea</em>
        </h2>
        <p className="contact-sub reveal">Have a nice project? reach out and let's chat.</p>
        <div className="contact-form reveal">
          {submitted ? (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>✦</div>
              <h3 style={{ fontFamily: "'Cabinet Grotesk',sans-serif", fontSize: 28, fontWeight: 900, marginBottom: 8 }}>
                Message envoyé!
              </h3>
              <p style={{ color: "#888", fontSize: 14 }}>Je vous réponds sous 24h.</p>
            </div>
          ) : (
            <>
              <div className="form-row">
                <input className="form-input" type="text" placeholder="Name *" value={cfName} onChange={(e) => setCfName(e.target.value)} />
                <input className="form-input" type="email" placeholder="Email *" value={cfEmail} onChange={(e) => setCfEmail(e.target.value)} />
              </div>
              <div className="form-group">
                <input className="form-input" type="text" placeholder="Company name" />
              </div>
              <div className="form-group">
                <input className="form-input" type="text" placeholder="Your website?" />
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--mid)", marginBottom: 10 }}>
                  What's in your mind? *
                </div>
                <div className="interests-wrap">
                  {INTERESTS.map((item) => (
                    <button
                      key={item}
                      className={`int-btn${activeInterests.includes(item) ? " active" : ""}`}
                      onClick={() => toggleInterest(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
              <button className="form-submit" onClick={submitForm}>Send Me ✦</button>
              <p className="form-note">I'll get back to you within 24 hours</p>
            </>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mko-footer">
        <div className="footer-logo">MKO · {PROFILE.fullName}</div>
        <div className="footer-links">
          <a href=" https://www.linkedin.com/in/georgesmoukoko-3890542a5" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com/Dr-MKO-4" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
        <span className="footer-year">Personal portfolio©2025</span>
      </footer>
    </div>
  );
}