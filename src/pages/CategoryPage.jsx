import { Link, useParams } from "react-router-dom";
import { motion } from "motion/react";
import { useLang } from "../i18n.jsx";
import { CATEGORIES, byCategory } from "../data/projects.js";
import { EASE, Page, Reveal, SplineField, SplitText } from "../components/motion.jsx";
import { Footer } from "../components/Layout.jsx";
import ProjectVisual from "../components/ProjectVisual.jsx";
import NotFound from "./NotFound.jsx";

function BigCard({ p, i }) {
  const { t, ui } = useLang();
  return (
    <Reveal delay={i * 0.1} y={40}>
      <Link to={`/projets/${p.slug}`} className="big-card" data-cursor={ui("view")}>
        <div className="big-card-visual">
          <ProjectVisual project={p} eager />
          <span className="card-badge">{ui("featuredBadge")}</span>
          {p.live && <span className="live-badge"><span className="pulse" />{ui("liveBadge")}</span>}
        </div>
        <div className="big-card-body">
          <div className="card-meta mono"><span>{t(p.group)}</span><span>{p.year}</span></div>
          <h3 className="title-row">{p.logo && <img className="p-logo" src={p.logo} alt="" />}{t(p.name)}</h3>
          <p>{t(p.subtitle)}</p>
          <div className="card-foot">{p.stack.slice(0, 6).map((s) => <span key={s} className="chip">{s}</span>)}</div>
        </div>
      </Link>
    </Reveal>
  );
}

function Card({ p, i }) {
  const { t, ui } = useLang();
  return (
    <Reveal delay={(i % 3) * 0.06} y={30}>
      <Link to={`/projets/${p.slug}`} className="card" data-cursor={ui("view")}>
        <div className="card-visual"><ProjectVisual project={p} />{p.live && <span className="live-badge"><span className="pulse" />{ui("liveBadge")}</span>}</div>
        <div className="card-body">
          <div className="card-meta mono"><span>{t(p.group)}</span><span>{p.year}</span></div>
          <h3 className="title-row">{p.logo && <img className="p-logo" src={p.logo} alt="" loading="lazy" />}{t(p.name)}</h3>
          <p>{t(p.subtitle)}</p>
          <div className="card-foot">{p.stack.slice(0, 4).map((s) => <span key={s} className="chip">{s}</span>)}</div>
        </div>
      </Link>
    </Reveal>
  );
}

export default function CategoryPage() {
  const { cat: key } = useParams();
  const { t, ui } = useLang();
  const idx = CATEGORIES.findIndex((c) => c.key === key);
  if (idx === -1) return <NotFound />;
  const cat = CATEGORIES[idx];
  const prev = CATEGORIES[(idx - 1 + CATEGORIES.length) % CATEGORIES.length];
  const next = CATEGORIES[(idx + 1) % CATEGORIES.length];
  const all = byCategory(cat.key);
  const featured = all.filter((p) => cat.featured.includes(p.slug));
  const others = all.filter((p) => !cat.featured.includes(p.slug));

  return (
    <Page>
      <section className="dark cat-hero">
        <SplineField className="hero-field" lines={12} seed={cat.key} accentIndex={5} />
        <div className="wrap" style={{ position: "relative" }}>
          <Reveal delay={0.5} y={10}><Link to="/projets" className="pd-back mono" style={{ color: "var(--muted-dark)" }}>← {ui("allCategories")}</Link></Reveal>
          <motion.span className="cat-hero-num" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1, ease: EASE }}>{cat.num}</motion.span>
          <h1 className="h-display" style={{ marginTop: 7 }}><SplitText key={cat.key} text={t(cat.label)} delay={0.55} /></h1>
          <Reveal delay={0.7}><p className="lead muted-on-dark" style={{ marginTop: 21 }}>{t(cat.desc)}</p></Reveal>
          <Reveal delay={0.8}><p className="mono muted-on-dark" style={{ marginTop: 16 }}>{all.length} {ui("projectsCount")}</p></Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "clamp(42px, 6.16vw, 79px)" }}>
        <div className="wrap">
          <div className={`big-cards n${featured.length}`}>
            {featured.map((p, i) => <BigCard key={p.slug} p={p} i={i} />)}
          </div>
          {others.length > 0 && (
            <>
              <Reveal><h2 className="h-3" style={{ margin: "clamp(49px, 7.04vw, 84px) 0 25px" }}>{ui("alsoInCategory")}</h2></Reveal>
              <div className="grid">{others.map((p, i) => <Card key={p.slug} p={p} i={i} />)}</div>
            </>
          )}
        </div>
      </section>

      <section className="dark">
        <div className="wrap cat-pager">
          <Link to={`/projets/categorie/${prev.key}`} className="cat-pager-link" data-cursor={ui("view")}>
            <span className="mono muted-on-dark">← {prev.num}</span>
            <span className="h-3">{t(prev.label)}</span>
          </Link>
          <Link to={`/projets/categorie/${next.key}`} className="cat-pager-link next" data-cursor={ui("view")}>
            <span className="mono muted-on-dark">{next.num} →</span>
            <span className="h-2">{t(next.label)}</span>
          </Link>
        </div>
      </section>
      <Footer />
    </Page>
  );
}
