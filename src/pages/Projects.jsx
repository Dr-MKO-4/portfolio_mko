import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { useLang } from "../i18n.jsx";
import { PROJECTS, CATEGORIES } from "../data/projects.js";
import { EASE, Page, Reveal, SplitText } from "../components/motion.jsx";
import { Footer } from "../components/Layout.jsx";
import ProjectVisual from "../components/ProjectVisual.jsx";

export default function Projects() {
  const { t, ui } = useLang();
  const [cat, setCat] = useState("all");
  const [q, setQ] = useState("");

  const counts = useMemo(() => {
    const c = { all: PROJECTS.length };
    PROJECTS.forEach((p) => p.categories.forEach((k) => { c[k] = (c[k] || 0) + 1; }));
    return c;
  }, []);

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return PROJECTS.filter((p) => cat === "all" || p.categories.includes(cat)).filter((p) => {
      if (!needle) return true;
      const hay = [p.name.fr, p.name.en, p.subtitle.fr, p.subtitle.en, p.stack.join(" ")].join(" ").toLowerCase();
      return hay.includes(needle);
    });
  }, [cat, q]);

  return (
    <Page>
      <section className="page-hero">
        <div className="wrap">
          <span className="eyebrow">{ui("allEyebrow")}</span>
          <h1 className="h-display" style={{ marginTop: 20 }}>
            <SplitText text={ui("navProjects")} delay={0.5} />
            <span className="serif accent" style={{ fontSize: "0.5em", marginLeft: 16 }}>({PROJECTS.length})</span>
          </h1>
          <Reveal delay={0.6}><p className="lead muted" style={{ marginTop: 24 }}>{ui("allIntro")}</p></Reveal>
          <Reveal delay={0.7} className="filters">
            {[{ key: "all", label: { fr: ui("filterAll"), en: ui("filterAll") } }, ...CATEGORIES].map((c) =>
              counts[c.key] ? (
                <button key={c.key} className={`filter${cat === c.key ? " active" : ""}`} onClick={() => setCat(c.key)} aria-pressed={cat === c.key} style={{ isolation: "isolate" }}>
                  {cat === c.key && <motion.span layoutId="filter-bg" className="filter-bg" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
                  <span className="filter-label">{t(c.label)}<sup>{counts[c.key]}</sup></span>
                </button>
              ) : null
            )}
            <input className="search" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={ui("search")} aria-label={ui("search")} />
          </Reveal>
        </div>
      </section>

      <section>
        <div className="wrap">
          <motion.div layout className="grid">
            <AnimatePresence mode="popLayout">
              {list.map((p) => (
                <motion.div
                  layout
                  key={p.slug}
                  initial={{ opacity: 0, y: 30, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.25 } }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  <Link to={`/projets/${p.slug}`} className="card" data-cursor={ui("view")}>
                    <div className="card-visual">
                      <ProjectVisual project={p} />
                      {p.featured && <span className="card-badge">{ui("featuredBadge")}</span>}
                    </div>
                    <div className="card-body">
                      <div className="card-meta mono">
                        <span>{t(p.group)}</span>
                        <span>{p.year}</span>
                      </div>
                      <h3>{t(p.name)}</h3>
                      <p>{t(p.subtitle)}</p>
                      <div className="card-foot">
                        {p.stack.slice(0, 4).map((s) => <span key={s} className="chip">{s}</span>)}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          {list.length === 0 && <p className="lead muted" style={{ paddingBottom: 120 }}>{ui("noResult")}</p>}
        </div>
      </section>
      <Footer />
    </Page>
  );
}
