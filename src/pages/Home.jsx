import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "motion/react";
import { useLang } from "../i18n.jsx";
import { PROFILE, MARQUEE, PILLARS } from "../data/profile.js";
import { PROJECTS, CATEGORIES, byCategory, publicRepoCount } from "../data/projects.js";
import { Counter, EASE, Magnetic, Marquee, Page, Reveal, ScrollStatement, SplineField, SplitText } from "../components/motion.jsx";
import { Footer } from "../components/Layout.jsx";
import ProjectVisual from "../components/ProjectVisual.jsx";

function Hero({ ready }) {
  const { ui } = useLang();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const d = ready ? 0.1 : 0;

  return (
    <section ref={ref} className="hero">
      <SplineField className="hero-field" />
      <div className="wrap">
        <div className="hero-grid">
          <motion.div style={{ y: textY }}>
            <motion.span className="eyebrow" initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ delay: d }}>
              {ui("heroEyebrow")}
            </motion.span>
            <h1 className="h-display hero-title">
              <SplitText className="split-line" text={ui("heroLine1")} play={ready} delay={d + 0.05} />
              <span className="split-line">
                <SplitText text={ui("heroLine2")} play={ready} delay={d + 0.15} />{" "}
                <SplitText className="serif" text={ui("heroLine3")} play={ready} delay={d + 0.25} />
              </span>
            </h1>
            <motion.p className="h-3" initial={{ opacity: 0, y: 20 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ delay: d + 0.55, duration: 0.9, ease: EASE }}>
              {ui("heroLine4")}
            </motion.p>
            <motion.p className="lead hero-intro" style={{ marginTop: 18 }} initial={{ opacity: 0, y: 20 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ delay: d + 0.65, duration: 0.9, ease: EASE }}>
              {ui("heroIntro")}
            </motion.p>
            <motion.div className="hero-actions" initial={{ opacity: 0, y: 20 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ delay: d + 0.75, duration: 0.9, ease: EASE }}>
              <Magnetic>
                <Link to="/projets" className="btn btn-primary" data-cursor={ui("view")}>
                  {ui("seeWork")} <span className="arrow">→</span>
                </Link>
              </Magnetic>
              <Magnetic>
                <Link to="/contact" className="btn btn-ghost">{ui("contactMe")}</Link>
              </Magnetic>
            </motion.div>
          </motion.div>

          <div className="hero-photo">
            <motion.div
              className="hero-photo-frame"
              initial={{ clipPath: "inset(100% 0 0 0 round 28px)" }}
              animate={ready ? { clipPath: "inset(0% 0 0 0 round 28px)" } : {}}
              transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1], delay: d + 0.2 }}
            >
              <motion.img
                src="/img/miguel.webp"
                alt="Georges Miguel MOUKOKO"
                style={{ y: photoY }}
                initial={{ scale: 1.25 }}
                animate={ready ? { scale: 1 } : {}}
                transition={{ duration: 1.8, ease: EASE, delay: d + 0.2 }}
                fetchPriority="high"
              />
            </motion.div>
            <motion.div className="hero-photo-tag" initial={{ opacity: 0, x: -20 }} animate={ready ? { opacity: 1, x: 0 } : {}} transition={{ delay: d + 1.1, duration: 0.7, ease: EASE }}>
              <span className="pulse" /> {ui("available")}
            </motion.div>
            <div className="hero-photo-caption mono">
              <span>LIDIA Lab</span>
              <span>ENSPD · Douala</span>
            </div>
          </div>
        </div>
        <div className="hero-bottom">
          <div className="scroll-cue mono"><i />{ui("scroll")}</div>
          <span className="formula">φ(x) = Σ cᵢ · Bᵢ(x)</span>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ project, index }) {
  const { t, ui } = useLang();
  return (
    <Reveal delay={index * 0.1}>
      <Link to={`/projets/${project.slug}`} className="cat-card" data-cursor={ui("view")}>
        <div className="cat-card-visual">
          <ProjectVisual project={project} />
        </div>
        <div className="cat-card-body">
          <div className="card-meta mono"><span>{t(project.group)}</span><span>{project.year}</span></div>
          <h3 className="title-row">{project.logo && <img className="p-logo" src={project.logo} alt="" loading="lazy" />}{t(project.name)}</h3>
          <p>{t(project.subtitle)}</p>
          <div className="card-foot">
            {project.stack.slice(0, 4).map((s) => <span key={s} className="chip">{s}</span>)}
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

function CategoryBlock({ cat }) {
  const { t, ui } = useLang();
  const all = byCategory(cat.key);
  const featured = all.filter((p) => p.featured);
  const others = all.filter((p) => !p.featured);
  return (
    <div className="cat-block">
      <div className="cat-head">
        <Reveal y={20}>
          <span className="cat-num mono">{cat.num}</span>
          <h3 className="h-2 cat-title">{t(cat.label)}</h3>
          <p className="muted-on-dark cat-desc">{t(cat.desc)}</p>
          <Link to={`/projets?cat=${cat.key}`} className="cat-link mono">
            {ui("viewCategory")} ({all.length}) <span>→</span>
          </Link>
        </Reveal>
      </div>
      <div className="cat-body">
        <div className={`cat-featured n${featured.length}`}>
          {featured.map((p, i) => <FeatureCard key={p.slug} project={p} index={i} />)}
        </div>
        {others.length > 0 && (
          <Reveal y={16} className="cat-others">
            <span className="mono muted-on-dark">{ui("alsoInCategory")}</span>
            <div>
              {others.map((p) => (
                <Link key={p.slug} to={`/projets/${p.slug}`} className="cat-other">{t(p.name)}</Link>
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </div>
  );
}

function CategoryShowcase() {
  const { ui } = useLang();
  return (
    <section className="section dark">
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="eyebrow">{ui("featuredEyebrow")}</span>
            <SplitText as="h2" className="h-1" text={ui("featuredTitle")} />
          </div>
          <Reveal><p className="lead muted-on-dark">{ui("featuredIntro")}</p></Reveal>
        </div>
        {CATEGORIES.map((c) => <CategoryBlock key={c.key} cat={c} />)}
        <Reveal style={{ marginTop: 64, display: "flex", justifyContent: "center" }}>
          <Magnetic>
            <Link to="/projets" className="btn btn-primary">
              {ui("viewAll")} ({PROJECTS.length}) <span className="arrow">→</span>
            </Link>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}

export default function Home({ ready }) {
  const { lang, t, ui } = useLang();
  const statement =
    lang === "fr"
      ? "Je veux une IA *explicable, capable de tourner *hors ligne, et utile là où elle compte : dans les banques, les champs, les hôpitaux et les réseaux de paiement d'Afrique centrale."
      : "I want AI that is *explainable, able to run *offline, and useful where it matters: in banks, farms, hospitals and payment networks across Central Africa.";

  return (
    <Page>
      <Hero ready={ready} />
      <Marquee key={lang} items={MARQUEE[lang]} />

      <section className="section">
        <div className="wrap">
          <span className="eyebrow">{ui("pillarsEyebrow")}</span>
          <div style={{ margin: "28px 0 clamp(60px, 9vw, 120px)" }}>
            <ScrollStatement key={lang} className="statement" text={statement} />
          </div>
          <Reveal>
            <h2 className="h-2" style={{ marginBottom: 32 }}>{ui("pillarsTitle")}</h2>
          </Reveal>
          <div className="pillars">
            {PILLARS.map((p, i) => (
              <Reveal key={p.num} className="pillar" delay={i * 0.08}>
                <span className="pillar-num">{p.num}</span>
                <h3 className="h-3">{t(p.title)}</h3>
                <p>{t(p.text)}</p>
                <ul>{p.tags.map((tag) => <li key={tag} className="chip">{tag}</li>)}</ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="dark" style={{ paddingTop: "clamp(60px, 8vw, 100px)" }}>
        <div className="wrap">
          <div className="counters">
            {[
              { v: PROJECTS.length, l: { fr: "projets documentés sur ce site", en: "projects documented on this site" } },
              { v: CATEGORIES.length, l: { fr: "catégories, dont deux axes de recherche", en: "categories, including two research tracks" } },
              { v: publicRepoCount, l: { fr: "dépôts de code publics liés", en: "linked public code repositories" } },
              { v: PROJECTS.filter((p) => p.featured).length, l: { fr: "projets mis en avant", en: "featured projects" } },
            ].map((c, i) => (
              <Reveal key={i} className="counter" delay={i * 0.06}>
                <Counter value={c.v} />
                <p>{t(c.l)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CategoryShowcase />

      <section className="section dark" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal className="lab-card">
            <img src="/img/logos/lidia.webp" alt="LIDIA" />
            <div>
              <span className="eyebrow">{ui("labEyebrow")}</span>
              <h2 className="h-2" style={{ margin: "14px 0" }}>LIDIA Lab</h2>
              <p className="lead muted">
                {lang === "fr"
                  ? "Le laboratoire où je mène mes recherches sur l'IA explicable et l'IA embarquée, appliquées à l'agriculture, la santé, la sécurité et la finance. L'identité visuelle de ce site reprend ses couleurs."
                  : "The lab where I research explainable AI and edge AI, applied to agriculture, health, security and finance. This site's visual identity borrows its colours."}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="cta-band">
        <div className="wrap">
          <span className="eyebrow">{ui("contactEyebrow")}</span>
          <h2 className="h-display" style={{ marginTop: 24 }}>
            <Link to="/contact" data-cursor={ui("letsTalk")}>
              <SplitText text={ui("letsTalk")} /> <span className="serif accent">↗</span>
            </Link>
          </h2>
          <p className="mono muted" style={{ marginTop: 24 }}>{PROFILE.email}</p>
        </div>
      </section>
      <Footer />
    </Page>
  );
}
