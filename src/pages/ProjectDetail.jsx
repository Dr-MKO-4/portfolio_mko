import { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useLang } from "../i18n.jsx";
import { PROJECTS, CATEGORY_OF } from "../data/projects.js";
import { EASE, Page, Reveal, SplitText } from "../components/motion.jsx";
import { Footer } from "../components/Layout.jsx";
import ProjectVisual from "../components/ProjectVisual.jsx";
import NotFound from "./NotFound.jsx";

export default function ProjectDetail() {
  const { slug } = useParams();
  const { t, ui } = useLang();
  const idx = PROJECTS.findIndex((p) => p.slug === slug);
  const coverRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: coverRef, offset: ["start end", "end start"] });
  const coverY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const [zoom, setZoom] = useState(null);

  if (idx === -1) return <NotFound />;
  const p = PROJECTS[idx];
  const sameCat = PROJECTS.filter((x) => x.cat === p.cat);
  const next = sameCat[(sameCat.indexOf(p) + 1) % sameCat.length];
  const cat = CATEGORY_OF[p.cat];
  const built = t(p.built) || [];
  const arch = t(p.architecture) || [];

  return (
    <Page>
      <section className="pd-hero">
        <div className="wrap">
          <Reveal delay={0.5} y={10}>
            <Link to={`/projets/categorie/${p.cat}`} className="pd-back mono">← {cat.num} · {t(cat.label)}</Link>
          </Reveal>
          <Reveal delay={0.55} y={10}>
            <span className="eyebrow">{t(p.group)}{p.featured ? ` · ${ui("featuredBadge")}` : ""}</span>
          </Reveal>
          <h1 className="h-1 pd-title title-row">{p.logo && <motion.img className="p-logo p-logo-lg" src={p.logo} alt={`Logo ${t(p.name)}`} initial={{ scale: 0, rotate: -15 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.6, duration: 0.7, ease: EASE }} />}<SplitText key={p.slug} text={t(p.name)} delay={0.6} /></h1>
          <Reveal delay={0.75}><p className="pd-sub">{t(p.subtitle)}</p></Reveal>
          <Reveal delay={0.85}>
            <dl className="pd-meta">
              <div><dt className="mono">{ui("status")}</dt><dd>{t(p.status)}</dd></div>
              <div><dt className="mono">{ui("year")}</dt><dd>{p.year}</dd></div>
              <div><dt className="mono">{ui("role")}</dt><dd>{t(p.role)}</dd></div>
              <div><dt className="mono">{ui("stack")}</dt><dd>{p.stack.slice(0, 3).join(" · ")}</dd></div>
            </dl>
          </Reveal>
        </div>
      </section>

      <div className="wrap">
        <motion.div
          ref={coverRef}
          className="pd-cover"
          initial={{ clipPath: "inset(12% 6% 12% 6% round 28px)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0% round 28px)" }}
          transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1], delay: 0.7 }}
        >
          <motion.div style={{ position: "absolute", inset: 0, y: coverY }}>
            <ProjectVisual project={p} logoClass="stack-logo" eager />
          </motion.div>
        </motion.div>
      </div>

      <div className="wrap">
        <div className="pd-body">
          <aside className="pd-aside">
            <div>
              <h4 className="mono muted">{ui("stack")}</h4>
              <div className="chips">{p.stack.map((s) => <span key={s} className="chip">{s}</span>)}</div>
            </div>
            <div>
              <h4 className="mono muted">{ui("links")}</h4>
              <div className="pd-links">
                {p.links?.length ? (
                  p.links.map((l) => (
                    <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="pd-link" data-cursor="GitHub">
                      <span>{t(l.label)}</span><span>↗</span>
                    </a>
                  ))
                ) : (
                  <p className="muted" style={{ fontSize: 14 }}>{ui("privateCode")}</p>
                )}
              </div>
            </div>
          </aside>

          <div className="pd-main">
            <Reveal as="section">
              <span className="eyebrow">{ui("context")}</span>
              <h2 className="h-2">{ui("context2")}</h2>
              <p>{t(p.context)}</p>
            </Reveal>

            {built.length > 0 && (
              <section>
                <Reveal><span className="eyebrow">{ui("approach")}</span></Reveal>
                <ul className="pd-list" style={{ marginTop: 24 }}>
                  {built.map((b, i) => (
                    <Reveal as="li" key={i} delay={i * 0.04} y={20}>{b}</Reveal>
                  ))}
                </ul>
              </section>
            )}

            {arch.length > 0 && (
              <section>
                <Reveal><span className="eyebrow">{ui("architecture")}</span></Reveal>
                <div className="arch" style={{ marginTop: 24 }}>
                  {arch.map((a, i) => (
                    <Reveal key={i} className="arch-node" delay={i * 0.05} y={16}><span>{a}</span></Reveal>
                  ))}
                </div>
              </section>
            )}

            {p.gallery?.length > 0 && (
              <section>
                <Reveal><span className="eyebrow">{ui("gallery")}</span></Reveal>
                <div className="pd-gallery" style={{ marginTop: 24 }}>
                  {p.gallery.map((g, i) => (
                    <Reveal key={g.src} delay={i * 0.05}>
                      <button onClick={() => setZoom(g)} data-cursor="Zoom" aria-label={t(g.alt)}>
                        <img src={g.src} alt={t(g.alt)} loading="lazy" />
                      </button>
                    </Reveal>
                  ))}
                </div>
              </section>
            )}

            {p.note && (
              <Reveal as="section"><p className="pd-note">{t(p.note)}</p></Reveal>
            )}
          </div>
        </div>
      </div>

      <section className="dark">
        <div className="wrap">
          <Link to={`/projets/${next.slug}`} className="next-project" data-cursor={ui("view")}>
            <span className="eyebrow">{ui("nextProject")}</span>
            <div className="h-display" style={{ marginTop: 20 }}>{t(next.name)} <span className="serif">→</span></div>
            <p className="lead muted-on-dark" style={{ marginTop: 16 }}>{t(next.subtitle)}</p>
          </Link>
        </div>
      </section>

      <AnimatePresence>
        {zoom && (
          <motion.div className="lightbox" onClick={() => setZoom(null)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.img src={zoom.src} alt={t(zoom.alt)} initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} transition={{ ease: EASE, duration: 0.5 }} />
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </Page>
  );
}
